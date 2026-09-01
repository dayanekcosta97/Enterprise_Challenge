import { Button, StyleSheet, Text, View } from 'react-native';

import { Entrega } from '../models/Entrega';
import { colors, spacing } from '../styles/theme';

type EntregaCardProps = {
  entrega: Entrega;
  onPress: () => void;
};

function formatarEta(eta: string): string {
  const data = new Date(eta);
  return Number.isNaN(data.getTime()) ? eta : data.toLocaleString('pt-BR');
}

export function EntregaCard({ entrega, onPress }: EntregaCardProps): React.JSX.Element {
  const riscoAlto = entrega.risco.toUpperCase() === 'ALTO';

  return (
    <View style={[styles.card, riscoAlto && styles.highRiskCard]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.number}>{entrega.numero}</Text>
          <Text style={styles.client}>{entrega.cliente}</Text>
        </View>
        <Text style={[styles.risk, riscoAlto && styles.highRisk]}>{entrega.risco}</Text>
      </View>

      <View style={styles.route}>
        <Text style={styles.routeLabel}>ORIGEM</Text>
        <Text style={styles.routeValue}>{entrega.origem}</Text>
        <Text style={styles.arrow}>↓</Text>
        <Text style={styles.routeLabel}>DESTINO</Text>
        <Text style={styles.routeValue}>{entrega.destino}</Text>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>STATUS</Text>
          <Text style={styles.metaValue}>{entrega.status}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaLabel}>ETA</Text>
          <Text style={styles.metaValue}>{formatarEta(entrega.eta)}</Text>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <Button title="VER DETALHES" onPress={onPress} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    padding: spacing.md,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  highRiskCard: {
    borderColor: '#fecaca',
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  client: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 3,
  },
  risk: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    overflow: 'hidden',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  highRisk: {
    backgroundColor: colors.dangerSoft,
    color: colors.danger,
  },
  route: {
    backgroundColor: colors.background,
    borderRadius: 12,
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  routeLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '700',
  },
  routeValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  arrow: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
    marginVertical: 2,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginVertical: spacing.md,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '700',
  },
  metaValue: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  buttonWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});
