import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionCard from '../../components/shared/SectionCard';
import { styles } from './StorageScreen.styles';
import { useStorage } from './useStorage';
import { formatFileSize } from '../../services/storage.service';

function FileInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue} numberOfLines={1} ellipsizeMode="middle">
        {value}
      </Text>
    </View>
  );
}

export default function StorageScreen() {
  const {
    file,
    uploading,
    handlePickImage,
    handlePickDocument,
    handleUpload,
  } = useStorage();

  const isImage = file?.mimeType?.startsWith('image/');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <SectionCard
          title="Device Storage"
          subtitle="Pick an image or document from your device."
        >
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.outlineButton]}
              onPress={handlePickImage}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Pick image"
            >
              <Text style={styles.outlineButtonText}>Pick Image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handlePickDocument}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Pick document"
            >
              <Text style={styles.buttonText}>Pick Document</Text>
            </TouchableOpacity>
          </View>

          {file ? (
            <View style={styles.fileCard}>
              {isImage ? (
                <Image
                  source={{ uri: file.uri }}
                  style={styles.imagePreview}
                  resizeMode="cover"
                />
              ) : null}
              <FileInfoRow label="Name" value={file.name ?? 'Unknown'} />
              <FileInfoRow label="Type" value={file.mimeType ?? 'Unknown'} />
              <FileInfoRow label="Size" value={formatFileSize(file.size)} />

              <TouchableOpacity
                style={[styles.button, { margin: 12, marginBottom: 12 }]}
                onPress={handleUpload}
                disabled={uploading}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Upload file to backend"
              >
                {uploading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>Upload to .NET Server</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No file selected</Text>
            </View>
          )}
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}
