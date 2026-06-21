package com.lumo.backend.timetable.entity;

import com.lumo.backend.classes.entity.SchoolClass;
import com.lumo.backend.classes.entity.Section;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "timetable")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private SchoolClass schoolClass;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;

    private String day; // Monday, Tuesday...
    private Integer period; // 1, 2, 3...
    private String subject;
    private Long teacherId;

    private String type = "PERIOD"; // e.g. PERIOD, LUNCH_BREAK, NORMAL_BREAK
    private LocalTime startTime;
    private LocalTime endTime;
}
