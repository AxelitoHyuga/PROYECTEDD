package application.db.documents;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Date;
import java.util.List;

@Document(collection = "Tasks")
public class Task {
    @Id
    @MongoId
    private ObjectId id;
    @Field
    private Date creationDate;
    @DocumentReference(collection = "Users")
    @Field
    private User createdBy;
    @Field
    private Date modificationDate;
    @DocumentReference(collection = "Users")
    @Field
    private User modifiedBy;
    @Field
    private String title;
    @Field
    private String description;
    @Field
    @DocumentReference(collection = "Attachments")
    private List<Attachment> attachments;
    @Field
    private List<String> responsible;
    @Field
    private int status;
    @DocumentReference(collection = "Boards")
    @Field
    private Board boardId;

    public Task() {
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Date getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
    }

    public User getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(User modifiedBy) {
        this.modifiedBy = modifiedBy;
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

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public List<String> getResponsible() {
        return responsible;
    }

    public void setResponsible(List<String> responsible) {
        this.responsible = responsible;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Board getBoardId() {
        return boardId;
    }

    public void setBoardId(Board boardId) {
        this.boardId = boardId;
    }

    public String toString() {
        String result = "{\"id\":\"" + id + "\", \"creationDate\":\"" + creationDate + "\", \"createdBy\":\""
                + createdBy.toString() + "\", \"modificationDate\":\""
                + modificationDate + "\", \"modifiedBy\":\"" + modifiedBy.toString() + "\", \"title\":\"" + title
                + "\", \"description\":\"" + description + "\", \"status\":"
                + status + ", \"boardId\":" + boardId.toString();
        return result;
    }
}
