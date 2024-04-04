import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss']
})
export class CheckFormComponent {
  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern("^\\+?\\d{1,3}?[-.\\s]?\\(?\\d{1,3}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$")]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Zа-яА-ЯёЁ\s-]+$")]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Zа-яА-ЯёЁ\s-]+$")]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      deliveryMethod: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      giftWrap: [false]
    });
  }
  
  

  getErrorMessage(controlName: string) {
    const control = this.checkoutForm.get(controlName);
    if (!control) {
      return ''; 
    }
  
    if (control.hasError('required')) {
      return 'Это поле обязательно к заполнению';
    } else if (control.hasError('minlength')) {
      return 'Значение слишком короткое';
    } else if (control.hasError('email')) {
      return 'Введите корректный email';
    } else if (control.hasError('pattern')) {
      if (controlName === 'phone') {
        return 'Введите корректный номер телефона';
      } else if (controlName === 'firstName' || controlName === 'lastName') {
        return 'Используйте только буквы, пробелы и дефисы';
      }
    }
  
    return '';
  }
  

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value);
      this.checkoutForm.reset(); 
    }
  }
}
