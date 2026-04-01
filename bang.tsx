import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Personagem {
  nome: string;
  hp: number;
  habilidade: string;
}

export default function BangScreen() {
  const [numJogadores, setNumJogadores] = useState<number>(4);
  const [deckAtual, setDeckAtual] = useState<string[]>([]);
  const [papel, setPapel] = useState<string>("?");
  const [personagem, setPersonagem] = useState<Personagem | null>(null);
  const [revelado, setRevelado] = useState<boolean>(false);

  // Lista completa baseada no manual [cite: 113-165]
const listaPersonagens: Personagem[] = [
  { nome: "BART CASSIDY", hp: 8, habilidade: "Pode pegar uma flecha em vez de perder 1 HP (exceto Indígenas/Dinamite)." }, 
  { nome: "BLACK JACK", hp: 8, habilidade: "Pode rerrolar a Dinamite (se não tiver tirado 3 ou mais)." },
  { nome: "PAUL REGRET", hp: 9, habilidade: "Nunca perde pontos de vida para a Metralhadora Gatling." }, 
  { nome: "PEDRO RAMIREZ", hp: 8, habilidade: "Descarte uma flecha para cada ponto de vida que perder." }, 
  { nome: "SUZY LAFAYETTE", hp: 8, habilidade: "Receba 2 HP se não tirou nenhum Alvo 1 ou 2 ao final do turno." }, 
  { nome: "EL GRINGO", hp: 7, habilidade: "Quando um jogador te der dano, ele deve pegar uma flecha." }, 
  { nome: "LUCKY DUKE", hp: 8, habilidade: "Pode fazer uma rerrolagem extra (4 vezes no total)." }, 
  { nome: "JANE CALAMIDADE", hp: 8, habilidade: "Pode usar o Alvo 1 como Alvo 2 e vice-versa." }, 
  { nome: "SID KETCHUM", hp: 8, habilidade: "No início do seu turno, qualquer jogador à escolha ganha 1 HP." }, 
  { nome: "SLAB, O ASSASSINO", hp: 8, habilidade: "Pode usar uma Cerveja para duplicar um Alvo 1 ou 2." }, 
  { nome: "JESSE JONES", hp: 9, habilidade: "Se tiver 4 HP ou menos, ganha 2 HP se usar Cerveja para si mesmo." }, 
  { nome: "JOURDONNAIS", hp: 7, habilidade: "Nunca perde mais do que um ponto de vida para os Indígenas." }, 
  { nome: "KIT CARLSON", hp: 7, habilidade: "Para cada Gatling, descarte uma flecha de qualquer jogador." }, 
  { nome: "ROSE DOOLAN", hp: 9, habilidade: "Pode usar Alvo 1 ou 2 em jogadores a um lugar a mais de distância." },
  { nome: "SAM, O ABUTRE", hp: 9, habilidade: "Ganhe 2 HP cada vez que outro jogador for eliminado." }, 
  { nome: "WILLY THE KID", hp: 8, habilidade: "Precisa de apenas 2 Gatlings para ativar a Metralhadora." }, 
];

  const configPapeis: Record<number, string[]> = {
    4: ["🤠 XERIFE", "🕶️ RENEGADO", "🧨 FORA-DA-LEI", "🧨 FORA-DA-LEI"], // 
    5: ["🤠 XERIFE", "🕶️ RENEGADO", "🧨 FORA-DA-LEI", "🧨 FORA-DA-LEI", "⭐ ASSISTENTE"], // [cite: 22]
    6: ["🤠 XERIFE", "🕶️ RENEGADO", "🧨 FORA-DA-LEI", "🧨 FORA-DA-LEI", "🧨 FORA-DA-LEI", "⭐ ASSISTENTE"],
    7: ["🤠 XERIFE", "🕶️ RENEGADO", "🧨 FORA-DA-LEI", "🧨 FORA-DA-LEI", "🧨 FORA-DA-LEI", "⭐ ASSISTENTE", "⭐ ASSISTENTE"], // [cite: 23]
    8: ["🤠 XERIFE", "🕶️ RENEGADO", "🕶️ RENEGADO", "🧨 FORA-DA-LEI", "🧨 FORA-DA-LEI", "🧨 FORA-DA-LEI", "⭐ ASSISTENTE", "⭐ ASSISTENTE"], // [cite: 24]
  };

  const prepararNovoJogo = () => {
    // Embaralha as identidades 
    let novoDeck = [...configPapeis[numJogadores]];
    novoDeck = novoDeck.sort(() => Math.random() - 0.5);
    
    setDeckAtual(novoDeck);
    setPapel("?");
    setPersonagem(null);
    setRevelado(false);
    Alert.alert("Novo Jogo", `Monte preparado para ${numJogadores} jogadores!`);
  };

  const entregarProximaCarta = () => {
    if (deckAtual.length === 0) {
      Alert.alert("Fim do Monte", "Todas as cartas já foram entregues. Inicie um novo jogo!");
      return;
    }

    const novoDeck = [...deckAtual];
    const papelSorteado = novoDeck.pop()!; // Remove a última carta do deck
    const pSorteado = listaPersonagens[Math.floor(Math.random() * listaPersonagens.length)];
    
    setDeckAtual(novoDeck);
    setPapel(papelSorteado);
    setPersonagem(pSorteado);
    setRevelado(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>BANG! Dice Game 🌵</Text>

      <Text style={styles.label}>1. Escolha o número de jogadores:</Text>
      <View style={styles.selectorRow}>
        {[4, 5, 6, 7, 8].map((n) => (
          <TouchableOpacity 
            key={n} 
            style={[styles.numBtn, numJogadores === n && styles.numBtnActive]}
            onPress={() => setNumJogadores(n)}
          >
            <Text style={styles.numBtnText}>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.btnReset} onPress={prepararNovoJogo}>
        <Text style={styles.btnResetText}>PREPARAR NOVO MONTE</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.deckStatus}>Cartas restantes no monte: {deckAtual.length}</Text>
        
        <Text style={styles.result}>
          {revelado ? `${papel}\n${personagem?.nome}` : "🙈 ??? "}
        </Text>

        {revelado && personagem && (
  <View style={styles.infoBox}>
    {/* Informação de Vida  */}
    <Text style={styles.hpText}>
      ❤️ Vida: {papel.includes("XERIFE") ? personagem.hp + 2 : personagem.hp} Balas
    </Text>
    
    {/* Habilidade do Personagem [cite: 30] */}
    <Text style={styles.habilidadeText}>{personagem.habilidade}</Text>

    {/* Novo Bloco de Objetivo [cite: 15, 16, 17, 18] */}
    <View style={styles.goalBox}>
      <Text style={styles.goalTitle}>🎯 SEU OBJETIVO:</Text>
      <Text style={styles.goalText}>
        {papel.includes("XERIFE") && "Eliminar todos os Foras-da-lei e os Renegados! "}
        {papel.includes("ASSISTENTE") && "Ajudar e proteger o Xerife! "}
        {papel.includes("FORA-DA-LEI") && "Eliminar o Xerife! "}
        {papel.includes("RENEGADO") && "Ser o último sobrevivente no jogo! "}
      </Text>
    </View>
  </View>
)}
        
        
        <TouchableOpacity 
          style={styles.btnRevelar} 
          onPress={() => setRevelado(!revelado)}
          disabled={papel === "?"}
        >
          <Text style={styles.btnRevelarText}>{revelado ? "ESCONDER" : "VER MINHA CARTA"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={entregarProximaCarta}>
        <Text style={styles.buttonText}>PEGAR CARTA DO MONTE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  goalBox: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#4d3b2e', // Uma linha sutil para separar
    width: '100%',
  },
  goalTitle: {
    color: '#d4a373',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  goalText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  container: { flexGrow: 1, backgroundColor: '#2c1e16', alignItems: 'center', padding: 20, paddingTop: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#d4a373', marginBottom: 20 },
  label: { color: '#d4a373', fontSize: 14, marginBottom: 10 },
  selectorRow: { flexDirection: 'row', marginBottom: 15 },
  numBtn: { backgroundColor: '#3d2b1f', padding: 12, borderRadius: 8, marginHorizontal: 4, minWidth: 45, alignItems: 'center', borderWidth: 1, borderColor: '#d4a373' },
  numBtnActive: { backgroundColor: '#d4a373' },
  numBtnText: { color: '#fff', fontWeight: 'bold' },
  btnReset: { backgroundColor: '#5d4037', padding: 12, borderRadius: 10, marginBottom: 25, width: '100%', alignItems: 'center' },
  btnResetText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#3d2b1f', padding: 20, borderRadius: 20, width: '100%', alignItems: 'center', elevation: 5 },
  deckStatus: { color: '#d4a373', fontSize: 12, marginBottom: 15 },
  result: { color: '#fff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  infoBox: { backgroundColor: '#2c1e16', padding: 15, borderRadius: 10, width: '100%', marginBottom: 15 },
  hpText: { color: '#e74c3c', fontWeight: 'bold', fontSize: 18, textAlign: 'center' },
  habilidadeText: { color: '#ddd', fontSize: 13, textAlign: 'center', marginTop: 5 },
  btnRevelar: { backgroundColor: '#795548', padding: 10, borderRadius: 8, width: '100%', alignItems: 'center' },
  btnRevelarText: { color: '#fff', fontWeight: 'bold' },
  button: { backgroundColor: '#d4a373', padding: 20, borderRadius: 10, marginTop: 20, width: '100%', alignItems: 'center' },
  buttonText: { color: '#2c1e16', fontWeight: 'bold', fontSize: 18 },
});