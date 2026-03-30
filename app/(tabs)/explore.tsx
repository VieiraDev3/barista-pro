import React, { useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, FlatList,
} from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

type ExploreView = 'main' | 'latte-art' | 'latte-detail' | 'bean-anatomy' | 'community';

interface LatteArt {
  id: string;
  name: string;
  emoji: string;
  difficulty: string;
  description: string;
  steps: string[];
  tips: string[];
}

const LATTE_ARTS: LatteArt[] = [
  {
    id: 'heart',
    name: 'Coração',
    emoji: '❤️',
    difficulty: 'Iniciante',
    description: 'O padrão mais clássico do latte art. Perfeito para começar a aprender a técnica de despejo.',
    steps: [
      'Prepare um espresso duplo na xícara',
      'Vaporize o leite até atingir textura aveludada (microespuma)',
      'Incline a xícara a 45° e comece a despejar o leite no centro',
      'Despeje lentamente, mantendo o bico do pitcher próximo à superfície',
      'Quando a xícara estiver quase cheia, mova o pitcher para trás e para frente para criar a base do coração',
      'Termine com um movimento rápido para frente, cortando o centro para formar a ponta do coração',
    ],
    tips: [
      'A temperatura ideal do leite é 65-68°C',
      'Microespuma deve ter consistência de tinta brilhante',
      'Pratique o movimento de despejo com água primeiro',
    ],
  },
  {
    id: 'rosetta',
    name: 'Rosetta',
    emoji: '🌿',
    difficulty: 'Intermediário',
    description: 'Um padrão folhado que lembra uma folha de samambaia. Requer controle preciso do movimento.',
    steps: [
      'Prepare o espresso e vapore o leite com microespuma fina',
      'Incline a xícara e comece a despejar no centro, criando uma base branca',
      'Quando a base estiver formada, comece a mover o pitcher de lado a lado em pequenos movimentos',
      'Avance lentamente enquanto faz os movimentos laterais para criar as "folhas"',
      'Continue o padrão até quase encher a xícara',
      'Termine com um movimento reto para frente, cortando as folhas e criando o caule',
    ],
    tips: [
      'Movimentos laterais devem ser pequenos e rítmicos',
      'Mantenha o fluxo de leite constante durante todo o padrão',
      'A velocidade de avanço determina o tamanho das folhas',
    ],
  },
  {
    id: 'tulip',
    name: 'Tulipa',
    emoji: '🌷',
    difficulty: 'Intermediário',
    description: 'Um padrão em camadas que cria pétalas sobrepostas. Muito elegante e visualmente impactante.',
    steps: [
      'Prepare o espresso e vapore o leite',
      'Incline a xícara e despeje uma pequena quantidade de leite no centro para criar a primeira pétala',
      'Pare o fluxo brevemente e mova o pitcher ligeiramente para trás',
      'Despeje uma segunda camada sobre a primeira, empurrando-a para frente',
      'Repita o processo para criar 3-4 pétalas sobrepostas',
      'Termine com um fio fino de leite para criar o caule da tulipa',
    ],
    tips: [
      'Cada pétala deve ser ligeiramente maior que a anterior',
      'A pausa entre as pétalas é crucial para a separação visual',
      'Use menos leite em cada camada para manter a proporção',
    ],
  },
];

const COMMUNITY_RECIPES = [
  { id: '1', method: 'V60', name: 'Ethiopian Yirgacheffe Natural', author: 'Carlos B.', rating: 5, ratio: '1:15', notes: 'Notas de mirtilo e jasmim. Bloom de 45s com 60g.' },
  { id: '2', method: 'AeroPress', name: 'Inverted Colombian', author: 'Ana M.', rating: 4, ratio: '1:12', notes: 'Temperatura 85°C, 2 minutos de infusão. Suave e encorpado.' },
  { id: '3', method: 'Chemex', name: 'Kenyan AA Washed', author: 'Pedro L.', rating: 5, ratio: '1:16', notes: 'Acidez brilhante de groselha. Moagem média-grossa.' },
  { id: '4', method: 'Cold Brew', name: 'Bourbon Natural 24h', author: 'Marina S.', rating: 4, ratio: '1:8', notes: 'Concentrado por 24h na geladeira. Notas de chocolate e frutas secas.' },
  { id: '5', method: 'Espresso', name: 'Blend Especial Manhã', author: 'Rafael T.', rating: 5, ratio: '1:2', notes: '18g in / 36g out em 28s. Crema dourada perfeita.' },
];

export default function ExploreScreen() {
  const colors = useColors();
  const [view, setView] = useState<ExploreView>('main');
  const [selectedArt, setSelectedArt] = useState<LatteArt | null>(null);

  const styles = StyleSheet.create({
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
    headerTitle: { fontSize: 26, fontWeight: '700', color: colors.foreground },
    headerSubtitle: { fontSize: 14, color: colors.muted, marginTop: 2 },
    backButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, gap: 6 },
    backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.foreground, paddingHorizontal: 20, marginTop: 20, marginBottom: 12 },
    card: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, marginHorizontal: 20, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
    categoryCard: { backgroundColor: colors.surface, borderRadius: 16, padding: 20, marginHorizontal: 20, marginBottom: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    categoryEmoji: { fontSize: 36, marginRight: 16 },
    categoryTitle: { fontSize: 18, fontWeight: '700', color: colors.foreground, marginBottom: 4 },
    categoryDesc: { fontSize: 13, color: colors.muted, lineHeight: 18 },
    artCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginHorizontal: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    artEmoji: { fontSize: 32, marginRight: 14 },
    artName: { fontSize: 17, fontWeight: '700', color: colors.foreground },
    artDifficulty: { fontSize: 12, color: colors.primary, fontWeight: '600', marginTop: 2 },
    badge: { backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
    badgeText: { fontSize: 10, color: colors.background, fontWeight: '700' },
    stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
    stepNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    stepNumberText: { fontSize: 13, fontWeight: '700', color: colors.background },
    stepText: { fontSize: 14, color: colors.foreground, lineHeight: 20, flex: 1 },
    tipItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, gap: 8 },
    tipText: { fontSize: 13, color: colors.foreground, lineHeight: 20, flex: 1 },
    recipeCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginHorizontal: 20, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
    recipeMethod: { fontSize: 11, color: colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
    recipeName: { fontSize: 16, fontWeight: '700', color: colors.foreground, marginBottom: 4 },
    recipeAuthor: { fontSize: 12, color: colors.muted, marginBottom: 6 },
    recipeNotes: { fontSize: 13, color: colors.foreground, lineHeight: 18 },
    starsRow: { flexDirection: 'row', gap: 2, marginBottom: 6 },
    anatomySection: { marginBottom: 20 },
    anatomyTitle: { fontSize: 16, fontWeight: '700', color: colors.primary, marginBottom: 8 },
    anatomyText: { fontSize: 14, color: colors.foreground, lineHeight: 22 },
    anatomyEmoji: { fontSize: 48, textAlign: 'center', marginBottom: 16 },
    layerCard: { backgroundColor: colors.background, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: 12 },
    layerEmoji: { fontSize: 24 },
    layerName: { fontSize: 15, fontWeight: '700', color: colors.foreground },
    layerDesc: { fontSize: 12, color: colors.muted, marginTop: 2 },
  });

  const renderStars = (rating: number) => (
    <View style={styles.starsRow}>
      {[1,2,3,4,5].map(i => (
        <IconSymbol key={i} name={i <= rating ? 'star.fill' : 'star'} size={12} color={i <= rating ? colors.primary : colors.border} />
      ))}
    </View>
  );

  if (view === 'latte-detail' && selectedArt) {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setView('latte-art')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Latte Art</Text>
          </Pressable>
          <View style={styles.card}>
            <Text style={{ fontSize: 56, textAlign: 'center', marginBottom: 12 }}>{selectedArt.emoji}</Text>
            <Text style={{ fontSize: 24, fontWeight: '700', color: colors.foreground, textAlign: 'center', marginBottom: 4 }}>{selectedArt.name}</Text>
            <View style={{ alignItems: 'center', marginBottom: 12 }}>
              <View style={styles.badge}><Text style={styles.badgeText}>{selectedArt.difficulty}</Text></View>
            </View>
            <Text style={{ fontSize: 15, color: colors.foreground, lineHeight: 24 }}>{selectedArt.description}</Text>
          </View>
          <View style={styles.card}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.foreground, marginBottom: 16 }}>Passo a Passo</Text>
            {selectedArt.steps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{i + 1}</Text></View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
          <View style={styles.card}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.foreground, marginBottom: 12 }}>Dicas do Barista</Text>
            {selectedArt.tips.map((tip, i) => (
              <View key={i} style={styles.tipItem}>
                <Text style={{ color: colors.primary, fontSize: 16 }}>💡</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (view === 'latte-art') {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setView('main')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Explorar</Text>
          </Pressable>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={styles.headerTitle}>🎨 Latte Art</Text>
            <Text style={styles.headerSubtitle}>Tutoriais passo a passo</Text>
          </View>
          <View style={styles.card}>
            <Text style={{ fontSize: 14, color: colors.foreground, lineHeight: 22 }}>
              O latte art é a arte de criar padrões na superfície de bebidas à base de espresso usando leite vaporizado. 
              Requer prática na vaporização do leite para obter microespuma aveludada e controle preciso do despejo.
            </Text>
          </View>
          {LATTE_ARTS.map(art => (
            <Pressable
              key={art.id}
              style={({ pressed }) => [styles.artCard, pressed && { opacity: 0.7 }]}
              onPress={() => { setSelectedArt(art); setView('latte-detail'); }}
            >
              <Text style={styles.artEmoji}>{art.emoji}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.artName}>{art.name}</Text>
                <Text style={styles.artDifficulty}>{art.difficulty}</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color={colors.muted} />
            </Pressable>
          ))}
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (view === 'bean-anatomy') {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setView('main')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Explorar</Text>
          </Pressable>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={styles.headerTitle}>🫘 Anatomia do Grão</Text>
            <Text style={styles.headerSubtitle}>Estrutura e identificação de defeitos</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.anatomyEmoji}>🫘</Text>
            <Text style={{ fontSize: 15, color: colors.foreground, lineHeight: 24, marginBottom: 16 }}>
              O grão de café é na verdade a semente do fruto do cafeeiro. Compreender sua estrutura ajuda a 
              identificar defeitos e entender como cada camada influencia o sabor final.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.foreground, marginBottom: 16 }}>Camadas do Grão</Text>
            {[
              { emoji: '🟤', name: 'Casca (Exocarpo)', desc: 'Camada externa do fruto. Vermelha ou amarela quando maduro. Removida no processamento.' },
              { emoji: '🟡', name: 'Polpa (Mesocarpo)', desc: 'Camada doce e mucilaginosa. Influencia o sabor no processamento Natural e Honey.' },
              { emoji: '⬜', name: 'Pergaminho (Endocarpo)', desc: 'Camada protetora fina e papelosa. Removida antes da exportação.' },
              { emoji: '🟢', name: 'Película Prateada', desc: 'Membrana fina que envolve o grão verde. Parcialmente removida na torra.' },
              { emoji: '🫘', name: 'Endosperma (Grão verde)', desc: 'O grão propriamente dito. Contém todos os compostos que se transformam durante a torra.' },
            ].map((layer, i) => (
              <View key={i} style={styles.layerCard}>
                <Text style={styles.layerEmoji}>{layer.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.layerName}>{layer.name}</Text>
                  <Text style={styles.layerDesc}>{layer.desc}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.card}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: colors.foreground, marginBottom: 12 }}>Defeitos Comuns</Text>
            {[
              { emoji: '⚫', name: 'Grão preto', desc: 'Fruto colhido verde ou fermentado. Causa sabor azedo e fermentado.' },
              { emoji: '🔴', name: 'Grão vermelho/cereja', desc: 'Fruto não maduro. Reduz doçura e aumenta adstringência.' },
              { emoji: '🪲', name: 'Broca', desc: 'Dano por inseto. Cria buracos no grão e compromete a extração uniforme.' },
              { emoji: '🪨', name: 'Pedra/Pau', desc: 'Impurezas físicas que danificam moinhos e afetam a qualidade.' },
            ].map((defect, i) => (
              <View key={i} style={styles.layerCard}>
                <Text style={styles.layerEmoji}>{defect.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.layerName}>{defect.name}</Text>
                  <Text style={styles.layerDesc}>{defect.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  if (view === 'community') {
    return (
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
          <Pressable style={styles.backButton} onPress={() => setView('main')}>
            <IconSymbol name="chevron.left" size={20} color={colors.primary} />
            <Text style={styles.backText}>Explorar</Text>
          </Pressable>
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text style={styles.headerTitle}>👥 Receitas da Comunidade</Text>
            <Text style={styles.headerSubtitle}>Preparos compartilhados por baristas</Text>
          </View>
          {COMMUNITY_RECIPES.map(recipe => (
            <View key={recipe.id} style={styles.recipeCard}>
              <Text style={styles.recipeMethod}>{recipe.method}</Text>
              <Text style={styles.recipeName}>{recipe.name}</Text>
              <Text style={styles.recipeAuthor}>por {recipe.author} · Proporção {recipe.ratio}</Text>
              {renderStars(recipe.rating)}
              <Text style={styles.recipeNotes}>{recipe.notes}</Text>
            </View>
          ))}
        </ScrollView>
      </ScreenContainer>
    );
  }

  // Main explore view
  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🔭 Explorar</Text>
          <Text style={styles.headerSubtitle}>Arte, ciência e comunidade do café</Text>
        </View>

        <Text style={styles.sectionTitle}>Descobrir</Text>

        <Pressable
          style={({ pressed }) => [styles.categoryCard, pressed && { opacity: 0.7 }]}
          onPress={() => setView('latte-art')}
        >
          <Text style={styles.categoryEmoji}>🎨</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.categoryTitle}>Latte Art</Text>
            <Text style={styles.categoryDesc}>Tutoriais de Coração, Rosetta e Tulipa com passo a passo.</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.muted} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.categoryCard, pressed && { opacity: 0.7 }]}
          onPress={() => setView('bean-anatomy')}
        >
          <Text style={styles.categoryEmoji}>🫘</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.categoryTitle}>Anatomia do Grão</Text>
            <Text style={styles.categoryDesc}>Estrutura do grão de café e identificação de defeitos.</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.muted} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.categoryCard, pressed && { opacity: 0.7 }]}
          onPress={() => setView('community')}
        >
          <Text style={styles.categoryEmoji}>👥</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.categoryTitle}>Receitas da Comunidade</Text>
            <Text style={styles.categoryDesc}>Preparos e dicas compartilhados por baristas.</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.muted} />
        </Pressable>

        {/* Featured community recipes preview */}
        <Text style={styles.sectionTitle}>Em Destaque</Text>
        {COMMUNITY_RECIPES.slice(0, 2).map(recipe => (
          <Pressable
            key={recipe.id}
            style={({ pressed }) => [styles.recipeCard, pressed && { opacity: 0.7 }]}
            onPress={() => setView('community')}
          >
            <Text style={styles.recipeMethod}>{recipe.method}</Text>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <Text style={styles.recipeAuthor}>por {recipe.author}</Text>
            {renderStars(recipe.rating)}
          </Pressable>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}
