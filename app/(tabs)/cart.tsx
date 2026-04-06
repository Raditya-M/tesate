import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#111111" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={22} color="#111111" />
        </TouchableOpacity>
      </View>

      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <Image
          source={require('@/assets/images/couple.png')}
          style={styles.coupleImage}
          resizeMode="contain"
        />
        <Text style={styles.emptyTitle}>Kamu Belom Pesan loh</Text>
        <Text style={styles.emptySubtitle}>Yuk Pesan dulu</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  coupleImage: {
    width: 220,
    height: 200,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#888888',
  },
});