package com.VitalisTech.VitalisTech.service;

import com.VitalisTech.VitalisTech.dto.TeamRequest;
import com.VitalisTech.VitalisTech.entity.Team;

import java.util.List;

public interface TeamService {
    Team create(TeamRequest request);
    List<Team> findAll();
    Team findById(Long id);
}