import jh61b.utils.Reflection;
import org.junit.jupiter.api.Test;
import static com.google.common.truth.Truth.assertThat;
import deque.*;

public class LinkedListDeque61BTest {

    // Existing tests...

    @Test
    public void testRemoveFirstEmpty() {
        LinkedListDeque61B<Integer> deque = new LinkedListDeque61B<>();
        Integer result = deque.removeFirst();
        assertThat(result).isNull();
    }

    @Test
    public void testRemoveLastEmpty() {
        LinkedListDeque61B<Integer> deque = new LinkedListDeque61B<>();
        Integer result = deque.removeLast();
        assertThat(result).isNull();
    }

    @Test
    public void testAddRemove() {
        LinkedListDeque61B<String> deque = new LinkedListDeque61B<>();
        deque.addFirst("A");
        deque.addLast("B");
        deque.addLast("C");
        String first = deque.removeFirst();
        String second = deque.removeFirst();
        String third = deque.removeFirst();
        assertThat(first).isEqualTo("A");
        assertThat(second).isEqualTo("B");
        assertThat(third).isEqualTo("C");
        assertThat(deque.isEmpty()).isTrue();
    }

    @Test
    public void testAddAfterRemoveToEmpty() {
        LinkedListDeque61B<String> deque = new LinkedListDeque61B<>();
        deque.addFirst("A");
        deque.removeFirst();
        assertThat(deque.isEmpty()).isTrue();
        deque.addFirst("B");
        assertThat(deque.toList()).containsExactly("B").inOrder();
        deque.removeFirst();
        assertThat(deque.isEmpty()).isTrue();
        deque.addLast("C");
        assertThat(deque.toList()).containsExactly("C").inOrder();
    }

    @Test
    public void testRemoveVarious() {
        LinkedListDeque61B<Integer> deque = new LinkedListDeque61B<>();
        deque.addLast(1);
        deque.addLast(2);
        deque.addLast(3);
        assertThat(deque.removeFirst()).isEqualTo(1);
        assertThat(deque.removeFirst()).isEqualTo(2);
        assertThat(deque.removeFirst()).isEqualTo(3);
        assertThat(deque.removeFirst()).isNull();
        deque.addLast(4);
        assertThat(deque.removeLast()).isEqualTo(4);
        assertThat(deque.removeLast()).isNull();
    }

    @Test
    public void testGetOperations() {
        LinkedListDeque61B<Integer> deque = new LinkedListDeque61B<>();
        deque.addFirst(10);
        deque.addLast(20);
        deque.addLast(30);
        assertThat(deque.get(0)).isEqualTo(10);
        assertThat(deque.get(1)).isEqualTo(20);
        assertThat(deque.get(2)).isEqualTo(30);
        assertThat(deque.get(3)).isNull();
        assertThat(deque.get(-1)).isNull();
        assertThat(deque.getRecursive(0)).isEqualTo(10);
        assertThat(deque.getRecursive(1)).isEqualTo(20);
        assertThat(deque.getRecursive(2)).isEqualTo(30);
        assertThat(deque.getRecursive(3)).isNull();
        assertThat(deque.getRecursive(-1)).isNull();
    }

    @Test
    public void testIsEmpty() {
        LinkedListDeque61B<Integer> deque = new LinkedListDeque61B<>();
        assertThat(deque.isEmpty()).isTrue();
        deque.addFirst(1);
        assertThat(deque.isEmpty()).isFalse();
    }

    @Test
    public void testToList() {
        LinkedListDeque61B<Integer> deque = new LinkedListDeque61B<>();
        assertThat(deque.toList()).isEmpty();
        deque.addFirst(5);
        deque.addLast(10);
        assertThat(deque.toList()).containsExactly(5, 10).inOrder();
    }

    @Test
    public void testRemoveLastToOne() {
        LinkedListDeque61B<Integer> deque = new LinkedListDeque61B<>();
        deque.addLast(1);
        deque.addLast(2);
        assertThat(deque.removeLast()).isEqualTo(2);
        assertThat(deque.size()).isEqualTo(1);
        assertThat(deque.removeLast()).isEqualTo(1);
        assertThat(deque.isEmpty()).isTrue();
    }
}
