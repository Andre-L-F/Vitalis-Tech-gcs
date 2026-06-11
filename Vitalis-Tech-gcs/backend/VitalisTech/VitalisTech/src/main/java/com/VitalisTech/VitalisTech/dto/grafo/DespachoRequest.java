package com.VitalisTech.VitalisTech.dto.grafo;

import com.VitalisTech.VitalisTech.model.Gravidade;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

/**
 * Request para despachar a melhor ambulância para um bairro.
 */
public class DespachoRequest {

    @NotNull
    @Positive
    private Integer bairroDestinoId;

    @NotNull
    private Gravidade gravidade;

    public DespachoRequest() {}

    public Integer getBairroDestinoId() { return bairroDestinoId; }
    public void setBairroDestinoId(Integer bairroDestinoId) { this.bairroDestinoId = bairroDestinoId; }

    public Gravidade getGravidade() { return gravidade; }
    public void setGravidade(Gravidade gravidade) { this.gravidade = gravidade; }
}
