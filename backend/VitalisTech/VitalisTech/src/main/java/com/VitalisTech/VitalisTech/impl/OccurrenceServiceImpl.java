package com.VitalisTech.VitalisTech.impl;

import com.VitalisTech.VitalisTech.dto.OccurrenceRequest;
import com.VitalisTech.VitalisTech.entity.Occurrence;
import com.VitalisTech.VitalisTech.enumtype.OccurrenceStatus;
import com.VitalisTech.VitalisTech.exception.ResourceNotFoundException;
import com.VitalisTech.VitalisTech.repository.OccurrenceRepository;
import com.VitalisTech.VitalisTech.service.OccurrenceService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OccurrenceServiceImpl implements OccurrenceService {

    private final OccurrenceRepository repository;

    public OccurrenceServiceImpl(OccurrenceRepository repository) {
        this.repository = repository;
    }

    @Override
    public Occurrence create(OccurrenceRequest request) {
        if (repository.existsByProtocolo(request.getProtocolo())) {
            throw new IllegalArgumentException("Já existe ocorrência com esse protocolo.");
        }

        Occurrence occurrence = new Occurrence();
        occurrence.setProtocolo(request.getProtocolo());
        occurrence.setDescricao(request.getDescricao());
        occurrence.setEndereco(request.getEndereco());
        occurrence.setBairro(request.getBairro());
        occurrence.setCidade(request.getCidade());
        occurrence.setCep(request.getCep());
        occurrence.setNomeSolicitante(request.getNomeSolicitante());
        occurrence.setCpfSolicitante(request.getCpfSolicitante());
        occurrence.setTelefoneSolicitante(request.getTelefoneSolicitante());
        occurrence.setPrioridade(request.getPrioridade());
        occurrence.setStatus(OccurrenceStatus.ABERTA);
        occurrence.setDataAbertura(LocalDateTime.now());

        return repository.save(occurrence);
    }

    @Override
    public List<Occurrence> findAll() {
        return repository.findAll();
    }

    @Override
    public Occurrence findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ocorrência não encontrada."));
    }

    @Override
    public Occurrence closeOccurrence(Long id) {
        Occurrence occurrence = findById(id);
        occurrence.setStatus(OccurrenceStatus.ENCERRADA);
        occurrence.setDataEncerramento(LocalDateTime.now());
        return repository.save(occurrence);
    }
}