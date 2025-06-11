import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AgregarGarantiaScreen = () => {
  const [producto, setProducto] = useState('');
  const [fechaCompra, setFechaCompra] = useState('');
  const [duracion, setDuracion] = useState('');
  const [tienda, setTienda] = useState('');
  const [comentario, setComentario] = useState('');

  const guardarGarantia = async () => {
    if (!producto || !fechaCompra || !duracion || !tienda) {
      Alert.alert('Faltan datos', 'Completa todos los campos obligatorios');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.30:3000/garantias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          producto,
          fechaCompra,
          duracion: parseInt(duracion),
          tienda,
          comentario,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Garantía guardada correctamente');
        setProducto('');
        setFechaCompra('');
        setDuracion('');
        setTienda('');
        setComentario('');
      } else {
        Alert.alert('Error', data.message || 'No se pudo guardar');
      }
    } catch (error) {
      console.error('Error al guardar garantía:', error);
      Alert.alert('Error de conexión', 'No se pudo conectar al servidor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Producto *</Text>
      <TextInput style={styles.input} value={producto} onChangeText={setProducto} />

      <Text style={styles.label}>Fecha de compra *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 2025-06-11"
        value={fechaCompra}
        onChangeText={setFechaCompra}
      />

      <Text style={styles.label}>Duración (meses) *</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={duracion}
        onChangeText={setDuracion}
      />

      <Text style={styles.label}>Tienda *</Text>
      <TextInput style={styles.input} value={tienda} onChangeText={setTienda} />

      <Text style={styles.label}>Comentario</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={comentario}
        onChangeText={setComentario}
      />

      <Button title="Guardar garantía" onPress={guardarGarantia} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
});

export default AgregarGarantiaScreen;
