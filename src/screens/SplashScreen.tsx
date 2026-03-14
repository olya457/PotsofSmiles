import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;
type SplashPhase = 'web' | 'image';

const BG_IMAGE_UNIQUE_V1 = require('../assets/splash_bg_unique_v1.png');
const CENTER_IMAGE_UNIQUE_V1 = require('../assets/splash_center_anim_unique_v1.png');

export default function SplashScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();
  const [phase, setPhase] = useState<SplashPhase>('web');

  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.88)).current;
  const imageTranslateY = useRef(new Animated.Value(18)).current;

  const isSmallScreen = height < 750 || width < 360;

  const cardWidth = useMemo(() => {
    if (width < 340) return width * 0.82;
    if (width < 390) return width * 0.84;
    return width * 0.86;
  }, [width]);

  const cardHeight = useMemo(() => {
    if (isSmallScreen) return 220;
    return 260;
  }, [isSmallScreen]);

  const imageSize = useMemo(() => {
    if (width < 340) return 130;
    if (width < 390) return 150;
    return 180;
  }, [width]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase('image');
    }, 3000);

    const timer2 = setTimeout(() => {
      navigation.replace('Intro');
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigation]);

  useEffect(() => {
    if (phase !== 'image') return;

    Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 850,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(imageTranslateY, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [phase, imageOpacity, imageScale, imageTranslateY]);

  const loaderHtml = useMemo(() => {
    const size = isSmallScreen ? 150 : 180;

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }

            html, body {
              width: 100%;
              height: 100%;
              overflow: hidden;
              background: #d9d9d9;
            }

            body {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .wrap {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #d9d9d9;
            }

            .pencil {
              display: block;
              width: ${size}px;
              height: ${size}px;
            }

            .pencil__body1,
            .pencil__body2,
            .pencil__body3,
            .pencil__eraser,
            .pencil__eraser-skew,
            .pencil__point,
            .pencil__rotate,
            .pencil__stroke {
              animation-duration: 3s;
              animation-timing-function: linear;
              animation-iteration-count: infinite;
            }

            .pencil__body1,
            .pencil__body2,
            .pencil__body3 {
              transform: rotate(-90deg);
              transform-origin: 100px 100px;
            }

            .pencil__body1 {
              animation-name: pencilBody1;
            }

            .pencil__body2 {
              animation-name: pencilBody2;
            }

            .pencil__body3 {
              animation-name: pencilBody3;
            }

            .pencil__eraser {
              animation-name: pencilEraser;
              transform: rotate(-90deg) translate(49px, 0);
              transform-origin: 100px 100px;
            }

            .pencil__eraser-skew {
              animation-name: pencilEraserSkew;
              animation-timing-function: ease-in-out;
            }

            .pencil__point {
              animation-name: pencilPoint;
              transform: rotate(-90deg) translate(49px, -30px);
              transform-origin: 100px 100px;
            }

            .pencil__rotate {
              animation-name: pencilRotate;
              transform-origin: 100px 100px;
            }

            .pencil__stroke {
              animation-name: pencilStroke;
              transform: translate(100px, 100px) rotate(-113deg);
              transform-origin: 0 0;
            }

            @keyframes pencilBody1 {
              from, to {
                stroke-dashoffset: 351.86;
                transform: rotate(-90deg);
              }
              50% {
                stroke-dashoffset: 150.8;
                transform: rotate(-225deg);
              }
            }

            @keyframes pencilBody2 {
              from, to {
                stroke-dashoffset: 406.84;
                transform: rotate(-90deg);
              }
              50% {
                stroke-dashoffset: 174.36;
                transform: rotate(-225deg);
              }
            }

            @keyframes pencilBody3 {
              from, to {
                stroke-dashoffset: 296.88;
                transform: rotate(-90deg);
              }
              50% {
                stroke-dashoffset: 127.23;
                transform: rotate(-225deg);
              }
            }

            @keyframes pencilEraser {
              from, to {
                transform: rotate(-45deg) translate(49px, 0);
              }
              50% {
                transform: rotate(0deg) translate(49px, 0);
              }
            }

            @keyframes pencilEraserSkew {
              from, 32.5%, 67.5%, to {
                transform: skewX(0);
              }
              35%, 65% {
                transform: skewX(-4deg);
              }
              37.5%, 62.5% {
                transform: skewX(8deg);
              }
              40%, 45%, 50%, 55%, 60% {
                transform: skewX(-15deg);
              }
              42.5%, 47.5%, 52.5%, 57.5% {
                transform: skewX(15deg);
              }
            }

            @keyframes pencilPoint {
              from, to {
                transform: rotate(-90deg) translate(49px, -30px);
              }
              50% {
                transform: rotate(-225deg) translate(49px, -30px);
              }
            }

            @keyframes pencilRotate {
              from {
                transform: translate(100px, 100px) rotate(0);
              }
              to {
                transform: translate(100px, 100px) rotate(720deg);
              }
            }

            @keyframes pencilStroke {
              from {
                stroke-dashoffset: 439.82;
                transform: translate(100px, 100px) rotate(-113deg);
              }
              50% {
                stroke-dashoffset: 164.93;
                transform: translate(100px, 100px) rotate(-113deg);
              }
              75%, to {
                stroke-dashoffset: 439.82;
                transform: translate(100px, 100px) rotate(112deg);
              }
            }
          </style>
        </head>
        <body>
          <div class="wrap">
            <svg class="pencil" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-label="Loading">
              <circle
                class="pencil__stroke"
                cx="0"
                cy="0"
                r="70"
                fill="none"
                stroke="#111111"
                stroke-width="4"
                stroke-dasharray="439.82 439.82"
                stroke-linecap="round"
              ></circle>

              <g class="pencil__rotate">
                <g fill="none">
                  <circle
                    class="pencil__body1"
                    cx="100"
                    cy="100"
                    r="64"
                    stroke="#BA946C"
                    stroke-width="30"
                    stroke-dasharray="402.12 402.12"
                    stroke-dashoffset="351.86"
                    stroke-linecap="butt"
                  ></circle>
                  <circle
                    class="pencil__body2"
                    cx="100"
                    cy="100"
                    r="64"
                    stroke="#9B734A"
                    stroke-width="18"
                    stroke-dasharray="402.12 402.12"
                    stroke-dashoffset="351.86"
                    stroke-linecap="butt"
                  ></circle>
                  <circle
                    class="pencil__body3"
                    cx="100"
                    cy="100"
                    r="64"
                    stroke="#7F5D39"
                    stroke-width="8"
                    stroke-dasharray="402.12 402.12"
                    stroke-dashoffset="351.86"
                    stroke-linecap="butt"
                  ></circle>
                </g>

                <g class="pencil__eraser" transform="rotate(-90 100 100) translate(49 0)">
                  <g class="pencil__eraser-skew">
                    <rect x="100" y="85" width="26" height="18" fill="#D9D1C6"></rect>
                    <rect x="126" y="85" width="10" height="18" fill="#CFC6BA"></rect>
                    <rect x="136" y="85" width="8" height="18" fill="#E6DED3"></rect>
                  </g>
                </g>

                <g class="pencil__point" transform="rotate(-90 100 100) translate(49 -30)">
                  <polygon points="100,100 118,92 118,108" fill="#F2A12B"></polygon>
                  <polygon points="118,92 128,100 118,108" fill="#111111"></polygon>
                </g>
              </g>
            </svg>
          </div>
        </body>
      </html>
    `;
  }, [isSmallScreen]);

  return (
    <ImageBackground source={BG_IMAGE_UNIQUE_V1} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View
          style={[
            styles.centerCard,
            {
              width: cardWidth,
              height: cardHeight,
              borderRadius: isSmallScreen ? 24 : 30,
              padding: isSmallScreen ? 12 : 16,
            },
          ]}
        >
          {phase === 'web' ? (
            <View style={styles.webWrap}>
              <WebView
                originWhitelist={['*']}
                source={{ html: loaderHtml }}
                style={styles.webview}
                containerStyle={styles.webviewContainer}
                scrollEnabled={false}
                bounces={false}
                overScrollMode="never"
                javaScriptEnabled
                domStorageEnabled
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                androidLayerType={Platform.OS === 'android' ? 'software' : undefined}
                mixedContentMode="always"
              />
            </View>
          ) : (
            <View style={styles.imageWrap}>
              <Animated.Image
                source={CENTER_IMAGE_UNIQUE_V1}
                resizeMode="contain"
                style={{
                  width: imageSize,
                  height: imageSize,
                  opacity: imageOpacity,
                  transform: [{ scale: imageScale }, { translateY: imageTranslateY }],
                }}
              />
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },
  centerCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18,18,18,0.28)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  webWrap: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: '#d9d9d9',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  webview: {
    flex: 1,
    width: '100%',
    backgroundColor: '#d9d9d9',
  },
  imageWrap: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});