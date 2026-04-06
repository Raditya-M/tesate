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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ingatAkun, setIngatAkun] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const btnScaleAnim = useRef(new Animated.Value(1)).current;
  const adminBtnScaleAnim = useRef(new Animated.Value(1)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

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

  const toggleIngat = () => {
    const newVal = !ingatAkun;
    setIngatAkun(newVal);
    Animated.spring(checkAnim, {
      toValue: newVal ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  const handleBtnPressIn = () =>
    Animated.spring(btnScaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  const handleBtnPressOut = () =>
    Animated.spring(btnScaleAnim, { toValue: 1, useNativeDriver: true }).start();

  const handleAdminPressIn = () =>
    Animated.spring(adminBtnScaleAnim, { toValue: 0.97, useNativeDriver: true }).start();
  const handleAdminPressOut = () =>
    Animated.spring(adminBtnScaleAnim, { toValue: 1, useNativeDriver: true }).start();

  const checkScale = checkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

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
          <Text style={styles.headline}>Login dulu kali ah</Text>
          <Text style={styles.subtext}>
            Masuk pake akun kamu yang udah{'\n'}didaftarin ya!
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

          {/* Ingat akunku & Lupa password */}
          <View style={styles.optionRow}>
            <TouchableOpacity style={styles.checkRow} onPress={toggleIngat} activeOpacity={0.7}>
              <View style={[styles.checkbox, ingatAkun && styles.checkboxActive]}>
                {ingatAkun && (
                  <Animated.Text
                    style={[styles.checkmark, { transform: [{ scale: checkScale }] }]}
                  >
                    ✓
                  </Animated.Text>
                )}
              </View>
              <Text style={styles.checkLabel}>Ingatin akunku</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.lupaLink}>Lupa password?</Text>
            </TouchableOpacity>
          </View>

          {/* Masuk Button */}
          <Animated.View style={{ transform: [{ scale: btnScaleAnim }] }}>
            <TouchableOpacity
              style={styles.ctaButton}
              activeOpacity={1}
              onPressIn={handleBtnPressIn}
              onPressOut={handleBtnPressOut}
              onPress={() => {}}
            >
              <Text style={styles.ctaText}>Masuk!</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Masuk Admin Button */}
          <Animated.View style={{ transform: [{ scale: adminBtnScaleAnim }] }}>
            <TouchableOpacity
              style={styles.adminButton}
              activeOpacity={1}
              onPressIn={handleAdminPressIn}
              onPressOut={handleAdminPressOut}
              onPress={() => router.push('/(admin)')}
            >
              <Text style={styles.adminText}>Masuk Admin!</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Daftar Link */}
          <View style={styles.daftarRow}>
            <Text style={styles.daftarText}>Belom Punya Akun? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.daftarLink}>Daptar buru!</Text>
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
    marginBottom: 32,
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
  optionRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#cccccc',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  checkboxActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
  },
  checkLabel: {
    fontSize: 13.5,
    color: '#444444',
  },
  lupaLink: {
    fontSize: 13.5,
    color: '#4CAF50',
    fontWeight: '600',
  },
  ctaButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    width: width - 56,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 12,
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  adminButton: {
    backgroundColor: '#388E3C',
    borderRadius: 12,
    paddingVertical: 16,
    width: width - 56,
    alignItems: 'center',
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 18,
  },
  adminText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  daftarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  daftarText: {
    fontSize: 14,
    color: '#555555',
  },
  daftarLink: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});