export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string[];
  price: number;
  size: string[];
  material?: string;
  stock?: number;
  colors: string[];
  details: string[];
  valuation?: string;
  brand: string;
  image: string[];
};

//export type TCart = Product[] & string[]

type IdProduct = string & Product

export interface CartItem {
  id_product: IdProduct;
  quantity: number;
}

export type TCart = CartItem[];