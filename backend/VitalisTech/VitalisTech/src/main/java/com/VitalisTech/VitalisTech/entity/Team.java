package com.VitalisTech.VitalisTech.entity;


import com.VitalisTech.VitalisTech.enumtype.TeamStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "equipes")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(nullable = false, length = 120)
    private String responsavel;

    @Column(nullable = false, length = 20)
    private String telefoneContato;

    @Column(length = 120)
    private String email;

    @Column(length = 150)
    private String localizacaoAtual;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TeamStatus status;

    public Team() {
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getTelefoneContato() {
        return telefoneContato;
    }

    public void setTelefoneContato(String telefoneContato) {
        this.telefoneContato = telefoneContato;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocalizacaoAtual() {
        return localizacaoAtual;
    }

    public void setLocalizacaoAtual(String localizacaoAtual) {
        this.localizacaoAtual = localizacaoAtual;
    }

    public TeamStatus getStatus() {
        return status;
    }

    public void setStatus(TeamStatus status) {
        this.status = status;
    }
}
