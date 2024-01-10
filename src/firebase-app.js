const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

const serviceAccount = require('./serviceAccountKey.json');

// Inisialisasi aplikasi dengan kredensial dari berkas kunci layanan
initializeApp({
  credential: cert(serviceAccount)
});

// Dapatkan referensi ke Firestore
const db = getFirestore();

// Tambahkan data ke Firestore
async function tambahData() {
  const pesan = "Contoh pesan dari Node.js";
  const timestamp = Timestamp.now();

  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      text: pesan,
      timestamp: timestamp
    });

    console.log("Dokumen berhasil ditambahkan dengan ID:", docRef.id);
  } catch (error) {
    console.error("Error menambahkan dokumen:", error);
  }
}

// Baca data dari Firestore
async function bacaData() {
  const querySnapshot = await getDocs(collection(db, 'messages'));

  console.log("Data dari Firestore:");
  querySnapshot.forEach((doc) => {
    const pesan = doc.data().text;
    console.log(pesan);
  });
}

// Panggil fungsi untuk menambahkan dan membaca data
tambahData().then(() => {
  bacaData();
});
