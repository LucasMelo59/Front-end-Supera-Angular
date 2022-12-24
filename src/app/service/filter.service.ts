import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Filter } from "../model/filter";


@Injectable({
  providedIn: 'root'
})

  export class FilterService {

    constructor(private http: HttpClient){}

    apiUrl: string = 'http://localhost:8080/contas/custom'

    filterTable(model: Filter) :Observable<Filter> {
      return this.http.post<Filter>(`${this.apiUrl}`, model);
    }

  }
