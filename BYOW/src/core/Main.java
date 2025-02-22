package core;

import edu.princeton.cs.algs4.StdDraw;
import tileengine.TERenderer;
import tileengine.TETile;
import utils.FileUtils;

public class Main {
    private static long baseSeed;
    private static final int numWorlds = 3;
    private static World[] floors = new World[numWorlds];
    private static Avatar avatar;
    private static int currFloor;
    private static final String SAVE_FILE = "src/save.txt";

    public static void main(String[] args) {
        // here we display the main screen to the user
        showMainScreen("BYOW: Collect All Flowers on Each Floor");
        // wait for the user to enter the option
        acceptUserInput();
        // explore the world!
        acceptUserInteraction();

//        Your baseSeeds are:
//        4830569748212109509
//        5958580239737114980
//        251313182904104766
//        589669830728752955
//        356106671586256598
    }

    public static void showMainScreen(String initialMessage) {
        // set the canvas size and scale
        StdDraw.setCanvasSize(500, 500);
        StdDraw.setXscale(0, 10);
        StdDraw.setYscale(0, 10);

        // set background color and font
        StdDraw.setPenColor(StdDraw.BLACK); // Set pen color to black
        StdDraw.filledRectangle(5, 5, 5, 5); // Fill canvas with a black rectangle
        StdDraw.setFont(new java.awt.Font("Arial", java.awt.Font.PLAIN, 20));
        StdDraw.setPenColor(StdDraw.WHITE);

        // display main menu text
        StdDraw.text(5, 8, initialMessage);
        StdDraw.text(5, 6, "(N) New Game");
        StdDraw.text(5, 5, "(L) Load Game");
        StdDraw.text(5, 4, "(Q) Quit Game");
    }

    // Cited ChatGPT (OpenAI) for assistance in implementing screen display logic.
    // ChatGPT was used to help develop the methods for displaying the text in the game.
    public static long showNewGame() {
        // set the canvas size and scale
        StdDraw.setCanvasSize(500, 500);
        StdDraw.setXscale(0, 10);
        StdDraw.setYscale(0, 10);
        // set background color
        StdDraw.setPenColor(StdDraw.BLACK); // Set pen color to black
        StdDraw.filledRectangle(5, 5, 5, 5); // Fill canvas with a black rectangle
        // set font size and color for text
        StdDraw.setPenColor(StdDraw.PINK);
        StdDraw.setFont(new java.awt.Font("Arial", java.awt.Font.PLAIN, 20));
        // display menu text (adjusted coordinates to fit within canvas)
        StdDraw.text(5, 8, "Rules: Move avatar '@' with \"AWSD\" keys.");
        StdDraw.text(5, 7, "To quit and exit game: \":Q\"");
        StdDraw.text(5, 6, "Collect all '❀'. Go between floors using '█' elevator.");
        StdDraw.text(5, 5, "Start by entering seed followed by S:");
        StdDraw.show();

        // loop to continuously give key input and display it one character at a time
        String currentStr = "";
        while (true) {
            // Check if a key has been typed
            if (StdDraw.hasNextKeyTyped()) {
                char key = StdDraw.nextKeyTyped();
                if (key == 'S' || key == 's') {
                    return Long.parseLong(currentStr);
                }
                currentStr = currentStr + key;
                // clear the canvas
                StdDraw.clear(StdDraw.BLACK);
                // display the prompt seeking baseSeed
                StdDraw.text(5, 8, "Rules: Move avatar '@' with \"AWSD\" keys.");
                StdDraw.text(5, 7, "To quit and exit game: \":Q\"");
                StdDraw.text(5, 6, "Collect all '❀'. Go between floors using '█' elevator.");
                StdDraw.text(5, 5, "Start by entering seed followed by S:");
                // display the most recent key typed at the current position
                StdDraw.text(5, 3, currentStr);
                StdDraw.show();
            }
        }
    }

    public static void acceptUserInput() {
        waitForUserInput();
        char c = StdDraw.nextKeyTyped();
        c = Character.toLowerCase(c);
        switch (c) {
            case 'n':
                baseSeed = showNewGame();
                generateNewWorld();
                break;
            case 'q':
                System.exit(0); // closes the game window and quits the game.
                break;
            case 'l':
                generateOldWorld();
                break;
            default:
                acceptUserInput();
                break;
        }
    }

    // allows user to move avatar using "AWSD" keys and quit/save with ":Q"
    public static void acceptUserInteraction() {
        TETile[][] world = floors[currFloor - 1].getWorldBoard();
        TERenderer ter = new TERenderer();
        ter.initialize(world.length, world[currFloor - 1].length);
        boolean colonPressed = false;
        while (true) {
            checkGameOver();
            while (StdDraw.hasNextKeyTyped()) {
                char c = StdDraw.nextKeyTyped();
                c = Character.toLowerCase(c);
                if (c == ':') { // if ':' is pressed, set the colonPressed flag to true
                    colonPressed = true;
                } else if (c == 'q' && colonPressed) {
                    saveWorlds();
                    System.exit(0); // closes the game window and quits the game
                } else { // if not in the ':q' sequence, reset the flag
                    colonPressed = false;
                }
                switch (c) {
                    case 'w':
                        avatar.tryMove(0, 1);
                        break;
                    case 'a':
                        avatar.tryMove(-1, 0);
                        break;
                    case 's':
                        avatar.tryMove(0, -1);
                        break;
                    case 'd':
                        avatar.tryMove(1, 0);
                        break;
                    default:
                        break;
                }
            }
            ter.renderFrame(world);
        }
    }

    // check if all coins have been collected
    private static void checkGameOver() {
        for (World floor : floors) {
            if (!floor.noCoinsLeft()) {
                return;
            }
        }
        for (int i = 0; i < numWorlds; i++) {
            floors[i] = World.loadWorld(i + 1);
        }
        //if (avatar.getPoints() > 0) { // quick testing game end screen
        StdDraw.clear(StdDraw.BLACK);
        showMainScreen("❀ YOU WIN! ❀");
        StdDraw.show();
        acceptUserInput();
        acceptUserInteraction();
        //}
    }

    // changes the floor/world of the avatar
    public static void changeFloors() {
        StdDraw.clear(StdDraw.BLACK);
        // set the canvas size and scale
        StdDraw.setCanvasSize(500, 500);
        StdDraw.setXscale(0, 10);
        StdDraw.setYscale(0, 10);
        // set background color
        StdDraw.setPenColor(StdDraw.BLACK); // Set pen color to black
        StdDraw.filledRectangle(5, 5, 5, 5); // Fill canvas with a black rectangle
        // set font size and color for text
        StdDraw.setFont(new java.awt.Font("Arial", java.awt.Font.PLAIN, 20));
        StdDraw.setPenColor(StdDraw.WHITE);
        StdDraw.text(5, 9, "ELEVATOR - Choose a floor:");
        StdDraw.text(5, 8, "Current Floor: " + currFloor);
        StdDraw.text(5, 6, "(1)");
        StdDraw.text(5, 5, "(2)");
        StdDraw.text(5, 4, "(3)");
        StdDraw.show();
        waitForUserInput(); // wait for user input

        char c = StdDraw.nextKeyTyped();
        int floorChoice = Character.getNumericValue(c); // convert the char to an int
        if (floorChoice >= 1 && floorChoice <= numWorlds) {
            currFloor = floorChoice;  // Index of array is one less than the floor number
            avatar.exitElevator(floors[currFloor - 1]);
            TETile[][] tiles = floors[currFloor - 1].getWorldBoard();
            TERenderer ter = new TERenderer();
            ter.initialize(tiles.length, tiles[0].length);
            ter.renderFrame(tiles);
            acceptUserInteraction();
        } else {
            // if invalid floor number, show error message and wait for a valid input
            StdDraw.clear(StdDraw.BLACK);
            StdDraw.text(5, 8, "Invalid floor. Please choose a valid floor.");
            changeFloors();
        }
    }

    private static void waitForUserInput() {
        // idle until user gives input
        while (!StdDraw.hasNextKeyTyped()) {}
    }

    // generates new world based on baseSeed
    private static void generateNewWorld() {
        for (int i = 0; i < numWorlds; i++) {
            floors[i] = new World(baseSeed + i, i + 1);
            floors[i].generateWorld();
            floors[i].generateCoins();
        }
        for (int i = 1; i < numWorlds; i++) {
            floors[i].avatarAfterElevator();
        }
        currFloor = 1;
        TETile[][] tiles = floors[currFloor - 1].getWorldBoard();
        avatar = new Avatar(floors[currFloor - 1], currFloor);
        avatar.generateAvatar(baseSeed);
        // render world :D
        TERenderer ter = new TERenderer();
        ter.initialize(tiles.length, tiles[0].length);
        ter.renderFrame(tiles);
    }

    // generates the world previously saved
    private static void generateOldWorld() {
        String boardInfo = FileUtils.readFile(SAVE_FILE);
        if (boardInfo.length() == 0) { // if no loaded world, quit
            System.exit(0); // closes the game window and quits the game.
            return;
        }
        for (int i = 0; i < numWorlds; i++) {
            floors[i] = World.loadWorld(i + 1);
        }
        String[] avatarInfo = boardInfo.split(",");
        currFloor = Integer.parseInt(avatarInfo[0]);
        for (int i = 0; i < numWorlds; i++) {
            if (currFloor != i + 1) {
                floors[i].avatarAfterElevator();
            }
        }
        int avatarX = Integer.parseInt(avatarInfo[1]);
        int avatarY = Integer.parseInt(avatarInfo[2]);
        avatar = new Avatar(floors[currFloor - 1], currFloor);
        avatar.placeAvatar(avatarX, avatarY);
        TETile[][] tiles = floors[currFloor - 1].getWorldBoard();
        // render world :D
        TERenderer ter = new TERenderer();
        ter.initialize(tiles.length, tiles[0].length);
        ter.renderFrame(tiles);
    }

    private static void saveWorlds() {
        String board = "";
        StringBuilder sb = new StringBuilder();
        sb.append(currFloor); // floor
        sb.append(",");
        sb.append(avatar.getX()); // avatar x
        sb.append(",");
        sb.append(avatar.getY()); // avatar y
        board += sb.toString();
        FileUtils.writeFile(SAVE_FILE, board);
        for (int i = 0; i < numWorlds; i++) {
            floors[i].saveWorld();
        }
    }
}
