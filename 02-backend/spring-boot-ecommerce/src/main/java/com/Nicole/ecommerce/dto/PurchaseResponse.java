package com.Nicole.ecommerce.dto;

// Esta clase envia un objeto Java como JSON

import lombok.Data;

@Data
public class PurchaseResponse {

    private final String orderTrackingNumber;

}
