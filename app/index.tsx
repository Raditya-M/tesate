import { router, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function StartScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const imgScaleAnim = useRef(new Animated.Value(0.85)).current;
  const btnScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(imgScaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(btnScaleAnim, {
      toValue: 0.96,
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top status bar spacer */}
      <View style={styles.topSpacer} />

      {/* Image Section */}
      <Animated.View
        style={[
          styles.imageContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: imgScaleAnim }],
          },
        ]}
      >
        <Image
          source={require('@/assets/images/sateh.png')}
          style={styles.sateImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Text & Button Section */}
      <Animated.View
        style={[
          styles.bottomSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.headline}>Pet Cepet, Sen{'\n'}Pesen!</Text>

        <Text style={styles.subtext}>
          Pengantaran ke rumah, dan{'\n'}reservasi online untuk sate Cak Awih
        </Text>

        {/* CTA Button */}
        <Animated.View style={{ transform: [{ scale: btnScaleAnim }] }}>
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={1}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.ctaText}>Pesan Sekarang!</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  topSpacer: {
    height: height * 0.08,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    paddingHorizontal: 24,
  },
  sateImage: {
    width: width * 0.78,
    height: width * 0.78,
  },
  bottomSection: {
    width: '100%',
    paddingHorizontal: 32,
    paddingBottom: 48,
    alignItems: 'center',
  },
  headline: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 14,
  },
  subtext: {
    fontSize: 14.5,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  ctaButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 80,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 18,
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
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