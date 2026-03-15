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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MoodId = 'chill' | 'energetic' | 'curious' | 'calm';

type SavedStoryItem = {
  id: string;
  moodId: MoodId;
  moodTitle: string;
  title: string;
  text: string;
};

type ScreenStep = 'empty' | 'list' | 'story';

const SAVED_MOOD_STORIES_KEY = 'saved_mood_stories_v1';

const SAVED_BG_UNIQUE_V1 = require('../assets/random_bg_unique_v1.png');
const SAVED_TITLE_FRAME_UNIQUE_V1 = require('../assets/random_title_frame_unique_v1.png');
const SAVED_EMPTY_LEPRECHAUN_UNIQUE_V1 = require('../assets/saved_empty_leprechaun_unique_v1.png');
const SAVED_SHARE_ICON_UNIQUE_V1 = require('../assets/mood_story_share_unique_v1.png');
const SAVED_BOOKMARK_ICON_UNIQUE_V1 = require('../assets/mood_story_save_unique_v1.png');

export default function SavedScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const isSmallScreen = height < 760 || width < 360;
  const isVerySmallScreen = height < 700 || width < 340;

  const [screenStep, setScreenStep] = useState<ScreenStep>('empty');
  const [savedStories, setSavedStories] = useState<SavedStoryItem[]>([]);
  const [selectedStory, setSelectedStory] = useState<SavedStoryItem | null>(null);
  const [titleTextWidth, setTitleTextWidth] = useState(0);

  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(22)).current;

  const titleText = 'Saved';
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

  const emptyImageSize = useMemo(() => {
    if (width < 340) return 200;
    if (width < 390) return 225;
    return 255;
  }, [width]);

  const listCardWidth = useMemo(() => {
    if (width < 340) return width * 0.9;
    if (width < 390) return width * 0.87;
    return width * 0.83;
  }, [width]);

  const storyCardWidth = useMemo(() => {
    if (width < 340) return width * 0.9;
    if (width < 390) return width * 0.87;
    return width * 0.83;
  }, [width]);

  const actionButtonWidth = useMemo(() => {
    if (width < 340) return 92;
    if (width < 390) return 100;
    return 112;
  }, [width]);

  const iconButtonSize = useMemo(() => {
    if (width < 340) return 38;
    if (width < 390) return 42;
    return 46;
  }, [width]);

  const extraScrollPadding = 90;

  const scrollBottomPadding = useMemo(() => {
    if (screenStep === 'list' || screenStep === 'story') {
      return (isVerySmallScreen ? 18 : 28) + extraScrollPadding;
    }
    return isVerySmallScreen ? 18 : 28;
  }, [isVerySmallScreen, screenStep]);

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

  const loadSavedStories = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(SAVED_MOOD_STORIES_KEY);
      const parsed: SavedStoryItem[] = raw ? JSON.parse(raw) : [];

      setSavedStories(parsed);

      if (parsed.length === 0) {
        setScreenStep('empty');
        setSelectedStory(null);
      } else {
        setScreenStep('list');
        setSelectedStory(null);
      }
    } catch {
      setSavedStories([]);
      setScreenStep('empty');
      setSelectedStory(null);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSavedStories();
    }, [loadSavedStories]),
  );

  useEffect(() => {
    runScreenAnimation();
  }, [screenStep, selectedStory, runScreenAnimation]);

  const handleOpenStory = (story: SavedStoryItem) => {
    setSelectedStory(story);
    setScreenStep('story');
  };

  const handleBackToList = () => {
    setSelectedStory(null);
    setScreenStep(savedStories.length === 0 ? 'empty' : 'list');
  };

  const handleGoToMood = () => {
    navigation.navigate('Mood' as never);
  };

  const handleShare = async () => {
    if (!selectedStory) return;

    try {
      await Share.share({
        message: `${selectedStory.moodTitle}\n\n${selectedStory.title}\n\n${selectedStory.text}`,
      });
    } catch {}
  };

  const handleDeleteStory = async (storyId: string) => {
    try {
      const raw = await AsyncStorage.getItem(SAVED_MOOD_STORIES_KEY);
      const parsed: SavedStoryItem[] = raw ? JSON.parse(raw) : [];
      const updated = parsed.filter(item => item.id !== storyId);

      await AsyncStorage.setItem(SAVED_MOOD_STORIES_KEY, JSON.stringify(updated));

      setSavedStories(updated);

      if (selectedStory?.id === storyId) {
        setSelectedStory(null);
      }

      if (updated.length === 0) {
        setScreenStep('empty');
      } else {
        setScreenStep(selectedStory?.id === storyId ? 'list' : screenStep);
      }
    } catch {
      Alert.alert('Error', 'Unable to delete the saved story.');
    }
  };

  const confirmDelete = (storyId: string) => {
    Alert.alert('Delete story', 'Do you want to remove this story from saved?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          handleDeleteStory(storyId);
        },
      },
    ]);
  };

  const handleTitleTextLayout = (event: LayoutChangeEvent) => {
    const measuredWidth = event.nativeEvent.layout.width;
    if (measuredWidth > 0 && Math.abs(measuredWidth - titleTextWidth) > 1) {
      setTitleTextWidth(measuredWidth);
    }
  };

  return (
    <ImageBackground source={SAVED_BG_UNIQUE_V1} style={styles.bg} resizeMode="cover">
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
                source={SAVED_TITLE_FRAME_UNIQUE_V1}
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

            {screenStep === 'story' && (
              <View style={[styles.topButtonsRow, { marginTop: 10 }]}>
                <Pressable style={styles.topButton} onPress={handleBackToList}>
                  <Text style={styles.topButtonText}>Back</Text>
                </Pressable>
              </View>
            )}

            <Animated.View
              style={{
                width: '100%',
                alignItems: 'center',
                opacity: contentOpacity,
                transform: [{ translateY: contentTranslateY }],
              }}
            >
              {screenStep === 'empty' && (
                <View
                  style={[
                    styles.emptyWrap,
                    {
                      marginTop: isVerySmallScreen ? 18 : 26,
                    },
                  ]}
                >
                  <Image
                    source={SAVED_EMPTY_LEPRECHAUN_UNIQUE_V1}
                    resizeMode="contain"
                    style={{
                      width: emptyImageSize,
                      height: emptyImageSize,
                    }}
                  />

                  <Text
                    style={[
                      styles.emptyTitle,
                      {
                        marginTop: isVerySmallScreen ? 8 : 12,
                        fontSize: isVerySmallScreen ? 18 : 22,
                      },
                    ]}
                  >
                    Hmm... nothing here yet.
                  </Text>

                  <Text
                    style={[
                      styles.emptySubtitle,
                      {
                        marginTop: 8,
                        fontSize: isVerySmallScreen ? 14 : 16,
                        lineHeight: isVerySmallScreen ? 22 : 25,
                        width: listCardWidth,
                      },
                    ]}
                  >
                    Pick a mood and a story will appear here.
                  </Text>

                  <Pressable
                    style={[
                      styles.goButton,
                      {
                        width: isVerySmallScreen ? 190 : 228,
                        height: isVerySmallScreen ? 50 : 56,
                        marginTop: isVerySmallScreen ? 24 : 32,
                      },
                    ]}
                    onPress={handleGoToMood}
                  >
                    <Text
                      style={[
                        styles.goButtonText,
                        {
                          fontSize: isVerySmallScreen ? 16 : 18,
                        },
                      ]}
                    >
                      Go to Mood Pick
                    </Text>
                  </Pressable>
                </View>
              )}

              {screenStep === 'list' && (
                <View
                  style={[
                    styles.listWrap,
                    {
                      width: listCardWidth,
                      marginTop: isVerySmallScreen ? 10 : 16,
                      marginBottom: 60,
                    },
                  ]}
                >
                  {savedStories.map(item => (
                    <View
                      key={item.id}
                      style={[
                        styles.listCard,
                        {
                          paddingHorizontal: isVerySmallScreen ? 12 : 16,
                          paddingVertical: isVerySmallScreen ? 12 : 14,
                          borderRadius: isVerySmallScreen ? 16 : 18,
                          marginBottom: 14,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.listCategory,
                          {
                            fontSize: isVerySmallScreen ? 12 : 13,
                          },
                        ]}
                      >
                        {item.moodTitle}
                      </Text>

                      <Text
                        style={[
                          styles.listTitle,
                          {
                            marginTop: 4,
                            fontSize: isVerySmallScreen ? 17 : 19,
                          },
                        ]}
                      >
                        {item.title}
                      </Text>

                      <Text
                        style={[
                          styles.listPreview,
                          {
                            marginTop: 8,
                            fontSize: isVerySmallScreen ? 12 : 13,
                            lineHeight: isVerySmallScreen ? 19 : 21,
                          },
                        ]}
                        numberOfLines={4}
                      >
                        {item.text}
                      </Text>

                      <View style={[styles.cardButtonsRow, { marginTop: 14 }]}>
                        <Pressable
                          style={[
                            styles.cardActionButton,
                            {
                              width: actionButtonWidth,
                              height: isVerySmallScreen ? 34 : 38,
                            },
                          ]}
                          onPress={() => handleOpenStory(item)}
                        >
                          <Text
                            style={[
                              styles.cardActionButtonText,
                              {
                                fontSize: isVerySmallScreen ? 12 : 13,
                              },
                            ]}
                          >
                            Open
                          </Text>
                        </Pressable>

                        <Pressable
                          style={[
                            styles.cardDeleteButton,
                            {
                              width: actionButtonWidth,
                              height: isVerySmallScreen ? 34 : 38,
                            },
                          ]}
                          onPress={() => confirmDelete(item.id)}
                        >
                          <Text
                            style={[
                              styles.cardDeleteButtonText,
                              {
                                fontSize: isVerySmallScreen ? 12 : 13,
                              },
                            ]}
                          >
                            Delete
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {screenStep === 'story' && selectedStory && (
                <View
                  style={[
                    styles.storyWrap,
                    {
                      width: storyCardWidth,
                      marginTop: isVerySmallScreen ? 8 : 14,
                      marginBottom: 60,
                    },
                  ]}
                >
                  <View style={styles.storyActionsRow}>
                    <Pressable
                      style={[
                        styles.iconActionButton,
                        {
                          width: iconButtonSize,
                          height: iconButtonSize,
                          borderRadius: 10,
                        },
                      ]}
                      onPress={handleShare}
                    >
                      <Image
                        source={SAVED_SHARE_ICON_UNIQUE_V1}
                        resizeMode="contain"
                        style={styles.iconImage}
                      />
                    </Pressable>

                    <Text
                      style={[
                        styles.storyTitle,
                        {
                          fontSize: isVerySmallScreen ? 18 : 22,
                          paddingHorizontal: 10,
                        },
                      ]}
                    >
                      {selectedStory.title}
                    </Text>

                    <Pressable
                      style={[
                        styles.iconDeleteButton,
                        {
                          width: iconButtonSize,
                          height: iconButtonSize,
                          borderRadius: 10,
                        },
                      ]}
                      onPress={() => confirmDelete(selectedStory.id)}
                    >
                      <Image
                        source={SAVED_BOOKMARK_ICON_UNIQUE_V1}
                        resizeMode="contain"
                        style={styles.iconImageDelete}
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
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.storyCategoryText,
                        {
                          fontSize: isVerySmallScreen ? 12 : 13,
                        },
                      ]}
                    >
                      {selectedStory.moodTitle}
                    </Text>

                    <Text
                      style={[
                        styles.storyText,
                        {
                          marginTop: 10,
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
  topButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topButton: {
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
  topButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyWrap: {
    width: '100%',
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#F0D8FF',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#4B1867',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  emptySubtitle: {
    color: '#F5E9FF',
    fontWeight: '700',
    textAlign: 'center',
    textShadowColor: '#44165F',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  goButton: {
    borderRadius: 10,
    backgroundColor: '#9DD82E',
    borderWidth: 2,
    borderColor: '#E5F8AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goButtonText: {
    color: '#FFFBEA',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#5C7D12',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  listWrap: {
    alignItems: 'center',
  },
  listCard: {
    width: '100%',
    backgroundColor: '#FFF0E2',
    borderWidth: 2,
    borderColor: '#74321D',
  },
  listCategory: {
    color: '#8F5D18',
    fontWeight: '800',
    textAlign: 'center',
  },
  listTitle: {
    color: '#5C534B',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  listPreview: {
    color: '#1C1511',
    fontWeight: '600',
    textAlign: 'center',
  },
  cardButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardActionButton: {
    borderRadius: 10,
    backgroundColor: '#FF9D05',
    borderWidth: 1.5,
    borderColor: '#6D240C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardActionButtonText: {
    color: '#FFF6E4',
    fontWeight: '900',
    textAlign: 'center',
  },
  cardDeleteButton: {
    borderRadius: 10,
    backgroundColor: '#D83B22',
    borderWidth: 1.5,
    borderColor: '#7F180B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDeleteButtonText: {
    color: '#FFF6F4',
    fontWeight: '900',
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
  iconDeleteButton: {
    backgroundColor: '#FF9D05',
    borderWidth: 1.5,
    borderColor: '#6D240C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '48%',
    height: '48%',
  },
  iconImageDelete: {
    width: '48%',
    height: '48%',
    tintColor: '#B40000',
  },
  storyTitle: {
    flex: 1,
    color: '#5C534B',
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  storyCard: {
    width: '100%',
    backgroundColor: '#FFF0E2',
    borderWidth: 2,
    borderColor: '#74321D',
  },
  storyCategoryText: {
    color: '#8F5D18',
    fontWeight: '800',
    textAlign: 'center',
  },
  storyText: {
    color: '#1C1511',
    fontWeight: '600',
    textAlign: 'center',
  },
});