package com.VitalisTech.VitalisTech.util;

import com.VitalisTech.VitalisTech.model.Bairro;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

/**
 * Representa o grafo da cidade de Cidália.
 * Vértices = Bairros | Arestas = Ruas com peso em km.
 * Usado para calcular o caminho mínimo com Dijkstra.
 */
public class Grafo {

    /**
     * Representa uma aresta (conexão) entre dois bairros.
     */
    public static class Aresta {
        public final int destino;
        public final double peso; // distância em km

        public Aresta(int destino, double peso) {
            this.destino = destino;
            this.peso = peso;
        }

        @Override
        public String toString() {
            return "-> " + destino + " (" + peso + " km)";
        }
    }

    private final Map<Integer, Bairro> vertices = new HashMap<>();
    private final Map<Integer, List<Aresta>> adjacencias = new HashMap<>();

    public Grafo() {}

    public void adicionarVertice(Bairro bairro) {
        vertices.put(bairro.getId(), bairro);
        adjacencias.putIfAbsent(bairro.getId(), new ArrayList<>());
    }

    public void adicionarVertice(int id, String nome) {
        adicionarVertice(new Bairro(id, nome));
    }

    public void adicionarAresta(int origem, int destino, double peso) {
        if (!vertices.containsKey(origem) || !vertices.containsKey(destino)) return;
        adjacencias.putIfAbsent(origem, new ArrayList<>());
        adjacencias.get(origem).add(new Aresta(destino, peso));
    }

    public void adicionarArestaBidirecional(int origem, int destino, double peso) {
        adicionarAresta(origem, destino, peso);
        adicionarAresta(destino, origem, peso);
    }

    public void carregarBairrosCSV(String caminhoArquivo) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(caminhoArquivo))) {
            carregarBairrosReader(br);
        }
    }

    public void carregarBairrosStream(InputStream is) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
            carregarBairrosReader(br);
        }
    }

    private void carregarBairrosReader(BufferedReader br) throws IOException {
        String linha;
        boolean primeiraLinha = true;
        while ((linha = br.readLine()) != null) {
            if (primeiraLinha) { primeiraLinha = false; continue; }
            String[] partes = linha.split(",", 2);
            if (partes.length < 2) continue;
            adicionarVertice(Integer.parseInt(partes[0].trim()), partes[1].trim());
        }
    }

    public void carregarConexoesCSV(String caminhoArquivo) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(caminhoArquivo))) {
            carregarConexoesReader(br);
        }
    }

    public void carregarConexoesStream(InputStream is) throws IOException {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
            carregarConexoesReader(br);
        }
    }

    private void carregarConexoesReader(BufferedReader br) throws IOException {
        String linha;
        boolean primeiraLinha = true;
        while ((linha = br.readLine()) != null) {
            if (primeiraLinha) { primeiraLinha = false; continue; }
            String[] partes = linha.split(",");
            if (partes.length < 4) continue;
            int origem = Integer.parseInt(partes[1].trim());
            int destino = Integer.parseInt(partes[2].trim());
            double distancia = Double.parseDouble(partes[3].trim());
            adicionarArestaBidirecional(origem, destino, distancia);
        }
    }

    public Bairro getBairro(int id) { return vertices.get(id); }

    public Bairro getBairroPorNome(String nome) {
        return vertices.values().stream()
                .filter(b -> b.getNome().equalsIgnoreCase(nome))
                .findFirst().orElse(null);
    }

    public Collection<Bairro> getBairros() {
        return Collections.unmodifiableCollection(vertices.values());
    }

    public List<Bairro> getBairrosOrdenados() {
        List<Bairro> lista = new ArrayList<>(vertices.values());
        lista.sort(Comparator.comparing(Bairro::getNome));
        return lista;
    }

    public Set<Integer> getIdsVertices() {
        return Collections.unmodifiableSet(vertices.keySet());
    }

    public List<Aresta> getAdjacentes(int id) {
        return adjacencias.getOrDefault(id, Collections.emptyList());
    }

    public int totalVertices() { return vertices.size(); }

    public int totalArestas() {
        return adjacencias.values().stream().mapToInt(List::size).sum() / 2;
    }

    public boolean existeConexao(int origem, int destino) {
        List<Aresta> adj = adjacencias.get(origem);
        if (adj == null) return false;
        return adj.stream().anyMatch(a -> a.destino == destino);
    }

    public void imprimir() {
        System.out.println("=== GRAFO - " + totalVertices() + " vértices, " + totalArestas() + " arestas ===");
        vertices.values().stream()
                .sorted(Comparator.comparingInt(Bairro::getId))
                .forEach(b -> System.out.println("  " + b.getId() + " - " + b.getNome()));
    }
}
