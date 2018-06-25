import {Component, OnInit, Inject} from '@angular/core';
import {flyInOut,expand} from '../animations/app.animation';
import {LeaderService} from '../services/leader.service';
import {Params, ActivatedRoute} from '@angular/router';
import {Leader} from '../shared/leader';


@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    host: {
        '[@flyInOut]': 'true',
        'style': 'display: block;'
    },
    animations: [
        flyInOut(),
        expand()
    ]
})
export class AboutComponent implements OnInit {

    leaders: Leader[]
    leaderErrMess: string;

    constructor(private leaderservice: LeaderService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        this.leaderservice.getLeaders()
            .subscribe(leaders => this.leaders = leaders,leaderErrMess => this.leaderErrMess = <any> leaderErrMess);
    }


}

