package core;

public class Coins {
    private int x;
    private int y;

    public Coins(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    @Override
    public boolean equals(Object obj) {
        assert obj instanceof Coins;
        Coins c = (Coins) obj;
        return c.x == this.x && c.y == this.y;
    }
}
