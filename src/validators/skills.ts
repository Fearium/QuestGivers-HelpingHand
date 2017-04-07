import { FormControl } from '@angular/forms';
 
export class skillsValidator {
 
    static isValid(control: FormControl): any {
 
        if(isNaN(control.value)){
            return {
                "Not a number.": true
            };
        }
 
        if(control.value % 1 !== 0){
            return {
                "Not a whole number.": true
            };
        }
 
        if(control.value < 0){
            return {
                "Not a positive number.": true
            };
        }
 
        if (control.value > 99){
            return {
                "Too large.": true
            };
        }
 
        return null;
    }
 
}