package application.rest.controllers;

import application.utils.Auth;
import application.utils.PasswordEncryption;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import application.db.documents.User;

import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    MongoTemplate template;

    @PostMapping("/users")
    public ResponseEntity register(@RequestBody User userData) {

        try {
            /* Encriptar contraseña */
            byte[] salt = PasswordEncryption.generateSalt();
            String password = PasswordEncryption.hashPassword(userData.getPassword(), salt);
            userData.setPassword(password);
            userData.setSalt(salt);

            /* Inserta un nuevo documento en Users collection */
            template.insert(userData);

            return ResponseEntity.ok("You have successfully registered!");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace(System.out);
            return ResponseEntity.status(422).build();
        }

    }

//    @PatchMapping("/user/@me")
//    public ResponseEntity editUser(@RequestBody application.rest.models.User userData, @NotNull @RequestHeader("Authorization") String authorizationHeader) {
//
//        try {
//            DecodedJWT jwt = Auth.getDecodedJWT(authorizationHeader);
//            Optional<User> optionalUser = repo.findById(new ObjectId(jwt.getClaim("userId").asString()));
//
//            if (optionalUser.isPresent()) {
//                User user = optionalUser.get();
//                user.setUsername(userData.getUsername());
//
//                repo.save(user);
//            } else {
//                return ResponseEntity.status(404).body("The requested user was not found !!");
//            }
//
//        } catch (Exception e) {
//            if (JWTVerificationException.class.isInstance(e)) {
//                return ResponseEntity.status(401).body(e.getMessage());
//            }
//
//            return ResponseEntity.status(403).body("Forbidden ");
//        }
//
//    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User userData) {
        /* Datos de la petición */
        String reqUsername = userData.getUsername().toLowerCase();
        String reqPassword = userData.getPassword();

        Query query = new Query();
        Criteria criteria = new Criteria();
        criteria.orOperator(
                Criteria.where("username").regex("^" + reqUsername + "$", "i"),
                Criteria.where("email").regex("^" + reqUsername + "$", "i")
        );
        query.addCriteria(criteria);
        User user = template.findOne(query, User.class);

        try {

            if (user != null) {
                String password = user.getPassword();
                byte[] salt = user.getSalt();
                reqPassword = PasswordEncryption.hashPassword(reqPassword, salt);

                if (password.equals(reqPassword)) {
                    /* Genera un JSON Web Token */
                    String jwt = Auth.generateToken(user.getId().toString(), user.getUsername());

                    application.rest.models.User userResponse = new application.rest.models.User(
                            user.getId().toString(),
                            user.getEmail(),
                            user.getUsername(),
                            jwt,
                            user.getImage()
                    );
                    return ResponseEntity.ok(userResponse);
                }
            }

            return ResponseEntity.status(401)
                    .body("Nombre de usuario o contraseña incorrectos !!");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace(System.out);
            return ResponseEntity.status(422).build();
        }
    }

    @GetMapping("/login/{token}")
    public ResponseEntity loginWithToken(@PathVariable("token") String token) {

        if (Auth.tokenIsValid(token)) {
            DecodedJWT tokenData = Auth.getDecodedJWT(token);
            Claim userID = tokenData.getClaim("userId");
            ObjectId id = new ObjectId(userID.asString());
            Optional<User> user = Optional.ofNullable(template.findById(id, User.class));

            if (user.isPresent()) {
                return ResponseEntity.ok("");
            } else {
                return ResponseEntity.status(404).body("The requested user was not found !!");
            }
        } else {
            return ResponseEntity.status(403).body("Forbidden ");
        }

    }

}
