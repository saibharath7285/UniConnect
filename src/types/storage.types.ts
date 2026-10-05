import type { DocumentPickerAsset } from 'expo-document-picker';

export type PickedAsset = DocumentPickerAsset;

export interface StorageState {
  file: PickedAsset | null;
}
