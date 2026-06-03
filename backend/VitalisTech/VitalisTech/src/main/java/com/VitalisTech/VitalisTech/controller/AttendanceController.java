package com.VitalisTech.VitalisTech.controller;

import com.VitalisTech.VitalisTech.dto.AttendanceRequest;
import com.VitalisTech.VitalisTech.entity.Attendance;
import com.VitalisTech.VitalisTech.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/atendimentos")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Attendance> create(@Valid @RequestBody AttendanceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<Attendance>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attendance> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}/finalizar")
    public ResponseEntity<Attendance> finish(@PathVariable Long id) {
        return ResponseEntity.ok(service.finishAttendance(id));
    }
}