export interface CartItem {
  slug: string;
  title: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
  size: string | null;
  brandName: string | null;
}
