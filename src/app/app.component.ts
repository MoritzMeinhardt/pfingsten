import {Component} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {PersonListComponent} from './components/person-list/person-list.component';
import {OverviewComponent} from './components/overview/overview.component';
import {PersonDetailComponent} from './components/person-detail/person-detail.component';
import {AgGridModule} from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavContainer,
    PersonListComponent, OverviewComponent, PersonDetailComponent, MatSidenav,
    MatSidenavContent,
    AgGridModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'pfingsten';
}
