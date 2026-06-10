package com.VitalisTech.VitalisTech.dto;

import com.VitalisTech.VitalisTech.enumtype.TeamStatus;
import com.VitalisTech.VitalisTech.validation.RegexConstants;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class TeamRequest {

    @NotBlank
    private String nome;

    @NotBlank
    private String responsavel;

    @NotBlank
    @Pattern(regexp = RegexConstants.TELEFONE_BR, message = "Telefone inválido.")
    private String telefoneContato;

    @NotBlank
    @Email(message = "E-mail inválido.")
    private String email;

    private String localizacaoAtual;

    @NotNull
    private TeamStatus status;

    public TeamRequest() {
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