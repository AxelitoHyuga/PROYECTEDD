package application.rest.controllers;

import application.db.documents.Board;
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

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TaskController {

    @Autowired
    MongoTemplate template;

    @PutMapping("/tasks/{id}")
    public ResponseEntity updateTask(@PathVariable("id") String taskId,@RequestBody Task body,
            @NotNull @RequestHeader("Authorization") String authorizationHeader) {

        try {
            DecodedJWT jwt = Auth.getDecodedJWT(authorizationHeader);
            Optional<User> optionalUser = Optional
                    .ofNullable(template.findById(new ObjectId(jwt.getClaim("userId").asString()), User.class));
            Optional<Task> optionalTask = Optional
                    .ofNullable(template.findById(new ObjectId(taskId), Task.class));

            if (optionalUser.isPresent() && optionalTask.isPresent()) {
                User user = optionalUser.get();
                Task task = optionalTask.get();

                task.setModificationDate(new Date());
                task.setModifiedBy(user);
                task.setTitle(body.getTitle());
                task.setDescription(body.getDescription());
                task.setStatus(body.getStatus());
                template.save(task);

                application.rest.models.Task taskResponse = new application.rest.models.Task(
                        task.getId().toString(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getBoardId() != null ? task.getBoardId().toString() : "",
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

    @GetMapping("/tasks/{title}")
    public ResponseEntity searchTask(@PathVariable("title") String title, @NotNull @RequestHeader("Authorization") String authorizationHeader) {

        try {

            DecodedJWT jwt = Auth.getDecodedJWT(authorizationHeader);
            Optional<User> optionalUser = Optional
                    .ofNullable(template.findById(new ObjectId(jwt.getClaim("userId").asString()), User.class));

            List<Task> results = template.findAll(Task.class);

            LinkedList<Task> tasks = new LinkedList<>();
            results.forEach((Task element) -> {
                tasks.add(element);
            });

            Comparator<Task> comparator = new Comparator<Task>() {
                @Override
                public int compare(Task o1, Task o2) {
                    return o1.getTitle().toLowerCase().compareTo(o2.getTitle().toLowerCase());
                }
            };

            tasks.sort(comparator);

            Task task = tasks.binarySearch(new Task(title), comparator);

            if (optionalUser.isPresent() && task != null) {
                application.rest.models.Task taskResponse = new application.rest.models.Task(
                        task.getId().toString(),
                        task.getTitle(),
                        task.getDescription(),
                        task.getBoardId() != null ? task.getBoardId().toString() : "",
                        task.getStatus()
                );

                return ResponseEntity.status(200).body(taskResponse);
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

    // @PostMapping("/boards/{id}/tasks")
    // public ResponseEntity createTask(@RequestBody Task body, @PathVariable String id, @NotNull @RequestHeader("Authorization") String authorizationHeader) {

    //     try {

    //         DecodedJWT jwt = Auth.getDecodedJWT(authorizationHeader);
    //         Optional<Board> optionalBoard = Optional.ofNullable(template.findById(new ObjectId(id), Board.class));

    //         if (optionalBoard.isPresent()) {
    //             body.setCreationDate(new Date());
    //             body.setModificationDate(new Date());

    //             Task task = template.insert(body);
    //             Board board = optionalBoard.get();

    //             // board.getTasks().add(task);
    //             template.save(board);

    //             return ResponseEntity.status(201).body(task);
    //         } else {
    //             return ResponseEntity.status(404).body("The requested board was not found !!");
    //         }

    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         if (JWTVerificationException.class.isInstance(e)) {
    //             return ResponseEntity.status(401).body(e.getMessage());
    //         }

    //         return ResponseEntity.status(403).body("Forbidden ");
    //     }

    // }

}
