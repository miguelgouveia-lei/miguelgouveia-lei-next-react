export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }

  export interface Tecnologias {
    title: string;
    image: string;
    description: string;
    rating: number;
  }