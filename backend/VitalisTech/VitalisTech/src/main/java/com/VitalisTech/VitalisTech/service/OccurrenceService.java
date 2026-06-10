package com.VitalisTech.VitalisTech.service;

import com.VitalisTech.VitalisTech.dto.OccurrenceRequest;
import com.VitalisTech.VitalisTech.entity.Occurrence;
import com.VitalisTech.VitalisTech.enumtype.OccurrenceStatus;

import java.util.List;

public interface OccurrenceService {
    Occurrence create(OccurrenceRequest request);
    List<Occurrence> findAll();
    Occurrence findById(Long id);
    Occurrence update(Long id, OccurrenceRequest request);
    void delete(Long id);
    Occurrence closeOccurrence(Long id);
    Occurrence findByProtocolo(String protocolo);
    List<Occurrence> findByStatus(OccurrenceStatus status);
}