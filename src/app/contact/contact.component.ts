import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Feedback, ContactType} from '../shared/feedback';
import {FeedbackService} from '../services/feedback.service';
import {visibility, flyInOut, expand} from '../animations/app.animation';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [FeedbackService],
    host: {
        '[@flyInOut]': 'true',
        'style': 'display: block;'
    },
    animations: [
        visibility(),
        flyInOut(),
        expand()
    ]
})
export class ContactComponent implements OnInit {

    submitform: boolean;
    //  submitform: boolean;
    feedbackForm: FormGroup;
    feedback: Feedback;
    feedbackCopy = null;
    errMess: string;
    visibility = 'shown';
    showSpinner = false;
    showSubmission = false;


    contactType = ContactType;
    formErrors = {
        'firstname': '',
        'lastname': '',
        'telnum': '',
        'email': ''
    };
    validationMessages = {
        'firstname': {
            'required': 'First Name is required.',
            'minlength': 'First Name must be at least 2 characters long.',
            'maxlength': 'FirstName cannot be more than 25 characters long.'
        },
        'lastname': {
            'required': 'Last Name is required.',
            'minlength': 'Last Name must be at least 2 characters long.',
            'maxlength': 'Last Name cannot be more than 25 characters long.'
        },
        'telnum': {
            'required': 'Tel. number is required.',
            'pattern': 'Tel. number must contain only numbers.'
        },
        'email': {
            'required': 'Email is required.',
            'email': 'Email not in valid format.'
        },
    };


    constructor(private fb: FormBuilder,
        private fbService: FeedbackService,
        @Inject('BaseURL') private BaseURL) {
        this.createForm();
    }

    ngOnInit() {
        /*       
        */
    }

    createForm() {
        this.feedbackForm = this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            telnum: ['', [Validators.required, Validators.pattern]],
            email: ['', [Validators.required, Validators.email]],
            agree: false,
            contacttype: 'No',
            message: ''
        });
        this.feedbackForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }

    onSubmit() {
        this.feedback = this.feedbackForm.value;
        console.log(this.feedback);
        this.feedbackCopy = this.feedback;

        /*
        this.feedbackCopy.firstname = this.feedbackForm.value.firstname;
        this.feedbackCopy.lastname = this.feedbackForm.value.lastname;
        this.feedbackCopy.telnumber = this.feedbackForm.value.telnum;
        this.feedbackCopy.email = this.feedbackForm.value.email;
        this.feedbackCopy.agree = this.feedbackForm.value.agree;
        this.feedbackCopy.contacttype = this.feedbackForm.value.contacttype;
        this.feedbackCopy.message = this.feedbackForm.value.message;
        console.log(this.feedbackCopy);                       
         */

        // save back to the server, and create observable
        // that will give it right back as an restangular obj
        this.visibility = 'hidden';
        this.showSpinner = true;
        this.fbService.submitFeedback(this.feedbackCopy)
            .subscribe(feedback => {
                this.feedback = feedback;
                this.showSpinner = false;
                this.showSubmission = true;
                console.log(this.feedback);
                setTimeout(() => {
                    this.visibility = 'shown';
                    this.showSubmission = false;
                }, 5000);

            });

        this.feedbackForm.reset({
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contacttype: 'No',
            message: ''
        });
    }

onValueChanged(data ?: any) {
    if (!this.feedbackForm) {return;}
    const form = this.feedbackForm;
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

}
