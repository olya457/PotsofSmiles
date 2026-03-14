import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Animated,
  Easing,
  Share,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MatchPlay'>;

type EmotionKey =
  | 'happy'
  | 'surprised'
  | 'sleepy'
  | 'thinking'
  | 'calm'
  | 'playful';

type CardItem = {
  id: string;
  pairId: EmotionKey;
  image: any;
};

const MATCH_PLAY_BG_UNIQUE_V1 = require('../assets/match_play_bg_unique_v1.png');
const MATCH_TITLE_FRAME_UNIQUE_V1 = require('../assets/random_title_frame_unique_v1.png');
const MATCH_PLAY_LEPRECHAUN_UNIQUE_V1 = require('../assets/random_result_leprechaun_unique_v1.png');

const EMOTION_HAPPY_UNIQUE_V1 = require('../assets/emotion_happy_unique_v1.png');
const EMOTION_SURPRISED_UNIQUE_V1 = require('../assets/emotion_surprised_unique_v1.png');
const EMOTION_SLEEPY_UNIQUE_V1 = require('../assets/emotion_sleepy_unique_v1.png');
const EMOTION_THINKING_UNIQUE_V1 = require('../assets/emotion_thinking_unique_v1.png');
const EMOTION_CALM_UNIQUE_V1 = require('../assets/emotion_calm_unique_v1.png');
const EMOTION_PLAYFUL_UNIQUE_V1 = require('../assets/emotion_playful_unique_v1.png');

const EMOTION_PAIRS: Array<{ pairId: EmotionKey; image: any }> = [
  { pairId: 'happy', image: EMOTION_HAPPY_UNIQUE_V1 },
  { pairId: 'surprised', image: EMOTION_SURPRISED_UNIQUE_V1 },
  { pairId: 'sleepy', image: EMOTION_SLEEPY_UNIQUE_V1 },
  { pairId: 'thinking', image: EMOTION_THINKING_UNIQUE_V1 },
  { pairId: 'calm', image: EMOTION_CALM_UNIQUE_V1 },
  { pairId: 'playful', image: EMOTION_PLAYFUL_UNIQUE_V1 },
];

function shuffleCards(items: CardItem[]) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildDeck(): CardItem[] {
  const duplicated = EMOTION_PAIRS.flatMap(item => [
    {
      id: `${item.pairId}_a`,
      pairId: item.pairId,
      image: item.image,
    },
    {
      id: `${item.pairId}_b`,
      pairId: item.pairId,
      image: item.image,
    },
  ]);

  return shuffleCards(duplicated);
}

export default function MatchPlayScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 760 || width < 360;
  const isVerySmallScreen = height < 700 || width < 340;

  const [cards, setCards] = useState<CardItem[]>(() => buildDeck());
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(22)).current;

  const titleFrameWidth = useMemo(() => {
    if (width < 340) return 220;
    if (width < 390) return 245;
    return 270;
  }, [width]);

  const titleFrameHeight = useMemo(() => {
    if (width < 340) return 66;
    if (width < 390) return 72;
    return 78;
  }, [width]);

  const cardSize = useMemo(() => {
    if (width < 340) return 54;
    if (width < 390) return 60;
    return 68;
  }, [width]);

  const gridWidth = useMemo(() => {
    const gap = isVerySmallScreen ? 10 : 12;
    return cardSize * 3 + gap * 2;
  }, [cardSize, isVerySmallScreen]);

  const resultImageSize = useMemo(() => {
    if (width < 340) return 150;
    if (width < 390) return 172;
    return 200;
  }, [width]);

  const bottomMascotSize = useMemo(() => {
    if (width < 340) return 82;
    if (width < 390) return 92;
    return 102;
  }, [width]);

  useEffect(() => {
    fade.setValue(0);
    scale.setValue(0.94);
    translateY.setValue(18);
    contentOpacity.setValue(0);
    contentTranslateY.setValue(22);

    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        speed: 12,
        bounciness: 7,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(90),
        Animated.parallel([
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(contentTranslateY, {
            toValue: 0,
            duration: 280,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
  }, [contentOpacity, contentTranslateY, fade, scale, translateY]);

  useEffect(() => {
    if (matchedIds.length === cards.length && cards.length > 0) {
      const timer = setTimeout(() => {
        setShowResult(true);
      }, 450);

      return () => clearTimeout(timer);
    }

    return;
  }, [matchedIds, cards.length]);

  const resetGame = useCallback(() => {
    setCards(buildDeck());
    setOpenedIds([]);
    setMatchedIds([]);
    setLocked(false);
    setShowResult(false);
  }, []);

  const handlePressCard = useCallback(
    (card: CardItem) => {
      if (locked) return;
      if (openedIds.includes(card.id)) return;
      if (matchedIds.includes(card.id)) return;
      if (openedIds.length === 2) return;

      const nextOpened = [...openedIds, card.id];
      setOpenedIds(nextOpened);

      if (nextOpened.length === 2) {
        setLocked(true);

        const firstCard = cards.find(item => item.id === nextOpened[0]);
        const secondCard = cards.find(item => item.id === nextOpened[1]);

        const isMatch =
          firstCard &&
          secondCard &&
          firstCard.pairId === secondCard.pairId &&
          firstCard.id !== secondCard.id;

        if (isMatch) {
          setTimeout(() => {
            setMatchedIds(prev => [...prev, nextOpened[0], nextOpened[1]]);
            setOpenedIds([]);
            setLocked(false);
          }, 500);
        } else {
          setTimeout(() => {
            setOpenedIds([]);
            setLocked(false);
          }, 800);
        }
      }
    },
    [cards, locked, matchedIds, openedIds],
  );

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Emotion Match\n\nRound Complete\nYou matched all the emotions. Nice work finding every pair.',
      });
    } catch {}
  };

  const renderCard = (card: CardItem, index: number) => {
    const isOpened = openedIds.includes(card.id);
    const isMatched = matchedIds.includes(card.id);
    const isVisible = isOpened || isMatched;

    return (
      <Pressable
        key={card.id}
        style={[
          styles.card,
          {
            width: cardSize,
            height: cardSize,
            borderRadius: 7,
          },
          isVisible ? styles.cardOpen : styles.cardClosed,
        ]}
        onPress={() => handlePressCard(card)}
      >
        {isVisible ? (
          <Image source={card.image} resizeMode="cover" style={styles.faceImage} />
        ) : (
          <Text
            style={[
              styles.cardStar,
              {
                fontSize: isVerySmallScreen ? 22 : 26,
              },
            ]}
          >
            ★
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <ImageBackground source={MATCH_PLAY_BG_UNIQUE_V1} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={{
            flex: 1,
            alignItems: 'center',
            opacity: fade,
            transform: [{ scale }, { translateY }],
          }}
        >
          <View
            style={[
              styles.titleWrap,
              {
                width: titleFrameWidth,
                height: titleFrameHeight,
                marginTop: isVerySmallScreen ? 10 : 16,
              },
            ]}
          >
            <Image
              source={MATCH_TITLE_FRAME_UNIQUE_V1}
              resizeMode="contain"
              style={styles.titleFrame}
            />
            <Text
              style={[
                styles.titleFrameText,
                {
                  fontSize: isVerySmallScreen ? 16 : isSmallScreen ? 17 : 18,
                },
              ]}
            >
              Emotion Match
            </Text>
          </View>

          <Pressable
            style={[
              styles.exitButton,
              {
                marginTop: 10,
                width: isVerySmallScreen ? 72 : 78,
                height: isVerySmallScreen ? 26 : 30,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={[
                styles.exitButtonText,
                {
                  fontSize: isVerySmallScreen ? 12 : 13,
                },
              ]}
            >
              Exit
            </Text>
          </Pressable>

          <Animated.View
            style={{
              width: '100%',
              alignItems: 'center',
              opacity: contentOpacity,
              transform: [{ translateY: contentTranslateY }],
              flex: 1,
            }}
          >
            {!showResult ? (
              <>
                <View
                  style={[
                    styles.grid,
                    {
                      width: gridWidth,
                      marginTop: isVerySmallScreen ? 24 : 30,
                      rowGap: isVerySmallScreen ? 10 : 12,
                      columnGap: isVerySmallScreen ? 10 : 12,
                    },
                  ]}
                >
                  {cards.map(renderCard)}
                </View>

                <Image
                  source={MATCH_PLAY_LEPRECHAUN_UNIQUE_V1}
                  resizeMode="contain"
                  style={{
                    width: bottomMascotSize,
                    height: bottomMascotSize,
                    marginTop: isVerySmallScreen ? 18 : 22,
                    marginBottom: isVerySmallScreen ? 10 : 14,
                  }}
                />
              </>
            ) : (
              <View
                style={[
                  styles.resultWrap,
                  {
                    marginTop: isVerySmallScreen ? 30 : 40,
                  },
                ]}
              >
                <Image
                  source={MATCH_PLAY_LEPRECHAUN_UNIQUE_V1}
                  resizeMode="contain"
                  style={{
                    width: resultImageSize,
                    height: resultImageSize,
                  }}
                />

                <Text
                  style={[
                    styles.resultTitle,
                    {
                      marginTop: 8,
                      fontSize: isVerySmallScreen ? 24 : 28,
                    },
                  ]}
                >
                  Round Complete
                </Text>

                <Text
                  style={[
                    styles.resultText,
                    {
                      width: isVerySmallScreen ? width * 0.74 : width * 0.68,
                      marginTop: 10,
                      fontSize: isVerySmallScreen ? 13 : 15,
                      lineHeight: isVerySmallScreen ? 21 : 24,
                    },
                  ]}
                >
                  You matched all the emotions. Nice work finding every pair.
                </Text>

                <View
                  style={[
                    styles.resultButtonsRow,
                    {
                      marginTop: isVerySmallScreen ? 22 : 28,
                    },
                  ]}
                >
                  <Pressable
                    style={[
                      styles.smallActionButton,
                      {
                        width: isVerySmallScreen ? 40 : 44,
                        height: isVerySmallScreen ? 34 : 38,
                      },
                    ]}
                    onPress={handleShare}
                  >
                    <Text style={styles.smallActionButtonText}>↗</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.tryAgainButton,
                      {
                        width: isVerySmallScreen ? 128 : 138,
                        height: isVerySmallScreen ? 34 : 38,
                        marginHorizontal: 8,
                      },
                    ]}
                    onPress={resetGame}
                  >
                    <Text
                      style={[
                        styles.tryAgainButtonText,
                        {
                          fontSize: isVerySmallScreen ? 15 : 16,
                        },
                      ]}
                    >
                      Try Again
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.smallActionButton,
                      {
                        width: isVerySmallScreen ? 40 : 44,
                        height: isVerySmallScreen ? 34 : 38,
                      },
                    ]}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={styles.smallActionButtonText}>⌂</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </Animated.View>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  titleWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleFrame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  titleFrameText: {
    color: '#FFF7F8',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#3E1365',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  exitButton: {
    borderRadius: 4,
    backgroundColor: '#A33CFF',
    borderWidth: 1,
    borderColor: '#D5B3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardClosed: {
    backgroundColor: '#8F2CF5',
    borderWidth: 1.5,
    borderColor: '#6C20B7',
  },
  cardOpen: {
    backgroundColor: '#8B0000',
    borderWidth: 1.5,
    borderColor: '#6B0000',
  },
  cardStar: {
    color: '#FFD84D',
    fontWeight: '900',
    textAlign: 'center',
  },
  faceImage: {
    width: '100%',
    height: '100%',
  },
  resultWrap: {
    width: '100%',
    alignItems: 'center',
  },
  resultTitle: {
    color: '#C4A06A',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  resultText: {
    color: '#3A2D22',
    fontWeight: '700',
    textAlign: 'center',
  },
  resultButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallActionButton: {
    borderRadius: 8,
    backgroundColor: '#FF9D05',
    borderWidth: 1.5,
    borderColor: '#6D240C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallActionButtonText: {
    color: '#FFF6E4',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  tryAgainButton: {
    borderRadius: 8,
    backgroundColor: '#FF9D05',
    borderWidth: 1.5,
    borderColor: '#6D240C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButtonText: {
    color: '#FFF6E4',
    fontWeight: '900',
    textAlign: 'center',
  },
});