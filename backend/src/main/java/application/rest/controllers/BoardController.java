package application.rest.controllers;

import application.db.documents.Board;
import application.db.documents.Member;
import application.db.documents.User;
import application.utils.Auth;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BoardController {

    @Autowired
    MongoTemplate template;

    @PostMapping("/user/@me/board")
    public ResponseEntity createBoard(@RequestBody Board body, @NotNull @RequestHeader("Authorization") String authorizationHeader) {

        try {
            DecodedJWT jwt = Auth.getDecodedJWT(authorizationHeader);
            Optional<User> optionalUser = Optional.ofNullable(template.findById(new ObjectId(jwt.getClaim("userId").asString()), User.class));

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                Member member = new Member();

                member.setUser(user);
                member.setRoles(List.of("Administrator"));

                Member memberSaved = template.insert(member);

                body.setCreationDate(new Date());
                body.setModificationDate(new Date());
                body.setModifiedBy(user);
                body.setMembers(List.of(memberSaved));
                body.setMemberRoles(List.of("Administrator"));

                Board board = template.insert(body);
                application.rest.models.Board boardResponse = new application.rest.models.Board(
                        board.getId().toString(),
                        board.getName(),
                        board.getTasks()
                );

                return ResponseEntity.status(201).body(boardResponse);
            } else {
                return ResponseEntity.status(404).body("The requested user was not found !!");
            }

        } catch (Exception e) {
            e.printStackTrace();
            if (JWTVerificationException.class.isInstance(e)) {
                return ResponseEntity.status(401).body(e.getMessage());
            }

            return ResponseEntity.status(403).body("Forbidden ");
        }

    }

}
