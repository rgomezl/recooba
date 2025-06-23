import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

const ListadoGarantiasScreen = () => {
  const [garantias, setGarantias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerGarantias();
  }, []);

  const obtenerGarantias = async () => {
    try {
      const response = await fetch('http://192.168.1.16:3000/garantias');
      const data = await response.json();
      setGarantias(data);
    } catch (error) {
      console.error('Error al obtener garantías:', error);
    } finally {
      setCargando(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.titulo}>{item.producto}</Text>
      <Text style={styles.info}>🛒 {item.tienda}</Text>
      <Text style={styles.info}>📅 {item.fechaCompra} - {item.duracion} meses</Text>
      {item.comentario ? <Text style={styles.comentario}>📝 {item.comentario}</Text> : null}
    </View>
  );

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando garantías...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={garantias}
      keyExtractor={(item) => item.id?.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text>No hay garantías registradas aún.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 4,
  },
  comentario: {
    marginTop: 6,
    fontStyle: 'italic',
  },
});

export default ListadoGarantiasScreen;
