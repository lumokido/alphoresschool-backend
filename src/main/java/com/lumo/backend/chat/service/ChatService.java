package com.lumo.backend.chat.service;

import com.lumo.backend.chat.entity.ChatMessage;
import com.lumo.backend.chat.dto.ChatMessageRequest;
import com.lumo.backend.chat.dto.ConversationResponse;
import com.lumo.backend.chat.repository.ChatMessageRepository;
import com.lumo.backend.students.repository.StudentRepository;
import com.lumo.backend.teachers.repository.TeacherRepository;
import com.lumo.backend.security.JwtService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ChatService {

    private final ChatMessageRepository chatRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final JwtService jwtService;

    public ChatService(
            ChatMessageRepository chatRepository,
            StudentRepository studentRepository,
            TeacherRepository teacherRepository,
            JwtService jwtService) {
        this.chatRepository = chatRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.jwtService = jwtService;
    }

    public ChatMessage sendMessage(String tokenHeader, ChatMessageRequest request) {
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing token");
        }
        if (request.receiverId() == null || request.receiverId().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Receiver ID cannot be empty");
        }
        if (request.content() == null || request.content().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Message content cannot be empty");
        }

        String token = tokenHeader.substring(7).trim();
        String senderId;
        String senderRole;

        if (jwtService.extractTeacherSubject(token) != null) {
            senderId = jwtService.extractTeacherSubject(token);
            senderRole = "TEACHER";
        } else if (jwtService.extractStudentSubject(token) != null) {
            senderId = jwtService.extractStudentSubject(token);
            senderRole = "STUDENT";
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or unauthorized token");
        }

        String receiverRole;
        if (senderRole.equals("TEACHER")) {
            // Teacher is sending to Student/Parent -> verify student exists
            boolean studentExists = studentRepository.findByStudentId(request.receiverId()).isPresent();
            if (!studentExists) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Student/Parent not found: " + request.receiverId());
            }
            receiverRole = "STUDENT";
        } else {
            // Student/Parent is sending to Teacher -> verify teacher exists
            boolean teacherExists = teacherRepository.findByEmailId(request.receiverId()).isPresent();
            if (!teacherExists) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Teacher not found: " + request.receiverId());
            }
            receiverRole = "TEACHER";
        }

        ChatMessage message = new ChatMessage();
        message.setSenderId(senderId);
        message.setSenderRole(senderRole);
        message.setReceiverId(request.receiverId());
        message.setReceiverRole(receiverRole);
        message.setContent(request.content());
        message.setTimestamp(LocalDateTime.now());

        return chatRepository.save(message);
    }

    public List<ChatMessage> getChatHistory(String tokenHeader, String recipientId) {
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing token");
        }
        if (recipientId == null || recipientId.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Recipient ID cannot be empty");
        }

        String token = tokenHeader.substring(7).trim();
        String userId = jwtService.extractTeacherSubject(token) != null ? 
                jwtService.extractTeacherSubject(token) : jwtService.extractStudentSubject(token);
        
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or unauthorized token");
        }
        return chatRepository.findChatHistory(userId, recipientId);
    }

    public List<ConversationResponse> getConversations(String tokenHeader) {
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing token");
        }
        String token = tokenHeader.substring(7).trim();
        String userId = jwtService.extractTeacherSubject(token) != null ? 
                jwtService.extractTeacherSubject(token) : jwtService.extractStudentSubject(token);
        
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or unauthorized token");
        }

        List<ChatMessage> latestMessages = chatRepository.findLatestMessagesForUser(userId);
        List<ConversationResponse> responses = new ArrayList<>();

        for (ChatMessage msg : latestMessages) {
            String partnerId = msg.getSenderId().equals(userId) ? msg.getReceiverId() : msg.getSenderId();
            String partnerName = "User";

            if (partnerId.contains("@")) { // Teacher
                var teacher = teacherRepository.findByEmailId(partnerId);
                if (teacher.isPresent()) {
                    partnerName = teacher.get().getName();
                }
            } else { // Student
                var student = studentRepository.findByStudentId(partnerId);
                if (student.isPresent()) {
                    partnerName = student.get().getFirstName() + " " + student.get().getLastName() + " (Parent)";
                }
            }

            responses.add(new ConversationResponse(
                partnerId,
                partnerName,
                msg.getContent(),
                msg.getTimestamp()
            ));
        }

        return responses;
    }
}
