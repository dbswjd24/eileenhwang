import java.util.Comparator;

public class MaxArrayDeque61B<T> extends ArrayDeque61B<T> {
    private Comparator<T> comparator;

    public MaxArrayDeque61B(Comparator<T> comp) {
        this.comparator = comp;
    }

    public T max() {
        return max(this.comparator);
    }

    public T max(Comparator<T> comp) {
        if (size() == 0) {
            return null;
        }
        T maxItem = get(0);
        for (int i = 1; i < size(); i++) {
            if (comp.compare(get(i), maxItem) > 0) {
                maxItem = get(i);
            }
        }
        return maxItem;
    }
}
