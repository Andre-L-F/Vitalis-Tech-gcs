package com.VitalisTech.VitalisTech.repository;

import com.VitalisTech.VitalisTech.entity.Team;
import com.VitalisTech.VitalisTech.enumtype.TeamStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    boolean existsByNome(String nome);
    List<Team> findByStatus(TeamStatus status);
}