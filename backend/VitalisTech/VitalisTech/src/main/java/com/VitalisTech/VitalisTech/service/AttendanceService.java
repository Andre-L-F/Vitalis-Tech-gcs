package com.VitalisTech.VitalisTech.service;

import com.VitalisTech.VitalisTech.dto.AttendanceRequest;
import com.VitalisTech.VitalisTech.entity.Attendance;

import java.util.List;

public interface AttendanceService {
    Attendance create(AttendanceRequest request);
    List<Attendance> findAll();
    Attendance findById(Long id);
    Attendance finishAttendance(Long id);
}