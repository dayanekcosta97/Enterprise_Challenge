import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '../navigation/types';
import { colors, spacing } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.brandPill}>
          <Text style={styles.brandPillText}>SMART LOGISTICS</Text>
        </View>

        <Image
          source={require('../../assets/icon.png')}
          style={styles.image}
          resizeMode="contain"
          accessibilityLabel="Marca Smart Logistics"
        />

        <View style={styles.copy}>
          <Text style={styles.title}>Smart Logistics 5.0</Text>
          <Text style={styles.subtitle}>Gestão inteligente de entregas</Text>
          <Text style={styles.description}>
            Acompanhe rotas, riscos e ocorrências da operação diretamente pelo celular.
          </Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="VER ENTREGAS"
            onPress={() => navigation.navigate('Entregas')}
            color={colors.primary}
          />
        </View>

        <Text style={styles.footer}>OPERAÇÃO CONECTADA · API SPRING BOOT</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.navy,
    flex: 1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  brandPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.14)',
    borderColor: 'rgba(56, 189, 248, 0.35)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  brandPillText: {
    color: '#7dd3fc',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  image: {
    borderRadius: 24,
    height: 118,
    marginVertical: spacing.xl,
    width: 118,
  },
  copy: {
    alignItems: 'center',
    maxWidth: 340,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
    textAlign: 'center',
  },
  subtitle: {
    color: '#bae6fd',
    fontSize: 17,
    fontWeight: '600',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  description: {
    color: '#bcccdc',
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  buttonWrapper: {
    borderRadius: 10,
    marginTop: spacing.xl,
    minWidth: 230,
    overflow: 'hidden',
  },
  footer: {
    bottom: spacing.lg,
    color: '#829ab1',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    position: 'absolute',
  },
});
