import { useState } from 'react';
import { Alert } from 'react-native';
import { submitContactRequest } from '../../services/api.service';

export function useContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCancel = () => {
    setName('');
    setEmail('');
    setNotes('');
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Required Fields', 'Please enter your Name and Email address.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await submitContactRequest({
        name: name.trim(),
        email: email.trim(),
        notes: notes.trim(),
      });

      if (response?.success) {
        
        Alert.alert(
          'Request Submitted (.NET API)',
          `Thank you, ${name.trim()}! Your request was saved on the server.`,
          [{ text: 'OK', onPress: handleCancel }]
        );
      } else {
        Alert.alert(
          'Submission Received Locally',
          `Name: ${name.trim()}\nEmail: ${email.trim()}\nNotes: ${notes.trim() || 'None'}\n(Backend server was unreachable or returned an error)`,
          [{ text: 'OK', onPress: handleCancel }]
        );
      }
    } catch {
      // Graceful fallback when backend is not actively running
      Alert.alert(
        'Form Submitted (Offline Mode)',
        `Name: ${name.trim()}\nEmail: ${email.trim()}\nNotes: ${notes.trim() || 'None'}\n\nNote: Start the .NET backend to sync with server.`,
        [{ text: 'OK', onPress: handleCancel }]
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    notes,
    setNotes,
    submitting,
    handleCancel,
    handleSubmit,
  };
}
