import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgregarGarantiaScreen from '../screens/AgregarGarantiaScreen';
import InicioScreen from '../screens/InicioScreen';
import GarantiasScreen from '../screens/GarantiasScreen';
import ListadoGarantiasScreen from '../screens/ListadoGarantiasScreen';

// Importing necessary components from React Navigation

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Garantías" component={GarantiasScreen} />
        <Stack.Screen name="Agregar Garantía" component={AgregarGarantiaScreen} />
        <Stack.Screen name="Listado de Garantías" component={ListadoGarantiasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
