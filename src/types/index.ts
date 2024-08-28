export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    selected: boolean;
}

export interface ApiResponse {
  items: IProductItem[];
}

export type CatalogChangeEvent = {
  catalog: IProductItem[]
};

export interface IAppState {
  basket: IProductItem[];
  catalog: IProductItem[];
  order: IOrderModel;
  preview: string | null;
  formErrors: FormErrors;
  setCatalog(data: IProductItem[]): void;
  addToBasket(id: string): void;
  removeFromBasket(id: string): void;
  clearBasket(): void;
  isInBasket(id: string): boolean;
  getTotalPrice(): number;
  countProducts(): number;
  setPreview(item: IProductItem): void;
  setOrderField(field: keyof IOrderModel, value: string): void;
  validateAddress(): void;
  validateContacts(): void;
  getProductIDs(): string[];
}

export interface IOrderModel {
  payment: string;
  address: string;
  email: string;
  phone: string;
}

export type FormErrors = Partial<Record<keyof IOrderModel, string>>;

export interface IModalData {
  content: HTMLElement;
}

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  basket: HTMLElement;
}

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export interface ICard {
  id: string;
  description?: string;
  image?: string;
  title: string;
  category?: string;
  price: number | null;
  buttonText?: string;
  selected?: boolean;
}

export interface IBasketCard {
  title: string;
  price: number | null;
  prodactIndex: number;
}

export interface IBasket {
  items: IProductItem[];
}

export interface ISuccess {
  total: number;
}

export interface ISuccessActions {
  onClick: () => void;
}

export interface IOrderResult {
  id: string;
  total: number;
}