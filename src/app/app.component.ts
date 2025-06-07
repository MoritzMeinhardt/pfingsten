import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenavContainer} from '@angular/material/sidenav';
import {PersonListComponent} from './components/person-list/person-list.component';
import {OverviewComponent} from './components/overview/overview.component';
import {PersonDetailComponent} from './components/person-detail/person-detail.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavContainer, PersonListComponent, OverviewComponent, PersonDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'pfingsten';
}
