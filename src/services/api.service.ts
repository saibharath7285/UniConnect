import { Platform } from 'react-native';
import type { ContactFormData } from '../types/contact.types';
import type { LocationCoords } from '../types/location.types';
import type { PickedAsset } from '../types/storage.types';

// Host machine Wi-Fi IP for physical devices, or 10.0.2.2 for Android emulator
export const API_BASE_URL = Platform.select({
  android: 'http://192.168.31.63:5000/api',
  ios: 'http://192.168.31.63:5000/api',
  default: 'http://localhost:5000/api',
});

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

/**
 * Submit contact request to .NET Web API: POST api/contact
 */
export async function submitContactRequest(
  formData: ContactFormData,
  coords?: LocationCoords | null
): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      notes: formData.notes,
      latitude: coords?.latitude ?? null,
      longitude: coords?.longitude ?? null,
    }),
  });

  return response.json();
}

/**
 * Upload a picked document or image to .NET Web API: POST api/files
 */
export async function uploadFileToBackend(
  file: PickedAsset
): Promise<ApiResponse<any>> {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.mimeType || 'application/octet-stream',
  } as any);

  const response = await fetch(`${API_BASE_URL}/files`, {
    method: 'POST',
    body: formData,
  });

  return response.json();
}

/**
 * Send location check-in to .NET Web API: POST api/location
 */
export async function sendLocationCheckin(
  coords: LocationCoords
): Promise<ApiResponse<any>> {
  const response = await fetch(`${API_BASE_URL}/location`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
      accuracy: coords.accuracy,
    }),
  });

  return response.json();
}
