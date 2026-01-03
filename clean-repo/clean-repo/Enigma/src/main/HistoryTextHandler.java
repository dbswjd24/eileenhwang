package main;

import browser.NgordnetQuery;
import browser.NgordnetQueryHandler;
import ngrams.NGramMap;
import ngrams.TimeSeries;

import java.util.List;

/**
 * A handler that returns the history of word usage in text format.
 */
public class HistoryTextHandler extends NgordnetQueryHandler {

    private final NGramMap ngramMap;

    /**
     * Constructs a HistoryTextHandler with the given NGramMap.
     */
    public HistoryTextHandler(NGramMap map) {
        this.ngramMap = map;
    }

    /**
     * Handles a query by returning the historical data for the requested words.
     *
     * @param query An NgordnetQuery containing the query parameters.
     * @return A formatted string containing the historical data.
     */
    @Override
    public String handle(NgordnetQuery query) {
        List<String> words = query.words();
        int startYear = query.startYear();
        int endYear = query.endYear();

        StringBuilder result = new StringBuilder();
        for (String word : words) {
            TimeSeries wordHistory = ngramMap.weightHistory(word, startYear, endYear);
            result.append(word).append(": ").append(wordHistory.toString()).append("\n");
        }

        return result.toString();
    }
}
