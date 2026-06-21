package com.lumo.backend.chat.dto;

public record ChatMessageRequest(
    String receiverId,
    String content
) {
}
