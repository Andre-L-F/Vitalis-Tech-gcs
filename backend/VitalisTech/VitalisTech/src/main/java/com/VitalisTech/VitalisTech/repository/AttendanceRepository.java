package com.VitalisTech.VitalisTech.repository;

import com.VitalisTech.VitalisTech.entity.Attendance;
import com.VitalisTech.VitalisTech.enumtype.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStatus(AttendanceStatus status);

    boolean existsByOcorrencia_Id(Long ocorrenciaId);
    boolean existsByEquipe_Id(Long equipeId);
    boolean existsByRecurso_Id(Long recursoId);
}