import React from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import RandomScreen from '../screens/RandomScreen';
import QuizScreen from '../screens/QuizScreen';
import MoodScreen from '../screens/MoodScreen';
import MatchScreen from '../screens/MatchScreen';
import SavedScreen from '../screens/SavedScreen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const RANDOM_ICON_INACTIVE = require('../assets/icons/random_icon_inactive_unique_v1.png');
const RANDOM_ICON_ACTIVE = require('../assets/icons/random_icon_active_unique_v1.png');

const QUIZ_ICON_INACTIVE = require('../assets/icons/quiz_icon_inactive_unique_v1.png');
const QUIZ_ICON_ACTIVE = require('../assets/icons/quiz_icon_active_unique_v1.png');

const MOOD_ICON_INACTIVE = require('../assets/icons/mood_icon_inactive_unique_v1.png');
const MOOD_ICON_ACTIVE = require('../assets/icons/mood_icon_active_unique_v1.png');

const MATCH_ICON_INACTIVE = require('../assets/icons/match_icon_inactive_unique_v1.png');
const MATCH_ICON_ACTIVE = require('../assets/icons/match_icon_active_unique_v1.png');

const SAVED_ICON_INACTIVE = require('../assets/icons/saved_icon_inactive_unique_v1.png');
const SAVED_ICON_ACTIVE = require('../assets/icons/saved_icon_active_unique_v1.png');

type TabIconProps = {
  focused: boolean;
  activeSource: any;
  inactiveSource: any;
  size: number;
};

function TabIcon({ focused, activeSource, inactiveSource, size }: TabIconProps) {
  return (
    <Image
      source={focused ? activeSource : inactiveSource}
      resizeMode="contain"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}

type CustomTabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const isVerySmallScreen = width < 340 || height < 680;
  const isSmallScreen = width < 360 || height < 740;

  const horizontalMargin = isVerySmallScreen ? 20 : isSmallScreen ? 18 : 16;
  const barWidth = width - horizontalMargin * 2;

  const barHeight = isVerySmallScreen ? 60 : isSmallScreen ? 66 : 72;
  const iconSize = isVerySmallScreen ? 22 : isSmallScreen ? 25 : 28;
  const borderRadius = isVerySmallScreen ? 14 : isSmallScreen ? 16 : 18;
  const horizontalPadding = isVerySmallScreen ? 10 : isSmallScreen ? 14 : 18;

  const iosBottomOffset = Math.max(insets.bottom, 10);
  const androidLift = 60;
  const bottomOffset =
    Platform.OS === 'android'
      ? androidLift
      : iosBottomOffset;

  const getIconConfig = (routeName: keyof MainTabParamList) => {
    switch (routeName) {
      case 'Random':
        return {
          active: RANDOM_ICON_ACTIVE,
          inactive: RANDOM_ICON_INACTIVE,
        };
      case 'Quiz':
        return {
          active: QUIZ_ICON_ACTIVE,
          inactive: QUIZ_ICON_INACTIVE,
        };
      case 'Mood':
        return {
          active: MOOD_ICON_ACTIVE,
          inactive: MOOD_ICON_INACTIVE,
        };
      case 'Match':
        return {
          active: MATCH_ICON_ACTIVE,
          inactive: MATCH_ICON_INACTIVE,
        };
      case 'Saved':
        return {
          active: SAVED_ICON_ACTIVE,
          inactive: SAVED_ICON_INACTIVE,
        };
      default:
        return {
          active: RANDOM_ICON_ACTIVE,
          inactive: RANDOM_ICON_INACTIVE,
        };
    }
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.tabBarOuter,
        {
          bottom: bottomOffset,
        },
      ]}
    >
      <View
        style={[
          styles.tabBarInner,
          {
            width: barWidth,
            height: barHeight,
            borderRadius,
            paddingHorizontal: horizontalPadding,
          },
        ]}
      >
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const iconConfig = getIconConfig(route.name as keyof MainTabParamList);

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              hitSlop={8}
            >
              <TabIcon
                focused={isFocused}
                activeSource={iconConfig.active}
                inactiveSource={iconConfig.inactive}
                size={iconSize}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Random" component={RandomScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
      <Tab.Screen name="Mood" component={MoodScreen} />
      <Tab.Screen name="Match" component={MatchScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#AF0000',
    borderWidth: 1.5,
    borderColor: '#E5C452',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});