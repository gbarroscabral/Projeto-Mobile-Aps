import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PilaresCartasScreen() {
  const [pontos, setPontos] = useState(0);
  const [vazasGanhas, setVazasGanhas] = useState(0);
  
  // Recursos do jogo de cartas
  const [madeira, setMadeira] = useState(1);
  const [pedra, setPedra] = useState(1);
  const [areia, setAreia] = useState(1);
  const [metal, setMetal] = useState(0);

  const resetRodada = () => {
    setVazasGanhas(0);
    // Mantemos os pontos e recursos para a próxima das 6 rodadas
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Placar de Pontos de Vitória */}
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreLabel}>PONTOS DE VITÓRIA </Text>
        <Text style={styles.scoreValue}>{pontos}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btnScore} onPress={() => setPontos(Math.max(0, pontos - 1))}>
            <Text style={styles.btnText}>-1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnScore} onPress={() => setPontos(pontos + 1)}>
            <Text style={styles.btnText}>+1</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Controle de Vazas da Rodada */}
      <View style={styles.vazaCard}>
        <Text style={styles.vazaTitle}>VAZAS GANHAS NESTA RODADA</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => setVazasGanhas(Math.max(0, vazasGanhas - 1))} style={styles.vazaBtn}>
            <Text style={styles.vazaBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.vazaCount}>{vazasGanhas}</Text>
          <TouchableOpacity onPress={() => setVazasGanhas(vazasGanhas + 1)} style={styles.vazaBtn}>
            <Text style={styles.vazaBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.vazaHint}>Lembre-se: O artesão mais alto vence!</Text>
      </View>

      <Text style={styles.sectionTitle}>Seu Estoque de Materiais</Text>

      {/* Grid de Recursos */}
      <View style={styles.resourceGrid}>
        <ResourceItem nome="🪵 Madei." cor="#8b4513" val={madeira} set={setMadeira} />
        <ResourceItem nome="🪨 Pedra" cor="#7f8c8d" val={pedra} set={setPedra} />
        <ResourceItem nome="⏳ Areia" cor="#edae49" val={areia} set={setAreia} />
        <ResourceItem nome="⛓️ Metal" cor="#2c3e50" val={metal} set={setMetal} />
      </View>

      <TouchableOpacity style={styles.btnNext} onPress={resetRodada}>
        <Text style={styles.btnNextText}>PRÓXIMA RODADA (LIMPAR VAZAS)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Componente Interno para os Itens de Recurso
const ResourceItem = ({ nome, cor, val, set }: any) => (
  <View style={[styles.resItem, { borderColor: cor }]}>
    <Text style={styles.resName}>{nome}</Text>
    <Text style={styles.resVal}>{val}</Text>
    <View style={styles.resRow}>
      <TouchableOpacity onPress={() => set(Math.max(0, val - 1))} style={styles.resBtn}><Text style={{color:'#fff'}}>-</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => set(val + 1)} style={styles.resBtn}><Text style={{color:'#fff'}}>+</Text></TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20 },
  scoreBoard: { backgroundColor: '#2c3e50', padding: 20, borderRadius: 20, alignItems: 'center', marginBottom: 20 },
  scoreLabel: { color: '#bdc3c7', fontSize: 10, fontWeight: 'bold' },
  scoreValue: { color: '#fff', fontSize: 50, fontWeight: 'bold' },
  row: { flexDirection: 'row', marginTop: 10 },
  btnScore: { backgroundColor: '#34495e', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8, marginHorizontal: 5 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  vazaCard: { backgroundColor: '#d4a373', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 25 },
  vazaTitle: { color: '#2c1e16', fontWeight: 'bold', fontSize: 14 },
  vazaCount: { fontSize: 40, fontWeight: 'bold', color: '#2c1e16', marginHorizontal: 30 },
  vazaBtn: { backgroundColor: '#2c1e16', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  vazaBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  vazaHint: { color: '#5d4037', fontSize: 10, marginTop: 5, fontStyle: 'italic' },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  resourceGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  resItem: { width: '48%', backgroundColor: '#1e1e1e', padding: 15, borderRadius: 12, marginBottom: 15, borderTopWidth: 4, alignItems: 'center' },
  resName: { color: '#aaa', fontSize: 12, fontWeight: 'bold' },
  resVal: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginVertical: 5 },
  resRow: { flexDirection: 'row', gap: 10 },
  resBtn: { backgroundColor: '#333', padding: 10, borderRadius: 8, width: 40, alignItems: 'center' },
  btnNext: { marginTop: 10, padding: 20, backgroundColor: '#34495e', borderRadius: 12, alignItems: 'center' },
  btnNextText: { color: '#fff', fontWeight: 'bold' }
});