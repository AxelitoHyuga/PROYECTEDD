package rest.db.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import rest.db.documents.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    @Query("{$or:[{'username':{$regex:?0,$options:'i'}},{'email':{$regex:?0,$options:'i'}}]}")
    User findByUsernameOrEmail(String username);
}
