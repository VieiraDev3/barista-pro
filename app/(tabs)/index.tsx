import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { getBrewHistory, getLastMethod } from '@/lib/storage';
import { getMethodById, BREWING_METHODS } from '@/constants/brewingMethods';
import { BrewHistoryEntry, TIPS_OF_THE_DAY } from '@/constants/types';

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const [recentBrews, setRecentBrews] = useState<BrewHistoryEntry[]>([]);
  const [lastMethodId, setLastMethodId] = useState<string | null>(null);
  const [tip, setTip] = useState(TIPS_OF_THE_DAY[0]);

  useEffect(() => {
    loadData();
    // Pick a daily tip based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setTip(TIPS_OF_THE_DAY[dayOfYear % TIPS_OF_THE_DAY.length]);
  }, []);

  const loadData = async () => {
    const history = await getBrewHistory();
    setRecentBrews(history.slice(0, 3));
    const lastMethod = await getLastMethod();
    setLastMethodId(lastMethod);
  };

  const lastMethod = lastMethodId ? getMethodById(lastMethodId) : null;
  const featuredMethod = BREWING_METHODS[Math.floor(Date.now() / 86400000) % BREWING_METHODS.length];

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 8,
    },
    greeting: {
      fontSize: 14,
      color: colors.muted,
      marginBottom: 2,
    },
    title: {
      fontSize: 26,
      fontWeight: '700',
      color: colors.foreground,
    },
    logoContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.foreground,
      paddingHorizontal: 20,
      marginTop: 24,
      marginBottom: 12,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    quickBrewCard: {
      backgroundColor: colors.primary,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    quickBrewEmoji: {
      fontSize: 40,
    },
    quickBrewTitle: {
      fontSize: 13,
      color: colors.background,
      opacity: 0.8,
      marginBottom: 4,
    },
    quickBrewMethod: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.background,
    },
    quickBrewButton: {
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    quickBrewButtonText: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 13,
    },
    tipCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 20,
      borderLeftWidth: 3,
      borderLeftColor: colors.primary,
      borderWidth: 1,
      borderColor: colors.border,
    },
    tipCategory: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 6,
    },
    tipText: {
      fontSize: 14,
      color: colors.foreground,
      lineHeight: 22,
    },
    brewCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 14,
      marginRight: 12,
      width: 180,
      borderWidth: 1,
      borderColor: colors.border,
    },
    brewCardMethod: {
      fontSize: 12,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: 4,
    },
    brewCardName: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.foreground,
      marginBottom: 6,
    },
    brewCardDate: {
      fontSize: 11,
      color: colors.muted,
    },
    starsRow: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    featuredCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    featuredEmoji: {
      fontSize: 36,
      marginRight: 14,
    },
    featuredDifficulty: {
      fontSize: 11,
      color: colors.primary,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 3,
    },
    featuredName: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.foreground,
      marginBottom: 3,
    },
    featuredDesc: {
      fontSize: 12,
      color: colors.muted,
      lineHeight: 18,
    },
    emptyText: {
      fontSize: 13,
      color: colors.muted,
      textAlign: 'center',
      paddingVertical: 16,
    },
    methodGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 16,
      gap: 10,
    },
    methodChip: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    methodChipText: {
      fontSize: 13,
      color: colors.foreground,
      fontWeight: '500',
    },
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <IconSymbol
        key={i}
        name={i < rating ? 'star.fill' : 'star'}
        size={10}
        color={i < rating ? colors.primary : colors.border}
      />
    ));
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bem-vindo ao</Text>
            <Text style={styles.title}>Barista Pro ☕</Text>
          </View>
          <Pressable
            style={({ pressed }) => [styles.logoContainer, pressed && { opacity: 0.7 }]}
           onPress={() => router.push('/(tabs)/profile' as never)}
          >
            <IconSymbol name="person.fill" size={22} color={colors.primary} />
          </Pressable>
        </View>

        {/* Quick Brew */}
        <Text style={styles.sectionTitle}>Preparo Rápido</Text>
        {lastMethod ? (
          <Pressable
            style={({ pressed }) => [styles.quickBrewCard, pressed && { opacity: 0.9 }]}
            onPress={() => router.push({ pathname: '/(tabs)/brew' as never, params: { methodId: lastMethod.id } })}
          >
            <View>
              <Text style={styles.quickBrewTitle}>Último método usado</Text>
              <Text style={styles.quickBrewMethod}>{lastMethod.emoji} {lastMethod.name}</Text>
            </View>
            <View>
              <Text style={styles.quickBrewEmoji}>{lastMethod.emoji}</Text>
              <View style={styles.quickBrewButton}>
                <Text style={styles.quickBrewButtonText}>Preparar</Text>
              </View>
            </View>
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [styles.quickBrewCard, pressed && { opacity: 0.9 }]}
            onPress={() => router.push('/(tabs)/brew' as never)}
          >
            <View>
              <Text style={styles.quickBrewTitle}>Comece a explorar</Text>
              <Text style={styles.quickBrewMethod}>☕ Escolha um método</Text>
            </View>
            <View style={styles.quickBrewButton}>
              <Text style={styles.quickBrewButtonText}>Preparar</Text>
            </View>
          </Pressable>
        )}

        {/* Tip of the Day */}
        <Text style={styles.sectionTitle}>Dica do Dia</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipCategory}>💡 {tip.category}</Text>
          <Text style={styles.tipText}>{tip.tip}</Text>
        </View>

        {/* Recent Brews */}
        <Text style={styles.sectionTitle}>Preparos Recentes</Text>
        {recentBrews.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 4 }}
          >
            {recentBrews.map(brew => (
              <Pressable
                key={brew.id}
                style={({ pressed }) => [styles.brewCard, pressed && { opacity: 0.7 }]}
                onPress={() => router.push('/(tabs)/profile' as never)}
              >
                <Text style={styles.brewCardMethod}>{brew.methodName}</Text>
                <Text style={styles.brewCardName} numberOfLines={1}>{brew.recipeName || 'Sem nome'}</Text>
                <View style={styles.starsRow}>{renderStars(brew.rating)}</View>
                <Text style={styles.brewCardDate}>
                  {new Date(brew.timestamp).toLocaleDateString('pt-BR')}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.card}>
            <Text style={styles.emptyText}>Nenhum preparo ainda. Comece sua jornada! ☕</Text>
          </View>
        )}

        {/* Featured Method */}
        <Text style={styles.sectionTitle}>Método em Destaque</Text>
        <Pressable
          style={({ pressed }) => [styles.featuredCard, pressed && { opacity: 0.8 }]}
          onPress={() => router.push({ pathname: '/(tabs)/brew' as never, params: { methodId: featuredMethod.id } })}
        >
          <Text style={styles.featuredEmoji}>{featuredMethod.emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.featuredDifficulty}>{featuredMethod.difficulty}</Text>
            <Text style={styles.featuredName}>{featuredMethod.name}</Text>
            <Text style={styles.featuredDesc} numberOfLines={2}>{featuredMethod.description}</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.muted} />
        </Pressable>

        {/* Browse Methods */}
        <Text style={styles.sectionTitle}>Métodos de Preparo</Text>
        <View style={styles.methodGrid}>
          {BREWING_METHODS.map(method => (
            <Pressable
              key={method.id}
              style={({ pressed }) => [styles.methodChip, pressed && { opacity: 0.7 }]}
              onPress={() => router.push({ pathname: '/(tabs)/brew' as never, params: { methodId: method.id } })}
            >
              <Text style={{ fontSize: 16 }}>{method.emoji}</Text>
              <Text style={styles.methodChipText}>{method.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
