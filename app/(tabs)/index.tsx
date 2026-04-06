import React, { useRef, useState, useEffect } from 'react';
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
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const CATEGORIES = ['Rekomendasi', 'Makanan', 'Minuman', 'Promo'];

// Interface untuk produk dari API
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  is_available: boolean;
  rating: number;
  total_sold: number;
  tags: string[];
  image: string;
  image_resized: string;
}

// Format Rupiah
const formatRupiah = (price: number): string => {
  const nominal = Number(price) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(nominal);
};

// Komponen Kartu Produk
interface ProductCardProps {
  item: Product;
  onPress: (item: Product) => void;
}

function ProductCard({ item, onPress }: ProductCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(item)}
      >
        <Image
          source={{ uri: item.image_resized || item.image }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.cardDesc} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>{formatRupiah(item.price)}</Text>
            <View style={[styles.cartBtn, !item.is_available && styles.cartBtnDisabled]}>
              <IconSymbol name="cart.fill" size={16} color="#ffffff" />
            </View>
          </View>
          {!item.is_available && (
            <View style={styles.soldOutBadge}>
              <Text style={styles.soldOutText}>Habis</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function BerandaScreen() {
  const router = useRouter();
  const [foods, setFoods] = useState<Product[]>([]);
  const [beverages, setBeverages] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Rekomendasi');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fetch all data dari API
  const fetchAllMenu = async () => {
    try {
      setLoading(true);
      
      // Fetch foods dan beverages secara paralel
      const [foodsRes, beveragesRes] = await Promise.all([
        fetch('https://te-sate-api.vercel.app/api/menu/foods'),
        fetch('https://te-sate-api.vercel.app/api/menu/beverages')
      ]);
      
      const foodsData = await foodsRes.json();
      const beveragesData = await beveragesRes.json();
      
      setFoods(foodsData.data || []);
      setBeverages(beveragesData.data || []);
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Gagal mengambil data:', error);
      setFoods([]);
      setBeverages([]);
    } finally {
      setLoading(false);
    }
  };

  // Search menu berdasarkan keyword
  const searchMenu = async (keyword: string) => {
    if (!keyword.trim()) {
      fetchAllMenu();
      return;
    }
    
    try {
      setLoading(true);
      const res = await fetch(`https://te-sate-api.vercel.app/api/menu/search?q=${keyword}`);
      const data = await res.json();
      
      if (data.success) {
        setFoods(data.results.foods || []);
        setBeverages(data.results.beverages || []);
      }
    } catch (error) {
      console.error('Gagal mencari menu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMenu();
  }, []);

  // Handle search dengan debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search) {
        searchMenu(search);
      } else {
        fetchAllMenu();
      }
    }, 500);
    
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Filter berdasarkan kategori
  const getDisplayedItems = (): Product[] => {
    let items: Product[] = [];
    
    switch (activeCategory) {
      case 'Makanan':
        items = foods;
        break;
      case 'Minuman':
        items = beverages;
        break;
      case 'Promo':
        // Filter produk dengan rating tinggi sebagai promo
        items = [...foods, ...beverages].filter(item => item.rating >= 4.8);
        break;
      default: // Rekomendasi
        items = [...foods, ...beverages];
        break;
    }
    
    return items;
  };

  const handlePressProduct = (item: Product) => {
    router.push({
      pathname: '/detail',
      params: {
        id: item.id,
        title: item.name,
        description: item.description,
        price: item.price,
        stock: item.is_available ? 10 : 0,
        thumbnail: item.image_resized || item.image,
        category: foods.includes(item) ? 'food' : 'beverage',
        rating: item.rating,
        total_sold: item.total_sold,
        tags: JSON.stringify(item.tags),
      },
    });
  };

  const renderHeader = () => (
    <View style={{ backgroundColor: '#ffffff' }}>
      <View style={styles.header}>
        <View style={styles.locationRow}>
          <IconSymbol name="location.fill" size={14} color="#4CAF50" />
          <Text style={styles.location}> Bambu Apus, Jakarta Timur</Text>
        </View>
        <Text style={styles.greeting}>Sore, Mang Saswi</Text>
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" size={18} color="#aaaaaa" style={styles.searchIconLeft} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari Kesukaan kamu! (Sate, Es Teh, dll)"
            placeholderTextColor="#aaaaaa"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryBtn,
              activeCategory === cat && styles.categoryBtnActive,
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === cat && styles.categoryTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const displayedItems = getDisplayedItems();

  if (loading) {
    return (
      <View style={styles.centerBox}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Lagi ngambil menu...</Text>
      </View>
    );
  }

  if (displayedItems.length === 0) {
    return (
      <View style={styles.centerBox}>
        <IconSymbol name="info.circle" size={60} color="#ccc" />
        <Text style={styles.errorText}>Menu tidak ditemukan</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchAllMenu}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          data={displayedItems}
          renderItem={({ item }: { item: Product }) => <ProductCard item={item} onPress={handlePressProduct} />}
          keyExtractor={(item: Product) => `${item.id}-${item.name}`}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#888',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
  },
  searchWrapper: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  searchIconLeft: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: '#111',
  },
  categoryScroll: {
    backgroundColor: '#ffffff',
    paddingBottom: 10,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  categoryBtnActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingBottom: 30,
  },
  row: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginTop: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardBody: {
    padding: 10,
    position: 'relative',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    color: '#111',
  },
  cardDesc: {
    fontSize: 11,
    color: '#777',
    marginBottom: 10,
    height: 32,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontWeight: '800',
    color: '#111',
    fontSize: 13,
  },
  cartBtn: {
    backgroundColor: '#4CAF50',
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBtnDisabled: {
    backgroundColor: '#cccccc',
  },
  soldOutBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  soldOutText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    marginVertical: 10,
    color: '#888',
    fontSize: 16,
  },
  retryBtn: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});