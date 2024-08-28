export interface ICard {
    id: string;
    title: string;
    description: string;
    price: number;
    category: TCategory;
    image: string;
    inBasket: boolean;
  }
  
  export interface IOrder {
    payment: 'online' | 'cash-on-delivery';
    email: string;
    phone: string;
    address: string;
    total: number;
    items: ICard[];
  }
  
  export interface ICardsData {
      cards: ICard[];
    preview: string;
    getCard(cardId: string): ICard;
  }
  
  export interface IBasketData {
    cards: ICard[];
    total: number;
    addCard(card: ICard): void;
      deleteCard(cardId: string): void;
  }
  
  export type TOrderInfo = Pick<ICard, 'title' | 'price'>;
  
  export type TCategory = 'другое'|'софт-скил'|'дополнительное'|'кнопка'|'хард-скил';
  
  export type TPaymentMethod = 'онлайн' | 'при получении'