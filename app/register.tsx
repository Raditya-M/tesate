import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SignUpScreen() {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const btnScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(btnScaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(btnScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Image */}
        <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
          <Image
            source={require('@/assets/images/sateh.png')}
            style={styles.sateImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Title & Subtitle */}
        <Animated.View
          style={[
            styles.textSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.headline}>Daftar dulu</Text>
          <Text style={styles.subtext}>
            Daftarin akun kamu disini, isi yang{'\n'}lengkap ya data yang aku minta, jangan{'\n'}sampe ngga!
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View
          style={[
            styles.formSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Nama Lengkap"
            placeholderTextColor="#aaaaaa"
            value={namaLengkap}
            onChangeText={setNamaLengkap}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaaaaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Konfirmasi Password"
            placeholderTextColor="#aaaaaa"
            value={konfirmasiPassword}
            onChangeText={setKonfirmasiPassword}
            secureTextEntry
          />

          {/* Daftar Button */}
          <Animated.View style={{ transform: [{ scale: btnScaleAnim }] }}>
            <TouchableOpacity
              style={styles.ctaButton}
              activeOpacity={1}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => {}}
            >
              <Text style={styles.ctaText}>Daftar!</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Login Link */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Sudah Punya Akun? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 40,
    paddingHorizontal: 28,
  },
  imageContainer: {
    marginBottom: 8,
  },
  sateImage: {
    width: width * 0.38,
    height: width * 0.38,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 21,
  },
  formSection: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
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
  ctaButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 80,
    width: width - 56,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginTop: 8,
    marginBottom: 18,
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#555555',
  },
  loginLink: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});