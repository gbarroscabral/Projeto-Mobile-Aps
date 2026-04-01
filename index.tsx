import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameHub() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.mainTitle}>BoardHelper 🎲</Text>
      <Text style={styles.subtitle}>Escolha seu jogo para começar</Text>

      {/* CARD BANG! */}
      <TouchableOpacity 
        style={[styles.gameCard, { backgroundColor: '#2c1e16' }]} 
        onPress={() => router.push('/bang')}// Vai para a aba de Sorteio
      >
        <FontAwesome name="star" size={40} color="#d4a373" />
        <View style={styles.cardInfo}>
          <Text style={styles.gameTitle}>BANG! DICE GAME</Text>
          <Text style={styles.gameDesc}>Sorteio de identidades e personagens</Text>
        </View>
      </TouchableOpacity>

      {/* CARD COUP */}
      <TouchableOpacity 
        style={[styles.gameCard, { backgroundColor: '#f1c40f' }]} 
        onPress={() => router.push('/coup')}
      >
        <FontAwesome name="money" size={40} color="#333" />
        <View style={styles.cardInfo}>
          <Text style={[styles.gameTitle, { color: '#333' }]}>COUP</Text>
          <Text style={[styles.gameDesc, { color: '#555' }]}>Contador de moedas e influências</Text>
        </View>
      </TouchableOpacity>

      {/* CARD DUNGEON & DRINKS */}
      <TouchableOpacity 
        style={[styles.gameCard, { backgroundColor: '#4b0082' }]} 
        onPress={() => router.push('/dungeon')}
      >
        <FontAwesome name="heartbeat" size={40} color="#fff" />
        <View style={styles.cardInfo}>
          <Text style={[styles.gameTitle, { color: '#fff' }]}>DUNGEON & DRINKS</Text>
          <Text style={[styles.gameDesc, { color: '#ddd' }]}>Gestão de vida e monstros</Text>
        </View>
      </TouchableOpacity>

      {/* CARD OS PILARES DA TERRA */}
      <TouchableOpacity 
  style={[styles.gameCard, { backgroundColor: '#795548' }]} // Tom marrom/terroso
  onPress={() => router.push('/pilares')}
>
  <FontAwesome name="fort-awesome" size={40} color="#fff" />
  <View style={styles.cardInfo}>
    <Text style={[styles.gameTitle, { color: '#fff' }]}>OS PILARES DA TERRA</Text>
    <Text style={[styles.gameDesc, { color: '#ddd' }]}>Gestão de vazas, recursos e artesãos</Text>
  </View>
</TouchableOpacity>
      
      <Text style={styles.footer}>Mais jogos em breve...</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  content: { padding: 20, paddingTop: 80, alignItems: 'center' },
  mainTitle: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#888', marginBottom: 40 },
  gameCard: { 
    flexDirection: 'row', 
    width: '100%', 
    padding: 25, 
    borderRadius: 20, 
    marginBottom: 20, 
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardInfo: { marginLeft: 20, flex: 1 },
  gameTitle: { fontSize: 20, fontWeight: 'bold', color: '#d4a373' },
  gameDesc: { fontSize: 12, color: '#aaa', marginTop: 4 },
  footer: { marginTop: 20, color: '#444', fontStyle: 'italic' }
});