import {DishService} from '../services/dish.service';
import {Params, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comment} from '../shared/comment';



import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-dish-detail',
    templateUrl: './dish-detail.component.html',
    styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

    dishIds: number[];
    prev: number;
    next: number;
    dish: Dish;


    commentForm: FormGroup;
    comment: Comment;
    formErrors = {
        'author': '',
        'comment': ''
    };
    validationMessages = {
        'author': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 2 characters long.',
            'maxlength': 'Name cannot be more than 25 characters long.'
        },
        'comment': {
            'required': 'Comment is required.',
            'minlength': 'Comment must be at least 5 characters long.',
            'maxlength': 'Last Name cannot be more than 25 characters long.'
        }
    };


    constructor(private dishservice: DishService, private route: ActivatedRoute,
        private location: Location, private fb: FormBuilder) {}


    ngOnInit() {
        this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
        this.route.params
            .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
            .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id);});
    }


    createForm() {

        this.commentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            rating: '',
            comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
        });

     //   this.commentForm.valueChanges
      //      .subscribe(data => this.onValueChanged(data));

     //   this.onValueChanged(); // (re)set validation messages now       
    }
    
       onSubmit() {
         this.commentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            rating: '',
            comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
        });
    }
    
      /*  onValueChanged(data?: any) {
        if (!this.commentForm) {return;}
        const form = this.comment;
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
    }*/

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



