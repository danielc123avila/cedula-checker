import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119';
  private token = '790cfdfb568c8ca697c72f52d8fab5af63ede025'; // 🔒 Considera moverlo a `environment.ts`

  constructor(private http: HttpClient) {}

  getUserByCedula(cedula: string): Observable<any> {
    const url = `${this.baseUrl}/${cedula}`;
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error en la consulta.';
        if (error.status === 404) {
          errorMessage = 'Usuario no encontrado.';
        } else if (error.status === 401) {
          errorMessage = 'Acceso no autorizado.';
        } else {
          errorMessage = `Error: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
