import { useState } from 'react';
import { Alert } from 'react-native';
import type { LocationCoords } from '../../types/location.types';
import {
  requestLocationPermission,
  getCurrentLocation,
} from '../../services/location.service';

export function useLocation() {
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<LocationCoords | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const granted = await requestLocationPermission();
      if (!granted) {
        setError('Location permission denied. Enable it in device settings.');
        return;
      }
      const location = await getCurrentLocation();
      setCoords(location);
    } catch {
      Alert.alert('Error', 'Unable to retrieve location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    coords,
    error,
    handleGetLocation,
  };
}
