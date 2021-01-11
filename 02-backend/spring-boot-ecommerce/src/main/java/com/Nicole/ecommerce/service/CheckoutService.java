package com.Nicole.ecommerce.service;

import com.Nicole.ecommerce.dto.Purchase;
import com.Nicole.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
