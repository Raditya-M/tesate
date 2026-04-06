import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 64) / 2; // Penyesuaian padding agar pas 2 kolom
const BASE_URL = 'https://te-sate-api.vercel.app';

// 1. Definisi Interface untuk menghilangkan Underline Merah
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  stock?: number;
  waktuMasak?: string;
  is_available: boolean;
  image: string;
  image_resized?: string;
  rating?: number;
  total_sold?: number;
}

const formatRupiah = (price: number) =>
  'Rp ' + Number(price).toLocaleString('id-ID').replace(/,/g, '.');

// ─────────────────────────────────────────────
// COMPONENT: ADMIN PRODUCT CARD
// ─────────────────────────────────────────────
interface CardProps {
  item: MenuItem;
  onDelete: (id: number) => void;
  onEdit: (item: MenuItem) => void;
}

function AdminProductCard({ item, onDelete, onEdit }: CardProps) {
  return (
    <View style={styles.card}>
      {!item.is_available && (
        <View style={styles.unavailableBadge}>
          <Text style={styles.unavailableText}>Habis</Text>
        </View>
      )}
      <Image
        source={{ uri: item.image_resized || item.image }}
        style={[styles.cardImage, !item.is_available && { opacity: 0.5 }]}
        resizeMode="contain"
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>
          {item.description || 'Sate ayam dengan daging super pasar kramat jati'}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{formatRupiah(item.price)}</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.editBtn} onPress={() => onEdit(item)}>
              <Text style={styles.actionIcon}>✎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item.id)}>
              <Text style={styles.actionIconWhite}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
// SCREEN: ADMIN
// ─────────────────────────────────────────────
export default function AdminScreen() {
  const [activeCategory, setActiveCategory] = useState<'foods' | 'beverages'>('foods');
  const [adminView, setAdminView] = useState<'form' | 'list'>('form');
  const [foods, setFoods] = useState<MenuItem[]>([]);
  const [beverages, setBeverages] = useState<MenuItem[]>([]);

  // Form State
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [stock, setStock] = useState('');
  const [waktuMasak, setWaktuMasak] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/menu`);
      const data = await res.json();
      setFoods(data.data.foods);
      setBeverages(data.data.beverages);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  const currentList = activeCategory === 'foods' ? foods : beverages;

  const handleSubmit = () => {
    if (!nama || !harga) return;

    const updateList = (prev: MenuItem[]) => {
      if (editingId !== null) {
        return prev.map((item) =>
          item.id === editingId
            ? { ...item, name: nama, price: Number(harga), stock: Number(stock), waktuMasak }
            : item
        );
      } else {
        const newItem: MenuItem = {
          id: Date.now(),
          name: nama,
          price: Number(harga),
          stock: Number(stock),
          waktuMasak,
          description: 'Sate ayam dengan daging super pasar kramat jati',
          is_available: true,
          image: 'https://te-sate-api.vercel.app/images/sate-ayam.png',
        };
        return [newItem, ...prev];
      }
    };

    if (activeCategory === 'foods') setFoods(updateList);
    else setBeverages(updateList);

    setNama(''); setHarga(''); setStock(''); setWaktuMasak('');
    setEditingId(null);
    setAdminView('list');
  };

  const handleDelete = (id: number) => {
    const filterList = (prev: MenuItem[]) => prev.filter((item) => item.id !== id);
    if (activeCategory === 'foods') setFoods(filterList);
    else setBeverages(filterList);
  };

  const handleEdit = (item: MenuItem) => {
    setNama(item.name);
    setHarga(String(item.price));
    setStock(String(item.stock || ''));
    setWaktuMasak(item.waktuMasak || '');
    setEditingId(item.id);
    setAdminView('form');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <Text style={styles.greeting}>Sore, Cak Awih</Text>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContent}>
          <TouchableOpacity
            style={[styles.categoryBtn, activeCategory === 'foods' ? styles.categoryBtnActive : styles.categoryBtnInactive]}
            onPress={() => setActiveCategory('foods')}>
            <Text style={[styles.categoryText, activeCategory === 'foods' && styles.categoryTextActive]}>Makanan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryBtn, activeCategory === 'beverages' ? styles.categoryBtnActive : styles.categoryBtnInactive]}
            onPress={() => setActiveCategory('beverages')}>
            <Text style={[styles.categoryText, activeCategory === 'beverages' && styles.categoryTextActive]}>Minuman</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {adminView === 'form' ? (
        <ScrollView contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <TextInput style={styles.input} placeholder="Masukan nama makanan" placeholderTextColor="#C7C7CD" value={nama} onChangeText={setNama} />
          <TextInput style={styles.input} placeholder="Masukan Harga" placeholderTextColor="#C7C7CD" value={harga} onChangeText={setHarga} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Masukan Stock" placeholderTextColor="#C7C7CD" value={stock} onChangeText={setStock} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Masukan waktu masak (mins)" placeholderTextColor="#C7C7CD" value={waktuMasak} onChangeText={setWaktuMasak} keyboardType="numeric" />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>{editingId !== null ? 'Update Menu!' : 'Masukin Menu!'}</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          {currentList.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image source={require('@/assets/images/couple.png')} style={styles.coupleImage} resizeMode="contain" />
            </View>
          ) : (
            <FlatList
              data={currentList}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <AdminProductCard item={item} onDelete={handleDelete} onEdit={handleEdit} />
              )}
            />
          )}
        </View>
      )}

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() => {
            setAdminView(adminView === 'form' ? 'list' : 'form');
            if (adminView === 'list') setEditingId(null); // Reset edit state when going back to form
          }}>
          <Text style={styles.bottomBtnText}>{adminView === 'form' ? 'Liat Pesenan' : 'Back'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 20 },
  greeting: { fontSize: 32, fontWeight: 'bold', color: '#000', letterSpacing: -0.5 },

  // Category Tabs
  categoryContainer: { marginBottom: 15 },
  categoryContent: { paddingHorizontal: 24, gap: 10 },
  categoryBtn: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 14 },
  categoryBtnActive: { backgroundColor: '#62BD66' },
  categoryBtnInactive: { backgroundColor: '#E2F2E3' },
  categoryText: { fontSize: 15, fontWeight: '700', color: '#62BD66' },
  categoryTextActive: { color: '#ffffff' },

  // Form Input & Button
  formContent: { paddingHorizontal: 24, paddingTop: 10 },
  input: {
    height: 58,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 20,
    fontSize: 15,
    marginBottom: 16,
    color: '#000',
    // Shadow
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  submitBtn: {
    backgroundColor: '#62BD66',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
    elevation: 6,
    shadowColor: '#62BD66',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  submitBtnText: { color: '#ffffff', fontWeight: '800', fontSize: 16 },

  // List & Product Cards
  listContent: { paddingHorizontal: 24, paddingBottom: 120 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cardImage: { width: '100%', height: 90, marginBottom: 10 },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 2 },
  cardDesc: { fontSize: 11, color: '#888', lineHeight: 14, marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 14, fontWeight: '800', color: '#000' },

  cardActions: { flexDirection: 'row', gap: 6 },
  editBtn: { backgroundColor: '#EFEFEF', width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  deleteBtn: { backgroundColor: '#D81B60', width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  actionIcon: { fontSize: 16, color: '#444' },
  actionIconWhite: { fontSize: 16, color: '#fff' },

  unavailableBadge: { position: 'absolute', top: 12, left: 12, zIndex: 5, backgroundColor: '#D81B60', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  unavailableText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  // Empty State
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  coupleImage: { width: width * 0.75, height: width * 0.7 },

  // Floating Bottom Navigation
  bottomBar: { position: 'absolute', bottom: 35, left: 24, right: 24 },
  bottomBtn: {
    backgroundColor: '#2D2D2D',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  bottomBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
});