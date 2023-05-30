package application.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.http.ResponseEntity;

import java.time.Instant;
import java.util.Date;

public class Auth {
    private static final String SECRET = "v1kanaov1";

    public static String generateToken(String userId, String username) {
        Date exp = new Date(System.currentTimeMillis() + 86400000);
        Algorithm algorithm = Algorithm.HMAC256(SECRET.getBytes());

        return JWT.create()
            .withIssuer("auth0")
            .withSubject("session")
            .withIssuedAt(Instant.now())
            .withExpiresAt(exp)
            .withClaim("userId", userId)
            .withClaim("username", username)
            .sign(algorithm);
    }

    public static DecodedJWT getDecodedJWT(String token) throws RuntimeException {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new RuntimeException("Code: 401 - Unauthorized Invalid Token !");
        }

        DecodedJWT jwt = JWT.require(Algorithm.HMAC256(SECRET.getBytes()))
                .withIssuer("auth0")
                .acceptExpiresAt(4)
                .build()
                .verify(token.substring(7));

        return jwt;
    }

    public static boolean tokenIsValid(String token) {
        try {
            JWT.require(Algorithm.HMAC256(SECRET.getBytes()))
                    .withIssuer("auth0")
                    .acceptExpiresAt(4)
                    .build()
                    .verify(token);

            return true;
        } catch(Exception e) {
            return false;
        }
    }
}
