import { Component, OnInit } from '@angular/core';

import { LeaderService } from '../services/leader.service';
import { Params, ActivatedRoute } from '@angular/router';
import {Leader} from '../shared/leader';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  
  leaders: Leader[]
  
 constructor(private leaderservice: LeaderService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
       this.leaderservice.getLeaders()
        .then(leaders => this.leaders=leaders);    
  }  
}

