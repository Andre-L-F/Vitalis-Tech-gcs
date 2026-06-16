package com.VitalisTech.VitalisTech.service;

import com.VitalisTech.VitalisTech.dto.PessoaResponse;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PessoaService {

    public List<PessoaResponse> listarTodos() {
        ClassPathResource resource = new ClassPathResource("pessoas.csv");

        try (
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)
                )
        ) {
            return reader.lines()
                    .skip(1)
                    .filter(linha -> linha != null && !linha.isBlank())
                    .map(this::converterLinha)
                    .collect(Collectors.toList());

        } catch (IOException erro) {
            throw new IllegalStateException("Erro ao carregar pessoas do arquivo CSV.", erro);
        }
    }

    private PessoaResponse converterLinha(String linha) {
        String[] campos = linha.split(",", -1);

        if (campos.length < 6) {
            throw new IllegalArgumentException("Linha inválida no CSV de pessoas: " + linha);
        }

        return new PessoaResponse(
                Long.parseLong(campos[0].trim()),
                campos[1].trim(),
                campos[2].trim(),
                campos[3].trim(),
                campos[4].trim(),
                campos[5].trim()
        );
    }
}