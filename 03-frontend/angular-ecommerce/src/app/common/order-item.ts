import { CartItem } from './cart-item';

export class OrderItem {
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: number;

    // Lee los datos apropiados del articulo del carrito
    // Y los asigna al pedido
    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.productId = cartItem.id;
    }
}
