package com.VitalisTech.VitalisTech.controller;

import com.VitalisTech.VitalisTech.dto.OperationalResourceRequest;
import com.VitalisTech.VitalisTech.service.OperationalResourceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recursos")
public class OperationalResourceController {

    private final OperationalResourceService service;

    public OperationalResourceController(OperationalResourceService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<OperationalResourceRequest> create(@Valid @RequestBody OperationalResourceRequest request) {
        OperationalResourceRequest created = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}