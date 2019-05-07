import { Component, OnInit } from '@angular/core';

import { GamestateService } from '../Services/gamestate.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor(private gameStateService: GamestateService) { }

  ngOnInit() {
  }

  setupDone() {
    this.gameStateService.setupDone();
  }

}
