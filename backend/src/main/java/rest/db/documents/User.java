package rest.db.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "Users")
public class User {
    @Id
    @MongoId
    private String id;
    private String username;
    private String email;
    private String password;
    private byte[] salt;
    private String jwtoken;

    public User() {}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public byte[] getSalt() {
        return salt;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }

    public User buildForResponse(String jwtoken) {
        User user = new User();
        user.setUsername(this.username);
        user.setId(this.id);
        user.setJwtoken(jwtoken);

        return user;
    }

    public String getId() {
        return id;
    }

    private void setId(String id) {
        this.id = id;
    }

    public String getJwtoken() {
        return jwtoken;
    }

    private void setJwtoken(String jwtoken) {
        this.jwtoken = jwtoken;
    }
}
