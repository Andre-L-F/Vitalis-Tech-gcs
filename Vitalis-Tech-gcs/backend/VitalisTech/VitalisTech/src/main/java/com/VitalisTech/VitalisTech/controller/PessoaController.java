package com.VitalisTech.VitalisTech.controller;

import com.VitalisTech.VitalisTech.dto.PessoaResponse;
import com.VitalisTech.VitalisTech.service.PessoaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/pessoas")
public class PessoaController {

    private final PessoaService pessoaService;

    public PessoaController(PessoaService pessoaService) {
        this.pessoaService = pessoaService;
    }

    @GetMapping
    public List<PessoaResponse> listarTodos() {
        return pessoaService.listarTodos();
    }
}