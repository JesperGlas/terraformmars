import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  /**
   * The player array contains all information about the current players in the game.
   * PLANNED: In future update this array will be stored in a database so that the updates
   * are global for all clients.
   */
  players = [
    {
      "id": 0,
      "name"      : "Linnea",
      "corp"      : "United Nations",
      "rating"    : 20,
      "p_cash"    : 0,
      "cash"      : 40,
      "p_steel"   : 0,
      "steel"     : 0,
      "p_titanium": 0,
      "titanium"  : 0,
      "p_plants"  : 0,
      "plants"    : 0,
      "p_energy"  : 0,
      "energy"    : 0,
      "p_heat"    : 0,
      "heat"      : 0,
      "t_steel"   : 2,
      "t_titanium": 3,
      "t_plants"  : 8,
      "t_heat"    : 8
    },
    {
      "id": 1,
      "name"      : "Jesper",
      "corp"      : "Credicor",
      "rating"    : 20,
      "p_cash"    : 0,
      "cash"      : 57,
      "p_steel"   : 0,
      "steel"     : 0,
      "p_titanium": 0,
      "titanium"  : 0,
      "p_plants"  : 0,
      "plants"    : 0,
      "p_energy"  : 0,
      "energy"    : 0,
      "p_heat"    : 0,
      "heat"      : 0,
      "t_steel"   : 2,
      "t_titanium": 3,
      "t_plants"  : 8,
      "t_heat"    : 8
    },
    {
      "id": 2,
      "name"      : "Axel",
      "corp"      : "Helion",
      "rating"    : 20,
      "p_cash"    : 0,
      "cash"      : 42,
      "p_steel"   : 0,
      "steel"     : 0,
      "p_titanium": 0,
      "titanium"  : 0,
      "p_plants"  : 0,
      "plants"    : 0,
      "p_energy"  : 0,
      "energy"    : 0,
      "p_heat"    : 0,
      "heat"      : 0,
      "t_steel"   : 2,
      "t_titanium": 3,
      "t_plants"  : 8,
      "t_heat"    : 8
    }
  ]

  constructor() { }

  /**
   * This function fetches the player array.
   * @returns The player array.
   */
  getPlayers(): any[] {
    return this.players;
  }

  /**
   * This function fetches the amount of players that are currently in the game.
   * @returns The length of the player array.
   */
  getPlayerAmount(): number {
    return this.players.length;
  }

  /**
   * This function returns a player at the specified index.
   * @param index The index of the player.
   * @returns The player at the specified index.
   */
  getPlayer(index:number): any {
    return this.players[index];
  }

  /**
   * This function returns the name of the player at the specified index.
   * @param index The index of the player.
   * @returns The name of the player at the specified index.
   */
  getPlayerName(index: number): string {
    return this.players[index].name;
  }
  
  /**
   * This function handels the generation update of each players resource values based on their respective
   * production values.
   * !OBS! productionHeat() must be run before productionEnery() since it the later resets its value.
   * @returns A string containing information about the production phase.
   */
  nextGeneration(): string[] {
    var production_array: number[][] = [];
    var sorted_production_array: number[][];
    production_array.push( this.productionCash() );
    production_array.push( this.productionSteel() );
    production_array.push( this.productionTitanium() );
    production_array.push( this.productionPlants() );
    production_array.push( this.productionHeat() );
    production_array.push( this.productionEnergy() );
    console.log(production_array);
    sorted_production_array = this.sortProductionArray(production_array);
    return this.parseProductionArray(sorted_production_array);
  }

  /**
   * Restructures the array from the production-functions into one with each player in focus.
   * @param production_array An array containing the information from the production-functions.
   * @returns An array with arrays containig each players production changes.
   */
  sortProductionArray(production_array: number[][]): number[][] {
    var player_array: number[][] = [];
    for(let i = 0; i < this.getPlayerAmount(); i++) {
      var resource_array: number[] = [];
      for(let n = 0; n < production_array.length; n++) {
        var current_resource_array = production_array[n];
        resource_array.push(current_resource_array[i]);
      }
      player_array.push(resource_array);
    }
    console.log(player_array);
    return player_array;
  }

  /**
   * This functions creates an array of strings detailing each players production-changes.
   * @param sorted_production_array An array for each player containing arrays with their production changes.
   * @returns An array with strings detailing each players production changes.
   */
  parseProductionArray(sorted_production_array: number[][]): string[] {
    var parsed_array = [];
    for(let i = 0; i < sorted_production_array.length; i++) {
      var resource_array = sorted_production_array[i];
      var player_string: string =
        this.getPlayerName(i) + " produced: " +
        resource_array[0] + " M€, " + 
        resource_array[1] + " steel, " +
        resource_array[2] + " titanium, " +
        resource_array[3] + " plants, " +
        resource_array[5] + " energy, " +
        resource_array[4] + " heat " +
        "this generation.";
        parsed_array.push(player_string);
        console.log("Resource array energy: " + resource_array[4] + " lenght: " + resource_array.length);
    }
    return parsed_array;
  }

  /**
   * This function is globally used to change the player values. 
   * @param modifier Determines if the change is positive or negative.
   * @param current_value The current value to be changed.
   * @param modifier_value Determines how much the current value is to be changed with.
   * @param allow_negative Determines if the new value is allowed to be a negative.
   */
  modifyValue(modifier: boolean, current_value: number, modifier_value: number, allow_negative: boolean): number {
    if(modifier) {
      current_value += modifier_value;
    } else if( allow_negative || ( (current_value > 0) && (current_value-modifier_value >= 0) ) ) {
      current_value -= modifier_value;
    }
    return current_value;
  }

  detectChange(old_value: number, new_value: number): boolean {
    return old_value != new_value;
  }

  modifyPrefix(modifier: boolean, value: number): number {
    if(modifier == false) {
      return value * (-1);
    } else {
      return value;
    }
  }

  /**
   * This function fetches a player value based on a specified sesource string.
   * @param index The index of the player.
   * @param resource This variable determines which value the function returns.
   * @returns The value of the resource specified. Default is 0.
   */
  getResourceValue(index: number, resource: string): number {
    switch(resource) {
      case "rating":      return this.players[index].rating;
      case "cash":        return this.players[index].cash;
      case "steel":       return this.players[index].steel;
      case "titanium":    return this.players[index].titanium;
      case "plants":      return this.players[index].plants;
      case "energy":      return this.players[index].energy;
      case "heat":        return this.players[index].heat;
      case "p_cash":      return this.players[index].p_cash;
      case "p_steel":     return this.players[index].p_steel;
      case "p_titanium":  return this.players[index].p_titanium;
      case "p_plants":    return this.players[index].p_plants;
      case "p_energy":    return this.players[index].p_energy;
      case "p_heat":      return this.players[index].p_heat;
      case "t_steel":     return this.players[index].t_steel;
      case "t_titanium":  return this.players[index].t_titanium;
      case "t_plants":    return this.players[index].t_plants;
      case "t_heat":      return this.players[index].t_heat;
      default:            return 0;
    }
  }

  changeResource(index: number, resource: string, modifier: boolean, modifier_value: number, allow_negative): number {
    var current_value = this.getResourceValue(index, resource);
    var new_value = this.modifyValue(modifier, current_value, modifier_value, allow_negative);
    if(this.detectChange( current_value, new_value) ) {
      switch(resource) {
        case "rating":      this.players[index].rating = new_value;     break;
        case "cash":        this.players[index].cash = new_value;       break;
        case "steel":       this.players[index].steel = new_value;      break;
        case "titanium":    this.players[index].titanium = new_value;   break;
        case "plants":      this.players[index].plants = new_value;     break;
        case "energy":      this.players[index].energy = new_value;     break;
        case "heat":        this.players[index].heat = new_value;       break;
        case "p_cash":      this.players[index].p_cash = new_value;     break;
        case "p_steel":     this.players[index].p_steel = new_value;    break;
        case "p_titanium":  this.players[index].p_titanium = new_value; break;
        case "p_plants":    this.players[index].p_plants = new_value;   break;
        case "p_energy":    this.players[index].p_energy = new_value;   break;
        case "p_heat":      this.players[index].p_heat = new_value;     break;
        case "t_steel":     this.players[index].t_steel = new_value;    break;
        case "t_titanium":  this.players[index].t_titanium = new_value; break;
        case "t_plants":    this.players[index].t_plants = new_value;   break;
        case "t_heat":      this.players[index].t_heat = new_value;     break;
        default:            return 0;
      }
      console.log("Changed " + resource + " from " + current_value + " to " + new_value);
      return this.modifyPrefix(modifier, modifier_value);
    }
    return 0;
  }

  /**
   * This generation-functions loops through all players and adds their production values
   * to their respective resource values.
   */

  productionGeneral(resource: string): number[] {
    var modify_array = [];
    var production_string = "p_" + resource;
    for(let i = 0; i < this.getPlayerAmount(); i++) {
      var production_value = this.getResourceValue(i, production_string);
      modify_array.push( this.changeResource(i, resource, true, production_value, false) );
    }
    return modify_array;
  }

  productionCash(): number[] {
    var modify_array = [];
    for(let i = 0; i < this.getPlayerAmount(); i++) {
      var cash_production = this.getResourceValue(i, "p_cash");
      var new_cash = cash_production + this.getResourceValue(i, "rating");
      modify_array.push( this.changeResource(i, "cash", true, new_cash, false) );
    }
    return modify_array;
  }

  productionSteel(): number[] {
    return this.productionGeneral("steel");
  }

  productionTitanium(): number[] {
    return this.productionGeneral("titanium");
  }

  productionPlants(): number[] {
    return this.productionGeneral("plants");
  }

  productionEnergy(): number[] {
    var modify_array = [];
    for(let i = 0; i < this.getPlayerAmount(); i++) {
      var production_value = this.getResourceValue(i, "p_energy");
      this.players[i].energy = production_value;
      modify_array.push(production_value);
    }
    console.log("Production energy: " + production_value);
    return modify_array;
  }

  productionHeat(): number[] {
    var modify_array: number[] = [];
    for(let i = 0; i < this.getPlayerAmount(); i++) {
      var production_value = this.getResourceValue(i, "p_heat");
      var new_heat = this.getResourceValue(i, "energy") + production_value;
      modify_array.push( this.changeResource(i, "heat", true, new_heat, false) );
    }
    return modify_array;
  }

  /**
   * The sell-functions converts certain resource values to other values based on each players
   * respective trade values.
   * @param index The index of the player using the function.
   */
  sellSteel(index: number): boolean {
    var steel = this.players[index].steel;
    if(steel > 0) {
      this.players[index].steel--;
      this.players[index].cash += this.players[index].t_steel;
      return true
    } else {
      return false;
    }
  }

  sellTitanium(index: number): boolean {
    var titanium = this.players[index].titanium;
    if(titanium > 0) {
      this.players[index].titanium--;
      this.players[index].cash += this.players[index].t_titanium;
      return true;
    } else {
      return false;
    }
  }

  sellPlants(index: number): boolean {
    var plants = this.players[index].plants;
    var t_plants = this.players[index].t_plants;
    if(plants >= t_plants) {
      this.players[index].plants -= t_plants;
      return true;
    } else {
      return false;
    }
  }

  sellHeat(index: number): boolean {
    var heat = this.players[index].heat;
    var t_heat = this.players[index].t_heat;
    if(heat >= t_heat) {
      this.players[index].heat -= t_heat;
      return true;
    } else {
      return false;
    }
  }
  
}
