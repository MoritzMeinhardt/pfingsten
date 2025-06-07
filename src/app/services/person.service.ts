import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private people: Person[] = [];
  private selectedPerson = new BehaviorSubject<Person | null>(null);
  private peopleSubject = new BehaviorSubject<Person[]>([]);

  people$ = this.peopleSubject.asObservable();
  selectedPerson$ = this.selectedPerson.asObservable();

  addPerson(name: string) {
    const newPerson: Person = {
      id: Date.now(),
      name,
      drinks: { beer: 0, aperol: 0, wine: 0, longDrink: 0 }
    };
    this.people.push(newPerson);
    this.peopleSubject.next(this.people);
  }

  deletePerson(id: number) {
    this.people = this.people.filter(p => p.id !== id);
    this.peopleSubject.next(this.people);
    if (this.selectedPerson.value?.id === id) {
      this.selectedPerson.next(null);
    }
  }

  selectPerson(id: number) {
    const person = this.people.find(p => p.id === id) || null;
    this.selectedPerson.next(person);
  }

  updatePersonName(id: number, newName: string) {
    const person = this.people.find(p => p.id === id);
    if (person) {
      person.name = newName;
      this.peopleSubject.next(this.people);
    }
  }

  addDrink(type: 'beer' | 'aperol' | 'wine' | 'longDrink') {
    const person = this.selectedPerson.value;
    if (!person) return;

    person.drinks[type]++;
    this.peopleSubject.next(this.people); // notify about the update
    this.selectedPerson.next({ ...person }); // trigger subscriber update
  }

  getTotalDrinks(drinks: Person['drinks']): number {
    return drinks.beer + drinks.aperol + drinks.wine + drinks.longDrink;
  }

}
