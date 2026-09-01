import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../styles/theme';

type InfoRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

export function InfoRow({ label, value, highlight = false }: InfoRowProps): React.JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, highlight && styles.highlight]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  highlight: {
    color: colors.danger,
    fontWeight: '800',
  },
});
