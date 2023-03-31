package rest.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import rest.db.documents.User;
import rest.db.repositories.UserRepository;
import rest.tools.PasswordEncryption;

import java.security.NoSuchAlgorithmException;
import java.util.Date;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserSessionController {

    @Autowired
    UserRepository repo;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody User userData) {
        ResponseEntity response = null;

        try {
            // Encriptar contraseña
            byte[] salt = PasswordEncryption.generateSalt();
            String password = PasswordEncryption.hashPassword(userData.getPassword(), salt);
            userData.setPassword(password);
            userData.setSalt(salt);

            // Inserta un nuevo documento en Users collection
            User newUser = repo.insert(userData);
            response = ResponseEntity.ok("Tu cuenta ha sido registrada con exito !!");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace(System.out);
            response = ResponseEntity.status(422).build();
        }

        return response;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User userData) {
        ResponseEntity response = null;
        boolean userVerified = false;
        String jwt = null;

        /* Datos de la petición */
        String reqUsername = userData.getUsername().toLowerCase();
        String reqPassword = userData.getPassword();

        User user = repo.findByUsernameOrEmail(reqUsername);

        try {

            if (user != null) {
                String password = user.getPassword();
                byte[] salt = user.getSalt();
                reqPassword = PasswordEncryption.hashPassword(reqPassword, salt);

                if (password.equals(reqPassword)) {
                    /* Genera un JSON Web Token */
                    long nowMs = System.currentTimeMillis();
                    Date now = new Date(nowMs);
                    long expMs = nowMs + 3600000;
                    Date exp = new Date(expMs);

                    Algorithm algorithm = Algorithm.HMAC256("snknyorin0000");
                    jwt = JWT.create()
                            .withIssuer("rest/login")
                            .withSubject("login")
                            .withIssuedAt(now)
                            .withExpiresAt(exp)
                            .withClaim("userId", user.getId())
                            .withClaim("username", user.getUsername())
                            .sign(algorithm);

                    userVerified = true;
                }
            }

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace(System.out);
            response = ResponseEntity.status(422).build();
        } finally {
            /* Respuestas */
            if (response == null) {
                if (userVerified) {
                    User resUser = user.buildForResponse(jwt);
                    response = ResponseEntity.ok(resUser);
                } else {
                    response = ResponseEntity.status(401)
                            .body("Nombre de usuario o contraseña incorrectos !!");
                }
            }
        }

        return response;
    }

}
