import { Component, OnInit } from '@angular/core';

/**
 * The required services for this component.
 */
import { HistoryService } from '../Services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  showHistory = true;
  showProduction = false;

  /**
   * Initilize the services used in this component.
   * @param historyService The variable assigned to the GameStateService.
   */
  constructor(
    private historyService: HistoryService,
    ) { }

  ngOnInit() { 
    this.historyService.addEventToCurrentGeneration("Lets play!");
  }

  /**
   * This function asks the HistoryService to return the current generations history.
   * @returns An array of strings, each element is an event from the current generation.
   */
  getCurrentGenerationHistory(): string[] {
    var index = 0; // First element is always the latest.
    return this.historyService.getGenerationHistory(index);
  }

  /**
   * This function asks the HistoryService to return the previous generations history.
   * @returns An array of strings, each element is an event from the  previous generation.
   */
  getPreviousGenerationHistory(): string[] {
    var index = 1; // Second element.
    return this.historyService.getGenerationHistory(index);
  }

  /**
   * This function asks the HistoryService to remove the last generations history.
   */
  removeLastGeneration(): void {
    this.historyService.removeLastGeneration();
  }

  /**
   * This function asks the HistoryService to return the information about the production phase.
   * @returns An array of strings, each element is one players production for the generation.
   */
  getProductionPhase(): string[] {
    return this.historyService.getProductionPhase();
  }
}
