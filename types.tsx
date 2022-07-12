/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  FormScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Store: undefined;
  Basket: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export interface Izdelek {
  id: string,
  value: string,
  cena: number
}

export interface IzdelekKosarica {
  product: Izdelek,
  st: number
}

export interface Elements {
  selected: Array<IzdelekKosarica>,
  addElement: (e: Izdelek) => void,
  removeElement: (e: Izdelek) => void,
  clean: () => void,
  sortBy:(order:string)=>void,
}

export interface Form {
  cena: number,
}

export interface FormSumbit {
  ime: string,
  priimek: string,
  email: string,
  naslov: string,
  posta: string,
  postnaSt: string,
  handleChange: (target: string, value: string) => void,
  clean: () => void,
}