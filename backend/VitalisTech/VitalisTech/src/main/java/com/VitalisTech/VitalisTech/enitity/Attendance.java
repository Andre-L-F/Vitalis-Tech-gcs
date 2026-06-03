package com.VitalisTech.VitalisTech.enitity;

import com.VitalisTech.VitalisTech.enumtype.AttendanceStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "atendimentos")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "ocorrencia_id", nullable = false, unique = true)
    private Occurrence ocorrencia;

    @ManyToOne(optional = false)
    @JoinColumn(name = "equipe_id", nullable = false)
    private Team equipe;

    @ManyToOne(optional = false)
    @JoinColumn(name = "recurso_id", nullable = false)
    private OperationalResource recurso;

    @Column(nullable = false)
    private LocalDateTime dataInicio;

    @Column
    private LocalDateTime dataFim;

    @Column(length = 500)
    private String observacoes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AttendanceStatus status;

    public Attendance() {
    }

    public Long getId() {
        return id;
    }

    public Occurrence getOcorrencia() {
        return ocorrencia;
    }

    public void setOcorrencia(Occurrence ocorrencia) {
        this.ocorrencia = ocorrencia;
    }

    public Team getEquipe() {
        return equipe;
    }

    public void setEquipe(Team equipe) {
        this.equipe = equipe;
    }

    public OperationalResource getRecurso() {
        return recurso;
    }

    public void setRecurso(OperationalResource recurso) {
        this.recurso = recurso;
    }

    public LocalDateTime getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDateTime dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDateTime getDataFim() {
        return dataFim;
    }

    public void setDataFim(LocalDateTime dataFim) {
        this.dataFim = dataFim;
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