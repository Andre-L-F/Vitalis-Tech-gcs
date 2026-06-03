package com.VitalisTech.VitalisTech.controller;

import com.VitalisTech.VitalisTech.dto.PartnerInstitutionRequest;
import com.VitalisTech.VitalisTech.entity.PartnerInstitution;
import com.VitalisTech.VitalisTech.service.PartnerInstitutionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instituicoes-parceiras")
public class PartnerInstitutionController {

    private final PartnerInstitutionService service;

    public PartnerInstitutionController(PartnerInstitutionService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PartnerInstitution> create(@Valid @RequestBody PartnerInstitutionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<PartnerInstitution>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartnerInstitution> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }
}