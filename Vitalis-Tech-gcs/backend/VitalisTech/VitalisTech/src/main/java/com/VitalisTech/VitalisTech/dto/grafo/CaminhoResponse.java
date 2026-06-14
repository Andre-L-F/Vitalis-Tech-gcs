package com.VitalisTech.VitalisTech.dto.grafo;

import java.util.List;

/**
 * Response com o resultado do cálculo de caminho mínimo entre dois bairros.
 */
public class CaminhoResponse {

    private boolean encontrado;
    private Double distanciaKm;
    private String rota;
    private List<Integer> caminhoIds;

    public CaminhoResponse() {}

    public boolean isEncontrado() { return encontrado; }
    public void setEncontrado(boolean encontrado) { this.encontrado = encontrado; }

    public Double getDistanciaKm() { return distanciaKm; }
    public void setDistanciaKm(Double distanciaKm) { this.distanciaKm = distanciaKm; }

    public String getRota() { return rota; }
    public void setRota(String rota) { this.rota = rota; }

    public List<Integer> getCaminhoIds() { return caminhoIds; }
    public void setCaminhoIds(List<Integer> caminhoIds) { this.caminhoIds = caminhoIds; }
}
