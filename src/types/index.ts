// Тип для способов оплаты
export type PaymentMethod = 'cash' | 'online' | null;

export type Category =
	| 'софт-скил'
	| 'другое'
	| 'кнопка'
	| 'хард-скил'
	| 'дополнительное';

export type FormErrors = Partial<Record<keyof IOrder, string>>;

//интерфейс для товара
export interface IProduct {
	category?: string;
	description?: string;
	id: string;
	image?: string;
	price: number | null;
	title: string;
}

export interface IAppState {
	basket: string[];
	catalog: IProduct[];
	order: IOrder | null;
	preview: string | null;
}

//заказанные товары
export interface IOrder extends IOrderForm {
	items: string[];
	total?: number;
}

//интерфейс для заказа
export interface IOrderForm {
	payment?: PaymentMethod;
	email?: string;
	phone?: string;
	address: string;
}

//интерфейс для ответа на успешный заказ
export interface IOrderResult {
	id: string;
	total: number;
}