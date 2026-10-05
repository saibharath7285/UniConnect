import { useState } from 'react';
import { Alert } from 'react-native';
import type { PickedAsset } from '../../types/storage.types';
import { pickDocument, pickImage } from '../../services/storage.service';
import { uploadFileToBackend } from '../../services/api.service';

export function useStorage() {
  const [file, setFile] = useState<PickedAsset | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePickImage = async () => {
    const picked = await pickImage();
    if (picked) setFile(picked);
  };

  const handlePickDocument = async () => {
    const picked = await pickDocument();
    if (picked) setFile(picked);
  };

  const clearFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadFileToBackend(file);
      if (response?.success) {
        Alert.alert('Upload Successful', `File saved to .NET server:\n${response.data?.storagePath ?? file.name}`);
      } else {
        Alert.alert('Upload Failed', response?.message ?? 'Server error during upload.');
      }
    } catch {
      Alert.alert('Upload Error', 'Could not connect to .NET server. Ensure the backend is running.');
    } finally {
      setUploading(false);
    }
  };

  return {
    file,
    uploading,
    handlePickImage,
    handlePickDocument,
    handleUpload,
    clearFile,
  };
}
