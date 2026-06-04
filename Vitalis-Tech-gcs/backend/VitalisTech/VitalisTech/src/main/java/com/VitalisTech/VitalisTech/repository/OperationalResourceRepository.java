package com.VitalisTech.VitalisTech.repository;

import com.VitalisTech.VitalisTech.enitity.OperationalResource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OperationalResourceRepository extends JpaRepository<OperationalResource, Long> {
    boolean existsByPlaca(String placa);
    Optional<OperationalResource> findByPlaca(String placa);
}