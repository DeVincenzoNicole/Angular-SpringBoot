import { FormControl } from '@angular/forms';

export class Luv2ShopValidators {

    // Validacion de espacios en blanco
    static notOnlyWhitespace(control: FormControl) : ValidationErrors {
        
        if ((control.value != null) && (control.value.trim().length === 0)){

            return {'notOnlyWhitespace': true};
        }
        else {
            return null;
        }
    }
}
