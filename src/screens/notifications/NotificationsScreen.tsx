import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionCard from '../../components/shared/SectionCard';
import { styles } from './NotificationsScreen.styles';
import { useNotifications } from './useNotifications';

export default function NotificationsScreen() {
  const {
    permissionGranted,
    notifTitle,
    setNotifTitle,
    notifBody,
    setNotifBody,
    lastReceived,
    handleRequestPermission,
    handleSendNotification,
  } = useNotifications();

  const permissionStatus =
    permissionGranted === null
      ? 'Not Checked'
      : permissionGranted
      ? 'Granted'
      : 'Denied';

  const permissionColor =
    permissionGranted === null
      ? '#6b7280'
      : permissionGranted
      ? '#16a34a'
      : '#dc2626';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <SectionCard
          title="Notifications"
          subtitle="Schedule and receive local push notifications."
        >
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Permission Status</Text>
            <Text style={[styles.statusBadge, { color: permissionColor }]}>
              {permissionStatus}
            </Text>
          </View>

          {permissionGranted !== true && (
            <TouchableOpacity
              style={[styles.button, styles.outlineButton]}
              onPress={handleRequestPermission}
              activeOpacity={0.7}
              accessibilityRole="button"
            >
              <Text style={styles.outlineButtonText}>Request Permission</Text>
            </TouchableOpacity>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={notifTitle}
              onChangeText={setNotifTitle}
              placeholder="Notification title"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notifBody}
              onChangeText={setNotifBody}
              placeholder="Notification message"
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSendNotification}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Send notification"
          >
            <Text style={styles.buttonText}>Send Notification</Text>
          </TouchableOpacity>

          {lastReceived ? (
            <View style={styles.receivedBox}>
              <Text style={styles.receivedLabel}>Last Received</Text>
              <Text style={styles.receivedValue}>{`"${lastReceived}"`}</Text>
            </View>
          ) : null}
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}
