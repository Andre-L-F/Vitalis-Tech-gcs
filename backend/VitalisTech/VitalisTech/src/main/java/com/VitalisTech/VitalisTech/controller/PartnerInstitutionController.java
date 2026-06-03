package com.VitalisTech.VitalisTech.controller;

import com.VitalisTech.VitalisTech.dto.PartnerInstitutionRequest;
import com.VitalisTech.VitalisTech.entity.PartnerInstitution;
import com.VitalisTech.VitalisTech.enumtype.InstitutionType;
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

    @GetMapping("/cnpj/{cnpj}")
    public ResponseEntity<PartnerInstitution> findByCnpj(@PathVariable String cnpj) {
        return ResponseEntity.ok(service.findByCnpj(cnpj));
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<PartnerInstitution>> findByTipo(@PathVariable InstitutionType tipo) {
        return ResponseEntity.ok(service.findByTipo(tipo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PartnerInstitution> update(@PathVariable Long id, @Valid @RequestBody PartnerInstitutionRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}