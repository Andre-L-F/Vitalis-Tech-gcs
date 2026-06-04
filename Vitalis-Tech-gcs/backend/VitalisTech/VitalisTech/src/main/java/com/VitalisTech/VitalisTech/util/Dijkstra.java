package com.VitalisTech.VitalisTech.util;

import com.VitalisTech.VitalisTech.model.Bairro;

import java.util.*;

/**
 * Implementação do algoritmo de Dijkstra para calcular o caminho mínimo no grafo.
 */
public class Dijkstra {

    private Dijkstra() {}

    /**
     * Executa Dijkstra de origemId até destinoId no grafo fornecido.
     */
    public static Resultado executar(Grafo grafo, int origemId, int destinoId) {
        Map<Integer, Double> dist = new HashMap<>();
        Map<Integer, Integer> prev = new HashMap<>();
        // PriorityQueue: [id, distancia*1000 como long para comparar]
        PriorityQueue<long[]> fila = new PriorityQueue<>(Comparator.comparingLong(a -> a[1]));

        for (Integer id : grafo.getIdsVertices()) {
            dist.put(id, Double.MAX_VALUE);
        }
        dist.put(origemId, 0.0);
        fila.offer(new long[]{origemId, 0});

        while (!fila.isEmpty()) {
            long[] atual = fila.poll();
            int u = (int) atual[0];
            double distAtual = atual[1] / 1000.0;

            // Ignora entradas obsoletas
            if (distAtual > dist.get(u)) continue;
            if (u == destinoId) break;

            for (Grafo.Aresta aresta : grafo.getAdjacentes(u)) {
                double novaDist = dist.get(u) + aresta.peso;
                if (novaDist < dist.getOrDefault(aresta.destino, Double.MAX_VALUE)) {
                    dist.put(aresta.destino, novaDist);
                    prev.put(aresta.destino, u);
                    fila.offer(new long[]{aresta.destino, (long)(novaDist * 1000)});
                }
            }
        }

        Double distFinal = dist.get(destinoId);
        if (distFinal == null || distFinal == Double.MAX_VALUE) {
            return new Resultado(false, Double.MAX_VALUE, Collections.emptyList(), grafo);
        }

        // Reconstruir caminho
        List<Integer> caminho = new ArrayList<>();
        for (Integer at = destinoId; at != null; at = prev.get(at)) {
            caminho.add(0, at);
        }

        return new Resultado(true, distFinal, caminho, grafo);
    }

    /**
     * Encapsula o resultado de uma execução do Dijkstra.
     */
    public static class Resultado {
        private final boolean encontrado;
        private final double distancia;
        private final List<Integer> caminhoIds;
        private final Grafo grafo;

        public Resultado(boolean encontrado, double distancia, List<Integer> caminhoIds, Grafo grafo) {
            this.encontrado = encontrado;
            this.distancia = distancia;
            this.caminhoIds = caminhoIds;
            this.grafo = grafo;
        }

        public boolean isEncontrado() { return encontrado; }

        public double getDistancia() { return distancia; }

        public List<Integer> getCaminhoIds() { return caminhoIds; }

        /**
         * Retorna o caminho como texto legível: "Bairro A → Bairro B → Bairro C"
         */
        public String getCaminhoTexto() {
            if (!encontrado || caminhoIds.isEmpty()) return "Caminho não encontrado";
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < caminhoIds.size(); i++) {
                Bairro b = grafo.getBairro(caminhoIds.get(i));
                sb.append(b != null ? b.getNome() : "Bairro " + caminhoIds.get(i));
                if (i < caminhoIds.size() - 1) sb.append(" → ");
            }
            return sb.toString();
        }
    }
}
