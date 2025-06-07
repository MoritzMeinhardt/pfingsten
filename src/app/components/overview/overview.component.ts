import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {Person} from '../../models/person.model';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {AgGridAngular} from 'ag-grid-angular';
import {toObservable} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  imports: [
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    AgGridAngular,

  ],
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {
  people = signal<Person[]>([]);
  people$ = toObservable(this.people);

  @ViewChild(MatTable) table!: MatTable<Person>;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.people$.pipe(
      map(people => JSON.parse(JSON.stringify(people)) as Person[]),
      map(people => people.sort((a, b) => this.getTotal(b.drinks) - this.getTotal(a.drinks))),
      map(people => {
        people[0].name = `${people[0].name}  🏆`;
        return people;
      }),
    ).subscribe(p => {
      this.people.set(p);
      this.table.renderRows();
    });
  }

  getTotal(drinks: Person['drinks']): number {
    return drinks.beer + drinks.aperol + drinks.wine + drinks.longDrink;
  }
}
