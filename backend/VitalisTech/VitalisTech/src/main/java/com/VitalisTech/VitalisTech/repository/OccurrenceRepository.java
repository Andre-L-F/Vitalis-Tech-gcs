package com.VitalisTech.VitalisTech.repository;

import com.VitalisTech.VitalisTech.entity.Occurrence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OccurrenceRepository extends JpaRepository<Occurrence, Long> {
    boolean existsByProtocolo(String protocolo);
    Optional<Occurrence> findByProtocolo(String protocolo);
}