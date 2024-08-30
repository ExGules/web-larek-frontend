// Приложение
export interface IProductItem {
	basket: IBasket[];
	cardsList: ICardItem[];
	preview: string | null;
	order: IOrder | null;
	image: string;
}

// Товар
export interface ICardItem {
	id: string;
	title: string;
	category: string;
	description: string;
	image: string;
	price: number | null;
	inBasket: boolean;
	button: string;
}

// Интерфейс формы доставки заказа
export interface IOrderForm {
	payment: string;
	address: string;
}

export interface IOrderForms {
	payment?: string;
	address?: string;
	phone?: string;
	email?: string;
	total?: string | number;
}

// Интерфейс контактов заказа
export interface IOrderContacts {
	email: string;
	phone: string;
}

// Данные заказа
export interface IOrder extends IOrderForm, IOrderContacts {
	items: string[];
	total: number;
}

// Корзина
export interface IBasket {
	quantity: number;
	title: string;
	price: number;
	totalPrice: number;
}

export type PaymenthMethods = 'card' | 'cash';

// Тип ошибок формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;