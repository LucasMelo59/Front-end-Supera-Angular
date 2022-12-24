import { Component, OnInit } from '@angular/core';
import { FilterService } from './service/filter.service';
import { Filter } from './model/filter';
import { FormControl, FormGroup } from '@angular/forms';
import { of, map, catchError } from 'rxjs';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  markerGroup!: FormGroup;
  items: any;
  ngOnInit(): void {
   this.createForm();
   const model: any = {
    nome_operador: null,
    data_inicio: null,
    data_fim: null,
    conta_id: null
  }

   this.service.filterTable(model)
   .pipe(
    catchError(err => {
      throw err
    })
   )
   .subscribe({
    next: (res:Filter) => this.items = res
   })
  }

  constructor(
    private service: FilterService
    ){}

    createForm(){
      this.markerGroup = new FormGroup({
        nome_operador: new FormControl(),
        data_inicio: new FormControl(),
        data_fim: new FormControl(),
        conta_id: new FormControl()
      })
    }

    submit(){
      const formattedDate_inicio = formatDate(this.markerGroup.value.data_inicio,"yyyy-MM-dd HH:mm:ss", "en-us");
      const formattedDate_fim = formatDate(this.markerGroup.value.data_fim,"yyyy-MM-dd HH:mm:ss" , "en-us");


      const model: any = {
        nome_operador: this.markerGroup.value.nome_operador == '' ? null : this.markerGroup.value.nome_operador,
        data_inicio: formattedDate_inicio,
        data_fim: formattedDate_fim,
        conta_id: this.markerGroup.value.conta_id
      }

      this.service.filterTable(model)
      .pipe(
        catchError(err => {
          throw err
        })
       )
      .subscribe(
        {
          next: (res: Filter) => {
            this.items = res;
          }
        }
      )
    }

}
