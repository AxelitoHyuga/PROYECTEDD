package application.rest.models;

import application.db.documents.Task;

import java.util.List;

public class Board {
    private String boardId;
    private String name;
    private List<Task> tasks;

    public Board(String boardId, String name, List<Task> tasks) {
        this.boardId = boardId;
        this.name = name;
        this.tasks = tasks;
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

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
