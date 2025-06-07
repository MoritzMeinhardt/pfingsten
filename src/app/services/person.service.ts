import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  STORAGE_KEY = 'drink-tracker-persons';

  private people: Person[] = [];
  private selectedPerson = new BehaviorSubject<Person | null>(null);
  private peopleSubject = new BehaviorSubject<Person[]>([]);

  people$ = this.peopleSubject.asObservable();
  selectedPerson$ = this.selectedPerson.asObservable();

  addPerson(name: string) {
    const newPerson: Person = {
      id: Date.now(),
      name,
      drinks: { beer: 0, aperol: 0, wine: 0, longDrink: 0, schnaps: 0 }
    };
    this.people.push(newPerson);
    this.peopleSubject.next(this.people);
    this.persist();
  }

  deletePerson(id: number) {
    this.people = this.people.filter(p => p.id !== id);
    this.peopleSubject.next(this.people);
    if (this.selectedPerson.value?.id === id) {
      this.selectedPerson.next(null);
    }
    this.persist();
  }

  selectPerson(id: number) {
    const person = this.people.find(p => p.id === id) || null;
    this.selectedPerson.next(person);
    this.persist();
  }

  updatePersonName(id: number, newName: string) {
    const person = this.people.find(p => p.id === id);
    if (person) {
      person.name = newName;
      this.peopleSubject.next(this.people);
    }
    this.persist();
  }

  addDrink(type: 'beer' | 'aperol' | 'wine' | 'longDrink' | 'schnaps') {
    const person = this.selectedPerson.value;
    if (!person) return;

    person.drinks[type]++;
    this.peopleSubject.next(this.people); // notify about the update
    this.selectedPerson.next({ ...person }); // trigger subscriber update
    this.persist();
  }

  removeDrink(type: 'beer' | 'aperol' | 'wine' | 'longDrink' | 'schnaps') {
    const person = this.selectedPerson.value;
    if (!person) return;

    // Ensure value doesn't go below 0
    if (person.drinks[type] > 0) {
      person.drinks[type]--;
      this.peopleSubject.next(this.people);
      this.selectedPerson.next({ ...person });
      this.persist(); // If using localStorage
    }
  }

  getTotalDrinks(drinks: Person['drinks']): number {
    return drinks.beer + drinks.aperol + drinks.wine + drinks.longDrink;
  }

  deselectPerson() {
    this.selectedPerson.next(null);
  }

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      this.people = JSON.parse(saved);
      this.peopleSubject.next(this.people);
    }
  }

  private persist() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.people));
  }


}
