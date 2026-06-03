package com.VitalisTech.VitalisTech.repository;

import com.VitalisTech.VitalisTech.enitity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
    boolean existsByNome(String nome);
}