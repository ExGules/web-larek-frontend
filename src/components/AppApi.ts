import {
	FormErrors,
	ICardItem,
	IProductItem,
	PaymenthMethods,
} from '../types';
import { Model } from './base/Model';

//Изменение каталога
export type CatalogChangeEvent = {
	catalog: ICardItem;
};

export interface IOrderForm {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export class AppData extends Model<IProductItem> {
	basket: ICardItem[] = [];
	items: ICardItem[];
	order: IOrderForm = {
		payment: '',
		email: '',
		phone: '',
		address: '',
	};
	preview: string | null;
	formErrors: FormErrors = {};

	//Добавить товар в корзину
	addBasket(item: ICardItem) {
		if (this.basket.indexOf(item) < 0) {
			this.basket.push(item);
			this.updateBasket();
		}
	}

	//Проверка, находится ли продукт в заказе.
	productOrder(item: ICardItem): boolean {
		return this.basket.includes(item);
	}

	//Очистить корзину после заказа
	clearBasket() {
		this.basket = [];
		this.updateBasket();
	}

	//очистка заказа
	clearOrder() {
		this.order = {
			payment: '',
			address: '',
			email: '',
			phone: '',
		};
	}

	//Обновить корзину
	updateBasket() {
		this.emitChanges('counter:changed', this.basket);
		this.emitChanges('basket:changed', this.basket);
	}

	//Удаление продукта из корзины
	removeFromBasket(id: string) {
		this.basket = this.basket.filter((it) => it.id !== id);
		this.emitChanges('basket:changed');
	}

	//Получение продуктов из заказа
	getOrderProducts(): ICardItem[] {
		return this.basket;
	}

	//Подсчет общей стоимости
	getTotalPrice() {
		return this.basket.reduce((total, item) => total + item.price, 0);
	}

	//Добавление каталога карточек на главную страницу
	setCatalog(item: ICardItem[]) {
		this.items = item;
		this.emitChanges('items:changed', { catalog: this.items });
	}

	//Предпросмотр продукта validateOrder
	setPreview(item: ICardItem) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	//Валидация формы с контактами
	validateContact(): boolean {
		const errors: typeof this.formErrors = {};
		//инпут с почтой
		if (!this.order.email) {
			errors.email = 'Нужно указать email';
		} else if (this.order.email) {
		}

		//инпут с телефоном
		if (!this.order.phone) {
			errors.phone = 'Нужно указать телефон';
		}
		this.formErrors = errors;
		this.events.emit('form:errors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	setContactField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
		if (this.validateContact()) {
			this.events.emit('contacts:ready', this.order);
		}
	}

	//Валидация адреса
	validateAdress() {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = 'Укажите способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Укажите адрес';
		}
		this.formErrors = errors;
		this.events.emit('form:errors:change', errors);
		return Object.keys(errors).length === 0;
	}

	setOrderField(item: keyof IOrderForm, value: string) {
		this.order[item] = value;
		if (this.validateAdress()) {
			this.events.emit('order:ready', this.order);
		}
	}
	//Метод оплаты
	setPaymentMethod(method: string) {
		this.order.payment = method as PaymenthMethods;
		this.validateAdress();
	}
}