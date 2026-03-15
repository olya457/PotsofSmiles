import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
  Share,
  Animated,
  Easing,
  useWindowDimensions,
  LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { quizLevels } from '../data/quizData';

type ScreenStep = 'intro' | 'question' | 'result';
type AnswerState = 'idle' | 'correct' | 'wrong';

const QUIZ_BG_UNIQUE_V1 = require('../assets/random_bg_unique_v1.png');
const QUIZ_TITLE_FRAME_UNIQUE_V1 = require('../assets/random_title_frame_unique_v1.png');
const QUIZ_INTRO_IMAGE_UNIQUE_V1 = require('../assets/quiz_intro_image_unique_v1.png');
const QUIZ_RESULT_WIN_IMAGE_UNIQUE_V1 = require('../assets/random_result_leprechaun_unique_v1.png');
const QUIZ_RESULT_LOSE_IMAGE_UNIQUE_V1 = require('../assets/quiz_result_lose_leprechaun_unique_v1.png');

export default function QuizScreen() {
  const { width, height } = useWindowDimensions();
  const isSmallScreen = height < 760 || width < 360;
  const isVerySmallScreen = height < 700 || width < 340;

  const [screenStep, setScreenStep] = useState<ScreenStep>('intro');
  const [levelIndex, setLevelIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [correctCount, setCorrectCount] = useState(0);
  const [titleTextWidth, setTitleTextWidth] = useState(0);

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(22)).current;

  const currentLevel = quizLevels[levelIndex];
  const currentQuestion = currentLevel.questions[questionIndex];
  const passedLevel = correctCount >= 5;
  const isLastLevel = levelIndex === quizLevels.length - 1;

  const titleText = 'Quiz';
  const titleFontSize = isVerySmallScreen ? 18 : isSmallScreen ? 19 : 20;

  const titleFrameWidth = useMemo(() => {
    const horizontalFrameInset = 20;
    const minWidth = width < 340 ? 150 : width < 390 ? 165 : 180;
    const maxWidth = Math.min(width - 40, 320);
    const calculatedWidth = Math.ceil(titleTextWidth) + horizontalFrameInset;
    return Math.max(minWidth, Math.min(maxWidth, calculatedWidth || minWidth));
  }, [titleTextWidth, width]);

  const titleFrameHeight = useMemo(() => {
    if (width < 340) return 70;
    if (width < 390) return 76;
    return 82;
  }, [width]);

  const introImageWidth = useMemo(() => {
    if (width < 340) return 220;
    if (width < 390) return 245;
    return 280;
  }, [width]);

  const resultImageSize = useMemo(() => {
    if (width < 340) return 122;
    if (width < 390) return 145;
    return 176;
  }, [width]);

  const questionCardWidth = useMemo(() => {
    if (width < 340) return width * 0.82;
    if (width < 390) return width * 0.8;
    return width * 0.76;
  }, [width]);

  const answerButtonWidth = useMemo(() => {
    if (width < 340) return width * 0.72;
    if (width < 390) return width * 0.69;
    return width * 0.64;
  }, [width]);

  const resultCardWidth = useMemo(() => {
    if (width < 340) return width * 0.82;
    if (width < 390) return width * 0.8;
    return width * 0.76;
  }, [width]);

  const actionButtonWidth = useMemo(() => {
    if (width < 340) return 48;
    if (width < 390) return 52;
    return 56;
  }, [width]);

  const mainButtonWidth = useMemo(() => {
    if (width < 340) return 150;
    if (width < 390) return 165;
    return 180;
  }, [width]);

  const runScreenAnimation = useCallback(() => {
    fade.setValue(0);
    scale.setValue(0.94);
    translateY.setValue(16);
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

  const resetQuiz = useCallback(() => {
    setScreenStep('intro');
    setLevelIndex(0);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerState('idle');
    setCorrectCount(0);
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetQuiz();
    }, [resetQuiz]),
  );

  useEffect(() => {
    runScreenAnimation();
  }, [screenStep, questionIndex, levelIndex, correctCount, runScreenAnimation]);

  const handleStart = () => {
    setScreenStep('question');
    setLevelIndex(0);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerState('idle');
    setCorrectCount(0);
  };

  const handleExit = () => {
    resetQuiz();
  };

  const goToNextQuestionOrResult = (nextCorrectCount: number) => {
    const isLastQuestion = questionIndex === currentLevel.questions.length - 1;

    if (isLastQuestion) {
      setCorrectCount(nextCorrectCount);
      setScreenStep('result');
      return;
    }

    setCorrectCount(nextCorrectCount);

    setTimeout(() => {
      setQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswerState('idle');
    }, 650);
  };

  const handleAnswer = (optionIndex: number) => {
    if (answerState !== 'idle') return;

    const isCorrect = optionIndex === currentQuestion.correctIndex;
    const nextCorrectCount = isCorrect ? correctCount + 1 : correctCount;

    setSelectedAnswer(optionIndex);
    setAnswerState(isCorrect ? 'correct' : 'wrong');

    goToNextQuestionOrResult(nextCorrectCount);
  };

  const handleNextLevel = () => {
    if (isLastLevel) {
      resetQuiz();
      return;
    }

    setLevelIndex(prev => prev + 1);
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerState('idle');
    setCorrectCount(0);
    setScreenStep('question');
  };

  const handleTryAgain = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswerState('idle');
    setCorrectCount(0);
    setScreenStep('question');
  };

  const handleShare = async () => {
    const message = passedLevel
      ? `Quiz\n\nLevel ${currentLevel.level} completed.\nScore: ${correctCount}/${currentLevel.questions.length}`
      : `Quiz\n\nLevel ${currentLevel.level} finished.\nScore: ${correctCount}/${currentLevel.questions.length}`;

    try {
      await Share.share({ message });
    } catch {}
  };

  const getAnswerStyle = (index: number) => {
    if (answerState === 'idle') return styles.answerButtonDefault;

    if (index === currentQuestion.correctIndex) return styles.answerButtonCorrect;

    if (selectedAnswer === index && index !== currentQuestion.correctIndex) {
      return styles.answerButtonWrong;
    }

    return styles.answerButtonDefault;
  };

  const handleTitleTextLayout = (event: LayoutChangeEvent) => {
    const measuredWidth = event.nativeEvent.layout.width;
    if (measuredWidth > 0 && Math.abs(measuredWidth - titleTextWidth) > 1) {
      setTitleTextWidth(measuredWidth);
    }
  };

  return (
    <ImageBackground source={QUIZ_BG_UNIQUE_V1} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: isVerySmallScreen ? 6 : 10,
              paddingBottom: isVerySmallScreen ? 18 : 28,
            },
          ]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Animated.View
            style={{
              opacity: fade,
              transform: [{ scale }, { translateY }],
              width: '100%',
              alignItems: 'center',
            }}
          >
            <View
              style={[
                styles.titleWrap,
                {
                  width: titleFrameWidth,
                  height: titleFrameHeight,
                  marginTop: isVerySmallScreen ? 4 : 8,
                },
              ]}
            >
              <Image
                source={QUIZ_TITLE_FRAME_UNIQUE_V1}
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

            <View
              style={[
                styles.exitTopWrap,
                { minHeight: isVerySmallScreen ? 28 : 34, marginTop: 6 },
              ]}
            >
              {screenStep !== 'intro' && (
                <Pressable style={styles.exitTopButton} onPress={handleExit}>
                  <Text style={styles.exitTopButtonText}>Exit</Text>
                </Pressable>
              )}
            </View>

            <Animated.View
              style={{
                width: '100%',
                alignItems: 'center',
                opacity: contentOpacity,
                transform: [{ translateY: contentTranslateY }],
              }}
            >
              {screenStep === 'intro' && (
                <>
                  <Image
                    source={QUIZ_INTRO_IMAGE_UNIQUE_V1}
                    resizeMode="contain"
                    style={{
                      width: introImageWidth,
                      height: introImageWidth * 0.72,
                      marginTop: isVerySmallScreen ? 6 : 12,
                    }}
                  />

                  <Text
                    style={[
                      styles.introText,
                      {
                        width: questionCardWidth,
                        marginTop: isVerySmallScreen ? 14 : 18,
                        fontSize: isVerySmallScreen ? 14 : 16,
                        lineHeight: isVerySmallScreen ? 22 : 25,
                      },
                    ]}
                  >
                    A few curious questions are waiting ahead. See how many answers you can uncover.
                  </Text>

                  <Pressable
                    style={[
                      styles.startButton,
                      {
                        width: isVerySmallScreen ? 220 : 250,
                        height: isVerySmallScreen ? 52 : 58,
                        marginTop: isVerySmallScreen ? 26 : 32,
                      },
                    ]}
                    onPress={handleStart}
                  >
                    <Text
                      style={[
                        styles.startButtonText,
                        { fontSize: isVerySmallScreen ? 17 : 19 },
                      ]}
                    >
                      Start the Quiz
                    </Text>
                  </Pressable>
                </>
              )}

              {screenStep === 'question' && (
                <>
                  <View
                    style={[
                      styles.questionCard,
                      {
                        width: questionCardWidth,
                        minHeight: isVerySmallScreen ? 86 : 100,
                        paddingHorizontal: isVerySmallScreen ? 14 : 18,
                        paddingVertical: isVerySmallScreen ? 14 : 18,
                        marginTop: isVerySmallScreen ? 12 : 20,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.questionText,
                        {
                          fontSize: isVerySmallScreen ? 14 : 16,
                          lineHeight: isVerySmallScreen ? 22 : 26,
                        },
                      ]}
                    >
                      {currentQuestion.question}
                    </Text>
                  </View>

                  <View style={{ marginTop: isVerySmallScreen ? 24 : 34, gap: 12 }}>
                    {currentQuestion.options.map((option, index) => (
                      <Pressable
                        key={`${currentQuestion.question}-${option}`}
                        style={[
                          styles.answerButton,
                          getAnswerStyle(index),
                          {
                            width: answerButtonWidth,
                            height: isVerySmallScreen ? 42 : 46,
                          },
                        ]}
                        onPress={() => handleAnswer(index)}
                      >
                        <Text
                          style={[
                            styles.answerButtonText,
                            { fontSize: isVerySmallScreen ? 16 : 18 },
                          ]}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </>
              )}

              {screenStep === 'result' && (
                <>
                  <View
                    style={[
                      styles.resultCard,
                      {
                        width: resultCardWidth,
                        marginTop: isVerySmallScreen ? 10 : 18,
                        paddingHorizontal: isVerySmallScreen ? 14 : 18,
                        paddingVertical: isVerySmallScreen ? 14 : 20,
                        borderRadius: isVerySmallScreen ? 18 : 20,
                      },
                    ]}
                  >
                    <Image
                      source={
                        passedLevel
                          ? QUIZ_RESULT_WIN_IMAGE_UNIQUE_V1
                          : QUIZ_RESULT_LOSE_IMAGE_UNIQUE_V1
                      }
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
                          marginTop: 4,
                          fontSize: isVerySmallScreen ? 20 : 24,
                        },
                      ]}
                    >
                      {passedLevel ? 'Level Complete' : 'Not This Time'}
                    </Text>

                    <Text
                      style={[
                        styles.resultText,
                        {
                          marginTop: 8,
                          fontSize: isVerySmallScreen ? 12 : 14,
                          lineHeight: isVerySmallScreen ? 20 : 23,
                        },
                      ]}
                    >
                      {passedLevel
                        ? `Well done! You solved the questions and reached the end of this level. Score: ${correctCount}/${currentLevel.questions.length}.`
                        : `You gave it a try, and that’s what matters. Take another look and see if you can find the right answers. Score: ${correctCount}/${currentLevel.questions.length}.`}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.resultButtonsRow,
                      {
                        marginTop: isVerySmallScreen ? 18 : 22,
                        gap: isVerySmallScreen ? 8 : 10,
                      },
                    ]}
                  >
                    <Pressable
                      style={[
                        styles.iconButton,
                        {
                          width: actionButtonWidth,
                          height: isVerySmallScreen ? 42 : 46,
                        },
                      ]}
                      onPress={handleShare}
                    >
                      <Text style={styles.iconButtonText}>↗</Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.centerActionButton,
                        {
                          width: mainButtonWidth,
                          height: isVerySmallScreen ? 42 : 46,
                        },
                      ]}
                      onPress={passedLevel ? handleNextLevel : handleTryAgain}
                    >
                      <Text
                        style={[
                          styles.centerActionButtonText,
                          {
                            fontSize: isVerySmallScreen ? 16 : 18,
                          },
                        ]}
                      >
                        {passedLevel ? (isLastLevel ? 'Finish' : 'Next Level') : 'Try Again'}
                      </Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.iconButton,
                        {
                          width: actionButtonWidth,
                          height: isVerySmallScreen ? 42 : 46,
                        },
                      ]}
                      onPress={handleExit}
                    >
                      <Text style={styles.iconButtonText}>⌂</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </Animated.View>
          </Animated.View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
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
  exitTopWrap: {
    width: '100%',
    alignItems: 'center',
  },
  exitTopButton: {
    minWidth: 86,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#A33CFF',
    borderWidth: 1,
    borderColor: '#D5B3FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  exitTopButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  introText: {
    color: '#FFD338',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(88, 38, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 1.5,
  },
  startButton: {
    borderRadius: 30,
    backgroundColor: '#8B2CF5',
    borderWidth: 3,
    borderColor: '#F0B642',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  startButtonText: {
    color: '#FFF2E9',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#5E1A8A',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  questionCard: {
    backgroundColor: 'rgba(113, 67, 196, 0.96)',
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#4F1D88',
    justifyContent: 'center',
  },
  questionText: {
    color: '#F7F0FF',
    fontWeight: '700',
    textAlign: 'center',
  },
  answerButton: {
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerButtonDefault: {
    backgroundColor: '#FFA306',
    borderColor: '#6D240C',
  },
  answerButtonCorrect: {
    backgroundColor: '#39EF45',
    borderColor: '#237B16',
  },
  answerButtonWrong: {
    backgroundColor: '#DD2B18',
    borderColor: '#8A140C',
  },
  answerButtonText: {
    color: '#FFF5E5',
    fontWeight: '900',
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: '#F1E7A8',
    borderWidth: 2,
    borderColor: '#551C0F',
    alignItems: 'center',
  },
  resultTitle: {
    color: '#B07A1D',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  resultText: {
    color: '#1A120B',
    fontWeight: '700',
    textAlign: 'center',
  },
  resultButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    borderRadius: 10,
    backgroundColor: '#FF9800',
    borderWidth: 1.5,
    borderColor: '#6D240C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonText: {
    color: '#FFF6E4',
    fontSize: 22,
    fontWeight: '900',
  },
  centerActionButton: {
    borderRadius: 10,
    backgroundColor: '#FF9800',
    borderWidth: 1.5,
    borderColor: '#6D240C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerActionButtonText: {
    color: '#FFF6E4',
    fontWeight: '900',
    textAlign: 'center',
  },
});