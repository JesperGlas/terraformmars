import { Component, OnInit } from '@angular/core';

/**
 * The services required by this component.
 */
import { GamestateService } from '../Services/gamestate.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  /**
   * Initilizes the modifier value used in the toolbar.
   */
  modifier_value: number;

  /**
   * Initilizes the services used by this component.
   * @param gameStateService The variable for the GameStateService.
   * @param playersService The variable for the PlayersService.
   */
  constructor(private gameStateService:GamestateService) { }

  /**
   * Gives an initial value to the local modifier_value.
   */
  ngOnInit() {
    this.modifier_value = this.getModifierValue();
  }

  /**
   * This function asks the GameStateService what the current modifier is.
   */
  getModifier(): boolean {
    return this.gameStateService.getModifier();
  }

  /**
   * This function calls the GameStateService to change the modifier.
   */
  toggleModifier(): void {
    this.gameStateService.toggleModifier();
  }

  /**
   * This function asks the GameStateService what the current modifier_value is.
   */
  getModifierValue(): number {
    return this.gameStateService.getModifierValue();
  }

  /**
   * This function modifies the modifier_value and calls the GameStateService to update it's global modifier value.
   */
  toggleModifierValue(): void {
    if(this.modifier_value == 1) {
      this.modifier_value = 5;
    } else {
      this.modifier_value = 1;
    }
    this.gameStateService.updateModifierValue(this.modifier_value);
  }

  /**
   * This function calls the GameStateService to end the current the generation.
   */
  nextGeneration(): void {
    this.gameStateService.nextGeneration();
  }

  /**
   * This function calls the GameStateService to end the current turn.
   */
  nextTurn() {
    this.gameStateService.nextTurn();
  }

}
