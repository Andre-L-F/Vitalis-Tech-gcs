package com.VitalisTech.VitalisTech.service;


import com.VitalisTech.VitalisTech.dto.PartnerInstitutionRequest;
import com.VitalisTech.VitalisTech.entity.PartnerInstitution;
import com.VitalisTech.VitalisTech.enumtype.InstitutionType;

import java.util.List;

public interface PartnerInstitutionService {
    PartnerInstitution create(PartnerInstitutionRequest request);
    List<PartnerInstitution> findAll();
    PartnerInstitution findById(Long id);
    PartnerInstitution update(Long id, PartnerInstitutionRequest request);
    void delete(Long id);
    PartnerInstitution findByCnpj(String cnpj);
    List<PartnerInstitution> findByTipo(InstitutionType tipo);
}