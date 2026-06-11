package com.VitalisTech.VitalisTech.controller;

import com.VitalisTech.VitalisTech.dto.grafo.CaminhoResponse;
import com.VitalisTech.VitalisTech.dto.grafo.DespachoRequest;
import com.VitalisTech.VitalisTech.dto.grafo.DespachoResponse;
import com.VitalisTech.VitalisTech.model.Ambulancia;
import com.VitalisTech.VitalisTech.model.Bairro;
import com.VitalisTech.VitalisTech.model.StatusAmbulancia;
import com.VitalisTech.VitalisTech.model.TipoAmbulancia;
import com.VitalisTech.VitalisTech.util.Dijkstra;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Endpoints REST para cálculo de rotas e despacho de ambulâncias.
 * Base path: /api/rotas
 */
@RestController
@RequestMapping("/api/rotas")
public class RotaController {

    private final GrafoController grafoController = GrafoController.getInstance();

    /**
     * Carrega o grafo com os dados padrão ao iniciar a aplicação.
     */
    @PostConstruct
    public void inicializar() {
        if (!grafoController.isCarregado()) {
            grafoController.carregarDadosPadrao();
        }
    }

    /**
     * Calcula o caminho mínimo entre dois bairros.
     * GET /api/rotas/caminho?origem=1&destino=5
     */
    @GetMapping("/caminho")
    public ResponseEntity<CaminhoResponse> calcularCaminho(
            @RequestParam int origem,
            @RequestParam int destino) {

        Dijkstra.Resultado resultado = grafoController.calcularCaminho(origem, destino);

        CaminhoResponse response = new CaminhoResponse();
        response.setEncontrado(resultado.isEncontrado());
        response.setDistanciaKm(resultado.isEncontrado() ? resultado.getDistancia() : null);
        response.setRota(resultado.getCaminhoTexto());
        response.setCaminhoIds(resultado.getCaminhoIds());

        return ResponseEntity.ok(response);
    }

    /**
     * Lista todos os bairros disponíveis no grafo.
     * GET /api/rotas/bairros
     */
    @GetMapping("/bairros")
    public ResponseEntity<List<Bairro>> listarBairros() {
        return ResponseEntity.ok(grafoController.getBairros());
    }

    /**
     * Despacha a melhor ambulância para uma ocorrência.
     * POST /api/rotas/despacho
     *
     * Nota: a frota de exemplo é criada aqui para fins de demonstração.
     * Em produção, integre com o OperationalResourceRepository para
     * buscar as ambulâncias reais cadastradas no banco.
     */
    @PostMapping("/despacho")
    public ResponseEntity<DespachoResponse> despachar(@Valid @RequestBody DespachoRequest request) {

        // Frota de exemplo — substitua pela consulta real ao banco futuramente
        List<Ambulancia> frota = criarFrotaExemplo();

        GrafoController.ResultadoDespacho resultado = grafoController.encontrarMelhorAmbulancia(
                request.getBairroDestinoId(),
                request.getGravidade(),
                frota
        );

        DespachoResponse response = new DespachoResponse();
        response.setSucesso(resultado.sucesso);
        response.setMensagem(resultado.mensagem);
        response.setDentroSLA(resultado.dentroSLA);
        response.setDistanciaKm(resultado.sucesso ? resultado.distancia : null);
        response.setRota(resultado.rota);
        response.setCaminhoIds(resultado.caminhoIds);

        if (resultado.sucesso && resultado.ambulancia != null) {
            response.setAmbulanciaPlaca(resultado.ambulancia.getPlaca());
            response.setAmbulanciaNome(resultado.ambulancia.getNome());
            response.setAmbulanciaTipo(resultado.ambulancia.getTipo().name());
        }

        return ResponseEntity.ok(response);
    }

    // -------------------------------------------------------------------------
    // Frota de exemplo (substitua pela integração com o banco futuramente)
    // -------------------------------------------------------------------------

    private List<Ambulancia> criarFrotaExemplo() {
        List<Ambulancia> frota = new ArrayList<>();

        Bairro centro    = grafoController.getBairro(2);  // Centro
        Bairro setorLeste = grafoController.getBairro(3); // Setor Leste
        Bairro vilaFlorenca = grafoController.getBairro(18); // Residencial Florença

        frota.add(new Ambulancia(1L, "UTI-01", "ABC1D23", TipoAmbulancia.UTI,
                StatusAmbulancia.DISPONIVEL, centro));

        frota.add(new Ambulancia(2L, "BAS-02", "DEF4G56", TipoAmbulancia.BASICA,
                StatusAmbulancia.DISPONIVEL, setorLeste));

        frota.add(new Ambulancia(3L, "UTI-03", "GHI7J89", TipoAmbulancia.UTI,
                StatusAmbulancia.EM_ATENDIMENTO, vilaFlorenca)); // indisponível

        return frota;
    }
}
