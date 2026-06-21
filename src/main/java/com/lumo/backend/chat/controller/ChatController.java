package com.lumo.backend.chat.controller;

import com.lumo.backend.chat.entity.ChatMessage;
import com.lumo.backend.chat.dto.ChatMessageRequest;
import com.lumo.backend.chat.dto.ConversationResponse;
import com.lumo.backend.chat.service.ChatService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/send")
    public ResponseEntity<ChatMessage> sendMessage(
            @RequestBody ChatMessageRequest request,
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(chatService.sendMessage(authHeader, request));
    }

    @GetMapping("/history/{recipientId:.+}")
    public ResponseEntity<List<ChatMessage>> getHistory(
            @PathVariable String recipientId,
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(chatService.getChatHistory(authHeader, recipientId));
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationResponse>> getConversations(
            @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(chatService.getConversations(authHeader));
    }
}
