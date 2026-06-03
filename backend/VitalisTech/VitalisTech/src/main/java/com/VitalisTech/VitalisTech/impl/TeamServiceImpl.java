package com.VitalisTech.VitalisTech.impl;

import com.VitalisTech.VitalisTech.dto.TeamRequest;
import com.VitalisTech.VitalisTech.entity.Team;
import com.VitalisTech.VitalisTech.exception.ResourceNotFoundException;
import com.VitalisTech.VitalisTech.repository.TeamRepository;
import com.VitalisTech.VitalisTech.service.TeamService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {

    private final TeamRepository repository;

    public TeamServiceImpl(TeamRepository repository) {
        this.repository = repository;
    }

    @Override
    public Team create(TeamRequest request) {
        if (repository.existsByNome(request.getNome())) {
            throw new IllegalArgumentException("Já existe equipe com esse nome.");
        }

        Team team = new Team();
        team.setNome(request.getNome());
        team.setResponsavel(request.getResponsavel());
        team.setTelefoneContato(request.getTelefoneContato());
        team.setEmail(request.getEmail());
        team.setLocalizacaoAtual(request.getLocalizacaoAtual());
        team.setStatus(request.getStatus());

        return repository.save(team);
    }

    @Override
    public List<Team> findAll() {
        return repository.findAll();
    }

    @Override
    public Team findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipe não encontrada."));
    }
}