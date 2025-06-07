export interface Person {
  id: number;
  name: string;
  drinks: {
    beer: number;
    aperol: number;
    wine: number;
    longDrink: number;
    schnaps: number;   // <-- Add this
  };
}
