package com.VitalisTech.VitalisTech.impl;

import com.VitalisTech.VitalisTech.dto.TeamRequest;
import com.VitalisTech.VitalisTech.entity.Team;
import com.VitalisTech.VitalisTech.enumtype.TeamStatus;
import com.VitalisTech.VitalisTech.exception.ResourceNotFoundException;
import com.VitalisTech.VitalisTech.repository.AttendanceRepository;
import com.VitalisTech.VitalisTech.repository.TeamRepository;
import com.VitalisTech.VitalisTech.service.TeamService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamServiceImpl implements TeamService {

    private final TeamRepository repository;
    private final AttendanceRepository attendanceRepository;

    public TeamServiceImpl(TeamRepository repository, AttendanceRepository attendanceRepository) {
        this.repository = repository;
        this.attendanceRepository = attendanceRepository;
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

    @Override
    public Team update(Long id, TeamRequest request) {
        Team team = findById(id);

        if (!team.getNome().equals(request.getNome()) && repository.existsByNome(request.getNome())) {
            throw new IllegalArgumentException("Já existe equipe com esse nome.");
        }

        team.setNome(request.getNome());
        team.setResponsavel(request.getResponsavel());
        team.setTelefoneContato(request.getTelefoneContato());
        team.setEmail(request.getEmail());
        team.setLocalizacaoAtual(request.getLocalizacaoAtual());
        team.setStatus(request.getStatus());

        return repository.save(team);
    }

    @Override
    public void delete(Long id) {
        if (attendanceRepository.existsByEquipe_Id(id)) {
            throw new IllegalArgumentException("Não é possível excluir uma equipe vinculada a atendimento.");
        }

        Team team = findById(id);
        repository.delete(team);
    }

    @Override
    public List<Team> findByStatus(TeamStatus status) {
        return repository.findByStatus(status);
    }
}