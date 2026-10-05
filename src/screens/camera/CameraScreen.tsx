import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView } from 'expo-camera';
import SectionCard from '../../components/shared/SectionCard';
import { styles } from './CameraScreen.styles';
import { useCamera } from './useCamera';

export default function CameraScreen() {
  const {
    permission,
    requestPermission,
    photo,
    clearPhoto,
    facing,
    toggleFacing,
    capturing,
    cameraRef,
    handleCapture,
  } = useCamera();

  if (!permission) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
          <SectionCard
            title="Camera"
            subtitle="Camera access is required to take photos."
          >
            <TouchableOpacity
              style={styles.button}
              onPress={requestPermission}
              activeOpacity={0.7}
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Grant Camera Permission</Text>
            </TouchableOpacity>
          </SectionCard>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (photo) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
          <SectionCard title="Photo Captured">
            <Image
              source={{ uri: photo.uri }}
              style={styles.preview}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={[styles.button, styles.outlineButton]}
              onPress={clearPhoto}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Retake photo"
            >
              <Text style={styles.outlineButtonText}>Retake</Text>
            </TouchableOpacity>
          </SectionCard>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
        />
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleFacing}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Flip camera"
          >
            <Text style={styles.flipButtonText}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.captureButton, capturing && styles.captureButtonDisabled]}
            onPress={handleCapture}
            disabled={capturing}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Take photo"
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>

          <View style={styles.flipButton} />
        </View>
      </View>
    </SafeAreaView>
  );
}
