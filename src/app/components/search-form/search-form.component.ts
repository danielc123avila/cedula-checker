import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  cedulaForm: FormGroup;
  loading = false;
  userFound: boolean | null = null;
  userData: any = null;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.cedulaForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{6,10}$/)]]
    });
  }

  onSubmit() {
    if (this.cedulaForm.invalid) return;
    const cedula = this.cedulaForm.value.cedula;
    this.loading = true;
    this.userData = null;
    this.userFound = null;
    this.errorMessage = '';

    this.api.getUserByCedula(cedula).subscribe({
      next: (res) => {
        this.loading = false;
        this.userData = res;
        this.userFound = true;
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 404) {
          this.userFound = false;
        } else {
          this.errorMessage = 'Error en la validación. Intenta de nuevo.';
        }
      }
    });
  }
}
