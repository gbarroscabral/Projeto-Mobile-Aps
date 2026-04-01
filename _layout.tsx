import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
  screenOptions={{
    headerStyle: { backgroundColor: '#1a1a1a' },
    headerTintColor: '#d4a373', 
  }}>
  <Stack.Screen name="index" options={{ headerShown: false }} /> 
  <Stack.Screen name="bang" options={{ title: 'BANG! SETUP' }} />
  <Stack.Screen name="coup" options={{ title: 'COUP - MOEDAS' }} />
  {/* VERIFIQUE SE ESTA LINHA ABAIXO EXISTE */}
  <Stack.Screen name="dungeon" options={{ title: 'DUNGEON & DRINKS' }} />
</Stack>
  );
}