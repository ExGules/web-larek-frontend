import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

interface ISuccess {
	total: number;
	id: string;
}

interface ISuccessActions {
	onClick: () => void;
}

export class Success extends Component<ISuccess> {
	protected _close: HTMLElement;
	protected _totalDescription: HTMLElement;

	constructor(
		container: HTMLElement,
		totalDescription: string,
		actions: ISuccessActions
	) {
		super(container);

		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);
		this._totalDescription = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);

		this._totalDescription.textContent = totalDescription;

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}
}