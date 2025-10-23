# ProyectoFinal - TechStore

E-commerce desarrollado con React como proyecto final del curso de ReactJS en CoderHouse.

## 📋 Descripción

TechStore es una aplicación web de e-commerce que permite a los usuarios navegar por un catálogo de productos, ver detalles de cada uno, agregar productos al carrito de compras y finalizar la compra registrando la orden en una base de datos Firebase.

## 🚀 Características

- **Navegación fluida**: Single Page Application (SPA) con React Router
- **Catálogo de productos**: Listado dinámico de productos con filtrado por categorías
- **Detalles del producto**: Vista detallada de cada producto con información completa
- **Carrito de compras**: Sistema completo de gestión del carrito con Context API
- **Checkout**: Formulario de finalización de compra con validación
- **Base de datos**: Integración con Firebase Firestore para productos y órdenes
- **Experiencia de usuario**: Loaders, mensajes condicionales y feedback visual
- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla

## 🛠️ Tecnologías utilizadas

- **React** v19.1.1
- **React Router DOM** v7.9.3 - Navegación entre páginas
- **Firebase** v11+ - Base de datos Firestore
- **Vite** - Build tool y desarrollo
- **CSS3** - Estilos personalizados

## 📦 Estructura del proyecto

```
Entrega2-ReactJS/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx              # Barra de navegación
│   │   ├── CartWidget.jsx          # Icono del carrito con contador
│   │   ├── ItemListContainer.jsx   # Contenedor del listado
│   │   ├── ItemList.jsx            # Componente de presentación - lista
│   │   ├── Item.jsx                # Componente de presentación - tarjeta
│   │   ├── ItemDetailContainer.jsx # Contenedor del detalle
│   │   ├── ItemDetail.jsx          # Componente de presentación - detalle
│   │   ├── ItemCount.jsx           # Selector de cantidad
│   │   ├── Cart.jsx                # Vista del carrito
│   │   ├── CartItem.jsx            # Item individual del carrito
│   │   └── CheckoutForm.jsx        # Formulario de checkout
│   ├── context/
│   │   └── CartContext.jsx         # Context API para el carrito
│   ├── firebase/
│   │   ├── config.js               # Configuración de Firebase
│   │   └── firestoreService.js     # Servicios de Firestore
│   ├── styles/
│   │   ├── NavBar.css
│   │   ├── CartWidget.css
│   │   ├── ItemListContainer.css
│   │   ├── ItemDetailContainer.css
│   │   ├── ItemCount.css
│   │   ├── Cart.css
│   │   ├── Checkout.css
│   │   └── Common.css
│   ├── App.jsx                     # Componente principal
│   ├── App.css
│   ├── main.jsx                    # Punto de entrada
│   └── index.css
├── public/
├── .env.example                    # Ejemplo de variables de entorno
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/ProyectoFinal+TU_APELLIDO.git
cd ProyectoFinal+TU_APELLIDO
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Copia el contenido de `.env.example` y completa con tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre tu navegador en `http://localhost:5173`

## 🔥 Configuración de Firebase

### 1. Crear proyecto en Firebase:
- Ve a [Firebase Console](https://console.firebase.google.com/)
- Crea un nuevo proyecto
- Habilita Firestore Database

### 2. Estructura de la base de datos:

#### Colección: `products`
Cada documento debe tener la siguiente estructura:
```javascript
{
  name: "Nombre del producto",
  category: "electronics" | "clothing",
  price: 999,
  description: "Descripción del producto",
  stock: 10,
  image: "URL_de_la_imagen" // Opcional
}
```

#### Colección: `orders` (se crea automáticamente)
Las órdenes se generan con esta estructura:
```javascript
{
  buyer: {
    name: "Nombre",
    email: "email@example.com",
    phone: "123456789",
    address: "Dirección"
  },
  items: [
    {
      id: "1",
      name: "Producto",
      price: 999,
      quantity: 2
    }
  ],
  total: 1998,
  createdAt: Timestamp,
  status: "generada"
}
```

### 3. Reglas de seguridad recomendadas:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{product} {
      allow read: if true;
      allow write: if false; // Solo admins pueden modificar
    }
    match /orders/{order} {
      allow read, write: if true; // Ajustar según necesidades
    }
  }
}
```

## 📱 Funcionalidades principales

### 1. Navegación
- **Inicio (/)**: Muestra todos los productos
- **Categorías (/category/:categoryId)**: Filtra productos por categoría
- **Detalle (/item/:itemId)**: Muestra información detallada del producto
- **Carrito (/cart)**: Vista del carrito de compras
- **Checkout (/checkout)**: Formulario de finalización de compra

### 2. Carrito de Compras
El carrito utiliza Context API y ofrece:
- Agregar productos con cantidad seleccionada
- Modificar cantidades desde el carrito
- Eliminar productos individuales
- Vaciar carrito completo
- Visualización de totales y subtotales
- Persistencia durante la sesión

### 3. Proceso de Compra
1. Usuario navega por productos
2. Selecciona cantidad y agrega al carrito
3. Puede seguir comprando o ir al carrito
4. Revisa el carrito y procede al checkout
5. Completa el formulario con sus datos
6. Recibe confirmación con ID de orden

### 4. Validaciones
- Stock disponible al agregar productos
- Límites en el selector de cantidad (ItemCount)
- Validación de formulario en checkout
- Mensajes de error y éxito claros

## 🎨 Componentes

### Contenedores
- **ItemListContainer**: Obtiene y muestra la lista de productos
- **ItemDetailContainer**: Obtiene y muestra el detalle de un producto

### Presentacionales
- **ItemList**: Renderiza la grilla de productos
- **Item**: Tarjeta individual de producto
- **ItemDetail**: Vista detallada del producto
- **CartItem**: Item individual en el carrito

### Funcionales
- **ItemCount**: Selector de cantidad con validaciones
- **NavBar**: Navegación principal con CartWidget
- **CartWidget**: Icono del carrito con badge de cantidad
- **Cart**: Vista completa del carrito
- **CheckoutForm**: Formulario de compra

## 🔄 Context API

El **CartContext** maneja el estado global del carrito con las siguientes funciones:

- `addToCart(product, quantity)`: Agrega productos al carrito
- `removeFromCart(itemId)`: Elimina un producto
- `clearCart()`: Vacía el carrito
- `updateQuantity(productId, newQuantity)`: Actualiza cantidad
- `getTotalItems()`: Retorna total de items
- `getTotalPrice()`: Retorna precio total
- `isInCart(productId)`: Verifica si un producto está en el carrito
- `getProductQuantity(productId)`: Obtiene cantidad de un producto

## 🚀 Scripts disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Crea build de producción
npm run preview  # Previsualiza build de producción
npm run lint     # Ejecuta linter
```

## 📝 Notas importantes

1. **Firebase**: Si no configuras Firebase, la app usará datos mock (productos de ejemplo)
2. **Variables de entorno**: No subas el archivo `.env.local` al repositorio
3. **Build**: Antes de deployar, asegúrate de que `npm run build` no arroje errores
4. **Testing**: Clona el repo en una carpeta nueva y haz `npm install` para verificar que todo funcione

## 🌐 Deploy

Puedes deployar esta aplicación en:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Arrastra la carpeta dist a Netlify
```

**Importante**: Recuerda configurar las variables de entorno en tu plataforma de deploy.

## 👨‍💻 Autor

**[Tu Nombre Completo]**
- GitHub: [@TU_USUARIO]
- Email: tu_email@example.com

## 📄 Licencia

Este proyecto fue desarrollado como trabajo final del curso de ReactJS en CoderHouse.

## 🙏 Agradecimientos

- CoderHouse por el curso de ReactJS
- Profesores y tutores por su guía
- Compañeros de curso por su apoyo

---

⭐ Si te gustó este proyecto, no olvides darle una estrella!
