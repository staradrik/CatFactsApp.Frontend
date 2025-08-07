import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { History } from '../../core/models/api.models';
import { CatFactsService } from '../../core/services/cat-facts.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CustomPaginator } from '../../shared/custom-paginator-intl';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: CustomPaginator
    }
  ],
})
export class HistoryComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<History>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loading = false;
  error?: string;

  constructor(private catFactsService: CatFactsService) {}

  ngOnInit() {
    this.loadHistory();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadHistory() {
    this.loading = true;
    this.error = undefined;

    this.catFactsService.getHistory().subscribe({
      next: (data) => {
        this.dataSource.data = data.history;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar historial';
        this.loading = false;
      },
    });
  }
}
