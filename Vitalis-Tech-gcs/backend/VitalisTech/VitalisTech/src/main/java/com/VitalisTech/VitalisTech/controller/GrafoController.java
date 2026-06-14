package com.VitalisTech.VitalisTech.controller;

import com.VitalisTech.VitalisTech.model.Ambulancia;
import com.VitalisTech.VitalisTech.model.Bairro;
import com.VitalisTech.VitalisTech.model.Gravidade;
import com.VitalisTech.VitalisTech.util.Dijkstra;
import com.VitalisTech.VitalisTech.util.Grafo;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * Gerencia o grafo da cidade e calcula rotas de despacho de ambulâncias.
 * Singleton — use GrafoController.getInstance().
 */
public class GrafoController {

    private static GrafoController instancia;
    private final Grafo grafo;
    private boolean carregado = false;

    // Coordenadas visuais dos bairros para o mapa (x, y)
    private final Map<Integer, double[]> coordenadasVisuais = new HashMap<>();

    private GrafoController() {
        this.grafo = new Grafo();
    }

    public static GrafoController getInstance() {
        if (instancia == null) {
            instancia = new GrafoController();
        }
        return instancia;
    }

    // -------------------------------------------------------------------------
    // Carregamento de dados
    // -------------------------------------------------------------------------

    public void carregarDados(String arquivoBairros, String arquivoConexoes) throws IOException {
        grafo.carregarBairrosCSV(arquivoBairros);
        grafo.carregarConexoesCSV(arquivoConexoes);
        carregado = true;
        inicializarCoordenadasVisuais();
    }

    public void carregarDadosStream(InputStream bairrosStream, InputStream conexoesStream) throws IOException {
        grafo.carregarBairrosStream(bairrosStream);
        grafo.carregarConexoesStream(conexoesStream);
        carregado = true;
        inicializarCoordenadasVisuais();
    }

    /**
     * Carrega os 20 bairros e 60 conexões hardcoded (baseado nos CSVs do projeto).
     */
    public void carregarDadosPadrao() {
        grafo.adicionarVertice(1,  "Jardim América");
        grafo.adicionarVertice(2,  "Centro");
        grafo.adicionarVertice(3,  "Setor Leste");
        grafo.adicionarVertice(4,  "Vila Nova");
        grafo.adicionarVertice(5,  "Alto da Serra");
        grafo.adicionarVertice(6,  "Setor Oeste");
        grafo.adicionarVertice(7,  "Distrito Industrial");
        grafo.adicionarVertice(8,  "Residencial Esperança");
        grafo.adicionarVertice(9,  "Recanto Verde");
        grafo.adicionarVertice(10, "Ecoparque Sul");
        grafo.adicionarVertice(11, "Nova Alvorada");
        grafo.adicionarVertice(12, "Setor das Palmeiras");
        grafo.adicionarVertice(13, "Colina Azul");
        grafo.adicionarVertice(14, "Bela Vista");
        grafo.adicionarVertice(15, "Morada do Sol");
        grafo.adicionarVertice(16, "Setor Central II");
        grafo.adicionarVertice(17, "Lago Azul");
        grafo.adicionarVertice(18, "Residencial Florença");
        grafo.adicionarVertice(19, "Setor Industrial Norte");
        grafo.adicionarVertice(20, "Vale do Cerrado");

        grafo.adicionarArestaBidirecional(9,  16, 6.4);
        grafo.adicionarArestaBidirecional(15, 19, 8.3);
        grafo.adicionarArestaBidirecional(17,  7, 1.2);
        grafo.adicionarArestaBidirecional(3,   5, 12.2);
        grafo.adicionarArestaBidirecional(12,  4, 14.0);
        grafo.adicionarArestaBidirecional(13,  7, 9.2);
        grafo.adicionarArestaBidirecional(13,  6, 19.2);
        grafo.adicionarArestaBidirecional(5,   9, 13.2);
        grafo.adicionarArestaBidirecional(16,  3, 3.4);
        grafo.adicionarArestaBidirecional(8,  10, 12.8);
        grafo.adicionarArestaBidirecional(20,  1, 14.4);
        grafo.adicionarArestaBidirecional(14,  3, 18.1);
        grafo.adicionarArestaBidirecional(2,  18, 1.9);
        grafo.adicionarArestaBidirecional(6,  11, 15.7);
        grafo.adicionarArestaBidirecional(1,  17, 14.5);
        grafo.adicionarArestaBidirecional(3,   4, 19.2);
        grafo.adicionarArestaBidirecional(14, 19, 18.9);
        grafo.adicionarArestaBidirecional(15, 18, 18.5);
        grafo.adicionarArestaBidirecional(20,  2, 14.7);
        grafo.adicionarArestaBidirecional(15, 20, 12.7);
        grafo.adicionarArestaBidirecional(17, 15, 7.9);
        grafo.adicionarArestaBidirecional(4,  12, 6.4);
        grafo.adicionarArestaBidirecional(5,  15, 8.6);
        grafo.adicionarArestaBidirecional(6,   2, 13.4);
        grafo.adicionarArestaBidirecional(14, 15, 9.4);
        grafo.adicionarArestaBidirecional(9,   3, 18.7);
        grafo.adicionarArestaBidirecional(18,  7, 1.7);
        grafo.adicionarArestaBidirecional(18,  9, 9.0);
        grafo.adicionarArestaBidirecional(15, 11, 18.3);
        grafo.adicionarArestaBidirecional(3,   4, 3.0);
        grafo.adicionarArestaBidirecional(7,   2, 13.9);
        grafo.adicionarArestaBidirecional(20,  4, 7.7);
        grafo.adicionarArestaBidirecional(5,  16, 14.3);
        grafo.adicionarArestaBidirecional(13,  4, 12.8);
        grafo.adicionarArestaBidirecional(1,  16, 13.4);
        grafo.adicionarArestaBidirecional(2,   6, 16.7);
        grafo.adicionarArestaBidirecional(11,  8, 16.6);
        grafo.adicionarArestaBidirecional(11, 10, 4.6);
        grafo.adicionarArestaBidirecional(4,   1, 7.0);
        grafo.adicionarArestaBidirecional(11,  7, 14.4);
        grafo.adicionarArestaBidirecional(13,  5, 6.2);
        grafo.adicionarArestaBidirecional(9,  20, 2.7);
        grafo.adicionarArestaBidirecional(13, 15, 8.3);
        grafo.adicionarArestaBidirecional(17, 13, 16.3);
        grafo.adicionarArestaBidirecional(10, 14, 7.9);
        grafo.adicionarArestaBidirecional(8,   1, 17.9);
        grafo.adicionarArestaBidirecional(9,   2, 19.3);
        grafo.adicionarArestaBidirecional(16, 17, 18.4);
        grafo.adicionarArestaBidirecional(6,  14, 9.0);
        grafo.adicionarArestaBidirecional(2,  19, 5.1);
        grafo.adicionarArestaBidirecional(6,   5, 1.3);
        grafo.adicionarArestaBidirecional(2,   1, 1.4);
        grafo.adicionarArestaBidirecional(20, 19, 3.7);
        grafo.adicionarArestaBidirecional(4,   8, 13.1);
        grafo.adicionarArestaBidirecional(4,  19, 3.8);
        grafo.adicionarArestaBidirecional(16, 11, 2.8);
        grafo.adicionarArestaBidirecional(13, 16, 7.8);

        carregado = true;
        inicializarCoordenadasVisuais();
    }

    // -------------------------------------------------------------------------
    // Coordenadas visuais
    // -------------------------------------------------------------------------

    private void inicializarCoordenadasVisuais() {
        coordenadasVisuais.put(1,  new double[]{150, 150});
        coordenadasVisuais.put(2,  new double[]{350, 200});
        coordenadasVisuais.put(3,  new double[]{500, 150});
        coordenadasVisuais.put(4,  new double[]{250, 300});
        coordenadasVisuais.put(5,  new double[]{600, 250});
        coordenadasVisuais.put(6,  new double[]{550, 350});
        coordenadasVisuais.put(7,  new double[]{450, 400});
        coordenadasVisuais.put(8,  new double[]{150, 400});
        coordenadasVisuais.put(9,  new double[]{400, 100});
        coordenadasVisuais.put(10, new double[]{200, 500});
        coordenadasVisuais.put(11, new double[]{650, 450});
        coordenadasVisuais.put(12, new double[]{100, 300});
        coordenadasVisuais.put(13, new double[]{500, 300});
        coordenadasVisuais.put(14, new double[]{350, 450});
        coordenadasVisuais.put(15, new double[]{700, 300});
        coordenadasVisuais.put(16, new double[]{600, 100});
        coordenadasVisuais.put(17, new double[]{300, 100});
        coordenadasVisuais.put(18, new double[]{400, 250});
        coordenadasVisuais.put(19, new double[]{250, 450});
        coordenadasVisuais.put(20, new double[]{300, 350});
    }

    // -------------------------------------------------------------------------
    // Lógica de rota e despacho
    // -------------------------------------------------------------------------

    public Dijkstra.Resultado calcularCaminho(int origemId, int destinoId) {
        return Dijkstra.executar(grafo, origemId, destinoId);
    }

    /**
     * Encapsula o resultado de um despacho de ambulância.
     */
    public static class ResultadoDespacho {
        public final Ambulancia ambulancia;
        public final double distancia;
        public final String rota;
        public final List<Integer> caminhoIds;
        public final boolean sucesso;
        public final String mensagem;
        public final boolean dentroSLA;

        public ResultadoDespacho(Ambulancia ambulancia, double distancia, String rota,
                                 List<Integer> caminhoIds, boolean dentroSLA, String mensagem) {
            this.ambulancia = ambulancia;
            this.distancia = distancia;
            this.rota = rota;
            this.caminhoIds = caminhoIds;
            this.sucesso = ambulancia != null;
            this.mensagem = mensagem;
            this.dentroSLA = dentroSLA;
        }

        public static ResultadoDespacho falha(String mensagem) {
            return new ResultadoDespacho(null, 0, "", null, false, mensagem);
        }
    }

    /**
     * Encontra a melhor ambulância disponível para uma ocorrência no bairro destinoId.
     */
    public ResultadoDespacho encontrarMelhorAmbulancia(int destinoId, Gravidade gravidade,
                                                       List<Ambulancia> frota) {
        if (!carregado) {
            return ResultadoDespacho.falha("Grafo não carregado!");
        }

        Bairro destino = grafo.getBairro(destinoId);
        if (destino == null) {
            return ResultadoDespacho.falha("Bairro de destino não encontrado: id=" + destinoId);
        }

        double slaMaximo = gravidade.getDistanciaMaximaKm();
        Ambulancia melhorAmbulancia = null;
        double menorDistancia = Double.MAX_VALUE;
        Dijkstra.Resultado melhorResultado = null;

        // 1ª passagem: busca dentro do SLA
        for (Ambulancia amb : frota) {
            if (!amb.isDisponivelParaDespacho()) continue;
            if (!amb.isCompativelComGravidade(gravidade)) continue;
            Bairro base = amb.getBase();
            if (base == null) continue;

            Dijkstra.Resultado resultado = Dijkstra.executar(grafo, base.getId(), destinoId);
            if (!resultado.isEncontrado()) continue;

            if (resultado.getDistancia() <= slaMaximo && resultado.getDistancia() < menorDistancia) {
                menorDistancia = resultado.getDistancia();
                melhorAmbulancia = amb;
                melhorResultado = resultado;
            }
        }

        if (melhorAmbulancia != null) {
            String msg = String.format("✓ Ambulância encontrada dentro do SLA! Distância: %.1f km", menorDistancia);
            return new ResultadoDespacho(melhorAmbulancia, menorDistancia,
                    melhorResultado.getCaminhoTexto(), melhorResultado.getCaminhoIds(), true, msg);
        }

        // 2ª passagem: fallback fora do SLA (menor distância possível)
        for (Ambulancia amb : frota) {
            if (!amb.isDisponivelParaDespacho() || !amb.isCompativelComGravidade(gravidade)) continue;
            Bairro base = amb.getBase();
            if (base == null) continue;

            Dijkstra.Resultado resultado = Dijkstra.executar(grafo, base.getId(), destinoId);
            if (resultado.isEncontrado() && resultado.getDistancia() < menorDistancia) {
                menorDistancia = resultado.getDistancia();
                melhorAmbulancia = amb;
                melhorResultado = resultado;
            }
        }

        if (melhorAmbulancia != null) {
            String msg = String.format("⚠️ ATENÇÃO: Ambulância fora do SLA! Distância: %.1f km", menorDistancia);
            return new ResultadoDespacho(melhorAmbulancia, menorDistancia,
                    melhorResultado.getCaminhoTexto(), melhorResultado.getCaminhoIds(), false, msg);
        }

        return ResultadoDespacho.falha("Nenhuma ambulância disponível compatível encontrada!");
    }

    // -------------------------------------------------------------------------
    // Getters
    // -------------------------------------------------------------------------

    public Grafo getGrafo() { return grafo; }
    public boolean isCarregado() { return carregado; }
    public List<Bairro> getBairros() { return grafo.getBairrosOrdenados(); }
    public Bairro getBairro(int id) { return grafo.getBairro(id); }
    public Bairro getBairroPorNome(String nome) { return grafo.getBairroPorNome(nome); }

    public double[] getCoordenadasVisuais(int bairroId) {
        return coordenadasVisuais.getOrDefault(bairroId, new double[]{0, 0});
    }

    public Map<Integer, double[]> getTodasCoordenadasVisuais() {
        return Collections.unmodifiableMap(coordenadasVisuais);
    }
}
