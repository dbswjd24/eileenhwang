package ngrams;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

/**
 * An object that provides utility methods for making queries on the
 * Google NGrams dataset (or a subset thereof).
 */
public class NGramMap {

    public static final int MIN_YEAR = 1400;
    public static final int MAX_YEAR = 2100;

    private final TimeSeries totalCounts;
    private final Map<String, TimeSeries> wordData;

    public NGramMap(String wordsFilename, String countsFilename) {
        totalCounts = new TimeSeries();
        wordData = new HashMap<>();

        try (Scanner wordsIn = new Scanner(new File(wordsFilename))) {
            while (wordsIn.hasNextLine()) {
                String[] parts = wordsIn.nextLine().split("\t");
                String word = parts[0];
                int year = Integer.parseInt(parts[1]);
                double count = Double.parseDouble(parts[2]);

                wordData.putIfAbsent(word, new TimeSeries());
                wordData.get(word).put(year, count);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        try (Scanner countsIn = new Scanner(new File(countsFilename))) {
            while (countsIn.hasNextLine()) {
                String[] parts = countsIn.nextLine().split(",");
                int year = Integer.parseInt(parts[0]);
                double count = Double.parseDouble(parts[1]);

                totalCounts.put(year, count);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    public TimeSeries countHistory(String word, int startYear, int endYear) {
        if (!wordData.containsKey(word)) {
            return new TimeSeries();
        }
        return new TimeSeries(wordData.get(word), startYear, endYear);
    }

    public TimeSeries countHistory(String word) {
        if (!wordData.containsKey(word)) {
            return new TimeSeries();
        }
        return new TimeSeries(wordData.get(word));
    }

    public TimeSeries totalCountHistory() {
        return new TimeSeries(totalCounts);
    }

    public TimeSeries weightHistory(String word) {
        return weightHistory(word, MIN_YEAR, MAX_YEAR);
    }

    public TimeSeries weightHistory(String word, int startYear, int endYear) {
        if (!wordData.containsKey(word)) {
            return new TimeSeries();
        }
        TimeSeries counts = countHistory(word, startYear, endYear);
        TimeSeries result = new TimeSeries();
        for (int year : counts.years()) {
            double total = totalCounts.get(year);
            result.put(year, counts.get(year) / total);
        }
        return result;
    }

    public TimeSeries summedWeightHistory(List<String> words) {
        return summedWeightHistory(words, MIN_YEAR, MAX_YEAR);
    }

    public TimeSeries summedWeightHistory(List<String> words, int startYear, int endYear) {
        TimeSeries result = new TimeSeries();
        for (String word : words) {
            if (wordData.containsKey(word)) {
                TimeSeries wordHistory = weightHistory(word, startYear, endYear);
                result = result.plus(wordHistory);
            }
        }
        return result;
    }
}
