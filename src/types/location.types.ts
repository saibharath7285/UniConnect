import type { LocationObjectCoords } from 'expo-location';

export type LocationCoords = LocationObjectCoords;

export interface LocationState {
  coords: LocationCoords | null;
  loading: boolean;
  error: string | null;
}
