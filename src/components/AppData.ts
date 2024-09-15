import _ from 'lodash';
import { IOrderForm } from '../types';
import { Model } from './base/Model';
import { FormErrors, IAppState, IProduct, IOrder } from '../types';

export type CatalogChangeEvent = {
	catalog: IProduct[];
};

export class AppState extends Model<IAppState> {
	basket: string[];
	catalog: IProduct[];
	order: IOrder = {
		email: '',
		phone: '',
		address: '',
		payment: null,
		items: [],
		total: 0,
	};
	preview: string | null;
	formErrors: FormErrors = {};

	setCatalog(items: IProduct[]) {
        this.catalog = items.map((item) => {
            return {
                id: item.id,
                description: item.description,
                image: item.image,
                title: item.title,
                category: item.category,
                price: item.price,
            };
        });
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	toggleOrderedItem(id: string, isIncluded: boolean) {
		if (isIncluded) {
			
			this.order.items = _.uniq([...this.order.items, id]);
		} else {
			
			this.order.items = _.without(this.order.items, id);
		}
	}

	clearBasket() {
		this.order.items.forEach((id) => {
			this.toggleOrderedItem(id, false);
		});
	}

	getTotal() {
		return this.order.items.reduce(
			(a, c) => a + this.catalog.find((it) => it.id === c).price,
			0
		);
	}

	set total(total: number) {
		this.order.total = total;
	}

	itemCount(): number {
		return this.order.items.length;
	}
	
	getSelectedItems(): IProduct[] {
		return this.catalog.filter((item) => this.order.items.includes(item.id));
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		if (field !== 'payment') {
			this.order[field] = value;
		}

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setPaymentField(payment: 'cash' | 'online') {
		this.order.payment = payment;
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (this.order.payment === null) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	setContactField(field: keyof IOrderForm, value: string) {
		if (field !== 'payment') {
			this.order[field] = value;
		}

		if (this.validateContacts()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:contactsChange', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}