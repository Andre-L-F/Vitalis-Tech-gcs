package com.VitalisTech.VitalisTech.model;

/**
 * Representa uma ambulância da frota.
 * Liga o recurso operacional (OperationalResource) à lógica do grafo.
 */
public class Ambulancia {

    private Long id;
    private String nome;
    private String placa;
    private TipoAmbulancia tipo;
    private StatusAmbulancia status;
    private Bairro base; // Bairro onde a ambulância está estacionada

    public Ambulancia() {}

    public Ambulancia(Long id, String nome, String placa, TipoAmbulancia tipo,
                      StatusAmbulancia status, Bairro base) {
        this.id = id;
        this.nome = nome;
        this.placa = placa;
        this.tipo = tipo;
        this.status = status;
        this.base = base;
    }

    /**
     * Verifica se a ambulância pode ser despachada.
     */
    public boolean isDisponivelParaDespacho() {
        return this.status == StatusAmbulancia.DISPONIVEL;
    }

    /**
     * Verifica se a ambulância é compatível com a gravidade da ocorrência.
     * UTI atende qualquer gravidade. BASICA só atende LEVE e MODERADA.
     */
    public boolean isCompativelComGravidade(Gravidade gravidade) {
        if (this.tipo == TipoAmbulancia.UTI) return true;
        // Básica não atende crítica
        return gravidade != Gravidade.CRITICA;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getPlaca() { return placa; }
    public void setPlaca(String placa) { this.placa = placa; }

    public TipoAmbulancia getTipo() { return tipo; }
    public void setTipo(TipoAmbulancia tipo) { this.tipo = tipo; }

    public StatusAmbulancia getStatus() { return status; }
    public void setStatus(StatusAmbulancia status) { this.status = status; }

    public Bairro getBase() { return base; }
    public void setBase(Bairro base) { this.base = base; }

    @Override
    public String toString() {
        return "Ambulancia{" + placa + ", tipo=" + tipo + ", status=" + status
                + ", base=" + (base != null ? base.getNome() : "N/A") + "}";
    }
}
