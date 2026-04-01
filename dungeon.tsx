import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DungeonScreen() {
  const [vida, setVida] = useState(10);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: '#4b0082' }]}>
        <Text style={styles.cardTitle}>⚔️ VIDA (HP)</Text>
        <Text style={styles.counter}>{vida}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#27ae60' }]} onPress={() => setVida(vida + 1)}>
            <Text style={styles.btnText}>CURAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: '#c0392b' }]} onPress={() => setVida(Math.max(0, vida - 1))}>
            <Text style={styles.btnText}>DANO</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.reset} onPress={() => setVida(10)}>
        <Text style={styles.resetText}>NOVA AVENTURA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, justifyContent: 'center' },
  card: { padding: 30, borderRadius: 25, elevation: 10, alignItems: 'center' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  counter: { fontSize: 80, fontWeight: 'bold', color: '#fff', marginVertical: 20 },
  row: { flexDirection: 'row', gap: 15 },
  btn: { padding: 20, borderRadius: 15, flex: 1, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  reset: { marginTop: 40, alignItems: 'center' },
  resetText: { color: '#888', fontWeight: 'bold' }
});