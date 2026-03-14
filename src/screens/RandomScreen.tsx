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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

type Step = 'intro' | 'task' | 'done';

const RANDOM_BG_UNIQUE_V1 = require('../assets/random_bg_unique_v1.png');
const RANDOM_TITLE_FRAME_UNIQUE_V1 = require('../assets/random_title_frame_unique_v1.png');
const RANDOM_SPARK_IMAGE_UNIQUE_V1 = require('../assets/random_spark_image_unique_v1.png');
const RANDOM_RESULT_LEPRECHAUN_UNIQUE_V1 = require('../assets/random_result_leprechaun_unique_v1.png');

const thoughts = [
  'Every small step you take today quietly builds the future you dream about.',
  'Some days begin slowly, but even the quietest start can grow into something meaningful.',
  'A tiny action done with intention can change the direction of an entire day.',
  'You don’t need a perfect plan—just the courage to begin with one simple step.',
  'Progress often hides in the smallest efforts that no one else notices.',
  'The best days are not always planned; sometimes they begin with one unexpected spark.',
  'Your energy shapes the world around you—bring curiosity, and the day will answer.',
  'A moment of effort today can become tomorrow’s quiet success.',
  'Even the simplest idea can grow into something remarkable when you give it attention.',
  'Every day carries a new possibility—sometimes all it needs is for you to notice it.',
  'A new day does not ask for perfection—only a small beginning.',
  'Sometimes the quiet choice to move forward is the bravest step you can take.',
  'A simple moment of curiosity can turn an ordinary day into a story worth telling.',
  'Great things rarely start loud; they begin with one calm decision.',
  'When you give a little effort to today, tomorrow quietly becomes easier.',
  'Not every step needs to be big—what matters is that you keep walking.',
  'A single good thought can brighten more than just one moment.',
  'Every day hides something interesting for those who are willing to notice it.',
  'Small ideas have a strange habit of growing into meaningful things.',
  'The best discoveries often begin with the simplest action.',
  'The direction of your day often changes with the very first choice you make.',
  'A quiet moment of effort today can echo far into tomorrow.',
  'Progress rarely arrives all at once—it grows through many small attempts.',
  'Some of the best outcomes begin with nothing more than a simple try.',
  'A calm mind can find opportunities where others only see routine.',
  'Every day offers a new page, even if yesterday felt unfinished.',
  'The smallest action can be the start of something unexpectedly meaningful.',
  'What seems like a tiny step today may later become an important turning point.',
  'Curiosity has a way of opening doors that routine keeps closed.',
  'When you stay open to new moments, the day becomes richer than expected.',
  'Not every effort will be noticed, but each one still moves you forward.',
  'A good day often begins with the decision to try something small.',
  'Even a short pause to reflect can change how the rest of the day unfolds.',
  'Meaningful progress is built from many quiet actions.',
  'Sometimes the most valuable thing you can do is simply continue.',
  'Every moment holds the chance to create a better next step.',
  'The path forward often appears only after you begin walking.',
  'A thoughtful action today can quietly shape tomorrow’s possibilities.',
  'What feels ordinary now may later become an important memory.',
  'Each new day carries something worth discovering.',
];

const sparks = [
  'Write down one idea that came to your mind today.',
  'Take five minutes to organize something around you.',
  'Look outside and notice three things you haven’t paid attention to before.',
  'Think of one small goal you can complete before the end of the day.',
  'Send a short message to someone you haven’t talked to in a while.',
  'Write one sentence describing how your day feels so far.',
  'Find something around you that inspires a new idea.',
  'Spend a few minutes observing your surroundings without distractions.',
  'Write down one thing you would like to try this week.',
  'Notice something small that makes your day a little better.',
  'Clean or rearrange one small space around you.',
  'Think of one interesting place you would like to visit someday.',
  'Write one positive thought about today.',
  'Look at the sky for a moment and simply observe the clouds.',
  'Take a short walk and notice something new around you.',
  'Write down three words that describe your current mood.',
  'Read one page from a book or article.',
  'Think about one thing you learned recently.',
  'Imagine one small project you could start someday.',
  'Take a moment to slow down and enjoy the present moment.',
  'Write down one small goal for tomorrow.',
  'Look around and find one object you haven’t noticed before.',
  'Spend a few minutes thinking about a place you would like to visit.',
  'Write one short idea for something creative you could try.',
  'Organize one small folder on your phone or computer.',
  'Step outside for a few minutes and observe your surroundings.',
  'Write three things that caught your attention today.',
  'Think of one skill you would like to learn in the future.',
  'Take a moment to stretch and reset your posture.',
  'Notice one detail in your environment that you usually ignore.',
  'Write one sentence about something interesting you saw today.',
  'Spend five minutes thinking about a new idea or project.',
  'Look at something familiar and try to see it from a new perspective.',
  'Write down one thing you would like to improve this week.',
  'Take a moment to slow down and focus on your surroundings.',
  'Think about one place where you feel comfortable and relaxed.',
  'Write one thing you would like to remember from today.',
  'Notice one sound around you that you usually overlook.',
  'Imagine one simple activity that could make tomorrow more interesting.',
  'Take a short pause and reflect on how the day is going so far.',
];

const pickRandom = (items: string[]) => items[Math.floor(Math.random() * items.length)];

export default function RandomScreen() {
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 760 || width < 360;
  const isVerySmallScreen = height < 700 || width < 340;
  const isCompactResultScreen = height < 760;

  const [step, setStep] = useState<Step>('intro');
  const [thought, setThought] = useState(() => pickRandom(thoughts));
  const [spark, setSpark] = useState(() => pickRandom(sparks));
  const [completed, setCompleted] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(22)).current;

  const titleFrameWidth = useMemo(() => {
    if (width < 340) return 228;
    if (width < 390) return 248;
    return 278;
  }, [width]);

  const titleFrameHeight = useMemo(() => {
    if (width < 340) return 66;
    if (width < 390) return 74;
    return 82;
  }, [width]);

  const topImageSize = useMemo(() => {
    if (width < 340) return 138;
    if (width < 390) return 162;
    return 198;
  }, [width]);

  const resultImageSize = useMemo(() => {
    if (height < 700 || width < 340) return 104;
    if (height < 760 || width < 390) return 128;
    return 172;
  }, [height, width]);

  const mainCardWidth = useMemo(() => {
    if (width < 340) return width * 0.86;
    if (width < 390) return width * 0.82;
    return width * 0.78;
  }, [width]);

  const taskCardWidth = useMemo(() => {
    if (width < 340) return width * 0.9;
    if (width < 390) return width * 0.87;
    return width * 0.82;
  }, [width]);

  const resultCardWidth = useMemo(() => {
    if (width < 340) return width * 0.84;
    if (width < 390) return width * 0.8;
    return width * 0.74;
  }, [width]);

  const orangeButtonWidth = useMemo(() => {
    if (width < 340) return 210;
    if (width < 390) return 232;
    return 252;
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

  const resetToFirstPage = useCallback(() => {
    setStep('intro');
    setCompleted(false);
    setThought(pickRandom(thoughts));
    setSpark(pickRandom(sparks));
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetToFirstPage();
    }, [resetToFirstPage]),
  );

  useEffect(() => {
    runScreenAnimation();
  }, [step, thought, spark, runScreenAnimation]);

  const generateNewContent = () => {
    setThought(pickRandom(thoughts));
    setSpark(pickRandom(sparks));
    setCompleted(false);
  };

  const handleReveal = () => {
    generateNewContent();
    setStep('task');
  };

  const handleToggleComplete = () => {
    const nextValue = !completed;
    setCompleted(nextValue);

    if (nextValue) {
      setTimeout(() => {
        setStep('done');
      }, 180);
    }
  };

  const handleTryAgain = () => {
    generateNewContent();
    setStep('task');
  };

  const handleBackToSparks = () => {
    resetToFirstPage();
  };

  const handleExit = () => {
    resetToFirstPage();
  };

  const handleShare = async () => {
    const text =
      step === 'done'
        ? `Random Spark\n\nA Thought for the Day:\n${thought}\n\nTask:\n${spark}\n\nWell done!`
        : `Random Spark\n\nA Thought for the Day:\n${thought}\n\nTask:\n${spark}`;

    try {
      await Share.share({ message: text });
    } catch {}
  };

  return (
    <ImageBackground source={RANDOM_BG_UNIQUE_V1} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: isVerySmallScreen ? 6 : 10,
              paddingBottom: step === 'done' ? (isVerySmallScreen ? 22 : 28) : isVerySmallScreen ? 18 : 28,
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
                source={RANDOM_TITLE_FRAME_UNIQUE_V1}
                resizeMode="contain"
                style={styles.titleFrame}
              />
              <Text
                style={[
                  styles.titleFrameText,
                  {
                    fontSize: isVerySmallScreen ? 17 : isSmallScreen ? 18 : 20,
                  },
                ]}
              >
                Random Spark
              </Text>
            </View>

            <View
              style={[
                styles.exitTopWrap,
                {
                  minHeight: isVerySmallScreen ? 28 : 34,
                  marginTop: 6,
                },
              ]}
            >
              {step !== 'intro' && (
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
              {step === 'intro' && (
                <>
                  <Image
                    source={RANDOM_SPARK_IMAGE_UNIQUE_V1}
                    resizeMode="contain"
                    style={[
                      styles.sparkImage,
                      {
                        width: topImageSize,
                        height: topImageSize,
                        marginTop: isVerySmallScreen ? 2 : 8,
                      },
                    ]}
                  />

                  <Text
                    style={[
                      styles.sectionTitle,
                      {
                        marginTop: isVerySmallScreen ? 0 : 8,
                        fontSize: isVerySmallScreen ? 22 : isSmallScreen ? 26 : 30,
                      },
                    ]}
                  >
                    A Little Spark of Chance
                  </Text>

                  <View
                    style={[
                      styles.infoCard,
                      {
                        width: mainCardWidth,
                        paddingHorizontal: isVerySmallScreen ? 12 : 16,
                        paddingVertical: isVerySmallScreen ? 10 : 14,
                        marginTop: 10,
                        borderRadius: isVerySmallScreen ? 10 : 12,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.infoCardText,
                        {
                          fontSize: isVerySmallScreen ? 13 : 15,
                          lineHeight: isVerySmallScreen ? 19 : 22,
                        },
                      ]}
                    >
                      Give the wheel of chance a gentle tap. A tiny quest and a bright thought are waiting for you.
                    </Text>
                  </View>

                  <Pressable
                    style={[
                      styles.orangeButton,
                      {
                        width: orangeButtonWidth,
                        height: isVerySmallScreen ? 42 : 46,
                        marginTop: isVerySmallScreen ? 18 : 26,
                      },
                    ]}
                    onPress={handleReveal}
                  >
                    <Text
                      style={[
                        styles.orangeButtonText,
                        {
                          fontSize: isVerySmallScreen ? 15 : 18,
                        },
                      ]}
                    >
                      Reveal Today’s Spark
                    </Text>
                  </Pressable>
                </>
              )}

              {step === 'task' && (
                <>
                  <Text
                    style={[
                      styles.sectionHeader,
                      {
                        marginTop: isVerySmallScreen ? 8 : 16,
                        fontSize: isVerySmallScreen ? 21 : isSmallScreen ? 25 : 30,
                      },
                    ]}
                  >
                    A Thought for the Day
                  </Text>

                  <View
                    style={[
                      styles.thoughtCard,
                      {
                        width: taskCardWidth,
                        marginTop: 10,
                        paddingHorizontal: isVerySmallScreen ? 14 : 18,
                        paddingVertical: isVerySmallScreen ? 11 : 14,
                        borderRadius: isVerySmallScreen ? 10 : 12,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.thoughtText,
                        {
                          fontSize: isVerySmallScreen ? 13 : 15,
                          lineHeight: isVerySmallScreen ? 20 : 23,
                        },
                      ]}
                    >
                      {thought}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.taskCard,
                      {
                        width: taskCardWidth,
                        marginTop: 12,
                        paddingHorizontal: isVerySmallScreen ? 12 : 16,
                        paddingVertical: isVerySmallScreen ? 12 : 16,
                        borderRadius: isVerySmallScreen ? 10 : 12,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.starIcon,
                        {
                          fontSize: isVerySmallScreen ? 28 : 34,
                          lineHeight: isVerySmallScreen ? 28 : 34,
                          marginBottom: 10,
                        },
                      ]}
                    >
                      ★
                    </Text>

                    <Text
                      style={[
                        styles.taskText,
                        {
                          fontSize: isVerySmallScreen ? 16 : isSmallScreen ? 20 : 23,
                          lineHeight: isVerySmallScreen ? 24 : isSmallScreen ? 30 : 34,
                        },
                      ]}
                    >
                      {spark}
                    </Text>

                    <View
                      style={[
                        styles.toggleWrap,
                        {
                          marginTop: 14,
                          minHeight: isVerySmallScreen ? 64 : 74,
                          paddingLeft: isVerySmallScreen ? 14 : 18,
                          paddingRight: isVerySmallScreen ? 10 : 12,
                          paddingVertical: isVerySmallScreen ? 8 : 10,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.toggleHint,
                          {
                            fontSize: isVerySmallScreen ? 11 : 13,
                            lineHeight: isVerySmallScreen ? 16 : 18,
                          },
                        ]}
                      >
                        Tap if you believe the task is complete.
                      </Text>

                      <Pressable
                        style={[
                          styles.toggleTrack,
                          {
                            width: isVerySmallScreen ? 72 : 82,
                            height: isVerySmallScreen ? 36 : 42,
                          },
                          completed ? styles.toggleTrackActive : null,
                        ]}
                        onPress={handleToggleComplete}
                      >
                        <Animated.View
                          style={[
                            styles.toggleThumb,
                            {
                              width: isVerySmallScreen ? 28 : 34,
                              height: isVerySmallScreen ? 28 : 34,
                              borderRadius: isVerySmallScreen ? 14 : 17,
                            },
                            completed ? styles.toggleThumbActive : null,
                          ]}
                        >
                          {completed ? (
                            <Text
                              style={[
                                styles.toggleCheck,
                                {
                                  fontSize: isVerySmallScreen ? 14 : 17,
                                },
                              ]}
                            >
                              ✓
                            </Text>
                          ) : null}
                        </Animated.View>
                      </Pressable>
                    </View>
                  </View>

                  {!completed && (
                    <Pressable
                      style={[
                        styles.purpleButton,
                        {
                          minWidth: isVerySmallScreen ? 150 : 180,
                          height: isVerySmallScreen ? 40 : 46,
                          marginTop: isVerySmallScreen ? 14 : 18,
                        },
                      ]}
                      onPress={handleTryAgain}
                    >
                      <Text
                        style={[
                          styles.purpleButtonText,
                          {
                            fontSize: isVerySmallScreen ? 15 : 18,
                          },
                        ]}
                      >
                        Try Again
                      </Text>
                    </Pressable>
                  )}

                  {completed && (
                    <Pressable
                      style={[
                        styles.greenButton,
                        {
                          minWidth: isVerySmallScreen ? 140 : 160,
                          height: isVerySmallScreen ? 40 : 44,
                          marginTop: isVerySmallScreen ? 14 : 18,
                        },
                      ]}
                      onPress={() => setStep('done')}
                    >
                      <Text
                        style={[
                          styles.greenButtonText,
                          {
                            fontSize: isVerySmallScreen ? 15 : 18,
                          },
                        ]}
                      >
                        Continue
                      </Text>
                    </Pressable>
                  )}
                </>
              )}

              {step === 'done' && (
                <>
                  <View
                    style={[
                      styles.resultCard,
                      {
                        width: resultCardWidth,
                        marginTop: isVerySmallScreen ? 6 : 12,
                        paddingHorizontal: isVerySmallScreen ? 12 : isCompactResultScreen ? 14 : 18,
                        paddingVertical: isVerySmallScreen ? 10 : isCompactResultScreen ? 12 : 18,
                        borderRadius: isVerySmallScreen ? 14 : 18,
                      },
                    ]}
                  >
                    <Image
                      source={RANDOM_RESULT_LEPRECHAUN_UNIQUE_V1}
                      resizeMode="contain"
                      style={[
                        styles.resultImage,
                        {
                          width: resultImageSize,
                          height: resultImageSize,
                        },
                      ]}
                    />

                    <Text
                      style={[
                        styles.resultTitle,
                        {
                          marginTop: isVerySmallScreen ? 2 : 4,
                          fontSize: isVerySmallScreen ? 18 : isCompactResultScreen ? 20 : 24,
                        },
                      ]}
                    >
                      Well Done
                    </Text>

                    <Text
                      style={[
                        styles.resultText,
                        {
                          marginTop: isVerySmallScreen ? 6 : 8,
                          fontSize: isVerySmallScreen ? 12 : 14,
                          lineHeight: isVerySmallScreen ? 18 : isCompactResultScreen ? 20 : 24,
                        },
                      ]}
                    >
                      You completed today’s small quest. Sometimes the smallest actions bring the brightest moments to the day.
                    </Text>
                  </View>

                  <Pressable
                    style={[
                      styles.orangeButton,
                      {
                        width: orangeButtonWidth,
                        height: isVerySmallScreen ? 42 : 46,
                        marginTop: isVerySmallScreen ? 12 : 16,
                      },
                    ]}
                    onPress={handleBackToSparks}
                  >
                    <Text
                      style={[
                        styles.orangeButtonText,
                        {
                          fontSize: isVerySmallScreen ? 15 : 18,
                        },
                      ]}
                    >
                      Back to Sparks
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.orangeButton,
                      {
                        width: orangeButtonWidth,
                        height: isVerySmallScreen ? 42 : 46,
                        marginTop: 8,
                      },
                    ]}
                    onPress={handleShare}
                  >
                    <Text
                      style={[
                        styles.orangeButtonText,
                        {
                          fontSize: isVerySmallScreen ? 15 : 18,
                        },
                      ]}
                    >
                      Share
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[
                      styles.orangeButton,
                      {
                        width: orangeButtonWidth,
                        height: isVerySmallScreen ? 42 : 46,
                        marginTop: 8,
                      },
                    ]}
                    onPress={handleExit}
                  >
                    <Text
                      style={[
                        styles.orangeButtonText,
                        {
                          fontSize: isVerySmallScreen ? 15 : 18,
                        },
                      ]}
                    >
                      Exit
                    </Text>
                  </Pressable>
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
    color: '#FFF7F8',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#3E1365',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
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
  sparkImage: {},
  sectionTitle: {
    color: '#F8F3E3',
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: '#3E1365',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  infoCard: {
    backgroundColor: 'rgba(110, 66, 195, 0.95)',
    borderWidth: 1.5,
    borderColor: '#3B0E66',
  },
  infoCardText: {
    color: '#FFF7F8',
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionHeader: {
    color: '#F8F3E3',
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: '#3E1365',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  thoughtCard: {
    backgroundColor: 'rgba(110, 66, 195, 0.95)',
    borderWidth: 1.5,
    borderColor: '#3B0E66',
  },
  thoughtText: {
    color: '#FFF7F8',
    fontWeight: '600',
    textAlign: 'center',
  },
  taskCard: {
    backgroundColor: 'rgba(125, 77, 212, 0.98)',
    borderWidth: 2,
    borderColor: '#18A0FF',
    alignItems: 'center',
  },
  starIcon: {
    color: '#FFD54A',
  },
  taskText: {
    color: '#FFF8FB',
    fontWeight: '800',
    textAlign: 'center',
  },
  toggleWrap: {
    width: '100%',
    backgroundColor: '#F4B9D6',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#6A2A95',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleHint: {
    flex: 1,
    color: '#110C12',
    fontWeight: '700',
    paddingRight: 10,
  },
  toggleTrack: {
    borderRadius: 24,
    backgroundColor: '#D4D4D8',
    borderWidth: 2,
    borderColor: '#5D2A91',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleTrackActive: {
    backgroundColor: '#FFB11B',
  },
  toggleThumb: {
    backgroundColor: '#BCBCC2',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFDC5D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleCheck: {
    color: '#6C3400',
    fontWeight: '900',
  },
  resultCard: {
    backgroundColor: '#F1E7A8',
    borderWidth: 2,
    borderColor: '#551C0F',
    alignItems: 'center',
  },
  resultImage: {
    marginTop: -2,
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
  orangeButton: {
    borderRadius: 12,
    backgroundColor: '#FF9D05',
    borderWidth: 1.5,
    borderColor: '#6D240C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  orangeButtonText: {
    color: '#FFF6E4',
    fontWeight: '900',
    textAlign: 'center',
  },
  purpleButton: {
    borderRadius: 12,
    backgroundColor: '#8D1DFF',
    borderWidth: 1.5,
    borderColor: '#E8C0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  purpleButtonText: {
    color: '#FFF6FF',
    fontWeight: '800',
  },
  greenButton: {
    borderRadius: 8,
    backgroundColor: '#9FE11D',
    borderWidth: 1.5,
    borderColor: '#E6FF95',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});