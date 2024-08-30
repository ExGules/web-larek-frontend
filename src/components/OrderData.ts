import { IOrder } from '../types/index';
import { ensureAllElements, ensureElement } from '../utils/utils';
import { IEvents } from './base/events';
import { Form } from './Form';

// Модалньое окно с адресом доставки
export class OrderAddress extends Form<IOrder> {
	protected _button: HTMLButtonElement[];
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;

	constructor(protected container: HTMLFormElement, event: IEvents) {
		super(container, event);
		this._button = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		this._cash = ensureElement<HTMLButtonElement>(
			'.button.button_alt[name="cash"]',
			this.container
		);

		this._card = ensureElement<HTMLButtonElement>(
			'.button.button_alt[name="card"]',
			this.container
		);

		this._button.forEach((button) => {
			button.addEventListener('click', () => {
				this.setToggleClassPayment = button.name;
				event.emit('payment:change', button);
			});
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set setToggleClassPayment(value: string) {
		this._button.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === value);
		});
	}

	resetButtonState() {
		this.toggleClass(this._cash, 'button_alt-active', false);
		this.toggleClass(this._card, 'button_alt-active', false);
	}
}

// Модальное окно с телефоном и Email
export class OrderContacts extends Form<IOrder> {
	protected _phoneInput: HTMLInputElement;
	protected _emailInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._phoneInput = this.container.elements.namedItem(
			'phone'
		) as HTMLInputElement;
		this._emailInput = this.container.elements.namedItem(
			'email'
		) as HTMLInputElement;
	}

	set phone(value: string) {
		this._phoneInput.value = value;
	}

	set email(value: string) {
		this._emailInput.value = value;
	}
}