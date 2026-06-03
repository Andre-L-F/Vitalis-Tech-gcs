package com.VitalisTech.VitalisTech.dto;

import com.VitalisTech.VitalisTech.enumtype.PriorityLevel;
import com.VitalisTech.VitalisTech.validation.RegexConstants;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class OccurrenceRequest {

    @NotBlank
    @Pattern(regexp = RegexConstants.PROTOCOLO, message = "Protocolo inválido. Use OCO-000001.")
    private String protocolo;

    @NotBlank
    private String descricao;

    @NotBlank
    private String endereco;

    private String bairro;

    @NotBlank
    private String cidade;

    @Pattern(regexp = RegexConstants.CEP_FORMATADO, message = "CEP inválido. Use 00000-000.")
    private String cep;

    @NotBlank
    private String nomeSolicitante;

    @Pattern(regexp = RegexConstants.CPF_FORMATADO, message = "CPF inválido. Use 000.000.000-00.")
    private String cpfSolicitante;

    @Pattern(regexp = RegexConstants.TELEFONE_BR, message = "Telefone inválido.")
    private String telefoneSolicitante;

    @NotNull
    private PriorityLevel prioridade;

    public OccurrenceRequest() {
    }

    public String getProtocolo() {
        return protocolo;
    }

    public void setProtocolo(String protocolo) {
        this.protocolo = protocolo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getNomeSolicitante() {
        return nomeSolicitante;
    }

    public void setNomeSolicitante(String nomeSolicitante) {
        this.nomeSolicitante = nomeSolicitante;
    }

    public String getCpfSolicitante() {
        return cpfSolicitante;
    }

    public void setCpfSolicitante(String cpfSolicitante) {
        this.cpfSolicitante = cpfSolicitante;
    }

    public String getTelefoneSolicitante() {
        return telefoneSolicitante;
    }

    public void setTelefoneSolicitante(String telefoneSolicitante) {
        this.telefoneSolicitante = telefoneSolicitante;
    }

    public PriorityLevel getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(PriorityLevel prioridade) {
        this.prioridade = prioridade;
    }
}