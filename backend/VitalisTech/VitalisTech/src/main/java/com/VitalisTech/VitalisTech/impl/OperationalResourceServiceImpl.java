package com.VitalisTech.VitalisTech.impl;



import com.VitalisTech.VitalisTech.dto.OperationalResourceRequest;
import com.VitalisTech.VitalisTech.entity.OperationalResource;
import com.VitalisTech.VitalisTech.repository.OperationalResourceRepository;
import com.VitalisTech.VitalisTech.service.OperationalResourceService;
import org.springframework.stereotype.Service;

@Service
public class OperationalResourceServiceImpl implements OperationalResourceService {

    private final OperationalResourceRepository repository;

    public OperationalResourceServiceImpl(OperationalResourceRepository repository) {
        this.repository = repository;
    }

    @Override
    public OperationalResourceRequest create(OperationalResourceRequest request) {
        if (repository.existsByPlaca(request.getPlaca())) {
            throw new IllegalArgumentException("Já existe recurso cadastrado com essa placa.");
        }

        OperationalResource resource = new OperationalResource();
        resource.setNome(request.getNome());
        resource.setTipo(request.getTipo());
        resource.setPlaca(request.getPlaca());
        resource.setStatus(request.getStatus());

        repository.save(resource);
        return request;
    }
}