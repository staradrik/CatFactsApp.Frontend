import { Component, OnInit } from '@angular/core';
import { CatFactsService } from '../../core/services/cat-facts.service';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-current-result',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatProgressSpinnerModule],
  templateUrl: './current-result.component.html',
  styleUrls: ['./current-result.component.scss']
})
export class CurrentResultComponent implements OnInit {

  loading = false;
loadingGif = false;
errorBoolean = false;
error?: string;
imageGift?: string;
factGift?: string;
queryGift?: string;

  constructor(private catFactsService: CatFactsService) {}

  ngOnInit(): void {
    this.reloadFact();
  }

  reloadFact() {
  this.loading = true;
  this.error = undefined;

  this.catFactsService.getFactWithGif().subscribe({
    next: (response) => {
      if (response.error?.isError) {
        this.error = response.error.message || 'Error desconocido';
        this.errorBoolean = true;
      } else {
        this.imageGift = response.gifUrl;
        this.factGift = response.fact;
        this.queryGift = response.query;
        this.errorBoolean = false;
      }
      this.loading = false;
    },
    error: () => {
      this.error = 'Error al obtener dato con gif';
      this.loading = false;
      this.errorBoolean = true;
    },
  });
}

 refreshGif() {
  if (!this.queryGift) return;

  this.loadingGif = true;
  this.error = undefined;
  this.imageGift = undefined; // Borra la imagen actual para mostrar spinner

  this.catFactsService.getGif(this.queryGift).subscribe({
    next: (response) => {
      if (response.error?.isError) {
        this.error = response.error.message || 'Error desconocido';
      } else {
        this.imageGift = response.gifUrl;
      }
      this.loadingGif = false;
    },
    error: () => {
      this.error = 'Error al refrescar el gif';
      this.loadingGif = false;
    },
  });
}

}