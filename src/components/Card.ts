import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { Category } from '../types';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
	title: string;
	description?: string | string[];
	image?: string;
	button?: HTMLButtonElement;
	price: number | null;
	category?: string;
	id: string;
}

export class Card<T> extends Component<ICard<T>> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = container.querySelector(`.${blockName}__image`);
		this._button = container.querySelector(`.${blockName}__button`);
		this._description = container.querySelector(`.${blockName}__description`);
		this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this._category = container.querySelector(`.${blockName}__category`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
			this._description.replaceWith(
				...value.map((str) => {
					const descTemplate = this._description.cloneNode() as HTMLElement;
					this.setText(descTemplate, str);
					return descTemplate;
				})
			);
		} else {
			this.setText(this._description, value);
		}
	}

	set price(value: number | null) {
		if (value !== null) {
			this.setText(this._price, value.toString() + ' синапсов');
		} else {
			this._price.textContent = 'Бесценно';
			this.setDisabled(this._button, true);
		}
	}

	set category(value: string) {
		if (value) {
			this.setText(this._category, value);
			const categoryClass = this.getCategoryClass(value);
			this._category.classList.add(categoryClass);
		} else {
			this._category?.remove();
		}
	}

	private getCategoryClass(categoryName: string): string {
		const categoryMap: Record<string, string> = {
			'софт-скил': 'card__category_soft',
			дополнительное: 'card__category_additional',
			кнопка: 'card__category_button',
			'хард-скил': 'card__category_hard',
			другое: 'card__category_other',
		};
		return categoryMap[categoryName] || '';
	}
}

export type CatalogItemStatus = {
	category: Category;
};

export class CatalogItem extends Card<CatalogItemStatus> {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
	}

	set addToCart(callback: () => void) {
		this._button.addEventListener('click', callback);
	}

	set buttonText(text: string) {
		this._button.textContent = text;
	}
}

export interface BasketItem {
	index: number;
	deleteButton: boolean;
}

export class BasketItem extends Card<BasketItem> {
	protected _index: HTMLElement;
	private _deleteButton: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
		this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
		this._deleteButton = container.querySelector(`.basket__item-delete`);

		if (this._deleteButton) {
			this._deleteButton.addEventListener('change', (event: MouseEvent) => {
				actions?.onClick?.(event);
			});
		}
	}

	setIndex(index: number) {
		this._index.textContent = (index + 1).toString();
	}
}