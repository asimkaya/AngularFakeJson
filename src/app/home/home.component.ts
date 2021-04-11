import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  displayedColumns: string[] = ['firstname', 'lastname', 'gender', 'ip_address', 'action'];
  dataSource: any;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getUsers()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
