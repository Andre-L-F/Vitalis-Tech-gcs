package com.VitalisTech.VitalisTech.model;

/**
 * Gravidade de uma ocorrência médica.
 * Define também a distância máxima (SLA) para o atendimento.
 */
public enum Gravidade {
    LEVE(10.0),
    MODERADA(20.0),
    CRITICA(Double.MAX_VALUE); // Crítica aceita qualquer distância

    private final double distanciaMaximaKm;

    Gravidade(double distanciaMaximaKm) {
        this.distanciaMaximaKm = distanciaMaximaKm;
    }

    public double getDistanciaMaximaKm() {
        return distanciaMaximaKm;
    }
}
