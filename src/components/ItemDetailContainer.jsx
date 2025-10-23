import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import { useCart } from '../context/CartContext';
import { getProductById } from '../firebase/firestoreService';
import '../styles/ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemAddedToCart, setItemAddedToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setItemAddedToCart(false);
    setError(null);
    
    // Primero intentamos obtener de Firebase
    getProductById(itemId)
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Firebase error, usando mock data:', err);
        // Si falla Firebase, usamos mock data
        const fetchProduct = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const mockProducts = [
                { 
                  id: '1', 
                  name: "Laptop Gaming", 
                  category: "electronics", 
                  price: 1299, 
                  description: "Laptop de alto rendimiento con procesador Intel i7, 16GB RAM y tarjeta gráfica RTX 3060", 
                  stock: 10,
                  image: "https://via.placeholder.com/400x300?text=Laptop+Gaming"
                },
                { 
                  id: '2', 
                  name: "Auriculares Bluetooth", 
                  category: "electronics", 
                  price: 89, 
                  description: "Auriculares inalámbricos con cancelación de ruido y 30 horas de batería", 
                  stock: 15,
                  image: "https://via.placeholder.com/400x300?text=Auriculares"
                },
                { 
                  id: '3', 
                  name: "Smartphone 5G", 
                  category: "electronics", 
                  price: 799, 
                  description: "Smartphone de última generación con cámara de 108MP y pantalla AMOLED", 
                  stock: 8,
                  image: "https://via.placeholder.com/400x300?text=Smartphone"
                },
                { 
                  id: '4', 
                  name: "Smart Watch", 
                  category: "electronics", 
                  price: 249, 
                  description: "Reloj inteligente con monitor de salud, GPS y resistencia al agua", 
                  stock: 12,
                  image: "https://via.placeholder.com/400x300?text=Smart+Watch"
                },
              ];
              const found = mockProducts.find(p => p.id === itemId);
              if (found) {
                resolve(found);
              } else {
                resolve(null);
              }
            }, 1000);
          });
        };

        fetchProduct()
          .then(data => {
            if (data) {
              setProduct(data);
            } else {
              setError('Producto no encontrado');
            }
            setLoading(false);
          });
      });
  }, [itemId]);

  const handleAddToCart = (quantity) => {
    addToCart(product, quantity);
    setItemAddedToCart(true);
  };

  if (loading) {
    return (
      <div className="item-detail-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="item-detail-container">
        <div className="error-message">
          <h2>⚠️ {error || 'Producto no encontrado'}</h2>
          <p>El producto que buscas no está disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <ItemDetail 
        product={product} 
        onAddToCart={handleAddToCart}
        itemAddedToCart={itemAddedToCart}
      />
    </div>
  );
};

export default ItemDetailContainer;
