package application.rest.controllers;

import application.db.documents.Board;
import application.db.documents.Task;
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
public class TaskController {

    @Autowired
    MongoTemplate template;

    @PostMapping("/board/{id}/task")
    public ResponseEntity createTask(@RequestBody Task body, @PathVariable String id, @NotNull @RequestHeader("Authorization") String authorizationHeader) {

        try {

            DecodedJWT jwt = Auth.getDecodedJWT(authorizationHeader);
            Optional<Board> optionalBoard = Optional.ofNullable(template.findById(new ObjectId(id), Board.class));

            if (optionalBoard.isPresent()) {
                body.setCreationDate(new Date());
                body.setModificationDate(new Date());

                Task task = template.insert(body);
                Board board = optionalBoard.get();

                board.getTasks().add(task);
                template.save(board);

                return ResponseEntity.status(201).body(task);
            } else {
                return ResponseEntity.status(404).body("The requested board was not found !!");
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
