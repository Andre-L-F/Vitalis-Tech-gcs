package com.VitalisTech.VitalisTech.impl;

import com.VitalisTech.VitalisTech.dto.PartnerInstitutionRequest;
import com.VitalisTech.VitalisTech.entity.PartnerInstitution;
import com.VitalisTech.VitalisTech.enumtype.InstitutionType;
import com.VitalisTech.VitalisTech.exception.ResourceNotFoundException;
import com.VitalisTech.VitalisTech.repository.PartnerInstitutionRepository;
import com.VitalisTech.VitalisTech.service.PartnerInstitutionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartnerInstitutionServiceImpl implements PartnerInstitutionService {

    private final PartnerInstitutionRepository repository;

    public PartnerInstitutionServiceImpl(PartnerInstitutionRepository repository) {
        this.repository = repository;
    }

    @Override
    public PartnerInstitution create(PartnerInstitutionRequest request) {
        if (repository.existsByCnpj(request.getCnpj())) {
            throw new IllegalArgumentException("Já existe instituição cadastrada com esse CNPJ.");
        }

        PartnerInstitution institution = new PartnerInstitution();
        institution.setNome(request.getNome());
        institution.setCnpj(request.getCnpj());
        institution.setTipo(request.getTipo());
        institution.setEmail(request.getEmail());
        institution.setTelefone(request.getTelefone());
        institution.setEndereco(request.getEndereco());
        institution.setCep(request.getCep());
        institution.setCidade(request.getCidade());
        institution.setAtivo(request.getAtivo());

        return repository.save(institution);
    }

    @Override
    public List<PartnerInstitution> findAll() {
        return repository.findAll();
    }

    @Override
    public PartnerInstitution findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instituição parceira não encontrada."));
    }

    @Override
    public PartnerInstitution update(Long id, PartnerInstitutionRequest request) {
        PartnerInstitution institution = findById(id);

        if (!institution.getCnpj().equals(request.getCnpj()) && repository.existsByCnpj(request.getCnpj())) {
            throw new IllegalArgumentException("Já existe instituição cadastrada com esse CNPJ.");
        }

        institution.setNome(request.getNome());
        institution.setCnpj(request.getCnpj());
        institution.setTipo(request.getTipo());
        institution.setEmail(request.getEmail());
        institution.setTelefone(request.getTelefone());
        institution.setEndereco(request.getEndereco());
        institution.setCep(request.getCep());
        institution.setCidade(request.getCidade());
        institution.setAtivo(request.getAtivo());

        return repository.save(institution);
    }

    @Override
    public void delete(Long id) {
        PartnerInstitution institution = findById(id);
        repository.delete(institution);
    }

    @Override
    public PartnerInstitution findByCnpj(String cnpj) {
        return repository.findByCnpj(cnpj)
                .orElseThrow(() -> new ResourceNotFoundException("Instituição parceira não encontrada para o CNPJ informado."));
    }

    @Override
    public List<PartnerInstitution> findByTipo(InstitutionType tipo) {
        return repository.findByTipo(tipo);
    }
}