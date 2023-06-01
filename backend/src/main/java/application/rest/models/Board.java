package application.rest.models;

public class Board {
    private String boardId;
    private String name;

    public Board(String boardId, String name) {
        this.boardId = boardId;
        this.name = name;
    }

    public String getBoardId() {
        return boardId;
    }

    public void setBoardId(String boardId) {
        this.boardId = boardId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
