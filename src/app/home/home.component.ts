import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '@app/models';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  quote: string | undefined;
  isLoading = false;
  displayedColumns: string[] = ['firstname', 'lastname', 'gender', 'ip_address', 'action'];
  dataSource: MatTableDataSource<Users>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private quoteService: QuoteService) {}
  ngAfterViewInit() {}

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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    this.isLoading = true;
    let confirmData = confirm('Veriyi silmek istediğine emin misin?');
    if (confirmData) {
      this.quoteService.deleteUser(id).subscribe((data) => {
        this.quoteService
          .getUsers()
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe((data) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
      });
    }
    this.isLoading = false;
  }
}
