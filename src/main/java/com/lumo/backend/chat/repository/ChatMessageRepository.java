package com.lumo.backend.chat.repository;

import com.lumo.backend.chat.entity.ChatMessage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("SELECT m FROM ChatMessage m WHERE " +
           "(m.senderId = :user1 AND m.receiverId = :user2) OR " +
           "(m.senderId = :user2 AND m.receiverId = :user1) " +
           "ORDER BY m.timestamp ASC")
    List<ChatMessage> findChatHistory(@Param("user1") String user1, @Param("user2") String user2);

    @Query("SELECT m FROM ChatMessage m WHERE m.id IN (" +
           "  SELECT MAX(msg.id) FROM ChatMessage msg WHERE msg.senderId = :userId OR msg.receiverId = :userId " +
           "  GROUP BY CASE WHEN msg.senderId = :userId THEN msg.receiverId ELSE msg.senderId END" +
           ") ORDER BY m.timestamp DESC")
    List<ChatMessage> findLatestMessagesForUser(@Param("userId") String userId);
}
