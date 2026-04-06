import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width } = Dimensions.get('window');

// Format Rupiah
const formatRupiah = (price: number): string => {
  const nominal = Number(price) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(nominal);
};

interface DetailParams {
  id?: string;
  title?: string;
  description?: string;
  price?: string;
  stock?: string;
  thumbnail?: string;
  category?: string;
  rating?: string;
  total_sold?: string;
  tags?: string;
}

export default function DetailMenuScreen() {
  const router = useRouter();
  const params = useLocalSearchParams() as unknown as DetailParams;

  const id = params.id || '0';
  const title = params.title || 'Sate Ayam';
  const description = params.description || 'Lorem is simply dummy text of the printing and typesetting industry.';
  const price = params.price ? Number(params.price) : 25000;
  const stock = params.stock ? Number(params.stock) : 10;
  const thumbnail = params.thumbnail || '';
  const category = params.category || 'food';
  const rating = params.rating ? Number(params.rating) : 4.5;
  const total_sold = params.total_sold ? Number(params.total_sold) : 100;
  const tags = params.tags ? JSON.parse(params.tags as string) : [];

  const [qty, setQty] = useState(1);
  const btnScale = useRef(new Animated.Value(1)).current;
  const cartScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = (anim: Animated.Value) =>
    Animated.spring(anim, { toValue: 0.95, useNativeDriver: true }).start();
  const handlePressOut = (anim: Animated.Value) =>
    Animated.spring(anim, { toValue: 1, useNativeDriver: true }).start();

  const handleAddToCart = () => {
    alert(`🛒 Ditambahkan ke keranjang:\n${title} x${qty}\n${formatRupiah(price * qty)}`);
  };

  const handleOrderNow = () => {
    alert(`✅ Pesanan Anda:\n${title} x${qty}\nTotal: ${formatRupiah(price * qty)}\n\nSilakan lanjutkan ke pembayaran.`);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          {thumbnail ? (
            <Image source={{ uri: thumbnail }} style={styles.mainImg} resizeMode="contain" />
          ) : (
            <View style={styles.placeholderImg}>
              <IconSymbol name="photo" size={60} color="#ccc" />
            </View>
          )}
        </View>

        <View style={styles.card}>
          {/* Title & Rating */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.ratingBadge}>
              <IconSymbol name="star.fill" size={12} color="#FFB800" />
              <Text style={styles.ratingText}> {rating}</Text>
            </View>
          </View>

          {/* Tags */}
          {tags.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
              {tags.map((tag: string, index: number) => (
                <View key={index} style={styles.tagBadge}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <IconSymbol name="clock.fill" size={12} color="#4CAF50" />
              <Text style={styles.statText}> {stock} mins</Text>
            </View>
            <View style={styles.statItem}>
              <IconSymbol name="cart.fill" size={12} color="#4CAF50" />
              <Text style={styles.statText}> Terjual {total_sold}+</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.desc}>{description}</Text>

          {/* Price & Quantity */}
          <View style={styles.priceQtyRow}>
            <Text style={styles.priceValue}>{formatRupiah(price)}</Text>
            <View style={styles.qtyBox}>
              <TouchableOpacity
                style={[styles.qtyBtn, qty <= 1 && styles.qtyBtnDisabled]}
                onPress={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyVal}>{qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <Animated.View style={{ flex: 1, transform: [{ scale: cartScale }] }}>
              <TouchableOpacity
                style={styles.cartBtn}
                onPressIn={() => handlePressIn(cartScale)}
                onPressOut={() => handlePressOut(cartScale)}
                onPress={handleAddToCart}
                activeOpacity={0.9}
              >
                <Text style={styles.cartIcon}>🛒</Text>
                <Text style={styles.cartBtnText}>Add to Cart</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{ flex: 1.5, transform: [{ scale: btnScale }] }}>
              <TouchableOpacity
                style={styles.orderBtn}
                onPressIn={() => handlePressIn(btnScale)}
                onPressOut={() => handlePressOut(btnScale)}
                onPress={() => router.push('/pesanan')}
                activeOpacity={0.9}
              >
                <Text style={styles.orderBtnText}>Pesan Sekarang!</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  backText: {
    fontSize: 28,
    fontWeight: '500',
    color: '#111',
    lineHeight: 28,
  },
  imgContainer: {
    width: width,
    height: 300,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImg: {
    width: '80%',
    height: '80%',
  },
  placeholderImg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tagBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  desc: {
    color: '#777',
    lineHeight: 22,
    fontSize: 14,
    marginBottom: 24,
  },
  priceQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4CAF50',
  },
  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 4,
  },
  qtyBtn: {
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnDisabled: {
    backgroundColor: '#cccccc',
  },
  qtyBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  qtyVal: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    color: '#111',
    minWidth: 30,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    borderRadius: 15,
    paddingVertical: 14,
    marginRight: 8,
    gap: 8,
  },
  cartIcon: {
    fontSize: 16,
  },
  cartBtnText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '700',
  },
  orderBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  orderBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});