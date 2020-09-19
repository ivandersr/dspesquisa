import { LongPressGestureHandler } from "react-native-gesture-handler";

export type GamePlatform = 'XBOX' | 'PC' | 'PLAYSTATION';

export type Game = {
  id: number;
  title: string;
  platform: GamePlatform;
  label: string;
  value: number;
}