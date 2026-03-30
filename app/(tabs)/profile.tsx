import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, Switch, Alert, FlatList,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import {
  getBrewHistory, deleteBrewEntry, getSettings, saveSettings, getBrewStats,
} from '@/lib/storage';
import { BrewHistoryEntry, AppSettings } from '@/constants/types';

type ProfileView = 'main' | 'history' | 'brew-detail' | 'settings';

export default function ProfileScreen() {
  const colors = useColors();
  const [view, setView] = useState<ProfileView>('main');
  const [history, setHistory] = useState<BrewHistoryEntry[]>([]);
  const [stats, setStats] = useState({ totalBrews: 0, favoriteMethod: null as string | null, averageRating: 0 });
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [selectedBrew, setSelectedBrew] = useState<BrewHistoryEntry | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const [h, s, st] = await Promise.all([getBrewHistory(), getSettings(), getBrewStats()]);
    setHistory(h);
    setSettings(s);
    setStats(st);
  };

  const handleDeleteBrew = (id: string) => {
    Alert.alert('Excluir preparo', 'Tem certeza que deseja excluir este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive',
        onPress: async () => {
          await deleteBrewEntry(id);
          await loadData();
          if (view === 'brew-detail') setView('history');
        },
      },
    ]);
  };

  const updateSetting = async (key: keyof AppSettings, value: unknown) => {
    if (!settings) return;
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await saveSettings({ [key]: value });
  };

  const styles = StyleSheet.create({
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    headerTitle: { fontSize: 26, fontWeight: '700', color: colors.foreground },
    headerSubtitle: { fontSize: 14, color: colors.muted, marginTop: 2 },
    backButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, gap: 6 },
    backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.foreground, paddingHorizontal: 20, marginTop: 20, marginBottom: 12 },
    statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 8 },
    statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    statValue: { fontSize: 24, fontWeight: '700', color: colors.primary },
    statLabel: { fontSize: 11, color: colors.muted, marginTop: 2, textAlign: 'center' },
    menuItem: { backgroundColor: colors.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
    menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', marginRight: 14, borderWidth: 1, borderColor: colors.border },
    menuTitle: { fontSize: 16, fontWeight: '600', color: colors.foreground },
    menuSubtitle: { fontSize: 12, color: colors.muted, marginTop: 1 },
    brewCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginHorizontal: 20, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
    brewMethod: { fontSize: 11, color: colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
    brewName: { fontSize: 16, fontWeight: '700', color: colors.foreground, marginBottom: 4 },
    brewDate: { fontSize: 12, color: colors.muted },
    starsRow: { flexDirection: 'row', gap: 2, marginBottom: 4 },
    detailCard: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, marginHorizontal: 20, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
    detailLabel: { fontSize: 13, color: colors.muted, fontWeight: '600' },
    detailValue: { fontSize: 13, color: colors.foreground, fontWeight: '700' },
    flavorChip: { backgroundColor: colors.background, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: colors.primary, marginRight: 6, marginBottom: 6 },
    flavorChipText: { fontSize: 11, color: colors.primary, fontWeight: '600' },
    flavorRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
    settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
    settingLabel: { fontSize: 16, color: colors.foreground, fontWeight: '500' },
    settingSubtitle: { fontSize: 12, color: colors.muted, marginTop: 1 },
    deleteButton: { backgroundColor: colors.error, borderRadius: 12, padding: 16, marginHorizontal: 20, alignItems: 'center', marginTop: 8 },
    deleteButtonText: { fontSize: 15, fontWeight: '700', color: '#fff' },
    emptyState: { alignItems: 'center', paddingVertical: 40 },
    emptyEmoji: { fontSize: 48, marginBottom: 12 },
    emptyText: { fontSize: 16, color: colors.muted, textAlign: 'center' },
    emptySubtext: { fontSize: 13, color: colors.muted, textAlign: 'center', marginTop: 6 },
  });

  const renderStars = (rating: number) => (
    <View style={styles.starsRow}>
      {[1,2,3,4,5].map(i => (
        <IconSymbol key={i} name={i <= rating ? 'star.fill' : 'star'} size={12} color={i <= rating ? colors.primary : colors.border} />
      ))}
    </View>
  );

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}m ${sec}s`;
  };

  if (view === 'brew-detail' && selectedBrew) {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setView('history')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Histórico</Text>
          </Pressable>
          <View style={styles.detailCard}>
            <Text style={{ fontSize: 22, fontWeight: '700', color: colors.foreground, marginBottom: 4 }}>
              {selectedBrew.recipeName || selectedBrew.methodName}
            </Text>
            <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 8 }}>
              {new Date(selectedBrew.timestamp).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
            {renderStars(selectedBrew.rating)}
          </View>
          <View style={styles.detailCard}>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>Parâmetros</Text>
            {[
              { label: 'Método', value: selectedBrew.methodName },
              { label: 'Dose de café', value: `${selectedBrew.dose}g` },
              { label: 'Água', value: `${selectedBrew.water}g` },
              { label: 'Proporção', value: `1:${selectedBrew.ratio}` },
              { label: 'Volume', value: `${selectedBrew.volume}ml` },
              { label: 'Temperatura', value: `${selectedBrew.waterTemp}°C` },
              { label: 'Moagem', value: selectedBrew.grindSize },
              { label: 'Tempo de preparo', value: formatTime(selectedBrew.brewTime) },
            ].map((d, i) => (
              <View key={i} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{d.label}</Text>
                <Text style={styles.detailValue}>{d.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.detailCard}>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>Perfil Sensorial</Text>
            {[
              { label: 'Corpo', value: selectedBrew.sensorialNotes.body },
              { label: 'Acidez', value: selectedBrew.sensorialNotes.acidity },
              { label: 'Doçura', value: selectedBrew.sensorialNotes.sweetness },
              { label: 'Amargor', value: selectedBrew.sensorialNotes.bitterness },
            ].map((s, i) => (
              <View key={i} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{s.label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={{ width: 60, height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' }}>
                    <View style={{ width: `${s.value * 10}%`, height: '100%', backgroundColor: colors.primary, borderRadius: 3 }} />
                  </View>
                  <Text style={styles.detailValue}>{s.value}/10</Text>
                </View>
              </View>
            ))}
          </View>
          {selectedBrew.flavorNotes.length > 0 && (
            <View style={styles.detailCard}>
              <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>Notas de Sabor</Text>
              <View style={styles.flavorRow}>
                {selectedBrew.flavorNotes.map((f, i) => (
                  <View key={i} style={styles.flavorChip}><Text style={styles.flavorChipText}>{f}</Text></View>
                ))}
              </View>
            </View>
          )}
          {selectedBrew.notes ? (
            <View style={styles.detailCard}>
              <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>Anotações</Text>
              <Text style={{ fontSize: 14, color: colors.foreground, lineHeight: 22 }}>{selectedBrew.notes}</Text>
            </View>
          ) : null}
          <Pressable style={({ pressed }) => [styles.deleteButton, pressed && { opacity: 0.8 }]} onPress={() => handleDeleteBrew(selectedBrew.id)}>
            <Text style={styles.deleteButtonText}>🗑 Excluir este preparo</Text>
          </Pressable>
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (view === 'history') {
    return (
      <ScreenContainer>
        <Pressable style={styles.backButton} onPress={() => setView('main')}>
          <IconSymbol name="chevron.left" size={20} color={colors.primary} />
          <Text style={styles.backText}>Perfil</Text>
        </Pressable>
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text style={styles.headerTitle}>📋 Histórico</Text>
          <Text style={styles.headerSubtitle}>{history.length} preparos registrados</Text>
        </View>
        {history.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>☕</Text>
            <Text style={styles.emptyText}>Nenhum preparo ainda</Text>
            <Text style={styles.emptySubtext}>Seus preparos aparecerão aqui após salvar no diário.</Text>
          </View>
        ) : (
          <FlatList
            data={history}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 32 }}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [styles.brewCard, pressed && { opacity: 0.7 }]}
                onPress={() => { setSelectedBrew(item); setView('brew-detail'); }}
              >
                <Text style={styles.brewMethod}>{item.methodName}</Text>
                <Text style={styles.brewName}>{item.recipeName || 'Sem nome'}</Text>
                {renderStars(item.rating)}
                <Text style={styles.brewDate}>{new Date(item.timestamp).toLocaleDateString('pt-BR')} · {item.dose}g / {item.water}g água</Text>
              </Pressable>
            )}
          />
        )}
      </ScreenContainer>
    );
  }

  if (view === 'settings' && settings) {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setView('main')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Perfil</Text>
          </Pressable>
          <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
            <Text style={styles.headerTitle}>⚙️ Configurações</Text>
          </View>

          <Text style={styles.sectionTitle}>Preparo</Text>
          <View style={{ backgroundColor: colors.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }}>
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingLabel}>Guia por voz (TTS)</Text>
                <Text style={styles.settingSubtitle}>Instruções em áudio durante o preparo</Text>
              </View>
              <Switch
                value={settings.ttsEnabled}
                onValueChange={v => updateSetting('ttsEnabled', v)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingLabel}>Vibração (Haptic)</Text>
                <Text style={styles.settingSubtitle}>Feedback tátil nas ações</Text>
              </View>
              <Switch
                value={settings.hapticEnabled}
                onValueChange={v => updateSetting('hapticEnabled', v)}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Padrões</Text>
          <View style={{ backgroundColor: colors.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }}>
            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingLabel}>Proporção padrão</Text>
                <Text style={styles.settingSubtitle}>1 : {settings.defaultRatio}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Pressable
                  style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => updateSetting('defaultRatio', Math.max(8, settings.defaultRatio - 1))}
                >
                  <Text style={{ color: colors.foreground, fontSize: 18 }}>−</Text>
                </Pressable>
                <Pressable
                  style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => updateSetting('defaultRatio', Math.min(20, settings.defaultRatio + 1))}
                >
                  <Text style={{ color: colors.foreground, fontSize: 18 }}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Sobre</Text>
          <View style={{ backgroundColor: colors.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Barista Pro</Text>
              <Text style={{ color: colors.muted, fontSize: 13 }}>Versão 1.0.0</Text>
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Desenvolvido com ☕</Text>
              <Text style={{ color: colors.muted, fontSize: 13 }}>React Native + Expo</Text>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  // Main profile view
  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>👤 Perfil</Text>
          <Text style={styles.headerSubtitle}>Seu histórico e configurações</Text>
        </View>

        {/* Stats */}
        <Text style={styles.sectionTitle}>Suas Estatísticas</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalBrews}</Text>
            <Text style={styles.statLabel}>Preparos{'\n'}totais</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '—'}</Text>
            <Text style={styles.statLabel}>Avaliação{'\n'}média</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { fontSize: 14 }]} numberOfLines={2}>{stats.favoriteMethod || '—'}</Text>
            <Text style={styles.statLabel}>Método{'\n'}favorito</Text>
          </View>
        </View>

        {/* Menu items */}
        <Text style={styles.sectionTitle}>Minha Conta</Text>
        <View style={{ backgroundColor: colors.surface, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border }}>
          <Pressable
            style={({ pressed }) => [styles.menuItem, pressed && { opacity: 0.7 }]}
            onPress={() => setView('history')}
          >
            <View style={styles.menuIcon}>
              <IconSymbol name="clock.fill" size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuTitle}>Histórico de Preparos</Text>
              <Text style={styles.menuSubtitle}>{history.length} registros salvos</Text>
            </View>
            <IconSymbol name="chevron.right" size={18} color={colors.muted} />
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.menuItem, pressed && { opacity: 0.7 }]}
            onPress={() => setView('settings')}
          >
            <View style={styles.menuIcon}>
              <IconSymbol name="gear" size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuTitle}>Configurações</Text>
              <Text style={styles.menuSubtitle}>TTS, proporções e preferências</Text>
            </View>
            <IconSymbol name="chevron.right" size={18} color={colors.muted} />
          </Pressable>
        </View>

        {/* Recent brews preview */}
        {history.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Preparos Recentes</Text>
            {history.slice(0, 3).map(brew => (
              <Pressable
                key={brew.id}
                style={({ pressed }) => [styles.brewCard, pressed && { opacity: 0.7 }]}
                onPress={() => { setSelectedBrew(brew); setView('brew-detail'); }}
              >
                <Text style={styles.brewMethod}>{brew.methodName}</Text>
                <Text style={styles.brewName}>{brew.recipeName || 'Sem nome'}</Text>
                {renderStars(brew.rating)}
                <Text style={styles.brewDate}>{new Date(brew.timestamp).toLocaleDateString('pt-BR')}</Text>
              </Pressable>
            ))}
            {history.length > 3 && (
              <Pressable
                style={{ alignItems: 'center', paddingVertical: 12 }}
                onPress={() => setView('history')}
              >
                <Text style={{ color: colors.primary, fontSize: 14, fontWeight: '600' }}>Ver todos os {history.length} preparos →</Text>
              </Pressable>
            )}
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
