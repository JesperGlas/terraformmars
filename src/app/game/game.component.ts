import { Component, OnInit } from '@angular/core';

/**
 * The GameComponent uses both the PlayersService and the GameStateService,
 * both are imported here.
 */
import { PlayersService } from '../Services/players.service';
import { GamestateService } from '../Services/gamestate.service';
import { HistoryService } from '../Services/history.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  /**
   * The constructor initiates variables for the services used in this component.
   * @param playerService The service for fetching data regarding the players.
   * @param gameStateService The service for fetching data regarding the overall state of the game.
   * @param historyService The service for passing information about the generation.
   */
  constructor(
    private playerService:PlayersService,
    private gameStateService:GamestateService,
    private historyService: HistoryService
  ) { }

  ngOnInit() {
  }

  /**
   * This function asks the gameStateService if the index sent matches the one currently active.
   * @param index The index of the player to check.
   * @returns True if the index-variable matches the index of the active player.
   */
  isActivePlayer(index: number): boolean {
    return index == this.gameStateService.getActivePlayer();
  }

  /**
   * This function asks the PlayersService to return the name of the player at the specified index.
   * @param index The index of the player.
   * @returns The players name as a string.
   */
  getPlayerName(index: number): string {
    return this.playerService.getPlayerName(index);
  }

  /**
   * This function asks the PlayersService and GameStateService to return the active players name..
   * @returns The name of the currently active player.
   */
  getActivePlayerName(): string {
    return this.playerService.getPlayerName( this.gameStateService.getActivePlayer() );
  }

  /**
   * This function asks the GameStateService if the passed index matches that of the current start player.
   * @param index The index to check.
   * @returns True if the index match that of the start player. False otherwise.
   */
  isStartPlayer(index: number): boolean {
    return index == this.gameStateService.getStartPlayer();
  }

  /**
   * This function asks the PlayersService to fetch the players array.
   * @returns An array containing all the players.
   */
  getPlayers(): any[] {
    return this.playerService.getPlayers();
  }

  /**
   * This function asks the GameStateService which modifier (Positive or negative) that is currently toggled.
   * @returns True if positive, false if negative.
   */
  getModifier(): boolean {
    return this.gameStateService.getModifier();
  }

  /**
   * This function asks the GameStateService which value the modifier currently holds.
   * @returns The currently active modifier value.
   */
  getModifierValue(): number {
    return this.gameStateService.getModifierValue();
  }

  /**
   * This function asks the PlayerService to change a resource value from a specified player based on the modifiers currently active.
   * It also uses an event caption that it passes to the HistoryService in order to record the change as an event.
   * @param index The index of the player to change.
   * @param resource The resource that should change. See PlayersService for valid optioins.
   * @param event_caption The correct syntax in the form of a string. Example: Steel reserves or plant production.
   */
  changeResource(index: number, resource: string, event_caption: string): void {
    var change = this.playerService.changeResource(index, resource, this.getModifier(), this.getModifierValue(), false );
    if(change != 0) {
      this.historyService.changeValueEventFor(this.getActivePlayerName(), this.getPlayerName(index), event_caption, change);
    }
  }

  /**
   * The change-functions uses the changeResource-function. They change the resource reserves values.
   * @param index The index of the player being modified.
   */
  changeRating(index: number): void {
    this.changeResource(index, "rating", "rating");
  }

  changeCash(index: number): void {
    this.changeResource(index, "cash", "M€ reserves");
  }

  changeSteel(index: number): void {
    this.changeResource(index, "steel", "steel reserves");
  }

  changeTitanium(index: number): void {
    this.changeResource(index, "titanium", "titanium reserves");
  }

  changePlants(index: number): void {
    this.changeResource(index, "plants", "plants reserves");
  }

  changeEnergy(index: number): void {
    this.changeResource(index, "energy", "energy reserves");
  }

  changeHeat(index): void {
    this.changeResource(index, "heat", "heat reserves");
  }

  /**
   * The ChangeP-functions uses the changeResource-function. They change the players production values.
   * @param index The index of the player being modified.
   */

  changePCash(index: number): void {
    this.changeResource(index, "p_cash", "M€ production");
  }

  changePSteel(index: number): void {
    this.changeResource(index, "p_steel", "steel production");
  }

  changePTitanium(index: number): void {
    this.changeResource(index, "p_titanium", "titanium production");
  }

  changePPlants(index: number): void {
    this.changeResource(index, "p_plants", "plant production");
  }

  changePEnergy(index: number): void {
    this.changeResource(index, "p_energy", "energy production");
  }

  changePHeat(index): void {
    this.changeResource(index, "p_heat", "heat production");
  }

  /**
   * The changeT-functions uses the changeResource-function. They change the player trade values.
   * @param index The index of the player being modified.
   */
  changeTSteel(index): void {
    this.changeResource(index, "t_steel", "marketprice for steel");
  }

  changeTTitanium(index): void {
    this.changeResource(index, "t_titanium", "marketprice for titanium");
  }

  changeTPlants(index): void {
    this.changeResource(index, "t_plants", "plants for a tile");
  }

  changeTHeat(index): void {
    this.changeResource(index, "t_heat", "heat for temperature increase");
  }

  /**
   * The sellSteel function asks the PlayersService to convert steel into cash.
   * @param index The index of the player being modified.
   */
  sellSteel(index: number): void {
    this.playerService.sellSteel(index);
  }

  /**
   * The sellTitanium function asks the PlayersService to convert titanium to cash.
   * @param index The index of the player being modified.
   */
  sellTitanium(index: number): void {
    this.playerService.sellTitanium(index);
  }

  /**
   * The sellPlants function asks the PlayersService to convert plants in to tiles. If the action is successfull
   * it also asks the GameStateService to increase the oxygen value.
   * @param index The index of the player being modified.
   */
  sellPlants(index: number) {
    if( this.playerService.sellPlants(index) ) {
      this.gameStateService.changeOxygen();
    }
  }

  /**
   * The sellHeat functio aks the PlayersService to convert heat to increase temperature. If the action is successfull
   * it also asks the GameStateService to increase the temperature value.
   * @param index 
   */
  sellHeat(index: number) {
    if(this.playerService.sellHeat(index)) {
      this.gameStateService.changeTemperature();
    }
  }

}
