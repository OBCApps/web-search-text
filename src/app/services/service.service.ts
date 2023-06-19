import { Injectable } from '@angular/core';
import { API_ENDPOINT_SEGURIDAD } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private SERVER_WH = API_ENDPOINT_SEGURIDAD;
  constructor(
    private http: HttpClient

  ) { }

  get_prueba() {
    return this.http.get(this.SERVER_WH + '/prueba');
  }
  adjuntar_local() {
    return this.http.get(this.SERVER_WH + '/add-json-local');
  }
  adjuntar_web(data : any) {
    return this.http.post(this.SERVER_WH + '/add-json-web' , data);
  }
  get_local(data : any) {
    return this.http.post(this.SERVER_WH + '/search-local' , data);
  }
  get_web(data : any) {
    return this.http.post(this.SERVER_WH + '/search-web' , data);
  }
}
