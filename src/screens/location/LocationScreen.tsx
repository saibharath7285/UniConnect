import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionCard from '../../components/shared/SectionCard';
import { styles } from './LocationScreen.styles';
import { useLocation } from './useLocation';

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );
}

export default function LocationScreen() {
  const { loading, coords, error, handleGetLocation } = useLocation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <SectionCard
          title="Location Services"
          subtitle="Access your current GPS coordinates."
        >
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleGetLocation}
            disabled={loading}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Get current location"
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Get Current Location</Text>
            )}
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {coords ? (
            <View style={styles.resultCard}>
              <ResultRow label="Latitude" value={coords.latitude.toFixed(6)} />
              <ResultRow label="Longitude" value={coords.longitude.toFixed(6)} />
              {coords.altitude != null && (
                <ResultRow label="Altitude" value={`${coords.altitude.toFixed(1)} m`} />
              )}
              {coords.accuracy != null && (
                <ResultRow label="Accuracy" value={`±${coords.accuracy.toFixed(0)} m`} />
              )}
            </View>
          ) : null}
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}
