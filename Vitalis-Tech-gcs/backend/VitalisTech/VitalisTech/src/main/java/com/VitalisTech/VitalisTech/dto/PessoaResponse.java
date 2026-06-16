package com.VitalisTech.VitalisTech.dto;

public class PessoaResponse {

    private Long id;
    private String nome;
    private String cargo;
    private String telefone;
    private String email;
    private String status;

    public PessoaResponse() {
    }

    public PessoaResponse(Long id, String nome, String cargo, String telefone, String email, String status) {
        this.id = id;
        this.nome = nome;
        this.cargo = cargo;
        this.telefone = telefone;
        this.email = email;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCargo() {
        return cargo;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getEmail() {
        return email;
    }

    public String getStatus() {
        return status;
    }
}