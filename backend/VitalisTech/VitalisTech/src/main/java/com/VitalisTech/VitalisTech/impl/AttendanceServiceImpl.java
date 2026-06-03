package com.VitalisTech.VitalisTech.impl;


import com.VitalisTech.VitalisTech.dto.AttendanceRequest;
import com.VitalisTech.VitalisTech.dto.AttendanceUpdateRequest;
import com.VitalisTech.VitalisTech.entity.Attendance;
import com.VitalisTech.VitalisTech.entity.Occurrence;
import com.VitalisTech.VitalisTech.entity.OperationalResource;
import com.VitalisTech.VitalisTech.entity.Team;
import com.VitalisTech.VitalisTech.enumtype.AttendanceStatus;
import com.VitalisTech.VitalisTech.enumtype.OccurrenceStatus;
import com.VitalisTech.VitalisTech.enumtype.ResourceStatus;
import com.VitalisTech.VitalisTech.enumtype.TeamStatus;
import com.VitalisTech.VitalisTech.exception.ResourceNotFoundException;
import com.VitalisTech.VitalisTech.repository.AttendanceRepository;
import com.VitalisTech.VitalisTech.repository.OccurrenceRepository;
import com.VitalisTech.VitalisTech.repository.OperationalResourceRepository;
import com.VitalisTech.VitalisTech.repository.TeamRepository;
import com.VitalisTech.VitalisTech.service.AttendanceService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final OccurrenceRepository occurrenceRepository;
    private final TeamRepository teamRepository;
    private final OperationalResourceRepository resourceRepository;

    public AttendanceServiceImpl(
            AttendanceRepository attendanceRepository,
            OccurrenceRepository occurrenceRepository,
            TeamRepository teamRepository,
            OperationalResourceRepository resourceRepository
    ) {
        this.attendanceRepository = attendanceRepository;
        this.occurrenceRepository = occurrenceRepository;
        this.teamRepository = teamRepository;
        this.resourceRepository = resourceRepository;
    }

    @Override
    public Attendance create(AttendanceRequest request) {
        Occurrence occurrence = occurrenceRepository.findById(request.getOcorrenciaId())
                .orElseThrow(() -> new ResourceNotFoundException("Ocorrência não encontrada."));

        Team team = teamRepository.findById(request.getEquipeId())
                .orElseThrow(() -> new ResourceNotFoundException("Equipe não encontrada."));

        OperationalResource resource = resourceRepository.findById(request.getRecursoId())
                .orElseThrow(() -> new ResourceNotFoundException("Recurso operacional não encontrado."));

        if (resource.getStatus() != ResourceStatus.DISPONIVEL) {
            throw new IllegalArgumentException("Recurso não está disponível para atendimento.");
        }

        Attendance attendance = new Attendance();
        attendance.setOcorrencia(occurrence);
        attendance.setEquipe(team);
        attendance.setRecurso(resource);
        attendance.setDataInicio(LocalDateTime.now());
        attendance.setObservacoes(request.getObservacoes());
        attendance.setStatus(AttendanceStatus.INICIADO);

        occurrence.setStatus(OccurrenceStatus.EM_ATENDIMENTO);
        occurrenceRepository.save(occurrence);

        team.setStatus(TeamStatus.EM_ATENDIMENTO);
        teamRepository.save(team);

        resource.setStatus(ResourceStatus.EM_USO);
        resourceRepository.save(resource);

        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> findAll() {
        return attendanceRepository.findAll();
    }

    @Override
    public Attendance findById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Atendimento não encontrado."));
    }

    @Override
    public Attendance update(Long id, AttendanceUpdateRequest request) {
        Attendance attendance = findById(id);

        if (attendance.getStatus() == AttendanceStatus.FINALIZADO) {
            throw new IllegalArgumentException("Não é possível alterar atendimento finalizado.");
        }

        attendance.setObservacoes(request.getObservacoes());
        attendance.setStatus(request.getStatus());

        return attendanceRepository.save(attendance);
    }

    @Override
    public void delete(Long id) {
        Attendance attendance = findById(id);

        if (attendance.getStatus() == AttendanceStatus.FINALIZADO) {
            throw new IllegalArgumentException("Não é possível excluir atendimento finalizado.");
        }

        attendanceRepository.delete(attendance);
    }

    @Override
    public Attendance finishAttendance(Long id) {
        Attendance attendance = findById(id);

        attendance.setStatus(AttendanceStatus.FINALIZADO);
        attendance.setDataFim(LocalDateTime.now());

        Occurrence occurrence = attendance.getOcorrencia();
        occurrence.setStatus(OccurrenceStatus.ENCERRADA);
        occurrence.setDataEncerramento(LocalDateTime.now());
        occurrenceRepository.save(occurrence);

        Team team = attendance.getEquipe();
        team.setStatus(TeamStatus.DISPONIVEL);
        teamRepository.save(team);

        OperationalResource resource = attendance.getRecurso();
        resource.setStatus(ResourceStatus.DISPONIVEL);
        resourceRepository.save(resource);

        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> findByStatus(AttendanceStatus status) {
        return attendanceRepository.findByStatus(status);
    }
}