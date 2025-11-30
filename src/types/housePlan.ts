export interface HousePlan {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  floorArea: number;
  levels: number;
  width: number;
  depth: number;
  style: string[];
  isNew: boolean;
  isPopular: boolean;
  images: string[];
  description?: string;
  features?: string[];
  videoUrl?: string;
}

export interface FilterState {
  bedrooms?: number[];
  bathrooms?: number[];
  levels?: number[];
  garage?: number[];
  styles?: string[];
  priceMin?: number;
  priceMax?: number;
  floorAreaMin?: number;
  floorAreaMax?: number;
}

export type SortOption = 'newest' | 'oldest' | 'price-high' | 'price-low' | 'popular';
