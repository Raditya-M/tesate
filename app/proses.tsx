import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function ProsesP() {
  const { title, qty, total } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Nav */}
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Ilustrasi icon shesh */}
        <View style={styles.illustrationSection}>
          <Image 
            source={require('@/assets/images/chainman.png')} 
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.statusTitle}>Tunggu lho...</Text>
          <Text style={styles.statusSubtitle}>Pesanan Kamu lagi diproses</Text>
          <Text style={styles.statusHint}>Tunggu aja depan rumah nanti juga sampe kok</Text>
        </View>

        {/* Rincian Pesanan Section */}
        <View style={styles.receiptSection}>
          <Text style={styles.sectionTitle}>Pesanan Kamu</Text>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>{qty ? `${qty}x ${title}` : "2x Sate Ayam Cik"}</Text>
            <Text style={styles.receiptValue}>Rp {qty ? (Number(total) - 7000).toLocaleString('id-ID') : "30.000"}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Biaya Aplikasi</Text>
            <Text style={styles.receiptValue}>Rp 2.000</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Biaya Pesan Antar</Text>
            <Text style={styles.receiptValue}>Rp 5.000</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.receiptRow}>
            <Text style={styles.totalLabel}>Total Biaya</Text>
            <Text style={styles.totalValue}>Rp {total ? Number(total).toLocaleString('id-ID') : "37.000"}</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 40,
    justifyContent: 'center', 
  },
  illustrationSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  image: {
    width: 250, 
    height: 220,
    marginBottom: 15,
  },
  statusTitle: {
    fontSize: 32, 
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  statusSubtitle: {
    fontSize: 20, 
    color: '#000',
    textAlign: 'center',
    marginTop: 2,
  },
  statusHint: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 1,
    lineHeight: 18,
  },
  receiptSection: {
    width: '95%', 
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'left',
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  receiptLabel: {
    fontSize: 14,
    color: '#444',
  },
  receiptValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
})