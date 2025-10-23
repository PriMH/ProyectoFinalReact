import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { getProducts, getProductsByCategory } from '../firebase/firestoreService';
import '../styles/ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Intentamos obtener de Firebase primero
    const fetchData = categoryId 
      ? getProductsByCategory(categoryId) 
      : getProducts();

    fetchData
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Firebase error, usando mock data:', err);
        // Si falla Firebase, usamos mock data
        const fetchProducts = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              const mockProducts = [
                { 
                  id: '1', 
                  name: "Laptop Gaming", 
                  category: "electronics", 
                  price: 1299, 
                  description: "Laptop de alto rendimiento", 
                  stock: 10,
                  image: "https://via.placeholder.com/300x200?text=Laptop+Gaming"
                },
                { 
                  id: '2', 
                  name: "Auriculares Bluetooth", 
                  category: "electronics", 
                  price: 89, 
                  description: "Auriculares inalámbricos", 
                  stock: 15,
                  image: "https://via.placeholder.com/300x200?text=Auriculares"
                },
                { 
                  id: '3', 
                  name: "Smartphone 5G", 
                  category: "electronics", 
                  price: 799, 
                  description: "Smartphone de última generación", 
                  stock: 8,
                  image: "https://via.placeholder.com/300x200?text=Smartphone"
                },
                { 
                  id: '4', 
                  name: "Smart Watch", 
                  category: "electronics", 
                  price: 249, 
                  description: "Reloj inteligente", 
                  stock: 12,
                  image: "https://via.placeholder.com/300x200?text=Smart+Watch"
                },
                { 
                  id: '5', 
                  name: "Camiseta Deportiva", 
                  category: "clothing", 
                  price: 29, 
                  description: "Camiseta técnica transpirable", 
                  stock: 20,
                  image: "https://via.placeholder.com/300x200?text=Camiseta"
                },
                { 
                  id: '6', 
                  name: "Zapatillas Running", 
                  category: "clothing", 
                  price: 129, 
                  description: "Zapatillas para correr", 
                  stock: 5,
                  image: "https://via.placeholder.com/300x200?text=Zapatillas"
                },
              ];
              const filtered = categoryId
                ? mockProducts.filter(p => p.category === categoryId)
                : mockProducts;
              resolve(filtered);
            }, 1000);
          });
        };

        fetchProducts()
          .then(data => {
            setProducts(data);
            setLoading(false);
          });
      });
  }, [categoryId]);

  if (loading) {
    return (
      <div className="item-list-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-list-container">
        <div className="error-message">
          <h2>⚠️ Error al cargar productos</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <h2>{greeting}</h2>
      {categoryId && <p className="category-info">Categoría: {categoryId}</p>}
      {products.length > 0 ? (
        <ItemList products={products} />
      ) : (
        <div className="no-products">
          <p>No hay productos disponibles en esta categoría.</p>
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
