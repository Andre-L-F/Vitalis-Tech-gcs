package com.VitalisTech.VitalisTech.repository;

import com.VitalisTech.VitalisTech.entity.PartnerInstitution;
import com.VitalisTech.VitalisTech.enumtype.InstitutionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PartnerInstitutionRepository extends JpaRepository<PartnerInstitution, Long> {
    boolean existsByCnpj(String cnpj);
    Optional<PartnerInstitution> findByCnpj(String cnpj);
    List<PartnerInstitution> findByTipo(InstitutionType tipo);
}