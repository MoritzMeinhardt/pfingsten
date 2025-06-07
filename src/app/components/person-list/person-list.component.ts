import {Component, OnInit} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {Person} from '../../models/person.model';
import {MatToolbar} from '@angular/material/toolbar';
import {MatList, MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  imports: [
    MatToolbar,
    MatList,
    MatListItem,
    MatIcon,
    MatFormField,
    FormsModule,
    MatButton,
    MatIconButton,
    MatInput,
    MatLabel,
    NgForOf,
  ],
  styleUrls: ['./person-list.component.less']
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];
  newPersonName = '';

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.people$.subscribe(p => this.people = p);
  }

  add() {
    if (this.newPersonName.trim()) {
      this.personService.addPerson(this.newPersonName.trim());
      this.newPersonName = '';
    }
  }

  remove(id: number) {
    this.personService.deletePerson(id);
  }

  select(id: number) {
    this.personService.selectPerson(id);
  }

  edit(person: Person) {
    const newName = prompt('Edit name:', person.name);
    if (newName !== null && newName.trim()) {
      this.personService.updatePersonName(person.id, newName.trim());
    }
  }
}
