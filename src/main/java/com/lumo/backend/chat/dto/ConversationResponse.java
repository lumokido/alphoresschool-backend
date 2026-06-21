package com.lumo.backend.chat.dto;

import java.time.LocalDateTime;

public record ConversationResponse(
    String participantId,
    String participantName,
    String lastMessage,
    LocalDateTime lastActive
) {
}
