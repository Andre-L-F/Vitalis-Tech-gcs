package com.VitalisTech.VitalisTech.service;

import com.VitalisTech.VitalisTech.dto.AttendanceRequest;
import com.VitalisTech.VitalisTech.dto.AttendanceUpdateRequest;
import com.VitalisTech.VitalisTech.entity.Attendance;
import com.VitalisTech.VitalisTech.enumtype.AttendanceStatus;

import java.util.List;

public interface AttendanceService {
    Attendance create(AttendanceRequest request);
    List<Attendance> findAll();
    Attendance findById(Long id);
    Attendance update(Long id, AttendanceUpdateRequest request);
    void delete(Long id);
    Attendance finishAttendance(Long id);
    List<Attendance> findByStatus(AttendanceStatus status);
}