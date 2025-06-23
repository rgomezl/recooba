import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, route }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const iniciarSesion = async () => {
    if (!correo || !contraseña) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      console.log('🟡 Enviando datos a backend...');
      const response = await fetch('http://192.168.1.16:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo, password: contraseña }),
      });

      console.log('🟡 Código de respuesta:', response.status);
      const data = await response.json();
      console.log('🔵 Respuesta parseada:', data);

      if (response.ok && data.usuario && data.usuario.id) {
        await AsyncStorage.setItem('usuario_id', data.usuario.id.toString());
        console.log('✅ Login exitoso. Redirigiendo...');

        // Notificar a AppNavigator para recargar
        const onLoginExitoso = route.params?.onLoginExitoso;
        if (onLoginExitoso) onLoginExitoso();
      } else {
        console.warn('⚠️ Login fallido. Respuesta incompleta:', data);
        Alert.alert('Error', data.error || 'Credenciales inválidas');
      }

    } catch (error) {
      console.error('❌ Error en fetch o JSON:', error);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contraseña}
        onChangeText={setContraseña}
      />
      <Button title="Ingresar" onPress={iniciarSesion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
