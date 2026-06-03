package com.VitalisTech.VitalisTech.controller;

import com.VitalisTech.VitalisTech.dto.OperationalResourceRequest;
import com.VitalisTech.VitalisTech.entity.OperationalResource;
import com.VitalisTech.VitalisTech.service.OperationalResourceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recursos")
public class OperationalResourceController {

    private final OperationalResourceService service;

    public OperationalResourceController(OperationalResourceService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<OperationalResource> create(@Valid @RequestBody OperationalResourceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<OperationalResource>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OperationalResource> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }
}