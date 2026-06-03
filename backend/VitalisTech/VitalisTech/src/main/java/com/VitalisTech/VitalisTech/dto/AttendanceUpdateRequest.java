package com.VitalisTech.VitalisTech.dto;

import com.VitalisTech.VitalisTech.enumtype.AttendanceStatus;
import jakarta.validation.constraints.NotNull;

public class AttendanceUpdateRequest {

    private String observacoes;

    @NotNull
    private AttendanceStatus status;

    public AttendanceUpdateRequest() {
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }
}