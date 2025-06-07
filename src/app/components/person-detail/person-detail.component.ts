import {Component, OnInit} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {Person} from '../../models/person.model';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  imports: [
    NgIf,
    MatCard,
    MatButton,
    TitleCasePipe,
    NgForOf,

  ],
  styleUrls: ['./person-detail.component.less']
})
export class PersonDetailComponent implements OnInit {
  selectedPerson: Person | null = null;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.selectedPerson$.subscribe(p => this.selectedPerson = p);
  }

  addDrink(type: 'beer' | 'aperol' | 'wine' | 'longDrink' | 'schnaps') {
    this.personService.addDrink(type);
  }
  removeDrink(type: 'beer' | 'aperol' | 'wine' | 'longDrink' | 'schnaps') {
    this.personService.removeDrink(type);
  }
  deselect() {
    this.personService.deselectPerson();
  }
}
