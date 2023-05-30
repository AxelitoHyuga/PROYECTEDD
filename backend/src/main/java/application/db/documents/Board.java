package application.db.documents;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Date;
import java.util.List;

@Document(collection = "Boards")
public class Board {
    @Id
    @MongoId
    private ObjectId id;
    @Field
    private Date creationDate;
    @Field
    private Date modificationDate;
    @DocumentReference(collection = "User")
    @Field
    private User modifiedBy;
    @Field
    private String name;
    @Field
    @DocumentReference(collection = "Members")
    private List<Member> members;
    @Field
    private List<String> memberRoles;
    @Field
    @DocumentReference(collection = "Tasks")
    private List<Task> tasks;

    public Board() {
    }

    public ObjectId getId() {
        return id;
    }

    public Board setId(ObjectId id) {
        this.id = id;
        return this;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public Board setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public Date getModificationDate() {
        return modificationDate;
    }

    public Board setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
        return this;
    }

    public User getModifiedBy() {
        return modifiedBy;
    }

    public Board setModifiedBy(User modifiedBy) {
        this.modifiedBy = modifiedBy;
        return this;
    }

    public String getName() {
        return name;
    }

    public Board setName(String name) {
        this.name = name;
        return this;
    }

    public List<Member> getMembers() {
        return members;
    }

    public Board setMembers(List<Member> members) {
        this.members = members;
        return this;
    }

    public List<String> getMemberRoles() {
        return memberRoles;
    }

    public Board setMemberRoles(List<String> memberRoles) {
        this.memberRoles = memberRoles;
        return this;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public Board setTasks(List<Task> tasks) {
        this.tasks = tasks;
        return this;
    }
}
