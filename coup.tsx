import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CoupScreen() {
  const [moedas, setMoedas] = useState(2);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: '#f1c40f' }]}>
        <Text style={styles.cardTitle}>🟡 MOEDAS DO COUP</Text>
        
        {/* O contador fica vermelho ao atingir 10 moedas */}
        <Text style={[styles.counter, moedas === 10 && { color: '#c0392b' }]}>
          {moedas}
        </Text>

        {/* Mensagem de alerta quando atinge o limite */}
        {moedas === 10 && (
          <Text style={styles.warningText}>⚠️ COUP OBRIGATÓRIO!</Text>
        )}

        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.btn} 
            onPress={() => setMoedas(prev => Math.min(10, prev + 1))} // Trava no 10
          >
            <Text style={styles.btnText}>+1 Moeda</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.btn, { backgroundColor: '#e67e22' }]} 
            onPress={() => setMoedas(Math.max(0, moedas - 1))}
          >
            <Text style={styles.btnText}>Gastar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.reset} onPress={() => setMoedas(2)}>
        <Text style={styles.resetText}>RECOMEÇAR PARTIDA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, justifyContent: 'center' },
  card: { padding: 30, borderRadius: 25, elevation: 10, alignItems: 'center' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  counter: { fontSize: 80, fontWeight: 'bold', color: '#333', marginVertical: 10 },
  warningText: { color: '#c0392b', fontWeight: 'bold', marginBottom: 15, fontSize: 14 },
  row: { flexDirection: 'row', gap: 15 },
  btn: { backgroundColor: '#333', padding: 20, borderRadius: 15, flex: 1, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  reset: { marginTop: 40, alignItems: 'center' },
  resetText: { color: '#888', fontWeight: 'bold' }
});