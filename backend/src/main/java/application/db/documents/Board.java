package application.db.documents;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Document(collection = "Boards")
public class Board {
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
    private String name;
    @Field
    private List<Member> members;

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

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
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

    public String toString() {
        String result = "{\"id\":\"" + id + "\", \"creationDate\":\"" + creationDate + "\", \"createdBy\":\""
                + createdBy.toString() + "\", \"modificationDate\":\""
                + modificationDate + "\", \"modifiedBy\":\"" + modifiedBy.toString() + "\", \"name\":\"" + name
                + "\", \"members\":[";
        Iterator<Member> i = this.members.iterator();
        while (i.hasNext()) {
            Member element = i.next();
            result += "{\"userId\":\"" + element.getUser().getId().toString() + "\", \"roles\":\"" + element.getRoles().toString()
                    + "\"}";
        }
        result += "]}";
        return result;
    }

}
