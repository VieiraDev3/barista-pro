import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, TextInput,
  Alert, Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as Speech from 'expo-speech';
import { useKeepAwake } from 'expo-keep-awake';
import * as Haptics from 'expo-haptics';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { BREWING_METHODS, BrewingMethod, GRIND_SIZES, GrindSize } from '@/constants/brewingMethods';
import { BrewHistoryEntry, SensorialNotes, FLAVOR_NOTES } from '@/constants/types';
import { saveBrewEntry, setLastMethod, getSettings } from '@/lib/storage';

type BrewView = 'select' | 'setup' | 'timer' | 'tasting';

export default function BrewScreen() {
  const colors = useColors();
  const params = useLocalSearchParams<{ methodId?: string }>();

  const [view, setView] = useState<BrewView>('select');
  const [selectedMethod, setSelectedMethod] = useState<BrewingMethod | null>(null);
  const [volume, setVolume] = useState('300');
  const [ratio, setRatio] = useState('15');
  const [grindSize, setGrindSize] = useState<GrindSize>('medium-fine');
  const [ttsEnabled, setTtsEnabled] = useState(true);

  // Timer state
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [brewNotes, setBrewNotes] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastSpokenStep = useRef(-1);

  // Tasting state
  const [sensorial, setSensorial] = useState<SensorialNotes>({ body: 5, acidity: 5, sweetness: 5, bitterness: 5 });
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [rating, setRating] = useState(4);
  const [recipeName, setRecipeName] = useState('');
  const [brewStartTime] = useState(Date.now());

  useKeepAwake();

  useEffect(() => {
    if (params.methodId) {
      const method = BREWING_METHODS.find(m => m.id === params.methodId);
      if (method) {
        setSelectedMethod(method);
        setVolume(String(method.defaultVolume));
        setRatio(String(method.defaultRatio));
        setGrindSize(method.grindSize);
        setView('setup');
      }
    }
    getSettings().then(s => setTtsEnabled(s.ttsEnabled));
  }, [params.methodId]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning]);

  useEffect(() => {
    if (!selectedMethod || !isRunning) return;
    const steps = selectedMethod.steps;
    for (let i = steps.length - 1; i >= 0; i--) {
      if (elapsed >= steps[i].time) {
        if (i !== currentStepIndex) {
          setCurrentStepIndex(i);
          if (ttsEnabled && i !== lastSpokenStep.current) {
            lastSpokenStep.current = i;
            speakInstruction(steps[i].instruction);
            if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
        }
        break;
      }
    }
    // Check if brew is done
    const lastStep = steps[steps.length - 1];
    if (elapsed >= lastStep.time && isRunning) {
      setIsRunning(false);
      if (ttsEnabled) speakInstruction('Preparo concluído! Aproveite seu café.');
      setTimeout(() => setView('tasting'), 1500);
    }
  }, [elapsed, isRunning, selectedMethod, currentStepIndex, ttsEnabled]);

  const speakInstruction = (text: string) => {
    if (Platform.OS !== 'web') {
      Speech.speak(text, { language: 'pt-BR', rate: 0.9 });
    }
  };

  const calcDose = () => {
    const vol = parseFloat(volume) || 300;
    const rat = parseFloat(ratio) || 15;
    return Math.round((vol / rat) * 10) / 10;
  };

  const calcWater = () => parseFloat(volume) || 300;

  const startBrew = async () => {
    if (!selectedMethod) return;
    await setLastMethod(selectedMethod.id);
    setElapsed(0);
    setCurrentStepIndex(0);
    lastSpokenStep.current = -1;
    setView('timer');
    setIsRunning(true);
    if (ttsEnabled) speakInstruction(`Iniciando preparo de ${selectedMethod.name}. ${selectedMethod.steps[0].instruction}`);
  };

  const toggleTimer = () => {
    if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsRunning(prev => !prev);
  };

  const saveBrew = async () => {
    if (!selectedMethod) return;
    const entry: BrewHistoryEntry = {
      id: Date.now().toString(),
      method: selectedMethod.id,
      methodName: selectedMethod.name,
      dose: calcDose(),
      water: calcWater(),
      ratio: parseFloat(ratio) || 15,
      volume: parseFloat(volume) || 300,
      brewTime: elapsed,
      waterTemp: selectedMethod.waterTemp,
      grindSize,
      sensorialNotes: sensorial,
      flavorNotes: selectedFlavors,
      rating,
      recipeName: recipeName || `${selectedMethod.name} — ${new Date().toLocaleDateString('pt-BR')}`,
      notes: brewNotes,
      timestamp: new Date().toISOString(),
    };
    await saveBrewEntry(entry);
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Salvo!', 'Seu preparo foi salvo no diário.', [
      { text: 'OK', onPress: () => { setView('select'); setSelectedMethod(null); setElapsed(0); setBrewNotes(''); setSelectedFlavors([]); setRating(4); setRecipeName(''); } },
    ]);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const styles = StyleSheet.create({
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    headerTitle: { fontSize: 26, fontWeight: '700', color: colors.foreground },
    headerSubtitle: { fontSize: 14, color: colors.muted, marginTop: 2 },
    backButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, gap: 6 },
    backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
    methodCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginHorizontal: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    methodEmoji: { fontSize: 32, marginRight: 14 },
    methodName: { fontSize: 17, fontWeight: '700', color: colors.foreground },
    methodDesc: { fontSize: 12, color: colors.muted, marginTop: 2 },
    badge: { backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8 },
    badgeText: { fontSize: 10, color: colors.background, fontWeight: '700', textTransform: 'uppercase' },
    card: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, marginHorizontal: 20, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
    label: { fontSize: 13, color: colors.muted, fontWeight: '600', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
    input: { backgroundColor: colors.background, borderRadius: 10, padding: 12, fontSize: 18, fontWeight: '700', color: colors.foreground, borderWidth: 1, borderColor: colors.border, textAlign: 'center' },
    calcRow: { flexDirection: 'row', gap: 12 },
    calcCard: { flex: 1, backgroundColor: colors.background, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    calcValue: { fontSize: 22, fontWeight: '700', color: colors.primary },
    calcLabel: { fontSize: 11, color: colors.muted, marginTop: 2 },
    grindRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    grindChip: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7, borderWidth: 1 },
    grindChipText: { fontSize: 12, fontWeight: '600' },
    primaryButton: { backgroundColor: colors.primary, borderRadius: 14, padding: 18, marginHorizontal: 20, alignItems: 'center', marginBottom: 16 },
    primaryButtonText: { fontSize: 17, fontWeight: '700', color: colors.background },
    timerContainer: { alignItems: 'center', paddingVertical: 32 },
    timerDisplay: { fontSize: 72, fontWeight: '700', color: colors.foreground, fontVariant: ['tabular-nums'], letterSpacing: 2 },
    timerPhase: { fontSize: 14, color: colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 },
    stepCard: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, marginHorizontal: 20, marginBottom: 16, borderWidth: 1, borderColor: colors.primary, borderLeftWidth: 4 },
    stepInstruction: { fontSize: 17, color: colors.foreground, lineHeight: 26, fontWeight: '500' },
    nextStep: { fontSize: 13, color: colors.muted, marginTop: 8 },
    timerButtons: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginBottom: 16 },
    timerBtn: { flex: 1, borderRadius: 14, padding: 16, alignItems: 'center' },
    waterProgress: { paddingHorizontal: 20, marginBottom: 16 },
    progressBar: { height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden', marginTop: 6 },
    progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
    sliderRow: { marginBottom: 16 },
    sliderLabel: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    sliderTrack: { height: 6, backgroundColor: colors.border, borderRadius: 3, overflow: 'hidden' },
    sliderFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 3 },
    sliderButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    sliderBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
    sliderBtnText: { fontSize: 20, color: colors.foreground, fontWeight: '700' },
    sliderValue: { fontSize: 18, fontWeight: '700', color: colors.primary, textAlign: 'center', marginTop: 4 },
    flavorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    flavorChip: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1 },
    flavorChipText: { fontSize: 12, fontWeight: '600' },
    starsRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginVertical: 8 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.foreground, marginBottom: 12 },
    notesInput: { backgroundColor: colors.background, borderRadius: 10, padding: 12, fontSize: 14, color: colors.foreground, borderWidth: 1, borderColor: colors.border, minHeight: 80, textAlignVertical: 'top' },
    nameInput: { backgroundColor: colors.background, borderRadius: 10, padding: 12, fontSize: 16, color: colors.foreground, borderWidth: 1, borderColor: colors.border },
  });

  const currentStep = selectedMethod?.steps[currentStepIndex];
  const nextStep = selectedMethod?.steps[currentStepIndex + 1];
  const totalWater = calcWater();
  const currentWaterTarget = currentStep?.waterTarget || 0;
  const waterProgress = totalWater > 0 ? currentWaterTarget / totalWater : 0;

  // ---- SELECT VIEW ----
  if (view === 'select') {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>☕ Preparar</Text>
            <Text style={styles.headerSubtitle}>Escolha seu método de preparo</Text>
          </View>
          {BREWING_METHODS.map(method => (
            <Pressable
              key={method.id}
              style={({ pressed }) => [styles.methodCard, pressed && { opacity: 0.7 }]}
              onPress={() => {
                setSelectedMethod(method);
                setVolume(String(method.defaultVolume));
                setRatio(String(method.defaultRatio));
                setGrindSize(method.grindSize);
                setView('setup');
              }}
            >
              <Text style={styles.methodEmoji}>{method.emoji}</Text>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  <View style={styles.badge}><Text style={styles.badgeText}>{method.difficulty}</Text></View>
                </View>
                <Text style={styles.methodDesc} numberOfLines={1}>{method.description}</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </Pressable>
          ))}
        </ScrollView>
      </ScreenContainer>
    );
  }

  // ---- SETUP VIEW ----
  if (view === 'setup' && selectedMethod) {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setView('select')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Métodos</Text>
          </Pressable>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={styles.headerTitle}>{selectedMethod.emoji} {selectedMethod.name}</Text>
            <Text style={styles.headerSubtitle}>Configure seu preparo</Text>
          </View>

          {/* Volume */}
          <View style={styles.card}>
            <Text style={styles.label}>Volume da bebida (ml)</Text>
            <TextInput
              style={styles.input}
              value={volume}
              onChangeText={setVolume}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>

          {/* Ratio */}
          <View style={styles.card}>
            <Text style={styles.label}>Proporção (1 : X)</Text>
            <View style={styles.sliderRow}>
              <View style={styles.sliderButtons}>
                <Pressable style={styles.sliderBtn} onPress={() => setRatio(r => String(Math.max(8, parseFloat(r) - 1)))}>
                  <Text style={styles.sliderBtnText}>−</Text>
                </Pressable>
                <Text style={styles.sliderValue}>1 : {ratio}</Text>
                <Pressable style={styles.sliderBtn} onPress={() => setRatio(r => String(Math.min(20, parseFloat(r) + 1)))}>
                  <Text style={styles.sliderBtnText}>+</Text>
                </Pressable>
              </View>
              <View style={styles.sliderTrack}>
                <View style={[styles.sliderFill, { width: `${((parseFloat(ratio) - 8) / 12) * 100}%` }]} />
              </View>
            </View>
          </View>

          {/* Calculated values */}
          <View style={[styles.card, { paddingBottom: 16 }]}>
            <Text style={styles.label}>Resultado calculado</Text>
            <View style={styles.calcRow}>
              <View style={styles.calcCard}>
                <Text style={styles.calcValue}>{calcDose()}g</Text>
                <Text style={styles.calcLabel}>Pó de café</Text>
              </View>
              <View style={styles.calcCard}>
                <Text style={styles.calcValue}>{calcWater()}g</Text>
                <Text style={styles.calcLabel}>Água</Text>
              </View>
              <View style={styles.calcCard}>
                <Text style={styles.calcValue}>{selectedMethod.waterTemp}°C</Text>
                <Text style={styles.calcLabel}>Temperatura</Text>
              </View>
            </View>
          </View>

          {/* Grind size */}
          <View style={styles.card}>
            <Text style={styles.label}>Moagem</Text>
            <View style={styles.grindRow}>
              {GRIND_SIZES.map(g => {
                const active = grindSize === g.value;
                return (
                  <Pressable
                    key={g.value}
                    style={[styles.grindChip, { backgroundColor: active ? colors.primary : colors.background, borderColor: active ? colors.primary : colors.border }]}
                    onPress={() => setGrindSize(g.value)}
                  >
                    <Text style={[styles.grindChipText, { color: active ? colors.background : colors.foreground }]}>{g.label}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={{ fontSize: 12, color: colors.muted, marginTop: 8 }}>
              {GRIND_SIZES.find(g => g.value === grindSize)?.description}
            </Text>
          </View>

          {/* TTS toggle */}
          <View style={[styles.card, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
            <View>
              <Text style={styles.label}>Guia por voz</Text>
              <Text style={{ fontSize: 12, color: colors.muted }}>Instruções em áudio durante o preparo</Text>
            </View>
            <Pressable
              style={[styles.grindChip, { backgroundColor: ttsEnabled ? colors.primary : colors.background, borderColor: ttsEnabled ? colors.primary : colors.border }]}
              onPress={() => setTtsEnabled(v => !v)}
            >
              <Text style={[styles.grindChipText, { color: ttsEnabled ? colors.background : colors.foreground }]}>
                {ttsEnabled ? '🔊 Ativo' : '🔇 Inativo'}
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.85 }]}
            onPress={startBrew}
          >
            <Text style={styles.primaryButtonText}>▶ Iniciar Preparo</Text>
          </Pressable>
        </ScrollView>
      </ScreenContainer>
    );
  }

  // ---- TIMER VIEW ----
  if (view === 'timer' && selectedMethod) {
    const phaseLabels: Record<string, string> = { bloom: '🌸 Bloom / Pré-infusão', pour: '💧 Despejo', wait: '⏳ Aguardando', press: '⬇ Pressionando', done: '✅ Concluído' };
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <View style={{ paddingHorizontal: 20, paddingTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.foreground }}>{selectedMethod.emoji} {selectedMethod.name}</Text>
            <Pressable onPress={() => { setIsRunning(false); setView('setup'); }}>
              <IconSymbol name="xmark" size={22} color={colors.muted} />
            </Pressable>
          </View>

          {/* Timer display */}
          <View style={styles.timerContainer}>
            <Text style={styles.timerDisplay}>{formatTime(elapsed)}</Text>
            <Text style={styles.timerPhase}>{currentStep ? phaseLabels[currentStep.phase] : ''}</Text>
          </View>

          {/* Current step */}
          {currentStep && (
            <View style={styles.stepCard}>
              <Text style={styles.stepInstruction}>{currentStep.instruction}</Text>
              {nextStep && (
                <Text style={styles.nextStep}>A seguir: {nextStep.instruction}</Text>
              )}
            </View>
          )}

          {/* Water progress */}
          {currentWaterTarget > 0 && (
            <View style={styles.waterProgress}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 13, color: colors.muted }}>Água despejada</Text>
                <Text style={{ fontSize: 13, fontWeight: '700', color: colors.primary }}>{currentWaterTarget}g / {totalWater}g</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${waterProgress * 100}%` }]} />
              </View>
            </View>
          )}

          {/* Timer controls */}
          <View style={styles.timerButtons}>
            <Pressable
              style={({ pressed }) => [styles.timerBtn, { backgroundColor: isRunning ? colors.warning : colors.primary, opacity: pressed ? 0.8 : 1 }]}
              onPress={toggleTimer}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.background }}>
                {isRunning ? '⏸ Pausar' : '▶ Retomar'}
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.timerBtn, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}
              onPress={() => { setIsRunning(false); setView('tasting'); }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.foreground }}>Finalizar</Text>
            </Pressable>
          </View>

          {/* Quick notes */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.label}>Anotações rápidas</Text>
            <TextInput
              style={styles.notesInput}
              value={brewNotes}
              onChangeText={setBrewNotes}
              placeholder="Anote observações durante o preparo..."
              placeholderTextColor={colors.muted}
              multiline
            />
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  // ---- TASTING VIEW ----
  if (view === 'tasting' && selectedMethod) {
    const sensorialKeys: (keyof SensorialNotes)[] = ['body', 'acidity', 'sweetness', 'bitterness'];
    const sensorialLabels: Record<keyof SensorialNotes, string> = { body: 'Corpo', acidity: 'Acidez', sweetness: 'Doçura', bitterness: 'Amargor' };

    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🍵 Degustação</Text>
            <Text style={styles.headerSubtitle}>Como ficou seu {selectedMethod.name}?</Text>
          </View>

          {/* Rating */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Avaliação geral</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(star => (
                <Pressable key={star} onPress={() => setRating(star)}>
                  <IconSymbol name={star <= rating ? 'star.fill' : 'star'} size={36} color={star <= rating ? colors.primary : colors.border} />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Sensorial sliders */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Perfil sensorial</Text>
            {sensorialKeys.map(key => (
              <View key={key} style={styles.sliderRow}>
                <View style={styles.sliderLabel}>
                  <Text style={{ fontSize: 14, color: colors.foreground, fontWeight: '600' }}>{sensorialLabels[key]}</Text>
                  <Text style={{ fontSize: 14, color: colors.primary, fontWeight: '700' }}>{sensorial[key]}/10</Text>
                </View>
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderFill, { width: `${sensorial[key] * 10}%` }]} />
                </View>
                <View style={styles.sliderButtons}>
                  <Pressable style={styles.sliderBtn} onPress={() => setSensorial(s => ({ ...s, [key]: Math.max(0, s[key] - 1) }))}>
                    <Text style={styles.sliderBtnText}>−</Text>
                  </Pressable>
                  <Text style={{ color: colors.muted, fontSize: 12 }}>0 ←→ 10</Text>
                  <Pressable style={styles.sliderBtn} onPress={() => setSensorial(s => ({ ...s, [key]: Math.min(10, s[key] + 1) }))}>
                    <Text style={styles.sliderBtnText}>+</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          {/* Flavor notes */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Notas de sabor</Text>
            <View style={styles.flavorGrid}>
              {FLAVOR_NOTES.map(flavor => {
                const active = selectedFlavors.includes(flavor);
                return (
                  <Pressable
                    key={flavor}
                    style={[styles.flavorChip, { backgroundColor: active ? colors.primary : colors.background, borderColor: active ? colors.primary : colors.border }]}
                    onPress={() => setSelectedFlavors(prev => active ? prev.filter(f => f !== flavor) : [...prev, flavor])}
                  >
                    <Text style={[styles.flavorChipText, { color: active ? colors.background : colors.foreground }]}>{flavor}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Recipe name */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Nome da receita</Text>
            <TextInput
              style={styles.nameInput}
              value={recipeName}
              onChangeText={setRecipeName}
              placeholder={`${selectedMethod.name} — ${new Date().toLocaleDateString('pt-BR')}`}
              placeholderTextColor={colors.muted}
              returnKeyType="done"
            />
          </View>

          {/* Save button */}
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.85 }]}
            onPress={saveBrew}
          >
            <Text style={styles.primaryButtonText}>💾 Salvar no Diário</Text>
          </Pressable>

          <Pressable
            style={{ alignItems: 'center', paddingVertical: 12 }}
            onPress={() => { setView('select'); setSelectedMethod(null); setElapsed(0); }}
          >
            <Text style={{ color: colors.muted, fontSize: 14 }}>Pular e descartar</Text>
          </Pressable>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return null;
}
