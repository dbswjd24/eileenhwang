import core.AutograderBuddy;
import core.World;
import edu.princeton.cs.algs4.StdDraw;
import org.junit.jupiter.api.Test;
import tileengine.TERenderer;
import tileengine.TETile;
import tileengine.Tileset;
import utils.FileUtils;


import static com.google.common.truth.Truth.assertThat;


public class WorldGenTests {
    @Test
    public void basicTest() {
        // put different seeds here to test different worlds
        TETile[][] tiles = AutograderBuddy.getWorldFromInput("n1234567890123456789s");


        TERenderer ter = new TERenderer();
        ter.initialize(tiles.length, tiles[0].length);
        ter.renderFrame(tiles);
        StdDraw.pause(5000); // pause for 5 seconds so you can see the output
    }


    @Test
    public void basicPrintTest() {
        // put different seeds here to test different worlds
        TETile[][] tiles = AutograderBuddy.getWorldFromInput("n2s");
        for (int i = 0; i < tiles.length; i++) {
            for (int j = 0; j < tiles[0].length; j++) {
                System.out.print(tiles[i][j].character());
            }
            System.out.println();
        }
    }


    @Test
    public void basicInteractivityTest() {
        // write a test that uses an input like "n123swasdwasd"
    }


    @Test
    public void basicSaveTest() {
        // write a test that calls getWorldFromInput twice, with "n123swasd:q" and with "lwasd"
        World world = new World(4830569748212109509L, 1);
        TETile[][] tiles = world.generateWorld();
        world.saveWorld();
        String savedBoard = FileUtils.readFile("src/save.txt");
        String board = "";
        tiles = world.rotateWorld(tiles);
        for (int i = 0; i < tiles.length; i++) {
            for (int j = 0; j < tiles[0].length; j++) {
                board += tiles[i][j].character();
            }
            board += "\n";
        }
        assertThat(savedBoard).isEqualTo(board);
    }
}
