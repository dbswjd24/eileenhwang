import org.junit.jupiter.api.Test;
import static com.google.common.truth.Truth.assertThat;
import java.util.Comparator;

public class MaxArrayDeque61BTest {

    private static final int VALUE_ONE = 10;
    private static final int VALUE_TWO = 20;
    private static final int VALUE_THREE = 15;
    private static final int VALUE_FOUR = 30;

    @Test
    public void testMaxWithIntegerComparator() {
        Comparator<Integer> integerComparator = new Comparator<>() {
            @Override
            public int compare(Integer a, Integer b) {
                return a - b;
            }
        };

        MaxArrayDeque61B<Integer> deque = new MaxArrayDeque61B<>(integerComparator);
        deque.addLast(VALUE_ONE); // Replacing '10'
        deque.addLast(VALUE_TWO); // Replacing '20'
        deque.addLast(VALUE_ONE - 7); // Simulating '3' in terms of constants
        assertThat(deque.max()).isEqualTo(VALUE_TWO); // Replacing '20'
    }

    @Test
    public void testMaxWithStringComparator() {
        Comparator<String> stringComparator = new Comparator<>() {
            @Override
            public int compare(String s1, String s2) {
                return s1.length() - s2.length(); // Compare by string length
            }
        };

        MaxArrayDeque61B<String> deque = new MaxArrayDeque61B<>(stringComparator);
        deque.addLast("a");
        deque.addLast("abcd");
        deque.addLast("abc");
        assertThat(deque.max()).isEqualTo("abcd");
    }

    @Test
    public void testMaxEmptyDeque() {
        Comparator<Integer> integerComparator = new Comparator<>() {
            @Override
            public int compare(Integer a, Integer b) {
                return a - b;
            }
        };

        MaxArrayDeque61B<Integer> deque = new MaxArrayDeque61B<>(integerComparator);
        assertThat(deque.max()).isNull();
    }

    @Test
    public void testMaxNonEmptyDeque() {
        Comparator<Integer> integerComparator = new Comparator<>() {
            @Override
            public int compare(Integer a, Integer b) {
                return a - b;
            }
        };

        MaxArrayDeque61B<Integer> deque = new MaxArrayDeque61B<>(integerComparator);
        deque.addLast(VALUE_THREE); // Replacing '15'
        deque.addLast(VALUE_FOUR);  // Replacing '30'
        assertThat(deque.max()).isEqualTo(VALUE_FOUR);  // Replacing '30'
    }

    @Test
    public void testMaxWithCustomComparator() {
        Comparator<Integer> reverseComparator = new Comparator<>() {
            @Override
            public int compare(Integer a, Integer b) {
                return b - a; // Reverse order
            }
        };

        MaxArrayDeque61B<Integer> deque = new MaxArrayDeque61B<>(reverseComparator);
        deque.addLast(1);
        deque.addLast(2);
        deque.addLast(3);

        // Since the comparator is reversed, it should return 1 as the max
        assertThat(deque.max()).isEqualTo(1);
    }
}
