import { ICardItem, IOrder } from '../../types';
import { Api, ApiListResponse } from '../base/api';

interface IOrderResult {
	id: string;
	total: number;
}

interface IAuctionAPI {
	getCardList: () => Promise<ICardItem[]>;
	getCardItem: (id: string) => Promise<ICardItem>;
	orderCards: (order: IOrder) => Promise<IOrderResult>;
}

export class WebLarekAPI extends Api implements IAuctionAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getCardItem(id: string): Promise<ICardItem> {
		return this.get(`/product/${id}`).then((item: ICardItem) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getCardList(): Promise<ICardItem[]> {
		return this.get('/product').then((data: ApiListResponse<ICardItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderCards(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}