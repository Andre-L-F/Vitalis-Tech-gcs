package com.VitalisTech.VitalisTech.dto;

import com.VitalisTech.VitalisTech.enitity.ResourceStatus;
import com.VitalisTech.VitalisTech.enitity.ResourceType;
import com.VitalisTech.VitalisTech.validation.RegexConstants;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class OperationalResourceRequest {

    @NotBlank
    private String nome;

    @NotNull
    private ResourceType tipo;

    @NotBlank
    @Pattern(regexp = RegexConstants.PLACA_MERCOSUL, message = "Placa inválida. Use o padrão AAA1A11.")
    private String placa;

    @NotNull
    private ResourceStatus status;

    public OperationalResourceRequest() {}

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public ResourceType getTipo() { return tipo; }
    public void setTipo(ResourceType tipo) { this.tipo = tipo; }

    public String getPlaca() { return placa; }
    public void setPlaca(String placa) { this.placa = placa; }

    public ResourceStatus getStatus() { return status; }
    public void setStatus(ResourceStatus status) { this.status = status; }
}
