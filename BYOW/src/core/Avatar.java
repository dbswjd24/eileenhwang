package core;

import tileengine.TETile;
import tileengine.Tileset;

import java.util.Random;
import utils.RandomUtils;

public class Avatar {
    private World world;
    private TETile[][] worldBoard;
    private int x;
    private int y;
    private int points;

    public Avatar(World world, int floor) {
        this.world = world;
        worldBoard = world.getWorldBoard();
        points = 0;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getPoints() {
        return points;
    }

    public static int findAvatarPositionX(TETile[][] tiles) {
        for (int x = 0; x < tiles.length; x++) {
            for (int y = 0; y < tiles[0].length; y++) {
                if (tiles[x][y] == Tileset.AVATAR) {
                    return x;
                }
            }
        }
        return -1;  // Return an invalid position if not found
    }

    public static int findAvatarPositionY(TETile[][] tiles) {
        for (int x = 0; x < tiles.length; x++) {
            for (int y = 0; y < tiles[0].length; y++) {
                if (tiles[x][y] == Tileset.AVATAR) {
                    return y;
                }
            }
        }
        return -1;  // Return an invalid position if not found
    }

    // place the avatar randomly (based on seed) on the worldBoard map (on a floor tile)
    public void generateAvatar(long seed) {
        Random rand = new Random(seed);
        // find a random tile to place the avatar
        int tempX = RandomUtils.uniform(rand, worldBoard.length);
        int tempY = RandomUtils.uniform(rand, worldBoard[0].length);
        // make sure we place the avatar on a valid floor tile (Tileset.FLOOR)
        while (worldBoard[tempX][tempY] != Tileset.FLOOR) {
            tempX = RandomUtils.uniform(rand, worldBoard.length);
            tempY = RandomUtils.uniform(rand, worldBoard[0].length);
        }
        // set the avatar to this position
        x = tempX;
        y = tempY;
        // set the tile at (x, y) to the avatar tile
        worldBoard[x][y] = Tileset.AVATAR;
    }

    public void placeAvatar(int x, int y) {
        worldBoard[x][y] = Tileset.AVATAR;
        this.x = x;
        this.y = y;
    }

    // method to move the avatar in the worldBoard (if the destination is a floor)
    // if it is a flower, it will "collect" it and add a point
    // if it is an elevator, it will go into it and switch to a different screen
    public void tryMove(int dx, int dy) {
        int newX = x + dx;
        int newY = y + dy;

        // ensure new position is within bounds and a floor tile
        if (newX >= 0 && newX < worldBoard.length && newY >= 0 && newY < worldBoard[0].length) {
            if (worldBoard[newX][newY] == Tileset.FLOWER) {
                points++;
                world.removeCoin(newX, newY);
            }
            if (worldBoard[newX][newY] == Tileset.FLOOR || worldBoard[newX][newY] == Tileset.FLOWER) {
                // move the avatar to new position
                worldBoard[x][y] = Tileset.FLOOR;  // replace old position with floor
                x = newX;
                y = newY;
                worldBoard[x][y] = Tileset.AVATAR;  // set new position to avatar
            } else if (worldBoard[newX][newY] == Tileset.CELL) { // enter elevator
                Main.changeFloors();
            }
        }
    }

    // exit onto new floor
    public void exitElevator(World newWorld) {
        world = newWorld;
        worldBoard = newWorld.getWorldBoard();
        x = Avatar.findAvatarPositionX(worldBoard);
        y = Avatar.findAvatarPositionY(worldBoard);
    }
}
