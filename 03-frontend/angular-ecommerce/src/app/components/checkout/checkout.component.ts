import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  
  constructor(private formBuilder: FormBuilder,
              private luv2shopFormService: Luv2ShopFormService,
              private cartService: CartService) { }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', 
                  [Validators.required, 
                  Validators.minLength(3), 
                  Luv2ShopValidators.notOnlyWhitespace]),
        lastName: new FormControl('', 
                  [Validators.required, 
                  Validators.minLength(3),
                  Luv2ShopValidators.notOnlyWhitespace]),
        email:new FormControl('', 
                  [Validators.required, 
                  // patron de expresiones regulares para la validacion del correo electronico
                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', 
                [Validators.required, 
                Validators.minLength(2), 
                Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', 
                [Validators.required, 
                Validators.minLength(2), 
                Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', 
                 [Validators.required, 
                 Validators.minLength(2), 
                 Luv2ShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', 
                [Validators.required, 
                Validators.minLength(2), 
                Luv2ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', 
                [Validators.required, 
                Validators.minLength(2), 
                Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', 
                 [Validators.required, 
                 Validators.minLength(2), 
                 Luv2ShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });
  
  const startMonth: number = new Date().getMonth() +1;
  console.log("startMonth: " + startMonth);

  this.luv2shopFormService.getCreditCardMonths(startMonth).subscribe(
    data => {
      console.log("Retrieved credit card months: " + JSON.stringify(data));
      this.creditCardMonths = data;
    }
  );

  this.luv2shopFormService.getCreditCardYears().subscribe(
    data => {
      console.log("Retrieved credit card years: " + JSON.stringify(data));
      this.creditCardYears = data;
    }
  );
  
    this.luv2shopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

  }

  // Mostrar cantidad y total antes de confirmar compra 
  reviewCartDetails() {
    
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    )

  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
 
  get shippingAddressStreet() { return this.checkoutFormGroup.get('customer.shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('customer.shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('customer.shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('customer.shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('customer.shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('customer.billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('customer.billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('customer.billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('customer.billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('customer.billingAddress.country'); }

  copyShippingAddressToBillingAddress(event) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
      .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    
    // Asigno los mismos valores
    this.billingAddressStates = this.shippingAddressStates;

    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    
      this.billingAddressStates = [];
    }
  }

  // envia los datos del cliente del form para la compra
  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
    
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The email adress is" + this.checkoutFormGroup.get('customer').value.email);
    console.log("The shipping address country is" + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping state country is" + this.checkoutFormGroup.get('shippingAddress').value.state.name);
 

  }

  handleMonthsAndYears(){

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() +1;
    }
    else {
      startMonth = 1;
    }

    this.luv2shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string){

    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.luv2shopFormService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName == 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        // Select primer item por default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }
}
