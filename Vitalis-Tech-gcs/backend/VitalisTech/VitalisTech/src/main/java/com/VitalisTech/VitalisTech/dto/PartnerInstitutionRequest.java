package com.VitalisTech.VitalisTech.dto;


import com.VitalisTech.VitalisTech.validation.RegexConstants;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class PartnerInstitutionRequest {

    @NotBlank
    private String nome;

    @NotBlank
    @Pattern(regexp = RegexConstants.CNPJ_FORMATADO, message = "CNPJ inválido. Use 00.000.000/0000-00.")
    private String cnpj;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Pattern(regexp = RegexConstants.TELEFONE_BR, message = "Telefone inválido.")
    private String telefone;

    public PartnerInstitutionRequest() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}