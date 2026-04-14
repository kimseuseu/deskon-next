export interface Product {
  id: string;
  category: string;
  subcategory?: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  descriptionDetail?: string;
  features: string[];
  featuresEn?: string[];
  colors?: string[];
  priceMonthly?: number;
  priceDisplay?: string;
  imageUrl?: string;
  badge?: string;
  specifications?: Record<string, string>;
  images?: string[];
  keywords?: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  parentSlug?: string;
  nameKo: string;
  nameEn?: string;
  description?: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  inquiryType?: string;
  serviceCategory?: string;
  productId?: string;
  message?: string;
  status: "new" | "in-progress" | "resolved";
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: string;
  imageUrl: string;
  title?: string;
  titleEn?: string;
  tag?: string;
  description?: string;
  descriptionEn?: string;
  linkUrl?: string;
  badge?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface QuoteRequest {
  id: string;
  quoteNumber: string;
  companyName: string;
  contactName: string;
  phone: string;
  email?: string;
  address?: string;
  deliveryDate?: string;
  message?: string;
  status: "pending" | "reviewed" | "quoted" | "accepted" | "declined";
  adminNote?: string;
  totalItems: number;
  createdAt: string;
  items?: QuoteRequestItem[];
}

export interface QuoteRequestItem {
  id: string;
  quoteRequestId: string;
  productId?: string;
  productName: string;
  quantity: number;
  serviceType: string;
  rentalMonths?: number;
  notes?: string;
}
