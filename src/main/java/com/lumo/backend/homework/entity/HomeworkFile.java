package com.lumo.backend.homework.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "homework_files", indexes = {
    @Index(name = "idx_homework_files_homework_id", columnList = "homework_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HomeworkFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "homework_id", nullable = false)
    private Long homeworkId;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;
}
