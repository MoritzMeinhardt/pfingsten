import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';
import {MatCard} from '@angular/material/card';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

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
    MatCellDef
  ],
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {
  people: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.people$.subscribe(p => this.people = p);
  }

  getTotal(drinks: Person['drinks']): number {
    return drinks.beer + drinks.aperol + drinks.wine + drinks.longDrink;
  }
}
