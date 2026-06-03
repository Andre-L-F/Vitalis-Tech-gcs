package com.VitalisTech.VitalisTech.service;

import com.VitalisTech.VitalisTech.dto.TeamRequest;
import com.VitalisTech.VitalisTech.entity.Team;
import com.VitalisTech.VitalisTech.enumtype.TeamStatus;

import java.util.List;

public interface TeamService {
    Team create(TeamRequest request);
    List<Team> findAll();
    Team findById(Long id);
    Team update(Long id, TeamRequest request);
    void delete(Long id);
    List<Team> findByStatus(TeamStatus status);
}