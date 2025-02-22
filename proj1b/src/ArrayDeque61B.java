import java.util.ArrayList;
import java.util.Iterator;  // Import this to resolve the symbol
import java.util.List;

public class ArrayDeque61B<T> implements Deque61B<T> {
    private T[] items;
    private int size;
    private int front;
    private int back;

    public ArrayDeque61B() {
        items = (T[]) new Object[8];  // The backing array, must be cast to T[]
        size = 0;
        front = 0;
        back = 0;
    }

    @Override
    public void addFirst(T item) {
        if (size == items.length) {
            resize(items.length * 2);
        }
        front = (front - 1 + items.length) % items.length;
        items[front] = item;
        size++;
    }

    @Override
    public void addLast(T item) {
        if (size == items.length) {
            resize(items.length * 2);
        }
        items[back] = item;
        back = (back + 1) % items.length;
        size++;
    }

    @Override
    public boolean isEmpty() {
        return size == 0;
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public T removeFirst() {
        if (isEmpty()) {
            return null;
        }
        T item = items[front];
        items[front] = null;
        front = (front + 1) % items.length;
        size--;
        if (size > 0 && size == items.length / 4) {
            resize(items.length / 2);
        }
        return item;
    }

    @Override
    public T removeLast() {
        if (isEmpty()) {
            return null;
        }
        back = (back - 1 + items.length) % items.length;
        T item = items[back];
        items[back] = null;
        size--;
        if (size > 0 && size == items.length / 4) {
            resize(items.length / 2);
        }
        return item;
    }

    @Override
    public T get(int index) {
        if (index < 0 || index >= size) {
            return null;
        }
        return items[(front + index) % items.length];
    }

    @Override
    public T getRecursive(int index) {
        // Unsupported for array-based implementation
        throw new UnsupportedOperationException("getRecursive is not supported in ArrayDeque61B.");
    }

    @Override
    public List<T> toList() {
        List<T> list = new ArrayList<>(size);
        for (int i = 0; i < size; i++) {
            list.add(items[(front + i) % items.length]);
        }
        return list;
    }

    private void resize(int capacity) {
        T[] newItems = (T[]) new Object[capacity];
        for (int i = 0; i < size; i++) {
            newItems[i] = items[(front + i) % items.length];
        }
        items = newItems;
        front = 0;
        back = size;
    }

    @Override
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            private int currentIndex = front;
            private int count = 0;

            @Override
            public boolean hasNext() {
                return count < size;
            }

            @Override
            public T next() {
                T item = items[currentIndex];
                currentIndex = (currentIndex + 1) % items.length;
                count++;
                return item;
            }
        };
    }

    @Override
    public boolean equals(Object o) {
        if (o == this) {
            return true;
        }
        if (!(o instanceof Deque61B)) {
            return false;
        }
        Deque61B<T> other = (Deque61B<T>) o;
        if (this.size() != other.size()) {
            return false;
        }
        for (int i = 0; i < this.size(); i++) {
            if (!this.get(i).equals(other.get(i))) {
                return false;
            }
        }
        return true;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < size; i++) {
            sb.append(get(i));
            if (i < size - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }
}
