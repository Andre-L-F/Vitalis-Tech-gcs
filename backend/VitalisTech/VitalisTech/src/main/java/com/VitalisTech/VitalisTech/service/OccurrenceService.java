package com.VitalisTech.VitalisTech.service;

import com.VitalisTech.VitalisTech.dto.OccurrenceRequest;
import com.VitalisTech.VitalisTech.entity.Occurrence;

import java.util.List;

public interface OccurrenceService {
    Occurrence create(OccurrenceRequest request);
    List<Occurrence> findAll();
    Occurrence findById(Long id);
    Occurrence closeOccurrence(Long id);
}