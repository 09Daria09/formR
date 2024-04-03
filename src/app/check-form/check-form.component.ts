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
      phone: ['', [Validators.required, Validators.pattern("^\\+?3?8?(0\\d{9})$")]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required] 
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
      return 'Введите корректный номер телефона';
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
