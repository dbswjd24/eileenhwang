package ngrams;

import java.util.TreeMap;
import java.util.List;
import java.util.ArrayList;

/**
 * An object for mapping a year number (e.g. 1996) to numerical data. Provides
 * utility methods useful for data analysis.
 *
 * @author Josh Hug
 */
public class TimeSeries extends TreeMap<Integer, Double> {

    public static final int MIN_YEAR = 1400;
    public static final int MAX_YEAR = 2100;

    /** Constructs a new empty TimeSeries. */
    public TimeSeries() {
        super();
    }

    /** Creates a copy of TS. */
    public TimeSeries(TimeSeries ts) {
        super(ts);
    }

    /** Creates a copy of TS, but only between STARTYEAR and ENDYEAR, inclusive. */
    public TimeSeries(TimeSeries ts, int startYear, int endYear) {
        super();
        for (Integer year : ts.keySet()) {
            if (year >= startYear && year <= endYear) {
                this.put(year, ts.get(year));
            }
        }
    }

    /** Returns all years for this time series in ascending order. */
    public List<Integer> years() {
        List<Integer> yearsList = new ArrayList<>();
        for (Integer year : this.keySet()) {
            yearsList.add(year);
        }
        return yearsList;
    }

    /** Returns all data for this time series. Must correspond to the order of years(). */
    public List<Double> data() {
        List<Double> dataList = new ArrayList<>();
        for (Integer year : this.keySet()) {
            dataList.add(this.get(year));
        }
        return dataList;
    }

    /** Returns the year-wise sum of this TimeSeries with the given TS. */
    public TimeSeries plus(TimeSeries ts) {
        TimeSeries result = new TimeSeries();
        for (Integer year : this.keySet()) {
            result.put(year, this.get(year));
        }
        for (Integer year : ts.keySet()) {
            double newValue = result.getOrDefault(year, 0.0) + ts.get(year);
            result.put(year, newValue);
        }
        return result;
    }

    /** Returns the quotient of the values for each year divided by TS's values. */
    public TimeSeries dividedBy(TimeSeries ts) {
        TimeSeries result = new TimeSeries();
        for (Integer year : this.keySet()) {
            if (!ts.containsKey(year)) {
                throw new IllegalArgumentException("Year " + year + " missing in input TimeSeries.");
            }
            result.put(year, this.get(year) / ts.get(year));
        }
        return result;
    }
}
