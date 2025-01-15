import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';

interface ApiError {
  message: string;
  status: number;
  timestamp?: string;
  path?: string;
}
@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  baseUrl: string = environment.baseURL;
  extraUrl: string = '';
  protected token: string | null = null;

  constructor(protected http: HttpClient) {}

  protected buildPath() {
    return this.baseUrl + this.extraUrl;
  }

  newToken(token: any) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
    this.token = token;
  }

  setToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
      }
    }
  }

  clearToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
    this.token = null;
  }

  getHttpOptions() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return { headers };
  }

  protected handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = error.error.message;
    } else {
      // Error del servidor
      if (typeof error.error === 'object' && error.error !== null) {
        // Si el error tiene un formato específico
        errorMessage = error.error.message || 'Ha ocurrido un error desconocido';
      } else {
        // Si el error es un string o tiene otro formato
        errorMessage = error.message || 'Ha ocurrido un error desconocido';
      }
    }
    // Devuelve el error con la estructura original más el mensaje formateado
    return throwError(() => ({
      originalError: error,
      message: errorMessage,
      status: error.status
    }));
  }
  getAll() {
    this.setToken();
    return this.http.get<T[]>(this.buildPath(), this.getHttpOptions()).pipe(catchError(this.handleError));
  }

  getOne(id: any) {
    this.setToken();
    return this.http.get<T>(this.buildPath() + "/" + id, this.getHttpOptions()).pipe(catchError(this.handleError));
  }

  create(item: T) {
    this.setToken();
    return this.http.post<T>(this.buildPath(), item, this.getHttpOptions()).pipe(catchError(this.handleError));
  }

  update(id: any, item: T) {
    this.setToken();
    return this.http.put<T>(this.buildPath() + "/" + id, item, this.getHttpOptions()).pipe(catchError(this.handleError));
  }

  delete(id: any) {
    this.setToken();
    return this.http.delete<T>(this.buildPath() + "/" + id, { ...this.getHttpOptions(), responseType: 'text' as 'json' }).pipe(catchError(this.handleError));
  }
}
