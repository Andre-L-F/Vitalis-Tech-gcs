package com.VitalisTech.VitalisTech.dto;


import com.VitalisTech.VitalisTech.enumtype.InstitutionType;
import com.VitalisTech.VitalisTech.validation.RegexConstants;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class PartnerInstitutionRequest {

    @NotBlank
    private String nome;

    @NotBlank
    @Pattern(regexp = RegexConstants.CNPJ_FORMATADO, message = "CNPJ inválido. Use 00.000.000/0000-00.")
    private String cnpj;

    @NotNull
    private InstitutionType tipo;

    @NotBlank
    @Email(message = "E-mail inválido.")
    private String email;

    @NotBlank
    @Pattern(regexp = RegexConstants.TELEFONE_BR, message = "Telefone inválido.")
    private String telefone;

    private String endereco;

    @Pattern(regexp = RegexConstants.CEP_FORMATADO, message = "CEP inválido. Use 00000-000.")
    private String cep;

    private String cidade;

    @NotNull
    private Boolean ativo;

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

    public InstitutionType getTipo() {
        return tipo;
    }

    public void setTipo(InstitutionType tipo) {
        this.tipo = tipo;
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

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}