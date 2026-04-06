import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function InformasiScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Informasi</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="alert-circle-outline" size={48} color="#bbbbbb" />
        </View>
        <Text style={styles.emptyText}>Belum ada Informasi Bang</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  emptyText: {
    fontSize: 14,
    color: '#888888',
  },
});