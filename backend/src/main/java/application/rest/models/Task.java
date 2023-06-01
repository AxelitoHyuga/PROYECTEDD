package application.rest.models;

public class Task {
    private String taskId;
    private String title;
    private String description;
    private String boardId;
    private int status;

    public Task(String taskId, String title, String description, String boardId, int status) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.boardId = boardId;
        this.status = status;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBoardId() {
        return boardId;
    }

    public void setBoardId(String boardId) {
        this.boardId = boardId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

}
