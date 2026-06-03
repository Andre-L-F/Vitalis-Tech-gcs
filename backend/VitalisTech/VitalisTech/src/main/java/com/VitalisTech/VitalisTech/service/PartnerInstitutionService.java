package com.VitalisTech.VitalisTech.service;


import com.VitalisTech.VitalisTech.dto.PartnerInstitutionRequest;
import com.VitalisTech.VitalisTech.entity.PartnerInstitution;

import java.util.List;

public interface PartnerInstitutionService {
    PartnerInstitution create(PartnerInstitutionRequest request);
    List<PartnerInstitution> findAll();
    PartnerInstitution findById(Long id);
}