package com.VitalisTech.VitalisTech.impl;

import com.VitalisTech.VitalisTech.dto.OperationalResourceRequest;
import com.VitalisTech.VitalisTech.entity.OperationalResource;
import com.VitalisTech.VitalisTech.exception.ResourceNotFoundException;
import com.VitalisTech.VitalisTech.repository.OperationalResourceRepository;
import com.VitalisTech.VitalisTech.service.OperationalResourceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OperationalResourceServiceImpl implements OperationalResourceService {

    private final OperationalResourceRepository repository;

    public OperationalResourceServiceImpl(OperationalResourceRepository repository) {
        this.repository = repository;
    }

    @Override
    public OperationalResource create(OperationalResourceRequest request) {
        if (repository.existsByPlaca(request.getPlaca())) {
            throw new IllegalArgumentException("Já existe recurso cadastrado com essa placa.");
        }

        OperationalResource resource = new OperationalResource();
        resource.setNome(request.getNome());
        resource.setTipo(request.getTipo());
        resource.setPlaca(request.getPlaca());
        resource.setStatus(request.getStatus());
        resource.setBaseAlocacao(request.getBaseAlocacao());

        return repository.save(resource);
    }

    @Override
    public List<OperationalResource> findAll() {
        return repository.findAll();
    }

    @Override
    public OperationalResource findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso operacional não encontrado."));
    }
}