package com.VitalisTech.VitalisTech.model;

/**
 * Representa um bairro (vértice do grafo) da cidade de Cidália.
 */
public class Bairro {

    private final int id;
    private final String nome;

    public Bairro(int id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    @Override
    public String toString() {
        return id + " - " + nome;
    }
}
