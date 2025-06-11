import React from 'react';
import { View, Text, Button } from 'react-native';

const InicioScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bienvenido a Recooba</Text>
      <Button
        title="Ir a Garantías"
        onPress={() => navigation.navigate('Garantías')}
      />
      <Button
        title="Agregar nueva garantía"
        onPress={() => navigation.navigate('Agregar Garantía')}
      />
      <Button
        title="Ver listado de garantías"
        onPress={() => navigation.navigate('Listado de Garantías')}
      />

    </View>
  );
};

export default InicioScreen;
