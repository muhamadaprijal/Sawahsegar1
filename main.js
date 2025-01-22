
//setatment inpor mobul
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDO3zW_rQohD-ktTXkrrrILsV_e1-HjB5w",
  authDomain: "insan-cemerlang-8b943.firebaseapp.com",
  projectId: "insan-cemerlang-8b943",
  storageBucket: "insan-cemerlang-8b943.firebasestorage.app",
  messagingSenderId: "1037716880990",
  appId: "1:1037716880990:web:5bb29cf4b27b53ccff7ecf",
  measurementId: "G-ZHPLRWYEQB"
};
  const dokRef = await addDoc(collection(db, 'sawahsegar'), {
      Harga: "7.000",
      Aksi: "Banyak",
    });
    console.log('Berhasil menambah menu ' + dokRef.id);



const app = initializeApp(firebaseConfig);
//inisialisasi firebase
const db = getFirestore(app);

 //fungsi mengambil daftar produk
 export async function ambilDaftarProduk() {
  const refDokumen = collection(db, "menu");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);


    const dokRef = await addDoc(collection(db, 'sawah segar'), 
    {
      Harga: "7.000",
      Aksi: "Banyak",
    });
    console.log('Berhasil menambah produk ' + dokRef.id);


export async function hapusProduk(docId) {
  await deleteDoc(doc(db, "produk", docId));
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const kasiraCollection = collection(db, 'kasira');

let editingProductId = null;
let totalPrice = 0;

// Fungsi menampilkan produk dari Firestore
async function fetchProducts() {
  const querySnapshot = await getDocs(kasiraCollection);
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  querySnapshot.forEach(doc => {
    const product = doc.data();
    const productId = doc.id;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${product.foto}" width="50" height="50">
      <span>${product.nama}</span>
      <span>Rp ${product.harga}</span>
      <button onclick="addToCart('${productId}', '${product.nama}', ${product.harga})">Add to Cart</button>
      <button onclick="editProduct('${productId}', '${product.nama}', ${product.harga})">Edit</button>
      <button onclick="deleteProduct('${productId}')">Delete</button>
    `;
    productList.appendChild(listItem);
  });
}

// Fungsi tambah/edit produk
async function saveProduct() {
  const productName = document.getElementById('productName').value;
  const productPrice = parseInt(document.getElementById('productPrice').value);
  const productImage = document.getElementById('productImage').files[0];

  if (!productName || !productPrice || !productImage) {
    alert('Semua kolom harus diisi!');
    return;
  }

  let imageUrl = '';
  const imageRef = ref(storage, `products/${productImage.name}`);
  await uploadBytes(imageRef, productImage);
  imageUrl = await getDownloadURL(imageRef);

  if (editingProductId) {
    const productRef = doc(db, 'kasira', editingProductId);
    await updateDoc(productRef, { nama: productName, harga: productPrice, foto: imageUrl });
    editingProductId = null;
    document.getElementById('formTitle').textContent = 'Tambah Produk';
    document.getElementById('submitProduct').textContent = 'Simpan Produk';
  } else {
    await addDoc(kasiraCollection, { nama: productName, harga: productPrice, foto: imageUrl });
  }

  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productImage').value = '';
  fetchProducts();
}

// Fungsi edit produk
function editProduct(id, name, price) {
  editingProductId = id;
  document.getElementById('productName').value = name;
  document.getElementById('productPrice').value = price;
  document.getElementById('formTitle').textContent = 'Edit Produk';
  document.getElementById('submitProduct').textContent = 'Perbarui Produk';
  document.getElementById('cancelEdit').style.display = 'inline';
}

// Fungsi membatalkan edit
function cancelEdit() {
  editingProductId = null;
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('formTitle').textContent = 'Tambah Produk';
  document.getElementById('submitProduct').textContent = 'Simpan Produk';
  document.getElementById('cancelEdit').style.display = 'none';
}

// Fungsi hapus produk
async function deleteProduct(id) {
  const productRef = doc(db, 'kasira', id);
  await deleteDoc(productRef);
  fetchProducts();
}

// Fungsi tambah ke keranjang
function addToCart(id, name, price) {
  const cartItems = document.getElementById('cartItems');
  const listItem = document.createElement('li');
  listItem.textContent = `${name} - Rp ${price}`;
  cartItems.appendChild(listItem);
  
  totalPrice += price;
  document.getElementById('totalPrice').textContent = `Rp ${totalPrice}`;
}

// Fungsi checkout
function checkout() {
  alert(`Total Pembayaran: Rp ${totalPrice}`);
  clearCart();
}

// Fungsi bersihkan keranjang
function clearCart() {
  document.getElementById('cartItems').innerHTML = '';
  document.getElementById('totalPrice').textContent = 'Rp 0';
  totalPrice = 0;
}

// Fetch produk saat halaman dimuat
window.onload = fetchProducts;import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";

// Masukkan konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const kasiraCollection = collection(db, 'kasira');

let editingProductId = null;
let totalPrice = 0;

// Fungsi menampilkan produk dari Firestore
async function fetchProducts() {
  const querySnapshot = await getDocs(kasiraCollection);
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  querySnapshot.forEach(doc => {
    const product = doc.data();
    const productId = doc.id;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${product.foto}" width="50" height="50">
      <span>${product.nama}</span>
      <span>Rp ${product.harga}</span>
      <button onclick="addToCart('${productId}', '${product.nama}', ${product.harga})">Add to Cart</button>
      <button onclick="editProduct('${productId}', '${product.nama}', ${product.harga})">Edit</button>
      <button onclick="deleteProduct('${productId}')">Delete</button>
    `;
    productList.appendChild(listItem);
  });
}

// Fungsi tambah/edit produk
async function saveProduct() {
  const productName = document.getElementById('productName').value;
  const productPrice = parseInt(document.getElementById('productPrice').value);
  const productImage = document.getElementById('productImage').files[0];

  if (!productName || !productPrice || !productImage) {
    alert('Semua kolom harus diisi!');
    return;
  }

  let imageUrl = '';
  const imageRef = ref(storage, `products/${productImage.name}`);
  await uploadBytes(imageRef, productImage);
  imageUrl = await getDownloadURL(imageRef);

  if (editingProductId) {
    const productRef = doc(db, 'kasira', editingProductId);
    await updateDoc(productRef, { nama: productName, harga: productPrice, foto: imageUrl });
    editingProductId = null;
    document.getElementById('formTitle').textContent = 'Tambah Produk';
    document.getElementById('submitProduct').textContent = 'Simpan Produk';
  } else {
    await addDoc(kasiraCollection, { nama: productName, harga: productPrice, foto: imageUrl });
  }

  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productImage').value = '';
  fetchProducts();
}

// Fungsi edit produk
function editProduct(id, name, price) {
  editingProductId = id;
  document.getElementById('productName').value = name;
  document.getElementById('productPrice').value = price;
  document.getElementById('formTitle').textContent = 'Edit Produk';
  document.getElementById('submitProduct').textContent = 'Perbarui Produk';
  document.getElementById('cancelEdit').style.display = 'inline';
}

// Fungsi membatalkan edit
function cancelEdit() {
  editingProductId = null;
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('formTitle').textContent = 'Tambah Produk';
  document.getElementById('submitProduct').textContent = 'Simpan Produk';
  document.getElementById('cancelEdit').style.display = 'none';
}

// Fungsi hapus produk
async function deleteProduct(id) {
  const productRef = doc(db, 'kasira', id);
  await deleteDoc(productRef);
  fetchProducts();
}

// Fungsi tambah ke keranjang
function addToCart(id, name, price) {
  const cartItems = document.getElementById('cartItems');
  const listItem = document.createElement('li');
  listItem.textContent = `${name} - Rp ${price}`;
  cartItems.appendChild(listItem);
  
  totalPrice += price;
  document.getElementById('totalPrice').textContent = `Rp ${totalPrice}`;
}

// Fungsi checkout
function checkout() {
  alert(`Total Pembayaran: Rp ${totalPrice}`);
  clearCart();
}

// Fungsi bersihkan keranjang
function clearCart() {
  document.getElementById('cartItems').innerHTML = '';
  document.getElementById('totalPrice').textContent = 'Rp 0';
  totalPrice = 0;
}

// Fetch produk saat halaman dimuat
window.onload = fetchProducts;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const kasiraCollection = collection(db, 'kasira');

let editingProductId = null;
let totalPrice = 0;

// Fungsi menampilkan produk dari Firestore
async function fetchProducts() {
  const querySnapshot = await getDocs(kasiraCollection);
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  querySnapshot.forEach(doc => {
    const product = doc.data();
    const productId = doc.id;

    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${product.foto}" width="50" height="50">
      <span>${product.nama}</span>
      <span>Rp ${product.harga}</span>
      <button onclick="addToCart('${productId}', '${product.nama}', ${product.harga})">Add to Cart</button>
      <button onclick="editProduct('${productId}', '${product.nama}', ${product.harga})">Edit</button>
      <button onclick="deleteProduct('${productId}')">Delete</button>
    `;
    productList.appendChild(listItem);
  });
}

// Fungsi tambah/edit produk
async function saveProduct() {
  const productName = document.getElementById('productName').value;
  const productPrice = parseInt(document.getElementById('productPrice').value);
  const productImage = document.getElementById('productImage').files[0];

  if (!productName || !productPrice || !productImage) {
    alert('Semua kolom harus diisi!');
    return;
  }

  let imageUrl = '';
  const imageRef = ref(storage, `products/${productImage.name}`);
  await uploadBytes(imageRef, productImage);
  imageUrl = await getDownloadURL(imageRef);

  if (editingProductId) {
    const productRef = doc(db, 'kasira', editingProductId);
    await updateDoc(productRef, { nama: productName, harga: productPrice, foto: imageUrl });
    editingProductId = null;
    document.getElementById('formTitle').textContent = 'Tambah Produk';
    document.getElementById('submitProduct').textContent = 'Simpan Produk';
  } else {
    await addDoc(kasiraCollection, { nama: productName, harga: productPrice, foto: imageUrl });
  }

  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productImage').value = '';
  fetchProducts();
}

// Fungsi edit produk
function editProduct(id, name, price) {
  editingProductId = id;
  document.getElementById('productName').value = name;
  document.getElementById('productPrice').value = price;
  document.getElementById('formTitle').textContent = 'Edit Produk';
  document.getElementById('submitProduct').textContent = 'Perbarui Produk';
  document.getElementById('cancelEdit').style.display = 'inline';
}

// Fungsi membatalkan edit
function cancelEdit() {
  editingProductId = null;
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('formTitle').textContent = 'Tambah Produk';
  document.getElementById('submitProduct').textContent = 'Simpan Produk';
  document.getElementById('cancelEdit').style.display = 'none';
}

// Fungsi hapus produk
async function deleteProduct(id) {
  const productRef = doc(db, 'kasira', id);
  await deleteDoc(productRef);
  fetchProducts();
}

// Fungsi tambah ke keranjang
function addToCart(id, name, price) {
  const cartItems = document.getElementById('cartItems');
  const listItem = document.createElement('li');
  listItem.textContent = `${name} - Rp ${price}`;
  cartItems.appendChild(listItem);
  
  totalPrice += price;
  document.getElementById('totalPrice').textContent = `Rp ${totalPrice}`;
}

// Fungsi checkout
function checkout() {
  alert(`Total Pembayaran: Rp ${totalPrice}`);
  clearCart();
}

// Fungsi bersihkan keranjang
function clearCart() {
  document.getElementById('cartItems').innerHTML = '';
  document.getElementById('totalPrice').textContent = 'Rp 0';
  totalPrice = 0;
