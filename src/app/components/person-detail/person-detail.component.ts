import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';
import {NgIf} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  imports: [
    NgIf,
    MatCard,
    MatButton
  ],
  styleUrls: ['./person-detail.component.less']
})
export class PersonDetailComponent implements OnInit {
  selectedPerson: Person | null = null;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.selectedPerson$.subscribe(p => this.selectedPerson = p);
  }

  addDrink(type: 'beer' | 'aperol' | 'wine' | 'longDrink') {
    this.personService.addDrink(type);
  }
}
