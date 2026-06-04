package com.VitalisTech.VitalisTech.dto.grafo;

import java.util.List;

/**
 * Response com o resultado do despacho de ambulância.
 */
public class DespachoResponse {

    private boolean sucesso;
    private String mensagem;
    private boolean dentroSLA;
    private Double distanciaKm;
    private String rota;
    private List<Integer> caminhoIds;
    private String ambulanciaPlaca;
    private String ambulanciaNome;
    private String ambulanciaTipo;

    public DespachoResponse() {}

    // Getters e Setters
    public boolean isSucesso() { return sucesso; }
    public void setSucesso(boolean sucesso) { this.sucesso = sucesso; }

    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }

    public boolean isDentroSLA() { return dentroSLA; }
    public void setDentroSLA(boolean dentroSLA) { this.dentroSLA = dentroSLA; }

    public Double getDistanciaKm() { return distanciaKm; }
    public void setDistanciaKm(Double distanciaKm) { this.distanciaKm = distanciaKm; }

    public String getRota() { return rota; }
    public void setRota(String rota) { this.rota = rota; }

    public List<Integer> getCaminhoIds() { return caminhoIds; }
    public void setCaminhoIds(List<Integer> caminhoIds) { this.caminhoIds = caminhoIds; }

    public String getAmbulanciaPlaca() { return ambulanciaPlaca; }
    public void setAmbulanciaPlaca(String ambulanciaPlaca) { this.ambulanciaPlaca = ambulanciaPlaca; }

    public String getAmbulanciaNome() { return ambulanciaNome; }
    public void setAmbulanciaNome(String ambulanciaNome) { this.ambulanciaNome = ambulanciaNome; }

    public String getAmbulanciaTipo() { return ambulanciaTipo; }
    public void setAmbulanciaTipo(String ambulanciaTipo) { this.ambulanciaTipo = ambulanciaTipo; }
}
