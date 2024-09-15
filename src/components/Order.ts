import { Form } from "./common/Form";
import { IOrderForm } from "../types";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";

export class Order extends Form<IOrderForm> {
    protected _nextButton: HTMLButtonElement;
    protected _payCash: HTMLButtonElement;
    protected _payOnline: HTMLButtonElement;
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._nextButton = ensureElement<HTMLButtonElement>('.order__button', container);
        this._payCash = ensureElement<HTMLButtonElement>('button[name="cash"]', container);
        this._payOnline = ensureElement<HTMLButtonElement>('button[name="card"]', container);
        this._address = ensureElement<HTMLInputElement>('input[name="address"]', container);

        this._nextButton.addEventListener('click', () => {
            this.events.emit('contacts:open');
        });

        this._payCash.addEventListener('click', () => {
            this.events.emit('payment:change', { payment: 'cash', clickedButton: this._payCash, otherButton: this._payOnline });
        });

        this._payOnline.addEventListener('click', () => {
            this.events.emit('payment:change', { payment: 'card', clickedButton: this._payOnline, otherButton: this._payCash });
        });
    }

    toggleActiveButton(clickedButton: HTMLButtonElement, otherButton: HTMLButtonElement) {
        clickedButton.classList.add('button_alt-active');
        otherButton.classList.remove('button_alt-active');
    }

    set address(value: string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}
