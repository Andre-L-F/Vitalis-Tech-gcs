package com.VitalisTech.VitalisTech.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "recursos_operacionais")
public class OperationalResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResourceType tipo;

    @Column(nullable = false, unique = true, length = 7)
    private String placa;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResourceStatus status;

    public OperationalResource() {
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

    public ResourceType getTipo() {
        return tipo;
    }

    public void setTipo(ResourceType tipo) {
        this.tipo = tipo;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public ResourceStatus getStatus() {
        return status;
    }

    public void setStatus(ResourceStatus status) {
        this.status = status;
    }
}