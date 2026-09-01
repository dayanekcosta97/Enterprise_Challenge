import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InfoRow } from '../components/InfoRow';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalheEntrega'>;

function formatarEta(eta: string): string {
  const data = new Date(eta);
  return Number.isNaN(data.getTime()) ? eta : data.toLocaleString('pt-BR');
}

export function DetalheEntregaScreen({ navigation, route }: Props): React.JSX.Element {
  const { entrega } = route.params;
  const riscoAlto = entrega.risco.toUpperCase() === 'ALTO';

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>ENTREGA</Text>
          <Text style={styles.title}>{entrega.numero}</Text>
          <Text style={styles.subtitle}>{entrega.cliente}</Text>
        </View>

        <View style={[styles.card, riscoAlto && styles.highRiskCard]}>
          <InfoRow label="Número" value={entrega.numero} />
          <InfoRow label="Cliente" value={entrega.cliente} />
          <InfoRow label="Origem" value={entrega.origem} />
          <InfoRow label="Destino" value={entrega.destino} />
          <InfoRow label="Status" value={entrega.status} />
          <InfoRow label="Risco" value={entrega.risco} highlight={riscoAlto} />
          <InfoRow label="ETA" value={formatarEta(entrega.eta)} />
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Houve um imprevisto?</Text>
          <Text style={styles.noticeText}>
            Registre a ocorrência para recalcular o risco e a previsão de chegada.
          </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="REGISTRAR OCORRÊNCIA"
            onPress={() =>
              navigation.navigate('RegistrarOcorrencia', { entregaId: entrega.id })
            }
            color={colors.danger}
          />
        </View>
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
    fontSize: 27,
    fontWeight: '800',
    marginTop: 4,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 3,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
  },
  highRiskCard: {
    borderColor: '#fecaca',
  },
  notice: {
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  noticeTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  noticeText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  buttonWrapper: {
    borderRadius: 9,
    marginTop: spacing.lg,
    overflow: 'hidden',
  },
});
