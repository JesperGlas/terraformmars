/**
 * This Service handles the overall gamestate. Such as stats not bound to a specific player.
 */

import { Injectable } from '@angular/core';

import { PlayersService } from './players.service';
import { HistoryService } from './history.service';

@Injectable({
  providedIn: 'root'
})
export class GamestateService {

  /**
   * !PLANNED! The variable to determine if setup is done.
   */
  setup_done = false;

  /**
   * The modifier determines if the toggled resource should be increased or decreased.
   */
  modifier = true;
  modifier_value = 1;

  /**
   * The generation of the game.
   */
  generation = 0;

  /**
   * The player variables.
   * start_player is used to keep track of which player started the current generation.
   * This is increased by one every new generation until there are no more players,
   * it will then reset to 0.
   * active_player is used to keep track of which turn in the generation is currently active.
   * This variable functions much like start_player but changes only each turn.
   */
  start_player = 0;
  active_player = 0;

  /**
   * This variable keeps track of which turn of the generation the game is currently at.
   * It resets every new generation.
   */
  turn = 0;

  /**
   * The resource variables that determines when the game ends.
   * Each variable has a min and max.
   */
  min_oxygen = 0;
  oxygen;
  max_oxygen = 14;

  min_temperature = -30;
  temperature;
  max_temperature = 8;

  min_ocean = 0;
  ocean;
  max_ocean = 9;

  /**
   * The constructor makes initiates a variable for the PlayersService.
   * It also initiates the different resource variables by setting them at there min value.
   * @param playersService is needed in order to know how many players are playing.
   */
  constructor(
    private playersService: PlayersService,
    private historyService: HistoryService
    ) {
    this.oxygen = this.min_oxygen;
    this.temperature = this.min_temperature;
    this.ocean = this.min_ocean;
    this.addHistory(
      "Generation " +
      this.getGeneration() +
      " begins with CEO " +
      this.playersService.getPlayerName( this.getStartPlayer() ) +
      "."
    );
  }

  /**
   * This function updates the modifier value based on the passed value.
   * @param value The value of the new modifier_value.
   */
  updateModifierValue(value: number): void {
    this.modifier_value = value;
  }

  /**
   * A function is used to pass the current modifier_value.
   * @returns The current modifier value as a number.
   */
  getModifierValue(): number {
    return this.modifier_value;
  }

  /**
   * This function asks the HistoryService to add an event to the current generation.
   * @param event The event to be added as a string.
   */
  addHistory(event: string): void {
    this.historyService.addEventToCurrentGeneration(event);
  }

  /**
   * This function advances the generation by 1 and assigns new start and active player..
   * It also handles the convertion of production values to resource values.
   * Lastly it adds the production phase to history and starts the new generations history.
   */
  nextGeneration(): void {
    this.addHistory( "Generation " + this.getGeneration() + " ended after " + this.getTurn() + " turns." );
    this.historyService.addProductionPhase( this.playersService.nextGeneration() );
    this.turn = 0;
    this.nextStartPlayer();
    this.generation++;
    this.historyService.newGeneration(
      "Generation " +
      this.getGeneration() +
      " begins with CEO " +
      this.playersService.getPlayerName( this.getStartPlayer() ) + ".");
  }

  /**
   * This function is used to fetch the generation value.
   * @returns The current generation value as a number.
   */
  getGeneration(): number {
    return this.generation;
  }

  /**
   * This function is used to change the generation value based on the modifier_value. It can only change by 1 step
   * regardless of the modifier_value.
   * @returns The amount it changed. 0 if nothing changed.
   */
  changeGeneration(): number {
    if(this.modifier) {
      this.generation++;
      return 1;
    } else if ( this.generation > 0 ) {
      this.generation--;
      return -1;
    }
    return 0;
  }

  /**
   * This function is used to fetch the start player of the current generation.
   */
  getStartPlayer(): number {
    return this.start_player;
  }

  /**
   * This function advances the start player of each generation. It also resets the active player to match the
   * start player.
   */
  nextStartPlayer(): void {
    var player_amount = this.playersService.getPlayerAmount();
    if(this.start_player >= (player_amount-1) ) {
      this.start_player = 0;
    } else {
      this.start_player++;
    }
    this.active_player = this.start_player;
  }

  /**
   * This function fetches the current active player index.
   */
  getActivePlayer(): number {
    return this.active_player;
  }

  getActivePlayerName(): string {
    return this.playersService.getPlayerName( this.getActivePlayer() );
  }

  /**
   * This function sets the next active player.
   */
  nextActivePlayer(): void {
    var player_amount = this.playersService.getPlayerAmount();
    if(this.active_player >= (player_amount -1) ) {
      this.active_player = 0;
    } else {
      this.active_player++;
    }
  }
  
  /**
   * This function advances a turn by 1.
   */
  nextTurn(): void {
    this.turn++;
    this.nextActivePlayer();
    this.addHistory(
      this.getActivePlayerName() +
      "s turn!"
    );
  }

  /**
   * This function fetches the current turn.
   */
  getTurn(): number {
    return this.turn;
  }

  /**
   * This function changes the turn value based on the modifier. Only able to change 1 step at a time.
   * @returns The amount it changed. 0 if nothing changed.
   */
  changeTurn(): number {
    if(this.modifier) {
      this.turn++;
      return 1;
    } else if( this.turn > 0 ) {
      this.turn--;
      return -1;
    }
    return 0;
  }

  /**
   * This function fetches the current oxygen value.
   */
  getOxygen(): number {
    return this.oxygen;
  }

  /**
   * This function changes the oxygen value based on the modifier. Is only able to change 1 step at a time.
   * @returns The amount it changed. 0 if nothing changed.
   */
  changeOxygen(): number {
    if(this.modifier && this.oxygen < this.max_oxygen) {
      this.oxygen++;
      return 1;
    } else if( !this.modifier && (this.oxygen > this.min_oxygen) ) {
      this.oxygen--;
      return -1;
    }
    return 0;
  }

  /**
   * This function fetches the current temperature value.
   */
  getTemperature(): number {
    return this.temperature;
  }

  /**
   * This function changes the temperature value based on the modifier. Is only able to change 1 step at a time.
   * @returns The amount it changed. 0 if nothing changed.
   */
  changeTemperature(): number {
    if(this.modifier && this.temperature < this.max_temperature) {
      this.temperature++;
      return 1;
    } else if ( !this.modifier && this.temperature > this.min_temperature ) {
      this.temperature--;
      return -1;
    }
    return 0;
  }

  /**
   * This function fetches the current ocean value.
   * @returns The ocean value.
   */
  getOcean(): number {
    return this.ocean;
  }

  /**
   * This function changes the ocean value based on the modifier value. Is on able to change 1 step at a time.
   * @returns The amount it changed. 0 if nothing changed.
   */
  changeOcean(): number {
    if(this.modifier && this.ocean < this.max_ocean) {
      this.ocean++;
      return 1;
    } else if( !this.modifier && this.ocean > this.min_ocean ) {
      this.ocean--;
      return -1;
    }
    return 0;
  }

  /**
   * Calls the PlayersService to change a player value.
   * @param index The index of the player.
   * @param resource The resource to be changed. See PlayersService to see options.
   * @param allow_negatives Determines if the resource is allowed to be negative.
   */
  changeResource(index: number, resource: string, allow_negatives: boolean) {
    this.playersService.changeResource(index, resource, this.getModifier(), this.getModifierValue(), allow_negatives);
  }

  /**
   * This function fetches the current modifier boolean.
   */
  getModifier(): boolean {
    return this.modifier;
  }

  /**
   * This function changes the modifier to it's opposite boolean.
   */
  toggleModifier(): void {
    this.modifier = !this.modifier;
  }

  setupDone() {
    this.setup_done = true;
  }

}
