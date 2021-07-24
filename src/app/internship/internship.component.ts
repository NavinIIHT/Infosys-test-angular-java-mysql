import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InternshipService } from './internship.service';

@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit
{
  year : number;
  internshipTypeList : string[]=["S3", "S6", "W3", "W6"];
  successMessage : string;
  errorMessage : string;
  internshipApplicationForm : FormGroup;
  
  constructor(private formBuilder : FormBuilder, private internshipService : InternshipService) { }

  ngOnInit()
  {
    this.year = new Date().getFullYear();

   

    this.internshipApplicationForm = this.formBuilder.group
                                     (
                                      {
                                        internName      : ["", [Validators.required, Validators.pattern("^[A-Z][a-z]{2,}( [A-Z][a-z]*){0,2}$")]],
                                                                       email           : ["", [Validators.required, Validators.email]],
                                      mobileNumber    : ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
                                        internshipType  : ["", [Validators.required]]
                                      }
                                     );

  }

  apply()
  {
    this.successMessage = null;
    this.errorMessage = null;

    this.internshipService.apply(this.internshipApplicationForm.value)
                          .subscribe((response) => {this.successMessage = response.successMessage},
                                     (response) => {this.errorMessage = response.error.message}
                                    );
  }

  
}