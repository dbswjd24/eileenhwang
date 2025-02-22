package main;

import static utils.Utils.*;

import org.slf4j.LoggerFactory;
import browser.NgordnetServer;
import ngrams.NGramMap;

public class Main {
    static {
        LoggerFactory.getLogger(Main.class).info("\033[1;38mChanging text color to white");
    }

    public static void main(String[] args) {
        NGramMap ngm = new NGramMap(SHORT_WORDS_FILE, TOTAL_COUNTS_FILE);

        System.out.println("Testing data retrieval...");
        System.out.println("cat weight history: " + ngm.weightHistory("cat", 2006, 2007));
        System.out.println("airport weight history: " + ngm.weightHistory("airport", 2007, 2007));

        NgordnetServer hns = new NgordnetServer();
        hns.startUp();

        hns.register("historytext", new HistoryTextHandler(ngm));

        System.out.println("Finished server startup! Visit http://localhost:4567/ngordnet_2a.html");
    }
}
