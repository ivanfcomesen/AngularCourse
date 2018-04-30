import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {
  
  dish: Dish;
  
 constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.dish = this.dishservice.getDish(id);
  }
  
    goBack(): void {
    this.location.back();
  }  

}
// ng generate module app-routing --module app.module.ts



