package core;

import tileengine.TETile;
import tileengine.Tileset;
import utils.RandomUtils;
import utils.FileUtils;
import utils.RoomUtil;
import java.util.*;
import java.util.List;

public class World {

    // build your own world!
    private static final int width = 70; // set width
    private static final int height = 40; // set height
    private long seed;
    private Random rand;
    private TETile[][] worldBoard;
    private int currFloor;
    private List<Coins> coinPositions;
    private int[] elevatorPosition;

    public World(long seed, int floor) {
        this.seed = seed;
        rand = new Random(seed);
        worldBoard = new TETile[width][height];
        elevatorPosition = new int[2];
        coinPositions = new ArrayList<>();
        currFloor = floor;
    }

    // create World based on seed
    public TETile[][] generateWorld() {
        // initialize World with empty tiles
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                worldBoard[x][y] = Tileset.NOTHING;
            }
        }
        // add rooms and hallways using pseudorandom generation
        createRoomsAndHallways();
        generateElevator();
        coinPositions = new ArrayList<>();
        return worldBoard;
    }

    // save world into save.txt
    public void saveWorld() {
        String board = "";
        StringBuilder sb = new StringBuilder();
        sb.append(seed); // (1) seed
        sb.append("\n");
        sb.append(elevatorPosition[0]+","+elevatorPosition[1]); // (3) elevator position
        sb.append("\n");
        for (Coins coin: coinPositions) { // (4) coin positions
            sb.append(coin.getX());
            sb.append(",");
            sb.append(coin.getY());
            sb.append(" "); // each different coordinate seperate by space
        }
        board += sb.toString();
        String floorFile = "src/floor"+currFloor+".txt"; // assign to file corresponding to current floor
        FileUtils.writeFile(floorFile, board);
    }

    // returns World saved in save.txt
    public static World loadWorld(int floor) {
        String floorFile = "src/floor"+floor+".txt"; // read file corresponding to current floor
        String board = FileUtils.readFile(floorFile);
        String[] rows = board.split("\n");
        World currWorld = new World(Long.parseLong(rows[0]), floor); // (1) seed
        currWorld.generateWorld();
        String[] elevatorCoors = rows[1].split(",");
        currWorld.addElevator(Integer.parseInt(elevatorCoors[0]), Integer.parseInt(elevatorCoors[1])); // (2) elevator position
        if (rows.length == 3) {
            String[] coinCoors = rows[2].split(" ");
            for (String coinCoor: coinCoors) { // (3) coin positions
                String[] currCoinCoor = coinCoor.split(",");
                int x = Integer.parseInt(currCoinCoor[0]);
                int y = Integer.parseInt(currCoinCoor[1]);
                currWorld.addCoin(x, y);
            }
        }
        return currWorld;
    }

    // returns current world board
    public TETile[][] getWorldBoard() {
        return worldBoard;
    }

    // flip board 90 degrees ccw
    public static TETile[][] rotateWorld(TETile[][] matrix) {
        int rows = matrix.length;  // number of rows
        int cols = matrix[0].length; // number of columns
        TETile[][] rotatedMatrix = new TETile[cols][rows];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                rotatedMatrix[cols - 1 - j][i] = matrix[i][j];
            }
        }
        return rotatedMatrix;
    }

    public int getCurrFloor() {
        return currFloor;
    }

    public void removeCoin(int x, int y) {
        coinPositions.remove(new Coins(x, y));
    }

    // generate random coins
    public void generateCoins() {
        int numCoins = rand.nextInt(10) + 5;  // Place between 5 and 15 coins
        while (numCoins > 0) {
            int x = rand.nextInt(width);
            int y = rand.nextInt(height);
            // Ensure we don't place coins on the avatar's initial position or walls
            if (worldBoard[x][y] == Tileset.FLOOR) {
                worldBoard[x][y] = Tileset.FLOWER; // coin denoted by flower
                coinPositions.add(new Coins(x, y));
                numCoins--;
            }
        }
    }

    // return true if there are no more coins
    public boolean noCoinsLeft() {
        return coinPositions.isEmpty();
    }

    // adds avatar next to elevator
    public int[] avatarAfterElevator() {
        int x = elevatorPosition[0];
        int y = elevatorPosition[1];
        if (worldBoard[x][y + 1] == Tileset.FLOOR) {
            worldBoard[x][y + 1] = Tileset.AVATAR;
            return new int[]{x, y + 1};
        } else if (worldBoard[x + 1][y] == Tileset.AVATAR) {
            worldBoard[x + 1][y] = Tileset.AVATAR;
            return new int[]{x + 1, y};
        } else if (worldBoard[x][y - 1] == Tileset.AVATAR) {
            worldBoard[x][y - 1] = Tileset.AVATAR;
            return new int[]{x, y - 1};
        } else {
            worldBoard[x - 1][y] = Tileset.AVATAR;
            return new int[]{x - 1, y};
        }
    }

    // create rooms and hallways in the world
    private void createRoomsAndHallways() {
        int roomCount = RandomUtils.uniform(rand, 10, 16);
        List<Room> worldRooms = new ArrayList<>();
        for (int i = 0; i < roomCount; i++) {
            int roomWidth = RandomUtils.uniform(rand, 2, 12); // width size 2-11
            int roomHeight = RandomUtils.uniform(rand, 2, 10); // height size 2-9
            int x = RandomUtils.uniform(rand, 1, width - roomWidth - 1);
            int y = RandomUtils.uniform(rand, 1, height - roomHeight - 1);
            // Check if the area is clear (no FLOOR tiles)
            if (canPlaceRoom(x, y, roomWidth, roomHeight)) {
                Room newRoom = new Room(x, y, roomWidth, roomHeight, i);
                // add walls around the room
                newRoom.addWallsAroundRoom();
                worldRooms.add(newRoom);
            } else {
                i--;  // try again if the room overlaps
            }
        }
        // add hallways (width-1)
        createHallways(worldRooms);
    }

    private boolean canPlaceRoom(int x, int y, int roomWidth, int roomHeight) {
        // check if any part of the proposed room area is already a FLOOR tile
        for (int dx = 0; dx < roomWidth; dx++) {
            for (int dy = 0; dy < roomHeight; dy++) {
                int nx = x + dx;
                int ny = y + dy;
                if (nx < 0 || nx > width || ny < 0 || ny > height || worldBoard[nx][ny] == Tileset.FLOOR
                        || worldBoard[nx][ny] == Tileset.WALL) {
                    return false;
                }
            }
        }
        return true;
    }

    // this method returns the room which is closer to the specific room starting from index
    private Room findTheNearestRoom(Room room, List<Room> rooms, boolean[] visitedRoom) {
        Room closerRoom = null;
        double minDistance = Double.MAX_VALUE;
        for (int i=0; i < rooms.size(); i++) {
            Room neighbour = rooms.get(i);
            // skipped all the visited node
            if ((neighbour.getRoomNumber() == room.getRoomNumber()) ||
                    visitedRoom[neighbour.getRoomNumber()]) {
                continue;
            }
            double distance = findDistanceBetweenRoom(room, rooms.get(i));
            if (distance < minDistance) {
                minDistance = distance;
                closerRoom = rooms.get(i);
            }
        }
        return closerRoom;
    }

    private double findDistanceBetweenRoom(Room room1, Room room2) {
        int x1 = room1.x; // x of top left corner of room1
        int x2 = room1.x2; // x of bottom right corner room1
        int y1 = room1.y; // y of top left corner of room1
        int y2 = room1.y2; // y of bottom right corner room1

        int x3 = room2.x; // x of top left corner room2
        int x4 = room2.x2; // x of bottom right corner room2
        int y3 = room2.y; // y of top left corner room2
        int y4 = room2.y2; // y of bottom right corner room2

        int horizontalDist = 0;
        if (x2 < x3) {
            horizontalDist = x3 - x2;
        } else if (x4 < x1) {
            horizontalDist = x1 - x4;
        }
        int verticalDist = 0;
        if (y2 < y3) {
            verticalDist = y3 - y2;
        } else if (y4 < y1) {
            verticalDist = y1 - y4;
        }
        // if both distances are zero, the rectangles overlap
        if (horizontalDist == 0 && verticalDist == 0) {
            return 0.0;
        }
        return Math.sqrt(horizontalDist * horizontalDist + verticalDist * verticalDist); // pythagorean distance
    }

    private void createHallways(List<Room> rooms) {
        boolean[] visitedRoom = new boolean[rooms.size()];
        Room currRoom = rooms.getFirst();
        visitedRoom[currRoom.getRoomNumber()] = true;
        int numberOfProcessedRoom = 1;
        while(numberOfProcessedRoom < rooms.size()){
            Room nearestRoom = findTheNearestRoom(currRoom, rooms, visitedRoom);
            visitedRoom[nearestRoom.getRoomNumber()] = true;
            numberOfProcessedRoom++;
            createHallway(currRoom, nearestRoom);
            currRoom = nearestRoom;
        }
    }

    private void createHallway(Room room1, Room room2) {
        RoomUtil.Position position = RoomUtil.findPositionOfRoom2FromRoom1(room1, room2);
        ConnectionPoints connectionPoints = findConnectionPoint(room1, room2, position);
        createHallway(connectionPoints.startX, connectionPoints.startY, connectionPoints.endX, connectionPoints.endY);
    }


    // places coins in given position
    private void addCoin(int x, int y) {
        worldBoard[x][y] = Tileset.FLOWER; // coin denoted by flower
        coinPositions.add(new Coins(x, y));
    }

    // generate random elevator position
    private void generateElevator() {
        boolean hasElevator = false;
        while (!hasElevator) {
            int x = rand.nextInt(width);
            int y = rand.nextInt(height);
            // ensure we don't place elevator on the avatar's initial position or walls
            if (worldBoard[x][y] == Tileset.FLOOR && worldBoard[x + 1][y] == Tileset.FLOOR
                    && worldBoard[x][y + 1] == Tileset.FLOOR && worldBoard[x - 1][y] == Tileset.FLOOR
                    && worldBoard[x][y - 1] == Tileset.FLOOR && worldBoard[x - 1][y - 1] == Tileset.FLOOR
                    && worldBoard[x + 1][y + 1] == Tileset.FLOOR && worldBoard[x - 1][y + 1] == Tileset.FLOOR
                    && worldBoard[x + 1][y - 1] == Tileset.FLOOR) {
                worldBoard[x][y] = Tileset.CELL; // elevator denoted by cell
                elevatorPosition[0] = x;
                elevatorPosition[1] = y;
                hasElevator = true;
            }
        }
    }

    // add elevator at position (x, y)
    private void addElevator(int x, int y) {
        worldBoard[x][y] = Tileset.CELL;
        elevatorPosition[0] = x;
        elevatorPosition[1] = y;
    }

    class ConnectionPoints {
        int startX;
        int startY;
        int endX;
        int endY;


        public ConnectionPoints(int startX, int startY, int endX, int endY) {
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;
        }
    }

    private ConnectionPoints findConnectionPoint(Room room1, Room room2, RoomUtil.Position position) {
        if (Objects.requireNonNull(position) == RoomUtil.Position.UPPER_LEFT || position == RoomUtil.Position.LEFT) {
            return new ConnectionPoints(room1.x, (room1.y + room1.y2) / 2, room2.x2, (room2.y + room2.y2) / 2);
        } else if (position == RoomUtil.Position.TOP) {
            return new ConnectionPoints((room1.x + room1.x2) / 2, room1.y2, (room2.x + room2.x2) / 2, room2.y2);
        } else if (position == RoomUtil.Position.UPPER_RIGHT) {
            return new ConnectionPoints((room1.x + room1.x2) / 2, room1.y2, room2.x, (room2.y + room2.y2) / 2);
        } else if (position == RoomUtil.Position.RIGHT) {
            return new ConnectionPoints(room1.x2, room1.y2, room2.x, (room2.y + room2.y2) / 2);
        } else if (position == RoomUtil.Position.LOWER_RIGHT) {
            return new ConnectionPoints((room1.x + room1.x2) / 2, room1.y, room2.x, (room2.y + room2.y2) / 2);
        } else if (position == RoomUtil.Position.BOTTOM) {
            return new ConnectionPoints((room1.x + room1.x2) / 2, room1.y, (room2.x + room2.x2) / 2, room2.y2);
        } else if (position == RoomUtil.Position.LOWER_LEFT) {
            return new ConnectionPoints((room1.x + room1.x2) / 2, room1.y, room2.x2, room2.y2);
        }
        return null;
    }

    private void createHallway(int startX, int startY, int endX, int endY) {
        // create a horizontal path first (as needed)
        int xDirection;
        int yDirection;
        if (startX < endX) {
            xDirection = 1;
        } else {
            xDirection = -1;
        }
        if (startY < endY) {
            yDirection = 1;
        } else {
            yDirection = -1;
        }
        if (startY == endY) { // horizontal path
            for (int x = startX; x != endX; x += xDirection) {
                worldBoard[x][startY] = Tileset.FLOOR; // Mark the floor of the hallway
                // add surrounding walls
                if (worldBoard[x][startY - 1] != Tileset.FLOOR) {
                    worldBoard[x][startY - 1] = Tileset.WALL;
                }
                if (worldBoard[x][startY + 1] != Tileset.FLOOR) {
                    worldBoard[x][startY + 1] = Tileset.WALL;
                }
            }
            // add the last floor tile at endX
            worldBoard[endX][startY] = Tileset.FLOOR;
            if (worldBoard[endX][startY - 1] != Tileset.FLOOR) {
                worldBoard[endX][startY - 1] = Tileset.WALL;
            }
            if (worldBoard[endX][startY + 1] != Tileset.FLOOR) {
                worldBoard[endX][startY + 1] = Tileset.WALL;
            }
        } else if (startX == endX) { // create a vertical path (if necessary)
            for (int y = startY; y != endY; y += yDirection) {
                worldBoard[startX][y] = Tileset.FLOOR; // Mark the floor of the hallway
                // add surrounding walls
                if (worldBoard[startX - 1][y] != Tileset.FLOOR) {
                    worldBoard[startX - 1][y] = Tileset.WALL;
                }
                if (worldBoard[startX + 1][y] != Tileset.FLOOR) {
                    worldBoard[startX + 1][y] = Tileset.WALL;
                }
            }
            // add the last floor tile at endY
            worldBoard[startX][endY] = Tileset.FLOOR;
            if (worldBoard[startX - 1][endY] != Tileset.FLOOR) {
                worldBoard[startX - 1][endY] = Tileset.WALL;
            }
            if (worldBoard[startX + 1][endY] != Tileset.FLOOR) {
                worldBoard[startX + 1][endY] = Tileset.WALL;
            }
        } else { // create an L-shaped path (horizontal + vertical)
            for (int x = startX; x != endX; x += xDirection) {
                worldBoard[x][startY] = Tileset.FLOOR; // Mark the floor of the hallway
                // add surrounding walls
                if (worldBoard[x][startY - 1] != Tileset.FLOOR) {
                    worldBoard[x][startY - 1] = Tileset.WALL;
                }
                if (worldBoard[x][startY + 1] != Tileset.FLOOR) {
                    worldBoard[x][startY + 1] = Tileset.WALL;
                }
            }
            // then create vertical part of the L
            for (int y = startY; y != endY; y += yDirection) {
                worldBoard[endX][y] = Tileset.FLOOR; // mark the floor of the hallway
                // add surrounding walls
                if (worldBoard[endX - 1][y] != Tileset.FLOOR) {
                    worldBoard[endX - 1][y] = Tileset.WALL;
                }
                if (worldBoard[endX + 1][y] != Tileset.FLOOR) {
                    worldBoard[endX + 1][y] = Tileset.WALL;
                }
            }
            // add the last floor tile at endY
            worldBoard[endX][endY] = Tileset.FLOOR;
            if (worldBoard[endX - 1][endY] != Tileset.FLOOR) {
                worldBoard[endX - 1][endY] = Tileset.WALL;
            }
            if (worldBoard[endX + 1][endY] != Tileset.FLOOR) {
                worldBoard[endX + 1][endY] = Tileset.WALL;
            }
            // handle the corner tile (where horizontal and vertical parts meet) as a wall
            if (worldBoard[endX - 1][startY] != Tileset.FLOOR) {
                worldBoard[endX - 1][startY] = Tileset.WALL;
            }
            if (worldBoard[endX + 1][startY] != Tileset.FLOOR) {
                worldBoard[endX + 1][startY] = Tileset.WALL;
            }
            if (worldBoard[endX][startY - 1] != Tileset.FLOOR) {
                worldBoard[endX][startY - 1] = Tileset.WALL;
            }
            if (worldBoard[endX][startY + 1] != Tileset.FLOOR) {
                worldBoard[endX][startY + 1] = Tileset.WALL;
            }
        }
    }

    // room class to store room dimensions and position
    public class Room {
        private int x;
        private int y;
        private int x2; // x + roomWidth - 1
        private int y2; // y + roomHeight - 1
        private int roomWidth;
        private int roomHeight;
        private int roomNumber;

        public int getX2() {
            return x2;
        }

        public int getY2() {
            return y2;
        }

        public int getX() {
            return x;
        }

        public int getY() {
            return y;
        }

        public int getRoomWidth() {
            return roomWidth;
        }

        public int getRoomHeight() {
            return roomHeight;
        }

        public int getRoomNumber() {
            return roomNumber;
        }

        public Room(int x, int y, int width, int height, int roomNumber) {
            this.x = x;
            this.y = y;
            roomWidth = width;
            roomHeight = height;
            this.x2 = x + width - 1;
            this.y2 = y + height - 1;
            this.roomNumber = roomNumber;
            createRoom();
        }

        private void createRoom() {
            for (int dx = 0; dx < roomWidth; dx++) {
                for (int dy = 0; dy < roomHeight; dy++) {
                    worldBoard[x + dx][y + dy] = Tileset.FLOOR;
                }
            }
        }

        // adds walls around a given room
        private void addWallsAroundRoom() {
            for (int dx = -1; dx <= roomWidth; dx++) {
                if (worldBoard[x + dx][y - 1] != Tileset.FLOOR) {
                    worldBoard[x + dx][y - 1] = Tileset.WALL;
                }
                if (worldBoard[x + dx][y + roomHeight] != Tileset.FLOOR) {
                    worldBoard[x + dx][y + roomHeight] = Tileset.WALL;
                }
            }
            for (int dy = -1; dy <= roomHeight; dy++) {
                if (worldBoard[x - 1][y + dy] != Tileset.FLOOR) {
                    worldBoard[x - 1][y + dy] = Tileset.WALL;
                }
                if (worldBoard[x + roomWidth][y + dy] != Tileset.FLOOR) {
                    worldBoard[x + roomWidth][y + dy] = Tileset.WALL;
                }
            }
        }
    }
}
