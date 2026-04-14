import type {
  Banner,
  Inquiry,
  Product,
  QuoteRequest,
  QuoteRequestItem,
} from "@/types";

type UnknownRecord = Record<string, unknown>;

function hasOwn(record: UnknownRecord, key: string) {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function asRecord(value: unknown): UnknownRecord {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as UnknownRecord;
  }

  return {};
}

function asString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function normalizeSpecifications(value: unknown) {
  return Object.fromEntries(
    Object.entries(asRecord(value)).flatMap(([key, entry]) =>
      typeof entry === "string" ? [[key, entry]] : []
    )
  );
}

function formatPriceDisplay(price?: number, explicit?: string) {
  if (explicit) {
    return explicit;
  }

  if (typeof price !== "number") {
    return undefined;
  }

  return `월 ${new Intl.NumberFormat("ko-KR").format(price)}원`;
}

export function mapProduct(row: UnknownRecord): Product {
  const specs = asRecord(row.specs);
  const priceMonthly = asNumber(row.price);

  return {
    id: String(row.id),
    category: asString(row.category) ?? "",
    subcategory: asString(specs.subcategory),
    name: asString(row.name) ?? "",
    nameEn: asString(specs.nameEn),
    description: asString(row.description) ?? "",
    descriptionEn: asString(specs.descriptionEn),
    descriptionDetail: asString(specs.descriptionDetail),
    features: asStringArray(row.features),
    featuresEn: asStringArray(specs.featuresEn),
    colors: asStringArray(specs.colors),
    priceMonthly,
    priceDisplay: formatPriceDisplay(
      priceMonthly,
      asString(specs.priceDisplay)
    ),
    imageUrl: asString(row.image_url),
    badge: asString(specs.badge),
    specifications: normalizeSpecifications(
      Object.keys(specs.specifications ?? {}).length > 0
        ? specs.specifications
        : row.specs
    ),
    images: asStringArray(specs.images),
    keywords: asStringArray(specs.keywords),
    isActive: asBoolean(row.is_active) ?? true,
    sortOrder: asNumber(specs.sortOrder) ?? 0,
    createdAt: asString(row.created_at) ?? "",
    updatedAt: asString(row.updated_at) ?? "",
  };
}

export function serializeProductInput(body: UnknownRecord) {
  const features = asStringArray(body.features);
  const existingSpecs = asRecord(body.specifications);

  return {
    category: asString(body.category) ?? "",
    name: asString(body.name) ?? "",
    description: asString(body.description) ?? "",
    features,
    price: asNumber(body.priceMonthly) ?? 0,
    price_unit: asString(body.priceUnit) ?? "원/월",
    image_url: asString(body.imageUrl) ?? null,
    is_active: asBoolean(body.isActive) ?? true,
    specs: {
      badge: asString(body.badge),
      colors: asStringArray(body.colors),
      descriptionDetail: asString(body.descriptionDetail),
      keywords: asStringArray(body.keywords),
      nameEn: asString(body.nameEn),
      priceDisplay: asString(body.priceDisplay),
      sortOrder: asNumber(body.sortOrder) ?? 0,
      specifications: normalizeSpecifications(existingSpecs),
      subcategory: asString(body.subcategory),
    },
  };
}

export function serializeProductPatch(body: UnknownRecord) {
  const patch: Record<string, unknown> = {};

  if (hasOwn(body, "category")) patch.category = asString(body.category) ?? "";
  if (hasOwn(body, "name")) patch.name = asString(body.name) ?? "";
  if (hasOwn(body, "description")) {
    patch.description = asString(body.description) ?? "";
  }
  if (hasOwn(body, "features")) {
    patch.features = asStringArray(body.features);
  }
  if (hasOwn(body, "priceMonthly")) {
    patch.price = asNumber(body.priceMonthly) ?? 0;
  }
  if (hasOwn(body, "priceUnit")) {
    patch.price_unit = asString(body.priceUnit) ?? "원/월";
  }
  if (hasOwn(body, "imageUrl")) {
    patch.image_url = asString(body.imageUrl) ?? null;
  }
  if (hasOwn(body, "isActive")) {
    patch.is_active = asBoolean(body.isActive) ?? false;
  }
  if (hasOwn(body, "specs")) {
    patch.specs = body.specs;
  }

  return patch;
}

export function mapBanner(row: UnknownRecord): Banner {
  return {
    id: String(row.id),
    imageUrl: asString(row.image_url) ?? "",
    title: asString(row.title),
    titleEn: undefined,
    tag: undefined,
    description: asString(row.description),
    descriptionEn: undefined,
    linkUrl: asString(row.link_url),
    badge: undefined,
    isActive: asBoolean(row.is_active) ?? true,
    sortOrder: asNumber(row.sort_order) ?? 0,
  };
}

export function serializeBannerInput(body: UnknownRecord) {
  return {
    title: asString(body.title) ?? "",
    description: asString(body.description) ?? null,
    image_url: asString(body.imageUrl) ?? "",
    link_url: asString(body.linkUrl) ?? null,
    is_active: asBoolean(body.isActive) ?? true,
    sort_order: asNumber(body.sortOrder) ?? 0,
  };
}

export function serializeBannerPatch(body: UnknownRecord) {
  const patch: Record<string, unknown> = {};

  if (hasOwn(body, "title")) patch.title = asString(body.title) ?? "";
  if (hasOwn(body, "description")) {
    patch.description = asString(body.description) ?? null;
  }
  if (hasOwn(body, "imageUrl")) patch.image_url = asString(body.imageUrl) ?? "";
  if (hasOwn(body, "linkUrl")) {
    patch.link_url = asString(body.linkUrl) ?? null;
  }
  if (hasOwn(body, "isActive")) {
    patch.is_active = asBoolean(body.isActive) ?? false;
  }
  if (hasOwn(body, "sortOrder")) {
    patch.sort_order = asNumber(body.sortOrder) ?? 0;
  }

  return patch;
}

export function mapInquiry(row: UnknownRecord): Inquiry {
  return {
    id: String(row.id),
    name: asString(row.name) ?? "",
    company: asString(row.company),
    phone: asString(row.phone),
    email: asString(row.email),
    inquiryType: asString(row.inquiry_type),
    serviceCategory: asString(row.service_category),
    message: asString(row.message),
    status:
      (asString(row.status) as Inquiry["status"] | undefined) ?? "new",
    adminNote: asString(row.admin_note),
    createdAt: asString(row.created_at) ?? "",
    updatedAt: asString(row.created_at) ?? "",
  };
}

export function serializeInquiryUpdate(body: UnknownRecord) {
  return {
    status: asString(body.status) ?? "new",
    admin_note: asString(body.adminNote) ?? null,
  };
}

export function mapQuote(row: UnknownRecord): QuoteRequest {
  const id = String(row.id);

  return {
    id,
    quoteNumber: `Q-${id.slice(0, 8).toUpperCase()}`,
    companyName: asString(row.company) ?? "",
    contactName: asString(row.contact_name) ?? "",
    phone: asString(row.phone) ?? "",
    email: asString(row.email),
    address: asString(row.address),
    deliveryDate: asString(row.delivery_date),
    message: asString(row.message),
    status:
      (asString(row.status) as QuoteRequest["status"] | undefined) ?? "pending",
    adminNote: asString(row.admin_note),
    totalItems: Array.isArray(row.items) ? row.items.length : 0,
    createdAt: asString(row.created_at) ?? "",
  };
}

export function mapQuoteItems(
  quoteId: string,
  items: unknown
): QuoteRequestItem[] {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((entry, index) => {
    const row = asRecord(entry);

    return {
      id: `${quoteId}-${index}`,
      quoteRequestId: quoteId,
      productId: asString(row.productId),
      productName: asString(row.productName) ?? "상품명 미정",
      quantity: asNumber(row.quantity) ?? 1,
      serviceType: asString(row.serviceType) ?? "",
      rentalMonths: asNumber(row.rentalMonths),
      notes: asString(row.notes),
    };
  });
}

export function serializeQuoteUpdate(body: UnknownRecord) {
  return {
    status: asString(body.status) ?? "pending",
    admin_note: asString(body.adminNote) ?? null,
  };
}
