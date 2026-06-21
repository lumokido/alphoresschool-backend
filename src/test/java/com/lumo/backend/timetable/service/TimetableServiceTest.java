package com.lumo.backend.timetable.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.lumo.backend.classes.entity.SchoolClass;
import com.lumo.backend.classes.entity.Section;
import com.lumo.backend.classes.repository.SchoolClassRepository;
import com.lumo.backend.classes.repository.SectionRepository;
import com.lumo.backend.timetable.dto.TimetableRequest;
import com.lumo.backend.timetable.entity.Timetable;
import com.lumo.backend.timetable.repository.TimetableRepository;
import com.lumo.backend.students.repository.StudentRepository;
import com.lumo.backend.security.JwtService;

import java.time.LocalTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class TimetableServiceTest {

    @Mock
    private TimetableRepository timetableRepository;
    @Mock
    private SchoolClassRepository classRepository;
    @Mock
    private SectionRepository sectionRepository;
    @Mock
    private StudentRepository studentRepository;
    @Mock
    private JwtService jwtService;

    @InjectMocks
    private TimetableService timetableService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveTimetableEntry() {
        TimetableRequest request = new TimetableRequest(
            1L, 2L, "Monday", 1, "Math", 10L, "PERIOD", LocalTime.of(8, 30), LocalTime.of(9, 30)
        );

        SchoolClass sc = new SchoolClass();
        sc.setId(1L);
        when(classRepository.findById(1L)).thenReturn(Optional.of(sc));

        Section section = new Section();
        section.setId(2L);
        when(sectionRepository.findById(2L)).thenReturn(Optional.of(section));

        when(timetableRepository.save(any(Timetable.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Timetable saved = timetableService.saveTimetableEntry(request);

        assertNotNull(saved);
        assertEquals(sc, saved.getSchoolClass());
        assertEquals(section, saved.getSection());
        assertEquals("Monday", saved.getDay());
        assertEquals(1, saved.getPeriod());
        assertEquals("Math", saved.getSubject());
        assertEquals(10L, saved.getTeacherId());
        assertEquals("PERIOD", saved.getType());
        assertEquals(LocalTime.of(8, 30), saved.getStartTime());
        assertEquals(LocalTime.of(9, 30), saved.getEndTime());
    }

    @Test
    void testSaveTimetableEntryWithBreakAndNoSection() {
        TimetableRequest request = new TimetableRequest(
            1L, null, "Monday", 4, null, null, "LUNCH_BREAK", LocalTime.of(12, 0), LocalTime.of(13, 0)
        );

        SchoolClass sc = new SchoolClass();
        sc.setId(1L);
        when(classRepository.findById(1L)).thenReturn(Optional.of(sc));

        when(timetableRepository.save(any(Timetable.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Timetable saved = timetableService.saveTimetableEntry(request);

        assertNotNull(saved);
        assertEquals(sc, saved.getSchoolClass());
        assertNull(saved.getSection());
        assertEquals("Monday", saved.getDay());
        assertEquals(4, saved.getPeriod());
        assertNull(saved.getSubject());
        assertNull(saved.getTeacherId());
        assertEquals("LUNCH_BREAK", saved.getType());
        assertEquals(LocalTime.of(12, 0), saved.getStartTime());
        assertEquals(LocalTime.of(13, 0), saved.getEndTime());
    }

    @Test
    void testGetTimetableByClassAndSection() {
        // When sectionId is provided
        timetableService.getTimetableByClassAndSection(1L, 2L);
        verify(timetableRepository).findBySchoolClassIdAndSectionIdOrSectionIsNull(1L, 2L);

        // When sectionId is null (class-wide only)
        timetableService.getTimetableByClassAndSection(1L, null);
        verify(timetableRepository).findBySchoolClassIdAndSectionIsNull(1L);
    }
}
