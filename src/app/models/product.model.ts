

// Interfaz para el producto tal como viene de la "Base de Datos" o Tienda
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  colors: string[]; // Array de códigos hex ['#000', '#fff']
  colorNames: { [key: string]: string }; // Mapa de nombres {'#000': 'Negro'}
  
  // Propiedad opcional para manejar la UI (qué color está viendo el usuario)
  selectedColor?: string; 
}

