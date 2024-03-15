import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private apiUrl = environment.apiUrl + environment.apiKey

  constructor(private http: HttpClient) {}

  getData(endpoint: string = ''): Observable<any> {
    return this.http.get<any>(this.apiUrl + endpoint)
  }

  postData(data: any, endpoint: string = ''): Observable<any> {
    return this.http.post<any>(this.apiUrl + endpoint, data)
  }

  updateData(id: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`
    return this.http.put<any>(url, data)
  }

  deleteData(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<any>(url)
  }
}
