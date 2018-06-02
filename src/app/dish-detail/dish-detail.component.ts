import {DishService} from '../services/dish.service';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Component, OnInit, Inject} from '@angular/core';
import {Dish} from '../shared/dish';
import {visibility, flyInOut, expand } from '../animations/app.animation';


import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comment} from '../shared/comment';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-dish-detail',
    templateUrl: './dish-detail.component.html',
    styleUrls: ['./dish-detail.component.scss'],
    host: {
        '[@flyInOut]': 'true',
        'style': 'display: block;'
    },
    animations: [
        flyInOut(),
        visibility(),
        expand()
    ]
})
export class DishDetailComponent implements OnInit {

    dishIds: number[];
    prev: number;
    next: number;
    dish: Dish;
    dishcopy = null;
    errMess: string;
    comment: Comment;
    visibility = 'shown';

    commentForm: FormGroup;
    formErrors = {
        'author': '',
        'comment': ''
    };
    validationMessages = {
        'author': {
            'required': 'Author Name is required.',
            'minlength': 'Author must be at least 2 characters long.',
            'maxlength': 'Author cannot be more than 25 characters long.'
        },
        'comment': {
            'required': 'Your Comment is required.'
        }
    };

    constructor(private dishService: DishService,
        private route: ActivatedRoute,
        private location: Location, private fb: FormBuilder,
        @Inject('BaseURL') private BaseURL) {}

    ngOnInit() {
        this.createForm();
        this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds)
        this.route.params
            .switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishService.getDish(+params['id']);})
            .subscribe(dish => {this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown';},
                errmess => {this.dish = null; this.errMess = <any> errmess;});
    }

    createForm() {

        this.commentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            rating: '5',
            comment: ['', [Validators.required]]
        });

        this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data))
        this.onValueChanged(); // (re)set validation messages now       
    }

    onSubmit() {
        this.comment = this.commentForm.value;
        this.comment.date = new Date().toISOString();
        console.log(this.comment);
        this.dishcopy.comments.push(this.comment)
        this.dishcopy.save();
        this.commentForm.reset({
            author: '',
            rating: 5,
            comment: ''
        });
    }

    onValueChanged(data?: any) {
        if (!this.commentForm) {return;}
        const form = this.commentForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    setPrevNext(dishId: number) {
        let index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    goBack(): void {
        this.location.back();
    }
}
// ng generate module app-routing --module app.module.ts



//ng generate directive highlight --module app.module.ts

//ng generate directive highlight --module app.module.ts
