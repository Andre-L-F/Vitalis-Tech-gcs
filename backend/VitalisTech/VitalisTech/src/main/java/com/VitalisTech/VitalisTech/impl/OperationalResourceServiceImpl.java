package com.VitalisTech.VitalisTech.impl;

import com.VitalisTech.VitalisTech.dto.OperationalResourceRequest;
import com.VitalisTech.VitalisTech.entity.OperationalResource;
import com.VitalisTech.VitalisTech.enumtype.ResourceStatus;
import com.VitalisTech.VitalisTech.exception.ResourceNotFoundException;
import com.VitalisTech.VitalisTech.repository.AttendanceRepository;
import com.VitalisTech.VitalisTech.repository.OperationalResourceRepository;
import com.VitalisTech.VitalisTech.service.OperationalResourceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OperationalResourceServiceImpl implements OperationalResourceService {

    private final OperationalResourceRepository repository;
    private final AttendanceRepository attendanceRepository;

    public OperationalResourceServiceImpl(OperationalResourceRepository repository, AttendanceRepository attendanceRepository) {
        this.repository = repository;
        this.attendanceRepository = attendanceRepository;
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

    @Override
    public OperationalResource update(Long id, OperationalResourceRequest request) {
        OperationalResource resource = findById(id);

        if (!resource.getPlaca().equals(request.getPlaca()) && repository.existsByPlaca(request.getPlaca())) {
            throw new IllegalArgumentException("Já existe recurso cadastrado com essa placa.");
        }

        resource.setNome(request.getNome());
        resource.setTipo(request.getTipo());
        resource.setPlaca(request.getPlaca());
        resource.setStatus(request.getStatus());
        resource.setBaseAlocacao(request.getBaseAlocacao());

        return repository.save(resource);
    }

    @Override
    public void delete(Long id) {
        if (attendanceRepository.existsByRecurso_Id(id)) {
            throw new IllegalArgumentException("Não é possível excluir um recurso vinculado a atendimento.");
        }

        OperationalResource resource = findById(id);
        repository.delete(resource);
    }

    @Override
    public OperationalResource findByPlaca(String placa) {
        return repository.findByPlaca(placa)
                .orElseThrow(() -> new ResourceNotFoundException("Recurso operacional não encontrado para a placa informada."));
    }

    @Override
    public List<OperationalResource> findByStatus(ResourceStatus status) {
        return repository.findByStatus(status);
    }
}