import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Intro'>;

type IntroItem = {
  id: string;
  image: any;
  title: string;
  description: string;
};

const BG_IMAGE_INTRO_UNIQUE_V2 = require('../assets/intro_bg_unique_v2.png');
const INTRO_CARD_IMAGE_WORLD_UNIQUE_V1 = require('../assets/intro_card_image_world_unique_v1.png');
const INTRO_CARD_IMAGE_SPARK_UNIQUE_V1 = require('../assets/intro_card_image_spark_unique_v1.png');
const INTRO_CARD_IMAGE_BOOK_UNIQUE_V1 = require('../assets/intro_card_image_book_unique_v1.png');
const INTRO_CARD_IMAGE_QUIZ_UNIQUE_V1 = require('../assets/intro_card_image_quiz_unique_v1.png');
const INTRO_CARD_IMAGE_MATCH_UNIQUE_V1 = require('../assets/intro_card_image_match_unique_v1.png');
const INTRO_CARD_IMAGE_GUIDE_UNIQUE_V1 = require('../assets/intro_card_image_guide_unique_v1.png');

const introData: IntroItem[] = [
  {
    id: 'intro-world-fruit-v1',
    image: INTRO_CARD_IMAGE_WORLD_UNIQUE_V1,
    title: 'A Bright Fruity\nWorld',
    description: 'Every day brings a fresh and juicy discovery.',
  },
  {
    id: 'intro-spark-fruit-v1',
    image: INTRO_CARD_IMAGE_SPARK_UNIQUE_V1,
    title: 'Spin the\nJuicy Spark',
    description: 'Press the fruit button and receive a small daily quest.',
  },
  {
    id: 'intro-book-fruit-v1',
    image: INTRO_CARD_IMAGE_BOOK_UNIQUE_V1,
    title: 'Stories for\nEvery Mood',
    description: 'Choose your mood and unlock a fruity mini story.',
  },
  {
    id: 'intro-quiz-fruit-v1',
    image: INTRO_CARD_IMAGE_QUIZ_UNIQUE_V1,
    title: 'A Curious\nFruit Quiz',
    description: 'Little questions, playful answers, and sweet discoveries.',
  },
  {
    id: 'intro-match-fruit-v1',
    image: INTRO_CARD_IMAGE_MATCH_UNIQUE_V1,
    title: 'Find the Hidden\nFruits',
    description: 'Flip the cards and match cheerful fruit faces.',
  },
  {
    id: 'intro-guide-fruit-v1',
    image: INTRO_CARD_IMAGE_GUIDE_UNIQUE_V1,
    title: 'Meet the\nJuicy Guide',
    description: 'A friendly fruit character is here to brighten your day.',
  },
];

export default function IntroScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;
  const imageRotate = useRef(new Animated.Value(-1)).current;

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(18)).current;

  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.9)).current;

  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(16)).current;

  const progressAnim = useRef(new Animated.Value(0)).current;

  const isSmallScreen = height < 760 || width < 360;
  const currentItem = introData[currentIndex];

  const heroImageSize = useMemo(() => {
    if (width < 340) return 162;
    if (width < 390) return 184;
    return 214;
  }, [width]);

  const titleFontSize = useMemo(() => {
    if (width < 340) return 18;
    if (width < 390) return 21;
    return 23;
  }, [width]);

  const descriptionFontSize = useMemo(() => {
    if (width < 340) return 13;
    if (width < 390) return 14;
    return 15;
  }, [width]);

  const descriptionCardWidth = useMemo(() => {
    if (width < 340) return width * 0.8;
    if (width < 390) return width * 0.76;
    return width * 0.72;
  }, [width]);

  const progressWidth = useMemo(() => {
    if (width < 340) return 108;
    if (width < 390) return 124;
    return 138;
  }, [width]);

  useEffect(() => {
    runEntryAnimation();
  }, [currentIndex]);

  const runEntryAnimation = () => {
    imageOpacity.setValue(0);
    imageScale.setValue(0.8);
    imageRotate.setValue(-1);

    titleOpacity.setValue(0);
    titleTranslateY.setValue(18);

    cardOpacity.setValue(0);
    cardScale.setValue(0.9);

    buttonOpacity.setValue(0);
    buttonTranslateY.setValue(16);

    progressAnim.setValue(0);

    Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(imageScale, {
        toValue: 1,
        speed: 11,
        bounciness: 8,
        useNativeDriver: true,
      }),
      Animated.timing(imageRotate, {
        toValue: 0,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(90),
        Animated.parallel([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(titleTranslateY, {
            toValue: 0,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]),
      Animated.sequence([
        Animated.delay(160),
        Animated.parallel([
          Animated.timing(cardOpacity, {
            toValue: 1,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.spring(cardScale, {
            toValue: 1,
            speed: 12,
            bounciness: 6,
            useNativeDriver: true,
          }),
        ]),
      ]),
      Animated.sequence([
        Animated.delay(230),
        Animated.parallel([
          Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(buttonTranslateY, {
            toValue: 0,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleNext = () => {
    if (currentIndex === introData.length - 1) {
      navigation.replace('MainTabs');
      return;
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handleSkip = () => {
    navigation.replace('MainTabs');
  };

  const progressFillWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ((currentIndex + 1) / introData.length) * progressWidth],
  });

  return (
    <ImageBackground source={BG_IMAGE_INTRO_UNIQUE_V2} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.topArea, { paddingTop: 24 }]}>
          <Pressable style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </Pressable>

          <View style={styles.progressWrap}>
            <Text style={styles.progressText}>
              {currentIndex + 1}/{introData.length}
            </Text>

            <View style={[styles.progressTrack, { width: progressWidth }]}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressFillWidth,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.page}>
          <View
            style={[
              styles.contentWrap,
              {
                paddingBottom: isSmallScreen ? 38 : 52,
                paddingHorizontal: isSmallScreen ? 18 : 22,
              },
            ]}
          >
            <Animated.Image
              key={currentItem.id}
              source={currentItem.image}
              resizeMode="contain"
              style={[
                styles.heroImage,
                {
                  width: heroImageSize,
                  height: heroImageSize,
                  opacity: imageOpacity,
                  transform: [
                    { scale: imageScale },
                    {
                      rotate: imageRotate.interpolate({
                        inputRange: [-1, 0],
                        outputRange: ['-7deg', '0deg'],
                      }),
                    },
                  ],
                },
              ]}
            />

            <Animated.Text
              style={[
                styles.title,
                {
                  fontSize: titleFontSize,
                  marginTop: isSmallScreen ? 8 : 14,
                  opacity: titleOpacity,
                  transform: [{ translateY: titleTranslateY }],
                },
              ]}
            >
              {currentItem.title}
            </Animated.Text>

            <Animated.View
              style={[
                styles.descriptionCard,
                {
                  width: descriptionCardWidth,
                  paddingHorizontal: isSmallScreen ? 14 : 16,
                  paddingVertical: isSmallScreen ? 11 : 13,
                  marginTop: isSmallScreen ? 12 : 16,
                  borderRadius: isSmallScreen ? 16 : 18,
                  opacity: cardOpacity,
                  transform: [{ scale: cardScale }],
                },
              ]}
            >
              <Text
                style={[
                  styles.description,
                  {
                    fontSize: descriptionFontSize,
                  },
                ]}
              >
                {currentItem.description}
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: buttonOpacity,
                transform: [{ translateY: buttonTranslateY }],
              }}
            >
              <Pressable
                style={[
                  styles.nextButton,
                  {
                    marginTop: isSmallScreen ? 14 : 18,
                  },
                ]}
                onPress={handleNext}
              >
                <Text style={styles.nextButtonText}>
                  {currentIndex === introData.length - 1 ? 'Start' : 'Next'}
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topArea: {
    alignItems: 'flex-end',
    paddingHorizontal: 14,
    zIndex: 5,
  },
  skipButton: {
    minWidth: 50,
    paddingHorizontal: 14,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#F49A16',
    borderWidth: 1,
    borderColor: '#FFE4AE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  progressWrap: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  progressText: {
    color: '#F8F5E8',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 6,
    textShadowColor: 'rgba(73, 52, 24, 0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1.2,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.26)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  page: {
    flex: 1,
    alignItems: 'center',
  },
  contentWrap: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    marginTop: -14,
  },
  title: {
    color: '#F8F5E8',
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 28,
    textShadowColor: 'rgba(73, 52, 24, 0.65)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 1.5,
  },
  descriptionCard: {
    backgroundColor: '#A8DB2C',
    borderWidth: 1.5,
    borderColor: '#79AD1A',
    shadowColor: '#5E8D12',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  description: {
    color: '#FFFDF2',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 19,
    textShadowColor: 'rgba(73, 52, 24, 0.38)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  nextButton: {
    minWidth: 78,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F49A16',
    borderWidth: 1,
    borderColor: '#FFE4AE',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});