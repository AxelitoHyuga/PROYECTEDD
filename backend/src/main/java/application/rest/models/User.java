package application.rest.models;

public class User {
    private String userId;
    private String email;
    private String username;
    private String token;
    private String image;

    public User(String userId, String email, String username, String token, String image) {
        this.userId = userId;
        this.email = email;
        this.username = username;
        this.token = token;
        this.image = image;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
