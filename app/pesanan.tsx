import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router' // Tambah useLocalSearchParams
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'

export default function Pembayaran() {
  // Ambil data yang dikirim dari detailpro.tsx
  const { title, price, qty, total } = useLocalSearchParams();

  // Fungsi navigasi biar gak nulis berulang
  const handlePayment = () => {
    router.push({
      pathname: "/proses",
      params: { title, qty, total } 
    });
  };

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

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Pesanan Kamu</Text>

        {/* Rincian Biaya Section */}
        <View style={styles.receiptContainer}>
          <View style={styles.receiptRow}>
            {/* Pakai data dinamis atau fallback ke default */}
            <Text style={styles.receiptLabel}>{qty ? `${qty}x ${title}` : "1x Sate Madura"}</Text>
            <Text style={styles.receiptValue}>Rp {price && qty ? (Number(price) * Number(qty)).toLocaleString('id-ID') : "25.000"}</Text>
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
            <Text style={styles.totalValue}>Rp {total ? Number(total).toLocaleString('id-ID') : "32.000"}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.estimateLabel}>Estimasi Waktu Antar</Text>
            <Text style={styles.estimateValue}>30-35 mins</Text>
          </View>
        </View>

        {/* Payment Methods Section */}
        <View style={styles.paymentSection}>
          
          {/* Button Cash */}
          <TouchableOpacity 
            style={[styles.paymentBtn, styles.bgCash]} 
            onPress={handlePayment}
          >
            <View style={styles.paymentLeft}>
              <FontAwesome5 name="money-bill-wave" size={24} color="white" />
              <Text style={styles.paymentText}>Bayar Cash aja</Text>
            </View>
            <Ionicons name="radio-button-off" size={24} color="white" />
          </TouchableOpacity>

          {/* Button Ovo */}
          <TouchableOpacity 
            style={[styles.paymentBtn, styles.bgOvo]} 
            onPress={handlePayment}
          >
            <View style={styles.paymentLeft}>
              <Ionicons name="card" size={24} color="white" />
              <Text style={styles.paymentText}>Pake Ovo</Text>
            </View>
            <Ionicons name="radio-button-off" size={24} color="white" />
          </TouchableOpacity>

          {/* Button Qris */}
          <TouchableOpacity 
            style={[styles.paymentBtn, styles.bgQris]} 
            onPress={handlePayment}
          >
            <View style={styles.paymentLeft}>
              <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />
              <Text style={styles.paymentText}>Pake Qris</Text>
            </View>
            <Ionicons name="radio-button-off" size={24} color="white" />
          </TouchableOpacity>

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
  content: {
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  receiptContainer: {
    marginBottom: 40,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  receiptLabel: { fontSize: 16, color: '#333' },
  receiptValue: { fontSize: 16, color: '#000', fontWeight: '500' },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 15,
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 18, fontWeight: 'bold' },
  estimateLabel: { fontSize: 13, color: '#666' },
  estimateValue: { fontSize: 13, color: '#333' },
  
  paymentSection: {
    gap: 15,
  },
  paymentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  // Colors based on image
  bgCash: { backgroundColor: '#333333' },
  bgOvo: { backgroundColor: '#7118B8' },
  bgQris: { backgroundColor: '#C01340' },
})