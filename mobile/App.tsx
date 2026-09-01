import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStackParamList } from './src/navigation/types';
import { DetalheEntregaScreen } from './src/screens/DetalheEntregaScreen';
import { EntregasScreen } from './src/screens/EntregasScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { RegistrarOcorrenciaScreen } from './src/screens/RegistrarOcorrenciaScreen';
import { colors } from './src/styles/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: colors.navy },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Entregas" component={EntregasScreen} />
          <Stack.Screen
            name="DetalheEntrega"
            component={DetalheEntregaScreen}
            options={{ title: 'Detalhe da Entrega' }}
          />
          <Stack.Screen
            name="RegistrarOcorrencia"
            component={RegistrarOcorrenciaScreen}
            options={{ title: 'Registrar Ocorrência' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
