import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, map, take } from 'rxjs/operators';
import { CovidItem } from '../../_models/covid-item.model';
import { CovidService } from '../../_services/covid.service';

export interface IFilterByDate {
  code: string;
  country: string;
}

@Component({
  selector: 'filter-by-date',
  templateUrl: './filter-by-date.component.html',
  styleUrls: ['./filter-by-date.component.scss']
})
export class FilterByDateComponent implements OnInit {

  country: string = '';
  code: string | null = '';
  isLoading: boolean = false;

  datePicker = new FormControl('');
  minDate = new Date(2020, 0, 1);

  stats: any = {
    deaths: 0,
    confirmed: 0,
    recovered: 0
  }

  ngOnInit(): void {
    this.country = this.data.country ?? '-';
    this.code = this.data.code ?? null;
  }

  dateChanged() {
    this.isLoading = true;
    const date = new Date(this.datePicker.value).toISOString().split('T')[0];
    this.covidService.getStatusByDateAndCountry(date, this.code).pipe(
      take(1),
      map((e) => {
        if (e) {
          let result = CovidItem.createResult(e[0]);
          this.stats = {
            deaths: result.deaths ?? 0,
            confirmed: result.confirmed ?? 0,
            recovered: result.recovered ?? 0
          }
        }
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }

  constructor(
    public dialogRef: MatDialogRef<FilterByDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFilterByDate,
    private covidService: CovidService
  ) {
    this.dialogRef.disableClose = true;
  }

  close(action: boolean = false): void {
    this.dialogRef.close(action);
  }
}
