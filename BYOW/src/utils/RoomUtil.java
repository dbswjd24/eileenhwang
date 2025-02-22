package utils;


import core.World;


import java.util.List;


public class RoomUtil {


    public static enum Position {
        UPPER_LEFT, // L-shape
        UPPER_RIGHT, // L -shape
        LOWER_LEFT, // L -shape
        LOWER_RIGHT, // L -shape
        LEFT, // straight line
        RIGHT, // straight line
        TOP, // straight line
        BOTTOM // straight line
    }


    // return the relative position of room2 to room1
    public static Position findPositionOfRoom2FromRoom1(World.Room r1, World.Room r2) {
        if (r2.getY() >= r1.getY2() && r2.getX2() <= r1.getX()){
            return Position.UPPER_LEFT;
        } else if (r2.getX() >= r1.getX2() && r2.getY() >= r1.getY2()) {
            return Position.UPPER_RIGHT;
        } else if (r2.getX() >= r1.getX2() && r2.getY2() <= r1.getY()) {
            return Position.LOWER_RIGHT;
        } else if (r2.getX2() <= r1.getX() && r2.getY2() <= r1.getY()) {
            return Position.LOWER_LEFT;
        } else if (Math.max(r1.getX(), r2.getX()) < Math.min(r1.getX2(), r2.getX2())) {
            if (r2.getY() >= r1.getY2()) {
                return Position.TOP;
            } else {
                return Position.BOTTOM;
            }
        } else if (Math.max(r1.getY(), r2.getY()) < Math.min(r1.getY2(), r2.getY2())) {
            if (r2.getX2() <= r1.getX()) {
                return Position.LEFT;
            } else {
                return Position.RIGHT;
            }
        } else {
            throw new RuntimeException("no other condition");
        }
    }
}
