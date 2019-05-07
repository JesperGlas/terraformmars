import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  /**
   * The array to hold information about the events of the game.
   */
  events = [
    ["Welcome to Terraforming Mars!"]
  ];

  production_phase: string[] = ["You have what you brought from earth"];

  constructor( ) { }

  newGeneration(event: string) {
    this.removeLastGeneration();
    this.events.unshift([]);
    this.addEventToCurrentGeneration(event);
  }

  getGenerationHistory(index: number): string[] {
    return this.events[index];
  }

  addEventToCurrentGeneration(event: string): void {
    var index = 0;
    this.events[index].unshift(event);
  }

  changeValueEvent(active_player: string, resource: string, amount: number) {
    var event = active_player + " changed " + resource + " by ";
    if(amount > 0) {
      event += "+";
    }
    event += amount;
    this.addEventToCurrentGeneration(event);
  }

  changeValueEventFor(active_player: string, affected_player: string, resource: string, amount: number) {
    var event = active_player + " changed " + affected_player + "s " + resource + " by ";
    if(amount > 0) {
      event += "+";
    }
    event += amount;
    this.addEventToCurrentGeneration(event);
  }

  removeLastGeneration() {
    if(this.eventsLength() > 1) {
      this.events.pop();
    }
  }

  eventsLength(): number {
    return this.events.length;
  }

  productionLength(): number {
    return this.production_phase.length;
  }

  addProductionPhase(production_array: string[]) {
    this.production_phase = production_array;
  }

  getProductionPhase() {
    return this.production_phase;
  }
}
