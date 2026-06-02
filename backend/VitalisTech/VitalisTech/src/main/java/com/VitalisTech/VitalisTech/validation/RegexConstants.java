package com.VitalisTech.VitalisTech.validation;

public final class RegexConstants {

    private RegexConstants() {
    }

    public static final String PLACA_MERCOSUL = "^[A-Z]{3}[0-9][A-Z][0-9]{2}$";
    public static final String CPF_FORMATADO = "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$";
    public static final String CNPJ_FORMATADO = "^\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}$";
    public static final String CEP_FORMATADO = "^\\d{5}-\\d{3}$";
    public static final String TELEFONE_BR = "^(\\(?\\d{2}\\)?\\s?)?\\d{4,5}-\\d{4}$";
    public static final String PROTOCOLO = "^OCO-\\d{6}$";
}