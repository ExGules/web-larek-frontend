import { Api, ApiListResponse } from './base/api';
import { IOrderForm, IOrderResult, IProduct } from '../types/index';

export interface ILarekAPI {
	getProductList: () => Promise<IProduct[]>;
	getProductItem: (id: string) => Promise<IProduct>;
	orderProduct: (order: IOrderForm) => Promise<IOrderResult>;
}

export class LarekAPI extends Api implements ILarekAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}
	
	getProductItem(id: string): Promise<IProduct> {
		return this.get(`/product/${id}`).then((item: IProduct) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}
	
	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}
	
	orderProduct(order: IOrderForm): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}