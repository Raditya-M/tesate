import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;

export default function ProfileScreen() {
  const router = useRouter();

  const [nama, setNama] = useState('Kurniawan');
  const [email, setEmail] = useState('kurniawan@gmail.com');
  const [alamat, setAlamat] = useState('Jl. Bambu Apus 3, Jakarta Timur');
  const [password] = useState('**********');
  const [editable, setEditable] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Green Header Background */}
      <View style={styles.greenHeader}>
        {/* Sate pattern tiles */}
        {[...Array(6)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.patternTile,
              {
                top: (i < 3 ? -10 : 50),
                left: i % 3 === 0 ? -20 : i % 3 === 1 ? width / 2 - 50 : width - 90,
                opacity: 0.55,
                transform: [{ rotate: i % 2 === 0 ? '-15deg' : '10deg' }],
              },
            ]}
          >
            {/* Using emoji as pattern placeholder — replace with actual sate image if needed */}
            <Text style={styles.patternEmoji}>🍢</Text>
          </View>
        ))}

        {/* Back & Settings */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="settings-outline" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* White Card overlapping header */}
      <View style={styles.card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Form Fields */}
          <TextInput
            style={styles.input}
            value={nama}
            onChangeText={setNama}
            editable={editable}
            placeholder="Nama"
            placeholderTextColor="#aaaaaa"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            editable={editable}
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={alamat}
            onChangeText={setAlamat}
            editable={editable}
            placeholder="Alamat"
            placeholderTextColor="#aaaaaa"
          />
          <TextInput
            style={styles.input}
            value={password}
            editable={false}
            secureTextEntry
            placeholderTextColor="#aaaaaa"
          />

          {/* Menu Items */}
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Kebijakan dan Privasi</Text>
            <Ionicons name="chevron-forward" size={18} color="#aaaaaa" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Riwayat Order</Text>
            <Ionicons name="chevron-forward" size={18} color="#aaaaaa" />
          </TouchableOpacity>

          <View style={styles.spacer} />

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setEditable((v) => !v)}
            >
              <Text style={styles.editBtnText}>
                {editable ? 'Simpan' : 'Edit Profile'}
              </Text>
              <Ionicons
                name={editable ? 'checkmark-outline' : 'pencil-outline'}
                size={18}
                color="#ffffff"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.keluarBtn} onPress={() => {}}>
              <Text style={styles.keluarBtnText}>Keluar</Text>
              <Ionicons
                name="exit-outline"
                size={18}
                color="#ffffff"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  greenHeader: {
    height: HEADER_HEIGHT,
    backgroundColor: '#4CAF50',
    overflow: 'hidden',
    position: 'relative',
  },
  patternTile: {
    position: 'absolute',
  },
  patternEmoji: {
    fontSize: 48,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 52,
    paddingHorizontal: 20,
  },
  iconBtn: {
    padding: 4,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
    paddingTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#111111',
    backgroundColor: '#fafafa',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 14,
    color: '#333333',
  },
  spacer: {
    height: 48,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222222',
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  editBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  keluarBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0392B',
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: '#C0392B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  keluarBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});