package com.VitalisTech.VitalisTech.controller;

import com.VitalisTech.VitalisTech.dto.OccurrenceRequest;
import com.VitalisTech.VitalisTech.entity.Occurrence;
import com.VitalisTech.VitalisTech.service.OccurrenceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ocorrencias")
public class OccurrenceController {

    private final OccurrenceService service;

    public OccurrenceController(OccurrenceService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Occurrence> create(@Valid @RequestBody OccurrenceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<Occurrence>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Occurrence> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}/encerrar")
    public ResponseEntity<Occurrence> close(@PathVariable Long id) {
        return ResponseEntity.ok(service.closeOccurrence(id));
    }
}