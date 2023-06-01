package application.rest.controllers;

import application.db.documents.Board;
import application.db.documents.Member;
import application.db.documents.Task;
import application.db.documents.User;
import application.utils.Auth;
import application.utils.LinkedList;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.bson.types.ObjectId;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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

    @PostMapping("/boards")
    public ResponseEntity createBoard(@RequestBody Board body,
            @NotNull @RequestHeader("Authorization") String authorizationHeader) {

        try {
            DecodedJWT jwt = Auth.getDecodedJWT(authorizationHeader);
            Optional<User> optionalUser = Optional
                    .ofNullable(template.findById(new ObjectId(jwt.getClaim("userId").asString()), User.class));

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                Member member = new Member();
                member.setUser(user);
                member.setRoles(List.of("Administrator"));

                body.setCreationDate(new Date());
                body.setCreatedBy(user);
                body.setModificationDate(new Date());
                body.setModifiedBy(user);
                body.setMembers(List.of(member));

                Board board = template.insert(body);
                application.rest.models.Board boardResponse = new application.rest.models.Board(
                        board.getId().toString(),
                        board.getName());

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

    @GetMapping("/boards")
    public ResponseEntity getBoards(@NotNull @RequestHeader("Authorization") String authorizationHeader) {

        try {
            DecodedJWT jwt = Auth.getDecodedJWT(authorizationHeader);
            Optional<User> optionalUser = Optional
                    .ofNullable(template.findById(new ObjectId(jwt.getClaim("userId").asString()), User.class));

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                Query query = new Query();
                query.addCriteria(
                        new Criteria().orOperator(
                                Criteria.where("members.user.id").is(user.getId())));

                List<Board> results = template.find(query, Board.class);
                
                LinkedList<Board> boardResponse = new LinkedList<>();
                results.forEach((Board element) -> {
                    boardResponse.add(element);
                });

                return ResponseEntity.status(200).body(boardResponse.toJsonString());
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

    /**
     * * Tasks methods
     */

    @PostMapping("/boards/{id}/tasks")
    public ResponseEntity createTask(@PathVariable("id") String boardId,@RequestBody Task body,
            @NotNull @RequestHeader("Authorization") String authorizationHeader) {

        try {
            DecodedJWT jwt = Auth.getDecodedJWT(authorizationHeader);
            Optional<User> optionalUser = Optional
                    .ofNullable(template.findById(new ObjectId(jwt.getClaim("userId").asString()), User.class));
            Optional<Board> optionalBoard = Optional
                    .ofNullable(template.findById(new ObjectId(boardId), Board.class));

            if (optionalUser.isPresent() && optionalBoard.isPresent()) {
                User user = optionalUser.get();
                Board board = optionalBoard.get();


                body.setCreationDate(new Date());
                body.setCreatedBy(user);
                body.setModificationDate(new Date());
                body.setModifiedBy(user);
                body.setBoardId(board);

                Task task = template.insert(body);
                application.rest.models.Task taskResponse = new application.rest.models.Task(
                        task.getId().toString(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getBoardId().toString(),
                        task.getStatus()
                        );

                return ResponseEntity.status(201).body(taskResponse);
            } else {
                return ResponseEntity.status(404).body("The requested info was not found !!");
            }

        } catch (Exception e) {
            e.printStackTrace();
            if (JWTVerificationException.class.isInstance(e)) {
                return ResponseEntity.status(401).body(e.getMessage());
            }

            return ResponseEntity.status(403).body("Forbidden ");
        }

    }

    @GetMapping("/boards/{id}/tasks")
    public ResponseEntity getTasksByBoardId(@PathVariable("id") String boardId, @NotNull @RequestHeader("Authorization") String authorizationHeader) {

        try {
            DecodedJWT jwt = Auth.getDecodedJWT(authorizationHeader);
            Optional<User> optionalUser = Optional
                    .ofNullable(template.findById(new ObjectId(jwt.getClaim("userId").asString()), User.class));

            if (optionalUser.isPresent()) {

                Query query = new Query();
                query.addCriteria(
                        new Criteria().orOperator(
                                Criteria.where("boardId").is(new ObjectId(boardId))));

                List<Task> results = template.find(query, Task.class);

                LinkedList<Task> taskResponse = new LinkedList<>();
                results.forEach((Task element) -> {
                    taskResponse.add(element);
                });

                return ResponseEntity.status(200).body(taskResponse.toJsonString());
            } else {
                return ResponseEntity.status(404).body("The requested info was not found !!");
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
