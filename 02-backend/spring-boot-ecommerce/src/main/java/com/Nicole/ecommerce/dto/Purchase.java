package com.Nicole.ecommerce.dto;

import com.Nicole.ecommerce.entity.Address;
import com.Nicole.ecommerce.entity.Customer;
import com.Nicole.ecommerce.entity.Order;
import com.Nicole.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
