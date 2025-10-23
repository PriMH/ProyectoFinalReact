import { collection, getDocs, getDoc, doc, addDoc, query, where, Timestamp } from 'firebase/firestore';
import { db } from './config';

// Obtener todos los productos
export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productsList;
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    throw error;
  }
};

// Obtener productos por categoría
export const getProductsByCategory = async (categoryId) => {
  try {
    const productsCollection = collection(db, 'products');
    const q = query(productsCollection, where('category', '==', categoryId));
    const productsSnapshot = await getDocs(q);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productsList;
  } catch (error) {
    console.error('Error obteniendo productos por categoría:', error);
    throw error;
  }
};

// Obtener un producto por ID
export const getProductById = async (productId) => {
  try {
    const productDoc = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productDoc);
    
    if (productSnapshot.exists()) {
      return {
        id: productSnapshot.id,
        ...productSnapshot.data()
      };
    } else {
      throw new Error('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error obteniendo producto:', error);
    throw error;
  }
};

// Crear una orden de compra
export const createOrder = async (orderData) => {
  try {
    const order = {
      ...orderData,
      createdAt: Timestamp.now(),
      status: 'generada'
    };
    
    const ordersCollection = collection(db, 'orders');
    const docRef = await addDoc(ordersCollection, order);
    
    return docRef.id;
  } catch (error) {
    console.error('Error creando orden:', error);
    throw error;
  }
};
