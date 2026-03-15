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
  Alert,
  LayoutChangeEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moodStories } from '../data/moodStories';

type ScreenStep = 'grid' | 'list' | 'story';

type MoodId = 'chill' | 'energetic' | 'curious' | 'calm';

type SavedStoryItem = {
  id: string;
  moodId: MoodId;
  moodTitle: string;
  title: string;
  text: string;
};

const MOOD_BG_UNIQUE_V1 = require('../assets/random_bg_unique_v1.png');
const MOOD_TITLE_FRAME_UNIQUE_V1 = require('../assets/random_title_frame_unique_v1.png');
const MOOD_CARD_CHILL_UNIQUE_V1 = require('../assets/mood_card_chill_unique_v1.png');
const MOOD_CARD_ENERGETIC_UNIQUE_V1 = require('../assets/mood_card_energetic_unique_v1.png');
const MOOD_CARD_CURIOUS_UNIQUE_V1 = require('../assets/mood_card_curious_unique_v1.png');
const MOOD_CARD_CALM_UNIQUE_V1 = require('../assets/mood_card_calm_unique_v1.png');
const MOOD_STORY_SHARE_UNIQUE_V1 = require('../assets/mood_story_share_unique_v1.png');
const MOOD_STORY_SAVE_UNIQUE_V1 = require('../assets/mood_story_save_unique_v1.png');

const SAVED_MOOD_STORIES_KEY = 'saved_mood_stories_v1';

const moodImageMap: Record<MoodId, any> = {
  chill: MOOD_CARD_CHILL_UNIQUE_V1,
  energetic: MOOD_CARD_ENERGETIC_UNIQUE_V1,
  curious: MOOD_CARD_CURIOUS_UNIQUE_V1,
  calm: MOOD_CARD_CALM_UNIQUE_V1,
};

export default function MoodScreen() {
  const { width, height } = useWindowDimensions();
  const isSmallScreen = height < 760 || width < 360;
  const isVerySmallScreen = height < 700 || width < 340;

  const [screenStep, setScreenStep] = useState<ScreenStep>('grid');
  const [selectedMoodId, setSelectedMoodId] = useState<MoodId | null>(null);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [savedStoryIds, setSavedStoryIds] = useState<string[]>([]);
  const [titleTextWidth, setTitleTextWidth] = useState(0);

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(22)).current;

  const selectedMood = useMemo(() => {
    return moodStories.find(item => item.id === selectedMoodId) ?? null;
  }, [selectedMoodId]);

  const selectedStory =
    selectedMood && selectedStoryIndex !== null
      ? selectedMood.stories[selectedStoryIndex]
      : null;

  const selectedStoryId =
    selectedMood && selectedStoryIndex !== null
      ? `${selectedMood.id}_${selectedStoryIndex}`
      : null;

  const isCurrentStorySaved = selectedStoryId ? savedStoryIds.includes(selectedStoryId) : false;

  const titleText = useMemo(() => {
    if (screenStep === 'grid') return 'Mood Pick';
    if (screenStep === 'list') return selectedMood?.title ?? 'Mood Pick';
    return selectedMood?.title ?? 'Mood Pick';
  }, [screenStep, selectedMood]);

  const titleFontSize = isVerySmallScreen ? 18 : isSmallScreen ? 19 : 20;

  const titleFrameWidth = useMemo(() => {
    const horizontalFrameInset = 20;
    const minWidth = width < 340 ? 170 : width < 390 ? 190 : 210;
    const maxWidth = Math.min(width - 40, 340);
    const calculatedWidth = Math.ceil(titleTextWidth) + horizontalFrameInset;
    return Math.max(minWidth, Math.min(maxWidth, calculatedWidth || minWidth));
  }, [titleTextWidth, width]);

  const titleFrameHeight = useMemo(() => {
    if (width < 340) return 70;
    if (width < 390) return 76;
    return 82;
  }, [width]);

  const gridCardWidth = useMemo(() => {
    if (width < 340) return 96;
    if (width < 390) return 106;
    return 118;
  }, [width]);

  const gridImageSize = useMemo(() => {
    if (width < 340) return 76;
    if (width < 390) return 88;
    return 98;
  }, [width]);

  const listCardWidth = useMemo(() => {
    if (width < 340) return width * 0.88;
    if (width < 390) return width * 0.85;
    return width * 0.82;
  }, [width]);

  const storyCardWidth = useMemo(() => {
    if (width < 340) return width * 0.9;
    if (width < 390) return width * 0.86;
    return width * 0.82;
  }, [width]);

  const storyTitleSize = useMemo(() => {
    if (width < 340) return 18;
    if (width < 390) return 20;
    return 22;
  }, [width]);

  const iconBtnSize = useMemo(() => {
    if (width < 340) return 34;
    if (width < 390) return 38;
    return 42;
  }, [width]);

  const openButtonWidth = useMemo(() => {
    if (width < 340) return 72;
    if (width < 390) return 78;
    return 84;
  }, [width]);

  const baseBottomPadding = useMemo(() => {
    if (isVerySmallScreen) return 18;
    return 28;
  }, [isVerySmallScreen]);

  const extraListAndStoryScroll = 90;

  const scrollBottomPadding = useMemo(() => {
    if (screenStep === 'list' || screenStep === 'story') {
      return baseBottomPadding + extraListAndStoryScroll;
    }
    return baseBottomPadding;
  }, [baseBottomPadding, screenStep]);

  const loadSavedStories = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVED_MOOD_STORIES_KEY);
      const parsed: SavedStoryItem[] = raw ? JSON.parse(raw) : [];
      setSavedStoryIds(parsed.map(item => item.id));
    } catch {
      setSavedStoryIds([]);
    }
  }, []);

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

  const resetScreen = useCallback(() => {
    setScreenStep('grid');
    setSelectedMoodId(null);
    setSelectedStoryIndex(null);
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetScreen();
      loadSavedStories();
    }, [resetScreen, loadSavedStories]),
  );

  useEffect(() => {
    runScreenAnimation();
  }, [screenStep, selectedMoodId, selectedStoryIndex, runScreenAnimation]);

  const handleOpenMood = (moodId: MoodId) => {
    setSelectedMoodId(moodId);
    setSelectedStoryIndex(null);
    setScreenStep('list');
  };

  const handleOpenStory = (index: number) => {
    setSelectedStoryIndex(index);
    setScreenStep('story');
  };

  const handleBackFromList = () => {
    setScreenStep('grid');
    setSelectedMoodId(null);
    setSelectedStoryIndex(null);
  };

  const handleBackFromStory = () => {
    setScreenStep('list');
    setSelectedStoryIndex(null);
  };

  const handleExit = () => {
    resetScreen();
  };

  const handleShare = async () => {
    if (!selectedMood || !selectedStory) return;

    try {
      await Share.share({
        message: `${selectedMood.title}\n\n${selectedStory.title}\n\n${selectedStory.text}`,
      });
    } catch {}
  };

  const handleSave = async () => {
    if (!selectedMood || !selectedStory || selectedStoryIndex === null) return;

    const storyId = `${selectedMood.id}_${selectedStoryIndex}`;

    const storyToSave: SavedStoryItem = {
      id: storyId,
      moodId: selectedMood.id,
      moodTitle: selectedMood.title,
      title: selectedStory.title,
      text: selectedStory.text,
    };

    try {
      const raw = await AsyncStorage.getItem(SAVED_MOOD_STORIES_KEY);
      const parsed: SavedStoryItem[] = raw ? JSON.parse(raw) : [];

      const exists = parsed.some(item => item.id === storyId);

      let updated: SavedStoryItem[];

      if (exists) {
        updated = parsed.filter(item => item.id !== storyId);
      } else {
        updated = [...parsed, storyToSave];
      }

      await AsyncStorage.setItem(SAVED_MOOD_STORIES_KEY, JSON.stringify(updated));
      setSavedStoryIds(updated.map(item => item.id));
    } catch {
      Alert.alert('Error', 'Unable to update saved stories.');
    }
  };

  const handleTitleTextLayout = (event: LayoutChangeEvent) => {
    const measuredWidth = event.nativeEvent.layout.width;
    if (measuredWidth > 0 && Math.abs(measuredWidth - titleTextWidth) > 1) {
      setTitleTextWidth(measuredWidth);
    }
  };

  return (
    <ImageBackground source={MOOD_BG_UNIQUE_V1} style={styles.bg} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: isVerySmallScreen ? 6 : 10,
              paddingBottom: scrollBottomPadding,
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
                source={MOOD_TITLE_FRAME_UNIQUE_V1}
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
              {screenStep === 'list' && (
                <Pressable style={styles.exitTopButton} onPress={handleBackFromList}>
                  <Text style={styles.exitTopButtonText}>Back</Text>
                </Pressable>
              )}

              {screenStep === 'story' && (
                <View style={styles.topButtonsRow}>
                  <Pressable style={styles.exitTopButton} onPress={handleBackFromStory}>
                    <Text style={styles.exitTopButtonText}>Back</Text>
                  </Pressable>

                  <Pressable style={[styles.exitTopButton, { marginLeft: 10 }]} onPress={handleExit}>
                    <Text style={styles.exitTopButtonText}>Exit</Text>
                  </Pressable>
                </View>
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
              {screenStep === 'grid' && (
                <View
                  style={[
                    styles.gridWrap,
                    {
                      marginTop: isVerySmallScreen ? 8 : 14,
                      rowGap: isVerySmallScreen ? 14 : 18,
                      columnGap: isVerySmallScreen ? 14 : 18,
                    },
                  ]}
                >
                  {moodStories.map(item => (
                    <View
                      key={item.id}
                      style={[
                        styles.gridCardWrap,
                        {
                          width: gridCardWidth,
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.gridCard,
                          {
                            height: isVerySmallScreen ? 130 : 150,
                            borderRadius: isVerySmallScreen ? 8 : 10,
                          },
                        ]}
                      >
                        <Image
                          source={moodImageMap[item.id]}
                          resizeMode="contain"
                          style={{
                            width: gridImageSize,
                            height: gridImageSize,
                            marginTop: isVerySmallScreen ? 8 : 10,
                          }}
                        />

                        <Text
                          style={[
                            styles.gridCardTitle,
                            {
                              marginTop: isVerySmallScreen ? 6 : 8,
                              fontSize: isVerySmallScreen ? 15 : 18,
                            },
                          ]}
                        >
                          {item.title}
                        </Text>
                      </View>

                      <Pressable
                        style={[
                          styles.openButton,
                          {
                            width: openButtonWidth,
                            height: isVerySmallScreen ? 28 : 30,
                            marginTop: 8,
                          },
                        ]}
                        onPress={() => handleOpenMood(item.id)}
                      >
                        <Text
                          style={[
                            styles.openButtonText,
                            {
                              fontSize: isVerySmallScreen ? 12 : 13,
                            },
                          ]}
                        >
                          Open
                        </Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}

              {screenStep === 'list' && selectedMood && (
                <View
                  style={[
                    styles.listWrap,
                    {
                      width: listCardWidth,
                      marginTop: isVerySmallScreen ? 8 : 14,
                    },
                  ]}
                >
                  {selectedMood.stories.slice(0, 5).map((story, index) => (
                    <View
                      key={`${selectedMood.id}_${index}`}
                      style={[
                        styles.listCard,
                        {
                          paddingHorizontal: isVerySmallScreen ? 12 : 16,
                          paddingVertical: isVerySmallScreen ? 12 : 14,
                          marginBottom: 12,
                          borderRadius: isVerySmallScreen ? 12 : 14,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.listCardTitle,
                          {
                            fontSize: isVerySmallScreen ? 16 : 18,
                          },
                        ]}
                      >
                        {story.title}
                      </Text>

                      <Text
                        style={[
                          styles.listCardPreview,
                          {
                            fontSize: isVerySmallScreen ? 12 : 13,
                            lineHeight: isVerySmallScreen ? 18 : 20,
                            marginTop: 8,
                          },
                        ]}
                        numberOfLines={4}
                      >
                        {story.text}
                      </Text>

                      <Pressable
                        style={[
                          styles.openButton,
                          {
                            width: openButtonWidth,
                            height: isVerySmallScreen ? 28 : 30,
                            marginTop: 12,
                            alignSelf: 'center',
                          },
                        ]}
                        onPress={() => handleOpenStory(index)}
                      >
                        <Text
                          style={[
                            styles.openButtonText,
                            {
                              fontSize: isVerySmallScreen ? 12 : 13,
                            },
                          ]}
                        >
                          Open
                        </Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}

              {screenStep === 'story' && selectedStory && selectedMood && (
                <View
                  style={[
                    styles.storyWrap,
                    {
                      width: storyCardWidth,
                      marginTop: isVerySmallScreen ? 6 : 12,
                    },
                  ]}
                >
                  <View style={styles.storyActionsRow}>
                    <Pressable
                      style={[
                        styles.iconActionButton,
                        {
                          width: iconBtnSize,
                          height: iconBtnSize,
                          borderRadius: 8,
                        },
                      ]}
                      onPress={handleShare}
                    >
                      <Image
                        source={MOOD_STORY_SHARE_UNIQUE_V1}
                        resizeMode="contain"
                        style={styles.iconImage}
                      />
                    </Pressable>

                    <Text
                      style={[
                        styles.storyTitle,
                        {
                          fontSize: storyTitleSize,
                          paddingHorizontal: 10,
                        },
                      ]}
                    >
                      {selectedStory.title}
                    </Text>

                    <Pressable
                      style={[
                        styles.iconActionButton,
                        isCurrentStorySaved ? styles.iconActionButtonSaved : null,
                        {
                          width: iconBtnSize,
                          height: iconBtnSize,
                          borderRadius: 8,
                        },
                      ]}
                      onPress={handleSave}
                    >
                      <Image
                        source={MOOD_STORY_SAVE_UNIQUE_V1}
                        resizeMode="contain"
                        style={[
                          styles.iconImage,
                          isCurrentStorySaved ? styles.savedIconActive : null,
                        ]}
                      />
                    </Pressable>
                  </View>

                  <View
                    style={[
                      styles.storyCard,
                      {
                        paddingHorizontal: isVerySmallScreen ? 14 : 18,
                        paddingVertical: isVerySmallScreen ? 14 : 18,
                        borderRadius: isVerySmallScreen ? 18 : 22,
                        marginBottom: 60,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.storyText,
                        {
                          fontSize: isVerySmallScreen ? 12 : 13,
                          lineHeight: isVerySmallScreen ? 19 : 21,
                        },
                      ]}
                    >
                      {selectedStory.text}
                    </Text>
                  </View>
                </View>
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
  topButtonsRow: {
    flexDirection: 'row',
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
  gridWrap: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridCardWrap: {
    alignItems: 'center',
  },
  gridCard: {
    width: '100%',
    backgroundColor: 'rgba(143, 44, 245, 0.94)',
    borderWidth: 1.5,
    borderColor: '#5B178B',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  gridCardTitle: {
    color: '#FFF6EA',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#5E1A8A',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  openButton: {
    borderRadius: 10,
    backgroundColor: '#FF9D05',
    borderWidth: 1.5,
    borderColor: '#6D240C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButtonText: {
    color: '#FFF6E4',
    fontWeight: '900',
    textAlign: 'center',
  },
  listWrap: {
    alignItems: 'center',
  },
  listCard: {
    width: '100%',
    backgroundColor: 'rgba(123, 72, 210, 0.97)',
    borderWidth: 1.5,
    borderColor: '#4D1889',
  },
  listCardTitle: {
    color: '#FFF7F0',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#4A1169',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  listCardPreview: {
    color: '#FFF6F8',
    fontWeight: '600',
    textAlign: 'center',
  },
  storyWrap: {
    alignItems: 'center',
  },
  storyActionsRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconActionButton: {
    backgroundColor: '#FF9D05',
    borderWidth: 1.5,
    borderColor: '#6D240C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconActionButtonSaved: {
    backgroundColor: '#FFD63F',
    borderColor: '#8B1D1D',
  },
  iconImage: {
    width: '48%',
    height: '48%',
  },
  savedIconActive: {
    tintColor: '#B40000',
  },
  storyTitle: {
    flex: 1,
    color: '#F8F3E3',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#3E1365',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  storyCard: {
    width: '100%',
    backgroundColor: '#FFF5E9',
  },
  storyText: {
    color: '#1B120F',
    fontWeight: '600',
    textAlign: 'center',
  },
});