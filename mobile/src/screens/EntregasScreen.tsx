import { useCallback, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EntregaCard } from '../components/EntregaCard';
import { Entrega } from '../models/Entrega';
import { RootStackParamList } from '../navigation/types';
import { listarEntregas } from '../services/api';
import { colors, spacing } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Entregas'>;

export function EntregasScreen({ navigation }: Props): React.JSX.Element {
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async (refresh = false) => {
    refresh ? setAtualizando(true) : setCarregando(true);
    setErro('');

    try {
      setEntregas(await listarEntregas());
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível carregar as entregas.');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void carregar();
    }, [carregar]),
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={atualizando}
            onRefresh={() => void carregar(true)}
            colors={[colors.primary]}
          />
        }
      >
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>OPERAÇÃO</Text>
          <Text style={styles.title}>Entregas ativas</Text>
          <Text style={styles.subtitle}>Puxe para baixo para atualizar os dados.</Text>
        </View>

        {carregando && (
          <View style={styles.stateBox}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.stateText}>Carregando entregas...</Text>
          </View>
        )}

        {!carregando && erro !== '' && (
          <View style={[styles.stateBox, styles.errorBox]}>
            <Text style={styles.errorText}>Não foi possível conectar à API.</Text>
            <Text style={styles.errorDetail}>{erro}</Text>
          </View>
        )}

        {!carregando && erro === '' && entregas.length === 0 && (
          <View style={styles.stateBox}>
            <Text style={styles.stateText}>Nenhuma entrega cadastrada.</Text>
          </View>
        )}

        {!carregando && erro === '' && entregas.length > 0 && (
          <View style={styles.list}>
            {entregas.map((entrega) => (
              <EntregaCard
                key={entrega.id}
                entrega={entrega}
                onPress={() => navigation.navigate('DetalheEntrega', { entrega })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  heading: {
    marginBottom: spacing.lg,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginTop: 4,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  list: {
    gap: spacing.md,
  },
  stateBox: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 14,
    borderStyle: 'dashed',
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.xl,
  },
  stateText: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
  },
  errorBox: {
    backgroundColor: '#fff7f7',
    borderColor: '#fecaca',
  },
  errorText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  errorDetail: {
    color: colors.danger,
    fontSize: 12,
    textAlign: 'center',
  },
});
