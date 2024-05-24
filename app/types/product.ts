export interface LocalizedString {
  [key: string]: string;
}

export interface Reference {
  typeId: string;
  id: string;
}

export interface Value {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Price {
  id: string;
  value: Value;
}

export interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface Variant {
  id: number;
  sku?: string;
  key?: string;
  prices?: Price[];
  images?: Image[];
  attributes?: {}[];
  assets?: {}[];
}

export interface Product {
  id: string;
  version: number;
  productType: Reference;
  name: LocalizedString;
  description?: LocalizedString;
  categories: Reference[];
  categoryOrderHints?: {};
  slug: LocalizedString;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  masterVariant: Variant;
  variants?: Variant[];
  searchKeywords?: {};
  hasStagedChanges: boolean;
  published: boolean;
  key?: string;
  taxCategory?: Reference;
  priceMode?: string;
  createdAt: string;
  lastModifiedAt: string;
}
