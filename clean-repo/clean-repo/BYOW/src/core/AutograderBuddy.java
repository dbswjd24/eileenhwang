package core;

import tileengine.TETile;
import tileengine.Tileset;

public class AutograderBuddy {

    /**
     * Simulates a game, but doesn't render anything or call any StdDraw
     * methods. Instead, returns the world that would result if the input string
     * had been typed on the keyboard.
     *
     * Recall that strings ending in ":q" should cause the game to quit and
     * save. To "quit" in this method, save the game to a file, then just return
     * the TETile[][]. Do not call System.exit(0) in this method.
     *
     * @param input the input string to feed to your program
     * @return the 2D TETile[][] representing the state of the world
     */
    public static TETile[][] getWorldFromInput(String input) {

        // Optional: Complete this method if you are submitting to the autograder
        String[] inputs = input.split("");
        int i = 1;
        long seed = 0;
        while (i < inputs.length && isInteger(inputs[i])) {
            seed = Integer.parseInt(inputs[i]) + seed * 10;
            i++;
        }
        World genWorld = new World(seed, 1);
        return genWorld.generateWorld();
        // throw new RuntimeException("Please fill out AutograderBuddy!");
    }

    private static boolean isInteger(String str) {
        return str.equals("0")
                || str.equals("1")
                || str.equals("2")
                || str.equals("3")
                || str.equals("4")
                || str.equals("5")
                || str.equals("6")
                || str.equals("7")
                || str.equals("8")
                || str.equals("9");
    }

    /**
     * Used to tell the autograder which tiles are the floor/ground (including
     * any lights/items resting on the ground). Change this
     * method if you add additional tiles.
     */
    public static boolean isGroundTile(TETile t) {
        return t.character() == Tileset.FLOOR.character()
                || t.character() == Tileset.AVATAR.character()
                || t.character() == Tileset.FLOWER.character();
    }

    /**
     * Used to tell the autograder while tiles are the walls/boundaries. Change
     * this method if you add additional tiles.
     */
    public static boolean isBoundaryTile(TETile t) {
        return t.character() == Tileset.WALL.character()
                || t.character() == Tileset.LOCKED_DOOR.character()
                || t.character() == Tileset.UNLOCKED_DOOR.character();
    }
}
