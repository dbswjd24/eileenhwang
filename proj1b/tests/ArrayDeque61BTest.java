import org.junit.jupiter.api.Test;
import static com.google.common.truth.Truth.assertThat;
import java.util.List;

public class ArrayDeque61BTest {

    private static final int FIRST_ITEM = 10;
    private static final int SECOND_ITEM = 20;
    private static final int THIRD_ITEM = 30;
    private static final int RESIZE_TRIGGER = 9;

    @Test
    public void testAddFirstAndRemoveFirst() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        deque.addFirst(FIRST_ITEM);
        deque.addFirst(SECOND_ITEM);
        deque.addFirst(THIRD_ITEM);
        assertThat(deque.removeFirst()).isEqualTo(THIRD_ITEM);
        assertThat(deque.removeFirst()).isEqualTo(SECOND_ITEM);
        assertThat(deque.removeFirst()).isEqualTo(FIRST_ITEM);
    }

    @Test
    public void testAddLastAndRemoveLast() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        deque.addLast(FIRST_ITEM);
        deque.addLast(SECOND_ITEM);
        deque.addLast(THIRD_ITEM);
        assertThat(deque.removeLast()).isEqualTo(THIRD_ITEM);
        assertThat(deque.removeLast()).isEqualTo(SECOND_ITEM);
        assertThat(deque.removeLast()).isEqualTo(FIRST_ITEM);
    }

    @Test
    public void testAddFirstTriggerResize() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        for (int i = 0; i < RESIZE_TRIGGER; i++) {
            deque.addFirst(i);
        }
        assertThat(deque.size()).isEqualTo(RESIZE_TRIGGER);
        assertThat(deque.get(0)).isEqualTo(RESIZE_TRIGGER - 1);
    }

    @Test
    public void testAddLastTriggerResize() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        for (int i = 0; i < RESIZE_TRIGGER; i++) {
            deque.addLast(i);
        }
        assertThat(deque.size()).isEqualTo(RESIZE_TRIGGER);
        assertThat(deque.get(RESIZE_TRIGGER - 1)).isEqualTo(RESIZE_TRIGGER - 1);
    }

    @Test
    public void testRemoveFirstTriggerResize() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        for (int i = 0; i < RESIZE_TRIGGER; i++) {
            deque.addLast(i);
        }
        for (int i = 0; i < RESIZE_TRIGGER - 1; i++) {
            deque.removeFirst();
        }
        assertThat(deque.size()).isEqualTo(1);
        assertThat(deque.get(0)).isEqualTo(RESIZE_TRIGGER - 1);
    }

    @Test
    public void testRemoveLastTriggerResize() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        for (int i = 0; i < RESIZE_TRIGGER; i++) {
            deque.addLast(i);
        }
        for (int i = 0; i < RESIZE_TRIGGER - 1; i++) {
            deque.removeLast();
        }
        assertThat(deque.size()).isEqualTo(1);
        assertThat(deque.get(0)).isEqualTo(0);
    }

    @Test
    public void testGetOutOfBounds() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        deque.addLast(FIRST_ITEM);
        deque.addLast(SECOND_ITEM);
        deque.addLast(THIRD_ITEM);
        assertThat(deque.get(3)).isNull();
        assertThat(deque.get(-1)).isNull();
    }

    @Test
    public void testSize() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        assertThat(deque.size()).isEqualTo(0);
        deque.addFirst(FIRST_ITEM);
        deque.addLast(SECOND_ITEM);
        assertThat(deque.size()).isEqualTo(2);
        deque.removeFirst();
        assertThat(deque.size()).isEqualTo(1);
        deque.removeLast();
        assertThat(deque.size()).isEqualTo(0);
    }

    @Test
    public void testIsEmpty() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        assertThat(deque.isEmpty()).isTrue();
        deque.addFirst(FIRST_ITEM);
        assertThat(deque.isEmpty()).isFalse();
        deque.removeFirst();
        assertThat(deque.isEmpty()).isTrue();
    }

    @Test
    public void testToListEmpty() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        List<Integer> list = deque.toList();
        assertThat(list).isEmpty();
    }

    @Test
    public void testToListNonEmpty() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        deque.addLast(FIRST_ITEM);
        deque.addLast(SECOND_ITEM);
        deque.addLast(THIRD_ITEM);
        List<Integer> list = deque.toList();
        assertThat(list).containsExactly(FIRST_ITEM, SECOND_ITEM, THIRD_ITEM).inOrder();
    }

    @Test
    public void testResizeUpAndDown() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        for (int i = 0; i < RESIZE_TRIGGER; i++) {
            deque.addLast(i);
        }
        assertThat(deque.size()).isEqualTo(RESIZE_TRIGGER);
        for (int i = 0; i < RESIZE_TRIGGER - 1; i++) {
            deque.removeLast();
        }
        assertThat(deque.size()).isEqualTo(1);
    }

    @Test
    public void testAddAfterRemoveToEmpty() {
        ArrayDeque61B<Integer> deque = new ArrayDeque61B<>();
        deque.addFirst(FIRST_ITEM);
        deque.addLast(SECOND_ITEM);
        deque.removeFirst();
        deque.removeLast();
        deque.addFirst(THIRD_ITEM);
        assertThat(deque.size()).isEqualTo(1);
        assertThat(deque.get(0)).isEqualTo(THIRD_ITEM);
        deque.removeFirst();
        deque.addLast(SECOND_ITEM);
        assertThat(deque.size()).isEqualTo(1);
        assertThat(deque.get(0)).isEqualTo(SECOND_ITEM);
    }
}
