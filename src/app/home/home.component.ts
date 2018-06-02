import {Component, OnInit, Inject} from '@angular/core';
import {flyInOut, expand} from '../animations/app.animation';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import {PromotionService} from '../services/promotion.service';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    host: {
        '[@flyInOut]': 'true',
        'style': 'display: block;'
    },
    animations: [
        flyInOut(),
        expand()
    ]
})
export class HomeComponent implements OnInit {

    dish: Dish;
    promotion: Promotion;
    leader: Leader;
    dishErrMess: string;
    leaderErrMess: string;
    promotionErrMess: string;

    constructor(private dishService: DishService,
        @Inject('BaseURL') private BaseURL,
        private promotionservice: PromotionService,
        private leaderservice: LeaderService) {}

    ngOnInit() {
        this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, dishErrMess => this.dishErrMess = <any> dishErrMess);
        this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, promotionErrMess => this.promotionErrMess = <any> promotionErrMess);
        this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader, leaderErrMess => this.leaderErrMess = <any> leaderErrMess);
    }


}
