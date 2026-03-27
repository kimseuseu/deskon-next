export interface Product {
  id: number;
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
  id: number;
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
  id: number;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  inquiryType?: string;
  serviceCategory?: string;
  productId?: number;
  message?: string;
  status: "new" | "in-progress" | "resolved";
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: number;
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
}

export interface QuoteRequestItem {
  id: string;
  quoteRequestId: string;
  productId?: number;
  productName: string;
  quantity: number;
  serviceType: string;
  rentalMonths?: number;
  notes?: string;
}
