import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Animated,
  Easing,
  useWindowDimensions,
  LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Match'>,
  NativeStackScreenProps<RootStackParamList>
>;

const MATCH_BG_UNIQUE_V1 = require('../assets/match_bg_unique_v1.png');
const MATCH_TITLE_FRAME_UNIQUE_V1 = require('../assets/random_title_frame_unique_v1.png');
const MATCH_INTRO_IMAGE_UNIQUE_V1 = require('../assets/match_intro_image_unique_v1.png');

export default function MatchScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 760 || width < 360;
  const isVerySmallScreen = height < 700 || width < 340;

  const [titleTextWidth, setTitleTextWidth] = useState(0);

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(22)).current;

  const titleText = 'Emotion Match';
  const titleFontSize = isVerySmallScreen ? 16 : isSmallScreen ? 17 : 18;

  const titleFrameWidth = useMemo(() => {
    const horizontalFrameInset = 20;
    const minWidth = width < 340 ? 200 : width < 390 ? 220 : 240;
    const maxWidth = Math.min(width - 40, 340);
    const calculatedWidth = Math.ceil(titleTextWidth) + horizontalFrameInset;
    return Math.max(minWidth, Math.min(maxWidth, calculatedWidth || minWidth));
  }, [titleTextWidth, width]);

  const titleFrameHeight = useMemo(() => {
    if (width < 340) return 66;
    if (width < 390) return 72;
    return 78;
  }, [width]);

  const heroImageWidth = useMemo(() => {
    if (width < 340) return 160;
    if (width < 390) return 178;
    return 200;
  }, [width]);

  const introTextWidth = useMemo(() => {
    if (width < 340) return width * 0.72;
    if (width < 390) return width * 0.7;
    return width * 0.66;
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

  const handleStart = () => {
    navigation.navigate('MatchPlay');
  };

  const handleTitleTextLayout = (event: LayoutChangeEvent) => {
    const measuredWidth = event.nativeEvent.layout.width;
    if (measuredWidth > 0 && Math.abs(measuredWidth - titleTextWidth) > 1) {
      setTitleTextWidth(measuredWidth);
    }
  };

  return (
    <ImageBackground source={MATCH_BG_UNIQUE_V1} style={styles.bg} resizeMode="cover">
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
                marginTop: isVerySmallScreen ? 14 : 20,
              },
            ]}
          >
            <Image
              source={MATCH_TITLE_FRAME_UNIQUE_V1}
              resizeMode="stretch"
              style={styles.titleFrame}
            />
            <Text
              onLayout={handleTitleTextLayout}
              numberOfLines={1}
              style={[
                styles.titleFrameText,
                {
                  fontSize: titleFontSize,
                },
              ]}
            >
              {titleText}
            </Text>
          </View>

          <Animated.View
            style={{
              width: '100%',
              alignItems: 'center',
              opacity: contentOpacity,
              transform: [{ translateY: contentTranslateY }],
            }}
          >
            <Image
              source={MATCH_INTRO_IMAGE_UNIQUE_V1}
              resizeMode="contain"
              style={{
                width: heroImageWidth,
                height: heroImageWidth,
                marginTop: isVerySmallScreen ? 24 : 32,
              }}
            />

            <Text
              style={[
                styles.introText,
                {
                  width: introTextWidth,
                  marginTop: isVerySmallScreen ? 18 : 24,
                  fontSize: isVerySmallScreen ? 13 : 15,
                  lineHeight: isVerySmallScreen ? 20 : 24,
                },
              ]}
            >
              Behind these cards are different emotions. Open them carefully and find the matching pairs.
            </Text>

            <Pressable
              style={[
                styles.startButton,
                {
                  width: isVerySmallScreen ? 118 : 128,
                  height: isVerySmallScreen ? 42 : 46,
                  marginTop: isVerySmallScreen ? 22 : 28,
                },
              ]}
              onPress={handleStart}
            >
              <Text
                style={[
                  styles.startButtonText,
                  {
                    fontSize: isVerySmallScreen ? 15 : 16,
                  },
                ]}
              >
                Start the Round
              </Text>
            </Pressable>
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
    color: '#000000',
    fontWeight: '900',
    textAlign: 'center',
    paddingHorizontal: 10,
    textShadowColor: 'rgba(255,255,255,0.65)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    transform: [{ translateY: 7 }],
  },
  introText: {
    color: '#F6F0FF',
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: '#4A2A72',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  startButton: {
    borderRadius: 8,
    backgroundColor: '#9EDB2C',
    borderWidth: 2,
    borderColor: '#E7F6A9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  startButtonText: {
    color: '#FFFCEB',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#6D8B1E',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
});