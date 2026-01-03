package main;

import browser.NgordnetQuery;
import browser.NgordnetQueryHandler;
import ngrams.NGramMap;
import ngrams.TimeSeries;
import plotting.Plotter;
import org.knowm.xchart.XYChart;

import java.util.ArrayList;
import java.util.List;

/**
 * A handler for generating a plot of word usage history.
 */
public class HistoryHandler extends NgordnetQueryHandler {

    private final NGramMap ngramMap;

    /**
     * Constructs a HistoryHandler with the given NGramMap.
     */
    public HistoryHandler(NGramMap map) {
        this.ngramMap = map;
    }

    @Override
    public String handle(NgordnetQuery query) {
        List<String> words = query.words();
        int startYear = query.startYear();
        int endYear = query.endYear();

        List<TimeSeries> timeSeriesList = new ArrayList<>();
        for (String word : words) {
            TimeSeries ts = ngramMap.weightHistory(word, startYear, endYear);
            timeSeriesList.add(ts);
        }

        XYChart chart = Plotter.generateTimeSeriesChart(words, timeSeriesList);
        return Plotter.encodeChartAsString(chart);
    }
}
