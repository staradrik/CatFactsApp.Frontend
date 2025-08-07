import { Component, ViewChild } from '@angular/core';
import { CurrentResultComponent } from './features/current-result/current-result.component';
import { HistoryComponent } from './features/history/history.component';
import {MatTabChangeEvent, MatTabGroup, MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true, 
  imports: [MatTabsModule, CurrentResultComponent, HistoryComponent],
})
export class AppComponent {
  @ViewChild('currentResult') currentResultComponent!: CurrentResultComponent;
  @ViewChild('history') historyComponent!: HistoryComponent;

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.currentResultComponent.reloadFact();
    } else if (event.index === 1) {
      this.historyComponent.loadHistory();
    }
  }
}
