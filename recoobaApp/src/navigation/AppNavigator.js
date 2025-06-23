import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AgregarGarantiaScreen from '../screens/AgregarGarantiaScreen';
import InicioScreen from '../screens/InicioScreen';
import GarantiasScreen from '../screens/GarantiasScreen';
import ListadoGarantiasScreen from '../screens/ListadoGarantiasScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [sesionKey, setSesionKey] = useState(0); // ⚠️ Forzar recarga tras login/logout

  useEffect(() => {
    const verificarSesion = async () => {
      setUsuarioLogueado(usuario_id);
      setCargando(false);
    };
    verificarSesion();
  }, [sesionKey]); // Se actualiza si cambia el valor

  if (cargando) return null; // Puedes cambiar por una pantalla de carga

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!usuarioLogueado ? (
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                route={{
                  ...props.route,
                  params: {
                    onLoginExitoso: () => setSesionKey((k) => k + 1),
                  },
                }}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Inicio">
              {(props) => (
                <InicioScreen
                  {...props}
                  onCerrarSesion={() => setSesionKey((k) => k + 1)}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Garantías" component={GarantiasScreen} />
            <Stack.Screen name="Agregar Garantía" component={AgregarGarantiaScreen} />
            <Stack.Screen name="Listado de Garantías" component={ListadoGarantiasScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
