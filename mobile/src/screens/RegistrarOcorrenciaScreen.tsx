import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../navigation/types';
import { registrarOcorrencia } from '../services/api';
import { colors, spacing } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'RegistrarOcorrencia'>;

export function RegistrarOcorrenciaScreen({ navigation, route }: Props): React.JSX.Element {
  const [tipo, setTipo] = useState('ATRASO');
  const [severidade, setSeveridade] = useState('CRITICA');
  const [descricao, setDescricao] = useState('Interdição na rota');
  const [tempoAdicional, setTempoAdicional] = useState('45');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  async function registrar(): Promise<void> {
    const minutos = Number(tempoAdicional);

    if (
      tipo.trim() === '' ||
      severidade.trim() === '' ||
      descricao.trim() === '' ||
      !Number.isInteger(minutos) ||
      minutos < 0
    ) {
      setErro('Preencha todos os campos e informe um tempo adicional válido.');
      return;
    }

    setEnviando(true);
    setErro('');
    setSucesso('');

    try {
      await registrarOcorrencia({
        entregaId: route.params.entregaId,
        tipo: tipo.trim().toUpperCase(),
        severidade: severidade.trim().toUpperCase(),
        descricao: descricao.trim(),
        tempoAdicionalMinutos: minutos,
      });

      setSucesso('Ocorrência registrada com sucesso.');
      setTimeout(() => {
        navigation.navigate('Entregas', { refreshAt: Date.now() });
      }, 1200);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Não foi possível registrar a ocorrência.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.heading}>
            <Text style={styles.eyebrow}>ENTREGA #{route.params.entregaId}</Text>
            <Text style={styles.title}>Nova ocorrência</Text>
            <Text style={styles.subtitle}>
              O risco e o ETA serão recalculados conforme a severidade e o tempo informado.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>Tipo</Text>
            <TextInput
              style={styles.input}
              value={tipo}
              onChangeText={setTipo}
              autoCapitalize="characters"
              placeholder="Ex.: ATRASO"
              placeholderTextColor={colors.muted}
            />

            <Text style={styles.label}>Severidade</Text>
            <TextInput
              style={styles.input}
              value={severidade}
              onChangeText={setSeveridade}
              autoCapitalize="characters"
              placeholder="Ex.: CRITICA"
              placeholderTextColor={colors.muted}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholder="Descreva o ocorrido"
              placeholderTextColor={colors.muted}
            />

            <Text style={styles.label}>Tempo adicional em minutos</Text>
            <TextInput
              style={styles.input}
              value={tempoAdicional}
              onChangeText={setTempoAdicional}
              keyboardType="number-pad"
              placeholder="Ex.: 45"
              placeholderTextColor={colors.muted}
            />

            {erro !== '' && <Text style={styles.error}>{erro}</Text>}
            {sucesso !== '' && <Text style={styles.success}>{sucesso}</Text>}

            <View style={styles.buttonWrapper}>
              <Button
                title={enviando ? 'REGISTRANDO...' : 'REGISTRAR'}
                onPress={() => void registrar()}
                disabled={enviando || sucesso !== ''}
                color={colors.primary}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  keyboardView: {
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
    letterSpacing: 1.2,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 4,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    padding: spacing.md,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderColor: '#bcccdc',
    borderRadius: 9,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    minHeight: 46,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  textArea: {
    minHeight: 100,
  },
  error: {
    backgroundColor: colors.dangerSoft,
    borderRadius: 8,
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  success: {
    backgroundColor: colors.successSoft,
    borderRadius: 8,
    color: colors.success,
    fontSize: 13,
    fontWeight: '700',
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  buttonWrapper: {
    borderRadius: 9,
    marginTop: spacing.lg,
    overflow: 'hidden',
  },
});
