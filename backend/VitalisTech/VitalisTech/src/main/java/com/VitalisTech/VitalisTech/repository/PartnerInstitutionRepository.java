package com.VitalisTech.VitalisTech.repository;

import com.VitalisTech.VitalisTech.enitity.PartnerInstitution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PartnerInstitutionRepository extends JpaRepository<PartnerInstitution, Long> {
    boolean existsByCnpj(String cnpj);
    Optional<PartnerInstitution> findByCnpj(String cnpj);
}