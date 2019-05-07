import { Component, OnInit } from '@angular/core';

/**
 * This component requires the GameStateService which is imported here.
 */
import { GamestateService } from '../Services/gamestate.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  /**
   * The services used by the component is initiated.
   * @param gameStateService The service which keeps track of the overall state of the game.
   */
  constructor(private gameStateService: GamestateService) { }

  ngOnInit() {
  }

  /**
   * This functions asks the GameStateService which generation it's currently at.
   * @returns The current generation as a number.
   */
  getGeneration(): number {
    return this.gameStateService.getGeneration();
  }

  /**
   * This funtion asks the GameStateService to change the generation based on the active modifiers (See GameStateService).
   */
  changeGeneration(): void {
    this.gameStateService.changeGeneration();
  }

  /**
   * This function asks the GameStateService which turn it's currently at.
   * @returns The current turn as a number.
   */
  getTurn(): number {
    return this.gameStateService.getTurn();
  }

  /**
   * This function asks the GameStateService to change the turn based on the active modifiers (See GameStateService).
   */
  changeTurn(): void {
    this.gameStateService.changeTurn();
  }

  /**
   * This functions asks the GameStateService how many ocean tiles are currently in play.
   * @returns The number of ocean tiles in play.
   */
  getOcean(): number {
    return this.gameStateService.getOcean();
  }

  /**
   * This function asks the GameStateService to change the ocean value based on the modifiers (See GameStateService).
   */
  changeOcean(): void {
    this.gameStateService.changeOcean();
  }

  /**
   * This function asks the GameStateService what the temperature value is currently at.
   * @returns The number of the current temperature value.
   */
  getTemperature(): number {
    return this.gameStateService.getTemperature();
  }

  /**
   * This function asks the GameStateService to change the temperature value based on the modifiers (See GameStateService).
   */
  changeTemperature(): void {
    this.gameStateService.changeTemperature();
  }

  /**
   * This function asks the GameStateService what the oxygen value is currently at.
   * @returns The current oxygen value as a number.
   */
  getOxygen(): number {
    return this.gameStateService.getOxygen();
  }

  /**
   * This function asks the GameStateService to change the oxygen value based on the modifiers (See GameStateService).
   */
  changeOxygen(): void {
    this.gameStateService.changeOxygen();
  }

}
