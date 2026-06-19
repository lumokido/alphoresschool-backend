package com.lumo.backend.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final SecretKey adminSigningKey;
    private final SecretKey teacherSigningKey;
    private final SecretKey studentSigningKey;
    private final long adminExpirationMillis;
    private final long teacherExpirationMillis;
    private final long studentExpirationMillis;

    public JwtService(
            @Value("${app.jwt.secret}") String adminSecret,
            @Value("${app.jwt.teacher.secret}") String teacherSecret,
            @Value("${app.jwt.student.secret}") String studentSecret,
            @Value("${app.jwt.expiration-ms:3600000}") long adminExpirationMillis,
            @Value("${app.jwt.teacher.expiration-ms:3600000}") long teacherExpirationMillis,
            @Value("${app.jwt.student.expiration-ms:3600000}") long studentExpirationMillis) {
        this.adminSigningKey = Keys.hmacShaKeyFor(adminSecret.getBytes(StandardCharsets.UTF_8));
        this.teacherSigningKey = Keys.hmacShaKeyFor(teacherSecret.getBytes(StandardCharsets.UTF_8));
        this.studentSigningKey = Keys.hmacShaKeyFor(studentSecret.getBytes(StandardCharsets.UTF_8));
        this.adminExpirationMillis = adminExpirationMillis;
        this.teacherExpirationMillis = teacherExpirationMillis;
        this.studentExpirationMillis = studentExpirationMillis;
    }

    public String generateAdminToken(String subject) {
        return buildToken(adminSigningKey, subject, adminExpirationMillis);
    }

    public String generateTeacherToken(String subject) {
        return buildToken(teacherSigningKey, subject, teacherExpirationMillis);
    }

    public String generateStudentToken(String subject) {
        return buildToken(studentSigningKey, subject, studentExpirationMillis);
    }

    public String generateStudentRefreshToken(String subject) {
        return buildToken(studentSigningKey, subject, studentExpirationMillis * 24 * 7); // 7 days
    }

    public String extractAdminSubject(String token) {
        return parseSubject(adminSigningKey, token);
    }

    public String extractTeacherSubject(String token) {
        return parseSubject(teacherSigningKey, token);
    }

    public String extractStudentSubject(String token) {
        return parseSubject(studentSigningKey, token);
    }

    private static String buildToken(SecretKey signingKey, String subject, long expirationMillis) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(subject)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(expirationMillis)))
                .signWith(signingKey, Jwts.SIG.HS256)
                .compact();
    }

    private static String parseSubject(SecretKey signingKey, String token) {
        try {
            return Jwts.parser()
                    .verifyWith(signingKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
        } catch (JwtException | IllegalArgumentException ex) {
            return null;
        }
    }
}
