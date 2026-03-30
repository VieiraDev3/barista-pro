import React, { useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, Image,
} from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { KNOWLEDGE_DATA, KnowledgeItem } from '@/constants/knowledgeData';
import { BREWING_METHODS, BrewingMethod } from '@/constants/brewingMethods';
import { useRouter } from 'expo-router';

type KnowledgeView = 'categories' | 'beans' | 'methods' | 'techniques' | 'method-detail' | 'item-detail';

export default function KnowledgeScreen() {
  const colors = useColors();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<KnowledgeView>('categories');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<BrewingMethod | null>(null);

  const styles = StyleSheet.create({
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    headerTitle: { fontSize: 26, fontWeight: '700', color: colors.foreground },
    headerSubtitle: { fontSize: 14, color: colors.muted, marginTop: 2 },
    backButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, gap: 6 },
    backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
    categoryCard: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, marginHorizontal: 20, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    categoryEmoji: { fontSize: 36, marginRight: 16 },
    categoryTitle: { fontSize: 18, fontWeight: '700', color: colors.foreground, marginBottom: 4 },
    categoryDesc: { fontSize: 13, color: colors.muted, lineHeight: 18 },
    itemCard: { backgroundColor: colors.surface, borderRadius: 12, padding: 16, marginHorizontal: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    itemEmoji: { fontSize: 28, marginRight: 14, width: 40, textAlign: 'center' },
    itemTitle: { fontSize: 16, fontWeight: '700', color: colors.foreground, marginBottom: 2 },
    itemSubtitle: { fontSize: 12, color: colors.muted, fontStyle: 'italic' },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.foreground, paddingHorizontal: 20, marginTop: 20, marginBottom: 12 },
    detailCard: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, marginHorizontal: 20, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
    detailTitle: { fontSize: 22, fontWeight: '700', color: colors.foreground, marginBottom: 4 },
    detailSubtitle: { fontSize: 14, color: colors.muted, fontStyle: 'italic', marginBottom: 12 },
    detailContent: { fontSize: 15, color: colors.foreground, lineHeight: 24 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
    detailLabel: { fontSize: 13, color: colors.muted, fontWeight: '600' },
    detailValue: { fontSize: 13, color: colors.foreground, fontWeight: '700' },
    flavorChip: { backgroundColor: colors.background, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 1, borderColor: colors.primary, marginRight: 8, marginBottom: 8 },
    flavorChipText: { fontSize: 12, color: colors.primary, fontWeight: '600' },
    flavorRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
    tipItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 8 },
    tipText: { fontSize: 13, color: colors.foreground, lineHeight: 20, flex: 1 },
    stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
    stepTime: { backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, minWidth: 48, alignItems: 'center' },
    stepTimeText: { fontSize: 11, color: colors.background, fontWeight: '700' },
    stepInstruction: { fontSize: 14, color: colors.foreground, lineHeight: 20, flex: 1 },
    brewButton: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, marginHorizontal: 20, alignItems: 'center', marginBottom: 24 },
    brewButtonText: { fontSize: 16, fontWeight: '700', color: colors.background },
    badge: { backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8 },
    badgeText: { fontSize: 10, color: colors.background, fontWeight: '700', textTransform: 'uppercase' },
    difficultyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  });

  const formatTime = (seconds: number) => {
    if (seconds >= 3600) return `${Math.floor(seconds / 3600)}h`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m${s > 0 ? ` ${s}s` : ''}` : `${s}s`;
  };

  if (currentView === 'item-detail' && selectedItem) {
    const parentCat = KNOWLEDGE_DATA.find(c => c.items.some(i => i.id === selectedItem.id));
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setCurrentView(parentCat?.id === 'beans' ? 'beans' : 'techniques')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Voltar</Text>
          </Pressable>
          <View style={styles.detailCard}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>{selectedItem.emoji}</Text>
            <Text style={styles.detailTitle}>{selectedItem.title}</Text>
            <Text style={styles.detailSubtitle}>{selectedItem.subtitle}</Text>
            <Text style={styles.detailContent}>{selectedItem.content}</Text>
          </View>
          {selectedItem.details && selectedItem.details.length > 0 && (
            <View style={styles.detailCard}>
              <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>Ficha Técnica</Text>
              {selectedItem.details.map((d, i) => (
                <View key={i} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{d.label}</Text>
                  <Text style={styles.detailValue}>{d.value}</Text>
                </View>
              ))}
            </View>
          )}
          {selectedItem.flavorProfile && selectedItem.flavorProfile.length > 0 && (
            <View style={styles.detailCard}>
              <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>Perfil de Sabor</Text>
              <View style={styles.flavorRow}>
                {selectedItem.flavorProfile.map((f, i) => (
                  <View key={i} style={styles.flavorChip}><Text style={styles.flavorChipText}>{f}</Text></View>
                ))}
              </View>
            </View>
          )}
          {selectedItem.tips && selectedItem.tips.length > 0 && (
            <View style={styles.detailCard}>
              <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>Dicas</Text>
              {selectedItem.tips.map((tip, i) => (
                <View key={i} style={styles.tipItem}>
                  <Text style={{ color: colors.primary, fontSize: 16 }}>💡</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (currentView === 'method-detail' && selectedMethod) {
    // Get the tool image path
    const toolImageMap: Record<string, any> = {
      'v60': require('@/assets/images/brewing-methods/v60.jpg'),
      'melitta': require('@/assets/images/brewing-methods/melitta.jpg'),
      'chemex': require('@/assets/images/brewing-methods/chemex.jpg'),
      'french-press': require('@/assets/images/brewing-methods/french-press.jpg'),
      'aeropress': require('@/assets/images/brewing-methods/aeropress.webp'),
      'moka': require('@/assets/images/brewing-methods/moka.jpg'),
      'cold-brew': require('@/assets/images/brewing-methods/cold-brew.jpg'),
      'espresso': require('@/assets/images/brewing-methods/v60.jpg'), // placeholder
    };
    const toolImage = toolImageMap[selectedMethod.id];

    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setCurrentView('methods')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Métodos</Text>
          </Pressable>
          {/* Tool Image */}
          {toolImage && (
            <View style={[styles.detailCard, { paddingHorizontal: 0, paddingVertical: 0, marginBottom: 16, overflow: 'hidden', borderRadius: 16 }]}>
              <Image source={toolImage} style={{ width: '100%', height: 240, resizeMode: 'cover' }} />
            </View>
          )}
          <View style={styles.detailCard}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>{selectedMethod.emoji}</Text>
            <View style={styles.difficultyRow}>
              <Text style={styles.detailTitle}>{selectedMethod.name}</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>{selectedMethod.difficulty}</Text></View>
            </View>
            <Text style={styles.detailContent}>{selectedMethod.description}</Text>
          </View>
          {/* History Section */}
          <View style={styles.detailCard}>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>História</Text>
            <Text style={styles.detailContent}>{selectedMethod.history}</Text>
            <View style={[styles.detailRow, { borderBottomWidth: 0, paddingVertical: 12, marginTop: 12 }]}>
              <Text style={styles.detailLabel}>Origem</Text>
              <Text style={styles.detailValue}>{selectedMethod.origin}</Text>
            </View>
            <View style={[styles.detailRow, { borderBottomWidth: 0, paddingVertical: 12 }]}>
              <Text style={styles.detailLabel}>Inventor</Text>
              <Text style={styles.detailValue}>{selectedMethod.inventor}</Text>
            </View>
          </View>
          <View style={styles.detailCard}>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>Ficha Técnica</Text>
            {[
              { label: 'Proporção', value: `1:${selectedMethod.defaultRatio}` },
              { label: 'Volume padrão', value: `${selectedMethod.defaultVolume}ml` },
              { label: 'Temperatura', value: `${selectedMethod.waterTemp}°C` },
              { label: 'Tempo total', value: formatTime(selectedMethod.totalTime) },
              { label: 'Moagem', value: selectedMethod.grindDescription },
            ].map((d, i) => (
              <View key={i} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{d.label}</Text>
                <Text style={styles.detailValue}>{d.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.detailCard}>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>Passo a Passo</Text>
            {selectedMethod.steps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepTime}><Text style={styles.stepTimeText}>{formatTime(step.time)}</Text></View>
                <Text style={styles.stepInstruction}>{step.instruction}</Text>
              </View>
            ))}
          </View>
          {selectedMethod.tips.length > 0 && (
            <View style={styles.detailCard}>
              <Text style={[styles.sectionTitle, { paddingHorizontal: 0, marginTop: 0 }]}>Dicas do Barista</Text>
              {selectedMethod.tips.map((tip, i) => (
                <View key={i} style={styles.tipItem}>
                  <Text style={{ color: colors.primary, fontSize: 16 }}>💡</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          )}
          <Pressable
            style={({ pressed }) => [styles.brewButton, pressed && { opacity: 0.8 }]}
            onPress={() => router.push({ pathname: '/(tabs)/brew' as never, params: { methodId: selectedMethod.id } })}
          >
            <Text style={styles.brewButtonText}>☕ Preparar com este método</Text>
          </Pressable>
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (currentView === 'methods') {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setCurrentView('categories')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Voltar</Text>
          </Pressable>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={styles.headerTitle}>☕ Métodos de Preparo</Text>
            <Text style={styles.headerSubtitle}>Fichas técnicas e instruções detalhadas</Text>
          </View>
          {BREWING_METHODS.map(method => (
            <Pressable
              key={method.id}
              style={({ pressed }) => [styles.itemCard, pressed && { opacity: 0.7 }]}
              onPress={() => { setSelectedMethod(method); setCurrentView('method-detail'); }}
            >
              <Text style={styles.itemEmoji}>{method.emoji}</Text>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.itemTitle}>{method.name}</Text>
                  <View style={styles.badge}><Text style={styles.badgeText}>{method.difficulty}</Text></View>
                </View>
                <Text style={styles.itemSubtitle} numberOfLines={1}>{method.description}</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </Pressable>
          ))}
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (currentView === 'beans' || currentView === 'techniques') {
    const category = KNOWLEDGE_DATA.find(c => c.id === currentView);
    if (!category) return null;
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setCurrentView('categories')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Voltar</Text>
          </Pressable>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={styles.headerTitle}>{category.emoji} {category.title}</Text>
            <Text style={styles.headerSubtitle}>{category.description}</Text>
          </View>
          {category.items.map(item => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [styles.itemCard, pressed && { opacity: 0.7 }]}
              onPress={() => { setSelectedItem(item); setCurrentView('item-detail'); }}
            >
              <Text style={styles.itemEmoji}>{item.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </Pressable>
          ))}
        </ScrollView>
      </ScreenContainer>
    );
  }

  // Default: categories view
  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📚 Conhecimento</Text>
          <Text style={styles.headerSubtitle}>Enciclopédia do café especial</Text>
        </View>
        <Text style={styles.sectionTitle}>Categorias</Text>
        {KNOWLEDGE_DATA.map(cat => (
          <Pressable
            key={cat.id}
            style={({ pressed }) => [styles.categoryCard, pressed && { opacity: 0.7 }]}
            onPress={() => setCurrentView(cat.id === 'beans' ? 'beans' : 'techniques')}
          >
            <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.categoryTitle}>{cat.title}</Text>
              <Text style={styles.categoryDesc}>{cat.description}</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.muted} />
          </Pressable>
        ))}
        <Pressable
          style={({ pressed }) => [styles.categoryCard, pressed && { opacity: 0.7 }]}
          onPress={() => setCurrentView('methods')}
        >
          <Text style={styles.categoryEmoji}>☕</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.categoryTitle}>Métodos de Preparo</Text>
            <Text style={styles.categoryDesc}>Fichas técnicas e passo a passo para cada método.</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.muted} />
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}
