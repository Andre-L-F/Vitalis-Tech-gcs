package com.VitalisTech.VitalisTech.service;

import com.VitalisTech.VitalisTech.dto.OperationalResourceRequest;
import com.VitalisTech.VitalisTech.entity.OperationalResource;
import com.VitalisTech.VitalisTech.enumtype.ResourceStatus;

import java.util.List;

public interface OperationalResourceService {
    OperationalResource create(OperationalResourceRequest request);
    List<OperationalResource> findAll();
    OperationalResource findById(Long id);
    OperationalResource update(Long id, OperationalResourceRequest request);
    void delete(Long id);
    OperationalResource findByPlaca(String placa);
    List<OperationalResource> findByStatus(ResourceStatus status);
}