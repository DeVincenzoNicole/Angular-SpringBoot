package com.Nicole.ecommerce.service;

import com.Nicole.ecommerce.dao.CustomerRepository;
import com.Nicole.ecommerce.dto.Purchase;
import com.Nicole.ecommerce.dto.PurchaseResponse;
import com.Nicole.ecommerce.entity.Customer;
import com.Nicole.ecommerce.entity.Order;
import com.Nicole.ecommerce.entity.OrderItem;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        //Recuperar los datos de la compra de dto
        Order order = purchase.getOrder();

        // Genera el número de seguimiento
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // Completa el pedido con los articulos
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // Completa los datos de envio y facturacion
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // Completa al cliente con el pedido
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // Guarda el pedido en la base de datos
        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {

        // Genera un codigo random de seguimiento
        // UUID (Universal Unique Identifer) Método para generar claves únicas

        return UUID.randomUUID().toString();


    }
}
