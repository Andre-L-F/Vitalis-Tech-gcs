package com.VitalisTech.VitalisTech.service;

import com.VitalisTech.VitalisTech.dto.OperationalResourceRequest;
import com.VitalisTech.VitalisTech.entity.OperationalResource;

import java.util.List;

public interface OperationalResourceService {
    OperationalResource create(OperationalResourceRequest request);
    List<OperationalResource> findAll();
    OperationalResource findById(Long id);
}