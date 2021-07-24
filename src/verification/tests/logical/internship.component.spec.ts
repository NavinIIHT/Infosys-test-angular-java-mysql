import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { InternshipComponent } from 'src/app/internship/internship.component';
import { InternshipService } from 'src/app/internship/internship.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InternshipTypePipe } from 'src/app/internship/internship-type.pipe';

class InternshipServiceStub
{
  apply() { }
}

describe('Logical | Component | InternshipComponent', () =>
{
  let component: InternshipComponent;
  let fixture: ComponentFixture<InternshipComponent>;
  let internshipService: InternshipService;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule
    ({
      imports : [RouterTestingModule, ReactiveFormsModule],
      declarations : [InternshipComponent, InternshipTypePipe],
      providers : [{provide : InternshipService, useClass : InternshipServiceStub}]
    }).compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(InternshipComponent);
    component = fixture.componentInstance;
    internshipService = TestBed.get(InternshipService);
    fixture.detectChanges();
    jasmine.MAX_PRETTY_PRINT_DEPTH = 2;
  });

  it('Verifying the functionality of InternshipComponent | Check wether InternshipComponent is defined', () =>
  {
    expect(component).toBeTruthy();
  });

  // it('1-TSC 2/84 - InternshipComponent: internshipTypeList should be populated', () =>
  // {
  //   component.ngOnInit();

  //   let internshipTypeList = ["S3", "S6", "W3", "W6"];
    
  //   for (let internshipType of internshipTypeList)
  //   {
  //     expect(component.internshipTypeList).toContain(internshipType);
  //   }
  // });

  describe('ngOnInit', () =>
  {
    beforeEach(() =>
    {
      component.ngOnInit();
    });

    it("Verifying the functionality of internshipApplicationForm | Check wether internshipApplicationForm is defined", () =>
    {
      expect(component.internshipApplicationForm).toBeDefined();
    });


    /* ---------------------- Form Field 1 : internName ------------------------ */

    describe('internName', () =>
    {
      let errors;
      let internName: AbstractControl;
      let internNameErrorSpan;

      beforeEach(() =>
      {
        internName = component.internshipApplicationForm.controls['internName'];
        internName.setValue('');
        errors = internName.errors;
        fixture.detectChanges();
        internNameErrorSpan = fixture.debugElement.query(By.css('#internNameError'));
      });

      it('Verifying the functionality of internshipApplicationForm | internName should be invalid if it is empty', () =>
      {
        expect(internName.valid).toBeFalsy();
      });

      it('Verifying the functionality of internshipApplicationForm | internName should contain required error if it is empty', () =>
      {
        expect(errors['required']).toBeTruthy();
      });

      it('Verifying the functionality of internshipApplicationForm | internNameError should not be displayed initially', () =>
      {
        expect(internNameErrorSpan).toBeFalsy();
      });
    });

    describe('Valid', () =>
    {
      let errors;
      let internName;
      let internNameErrorSpan;

      beforeEach(() =>
      {
        internName = component.internshipApplicationForm.controls['internName'];
        internName.setValue("Diksha Kushwah");
        internName.markAsDirty();
        errors = internName.errors;
        fixture.detectChanges();
        internNameErrorSpan = fixture.debugElement.query(By.css('#internNameError'));
      });

      it('Verifying the functionality of internshipApplicationForm | internName should be valid  | Diksha Kushwah', () =>
      {
        expect(internName.valid).toBeTruthy();
      });

      it('Verifying the functionality of internshipApplicationForm | interName should not contain error | Diksha Kushwah', () =>
      {
        expect(errors).toBeFalsy();
      });

      it('Verifying the functionality of internshipApplicationForm | internNameError should not be displayed initially', () =>
      {
        expect(internNameErrorSpan).toBeFalsy();
      })
    });

    describe('Invalid', () =>
    {
      let errors;
      let internName;
      let internNameErrorSpan;

      beforeEach(() =>
      {
        internName = component.internshipApplicationForm.controls['internName'];
        internName.setValue("Akankasha sharma");
        internName.markAsDirty();
        errors = internName.errors;
        fixture.detectChanges();
        internNameErrorSpan = fixture.debugElement.query(By.css('#internNameError'));
      });

      it('Verifying the functionality of internshipApplicationForm | internName should be invalid | Akankasha sharma', () =>
      {
        expect(internName.invalid).toBeTruthy();
      });

      it('Verifying the functionality of internshipApplicationForm | internNamePattern should be invalid | Akankasha sharma', () =>
      {
        expect(errors['pattern']).toBeTruthy();
      });

      it('Verifying the functionality of internshipApplicationForm |internNameError should be displayed| Akankasha sharma', () =>
      {
        expect(internNameErrorSpan).toBeTruthy();
      });
    });


  
    /* ---------------------- Form Field 3 : email ------------------------ */

    describe('email', () =>
    {
      let errors;
      let email: AbstractControl;
      let emailErrorSpan;

      beforeEach(() =>
      {
        email = component.internshipApplicationForm.controls['email'];
        email.setValue('');
        errors = email.errors;
        fixture.detectChanges();
        emailErrorSpan = fixture.debugElement.query(By.css('#emailError'));
      });

      it('Verifying the functionality of internshipApplicationForm | email should be invalid if it is empty', () =>
      {
        expect(email.valid).toBeFalsy();
      });

      it('Verifying the functionality of internshipApplicationForm | email should contain required error if it is empty', () =>
      {
        expect(errors['required']).toBeTruthy();
      });

      it('Verifying the functionality of internshipApplicationForm | emailError should not be displayed initially', () =>
      {
        expect(emailErrorSpan).toBeFalsy();
      });
    });

    describe('Valid', () =>
    {
      let errors;
      let email: AbstractControl;
      let emailErrorSpan;

      beforeEach(() =>
      {
        email = component.internshipApplicationForm.controls['email'];
        email.setValue('prithvi@yahoo');
        email.markAsDirty();
        errors = email.errors;
        fixture.detectChanges();
        emailErrorSpan = fixture.debugElement.query(By.css('#emailError'));
      });

      it('Verifying the functionality of intershipApplicationForm | Expecting email to be valid for prithvi@yahoo', () =>
      {
        expect(email.valid).toBeTruthy();
      });

      it('Verifying the functionality of intershipApplicationForm | Expecting email to not contain required error when it is valid', () =>
      {
        expect(errors).toBeFalsy();
      });

      it('Verifying the functionality of intershipApplicationForm | Expecting emailError to be not displayed when valid', () =>
      {
        expect(emailErrorSpan).toBeFalsy();
      });
    });

    describe('Invalid', () =>
    {
      let errors;
      let email: AbstractControl;
      let emailErrorSpan;

      beforeEach(() =>
      {
        email = component.internshipApplicationForm.controls['email'];
        email.setValue('raja*hotmail');
        email.markAsDirty();
        errors = email.errors;
        fixture.detectChanges();
        emailErrorSpan = fixture.debugElement.query(By.css('#emailError'));
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting email to be invalid for 'raja*hotmail'", () =>
      {
        expect(email.valid).toBeFalsy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting email to contain 'required' error when it is invalid", () =>
      {
        expect(errors['email']).toBeTruthy();
      });

      it('Verifying the functionality of internshipApplicationForm | Expecting emailError to be displayed when invalid', () =>
      {
        expect(emailErrorSpan).toBeTruthy();
      });
    });
    

    /* ---------------------- Form Field 4 : mobileNumber ------------------------ */

    describe('mobileNumber', () =>
    {
      let errors;
      let mobileNumber: AbstractControl;
      let mobileNumberErrorSpan;

      beforeEach(() =>
      {
        mobileNumber = component.internshipApplicationForm.controls['mobileNumber'];
        mobileNumber.setValue('');
        errors = mobileNumber.errors;
        fixture.detectChanges();
        mobileNumberErrorSpan = fixture.debugElement.query(By.css('#mobileNumberError'));
      });

      it('Verifying the functionality of internshipApplicationForm | Expecting mobileNumber to be invalid when it is empty', () =>
      {
        expect(mobileNumber.valid).toBeFalsy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting mobileNumber to contain 'required' error when it is empty", () =>
      {
        expect(errors['required']).toBeTruthy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting mobileNumberError to be not displayed initially", () =>
      {
        expect(mobileNumberErrorSpan).toBeFalsy();
      });
    });

    describe('Valid', () =>
    {
      let errors;
      let mobileNumber: AbstractControl;
      let mobileNumberErrorSpan;

      beforeEach(() =>
      {
        mobileNumber = component.internshipApplicationForm.controls['mobileNumber'];
        mobileNumber.setValue('8568593343');
        mobileNumber.markAsDirty();
        errors = mobileNumber.errors;
        fixture.detectChanges();
        mobileNumberErrorSpan = fixture.debugElement.query(By.css('#mobileNumberError'));
      });

      it('Verifying the functionality of internshipApplicationForm | Expecting mobileNumber to be valid for 8568593343', () =>
      {
        expect(mobileNumber.valid).toBeTruthy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting mobileNumber to not contain 'required' error when it is valid", () =>
      {
        expect(errors).toBeFalsy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting mobileNumberError to be not displayed when valid", () =>
      {
        expect(mobileNumberErrorSpan).toBeFalsy();
      });
    });

    describe('Invalid', () =>
    {
      let errors;
      let mobileNumber: AbstractControl;
      let mobileNumberErrorSpan;

      beforeEach(() =>
      {
        mobileNumber = component.internshipApplicationForm.controls['mobileNumber'];
        mobileNumber.setValue('98568778');
        mobileNumber.markAsDirty();
        errors = mobileNumber.errors;
        fixture.detectChanges();
        mobileNumberErrorSpan = fixture.debugElement.query(By.css('#mobileNumberError'));
      });

      it('Verifying the functionality of internshipApplicationForm | Expecting mobileNumber to be invalid for 98568778', () =>
      {
        expect(mobileNumber.valid).toBeFalsy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting mobileNumber to contain 'required' error when it is invalid", () =>
      {
        expect(errors).toBeTruthy();
      });

      it('Verifying the functionality of internshipApplicationForm | Expecting mobileNumberError to be displayed when invalid', () =>
      {
        expect(mobileNumberErrorSpan).toBeTruthy();
      });
    });


    /* ---------------------- Form Field 5 : internshipType ------------------------ */

    describe('internshipType', () =>
    {
      let errors;
      let internshipType: AbstractControl;
      let internshipTypeErrorSpan;

      beforeEach(() =>
      {
        internshipType = component.internshipApplicationForm.controls['internshipType'];
        internshipType.setValue('');
        errors = internshipType.errors;
        fixture.detectChanges();
        internshipTypeErrorSpan = fixture.debugElement.query(By.css('#internshipTypeError'));
      });

      it('Verifying the functionality of internshipApplicationForm | Expecting internshipType to be invalid when it is empty', () =>
      {
        expect(internshipType.valid).toBeFalsy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting internshipType to contain 'required' error when it is empty", () =>
      {
        expect(errors['required']).toBeTruthy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting internshipTypeError to be not displayed initially", () =>
      {
        expect(internshipTypeErrorSpan).toBeFalsy();
      });
    });

    describe('Valid', () =>
    {
      let errors;
      let internshipType: AbstractControl;
      let internshipTypeErrorSpan;

      beforeEach(() =>
      {
        internshipType = component.internshipApplicationForm.controls['internshipType'];
        internshipType.setValue('W3');
        internshipType.markAsDirty();
        errors = internshipType.errors;
        fixture.detectChanges();
        internshipTypeErrorSpan = fixture.debugElement.query(By.css('#internshipTypeError'));
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting internshipType to be valid for 'W3'", () =>
      {
        expect(internshipType.valid).toBeTruthy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting internshipType to not contain 'required' error when it is valid", () =>
      {
        expect(errors).toBeFalsy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting internshipTypeError to be not displayed when valid", () =>
      {
        expect(internshipTypeErrorSpan).toBeFalsy();
      });
    });

    describe('Invalid', () =>
    {
      let errors;
      let internshipType: AbstractControl;
      let internshipTypeErrorSpan;

      beforeEach(() =>
      {
        internshipType = component.internshipApplicationForm.controls['internshipType'];
        internshipType.setValue('');
        internshipType.markAsDirty();
        errors = internshipType.errors;
        fixture.detectChanges();
        internshipTypeErrorSpan = fixture.debugElement.query(By.css('#internshipTypeError'));
      });

      it("Verifying the functionality of internshipType | Expecting internshipType to be invalid for ''", () =>
      {
        expect(internshipType.valid).toBeFalsy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting internshipType to contain 'required' error when it is invalid", () =>
      {
        expect(errors['required']).toBeTruthy();
      });

      it("Verifying the functionality of internshipApplicationForm | Expecting internshipTypeError to be displayed when invalid", () =>
      {
        expect(internshipTypeErrorSpan).toBeTruthy();
      });
    });
  });

  /* ---------------------- Submit applyButton : Apply ------------------------ */

  describe('internshipApplicationForm |Apply button| Invalid', () =>
  {
    let applyButton;

    beforeEach(() =>
    {
      component.internshipApplicationForm.controls['internName'].setValue("prashi sachan");
     // component.internshipApplicationForm.controls['gender'].setValue('M');
      component.internshipApplicationForm.controls['email'].setValue('prashi_s^gmail.com');
      component.internshipApplicationForm.controls['mobileNumber'].setValue('9089876');
      component.internshipApplicationForm.controls['internshipType'].setValue('S3');

      component.internshipApplicationForm.markAsDirty();

      fixture.detectChanges();

      applyButton = fixture.debugElement.query(By.css('button')).nativeElement;
    });

    it('Verifying the functionality of internshipApplicationForm | Form should be invalid', () =>
    {
      expect(component.internshipApplicationForm.invalid).toBe(true);
    });

    it('Verifying the functionality of internshipApplicationForm | Submit apply should be disabled', () =>
    {
      expect(applyButton.disabled).toBe(true);
    });
  });

  describe('internshipApplicationForm |Apply button| Valid', () =>
  {
    let applyButton;

    beforeEach(() =>
    {
      component.internshipApplicationForm.controls['internName'].setValue("Hema Morusu");
     
     
     // component.internshipApplicationForm.controls['gender'].setValue('F');
      component.internshipApplicationForm.controls['email'].setValue('hema_morusu@gmail.com');
      component.internshipApplicationForm.controls['mobileNumber'].setValue('6910190374');
      component.internshipApplicationForm.controls['internshipType'].setValue('W6');

      component.internshipApplicationForm.markAsDirty();

      fixture.detectChanges();

      applyButton = fixture.debugElement.query(By.css('button')).nativeElement;
    });

    it('Verifying the functionality of internshipApplicationForm | Form should be valid', () =>
    {
      expect(component.internshipApplicationForm.valid).toBe(true);
    });

    it('Verifying the functionality of internshipApplicationForm | apply should be enabled', () =>
    {
      expect(applyButton.disabled).toBe(false);
    });

    it('Verifying the functionality of internshipApplicationForm | apply function should be called on apply', () =>
    {
      const spy = spyOn(component, 'apply').and.returnValue(null);
      applyButton.click();
      expect(spy).toHaveBeenCalled();
    });
  });

  /* ---------------------- Form Fields : Binding ------------------------ */

  describe('Testing the binding of form fields', () =>
  {
    let internshipApplicationFormTag: DebugElement;
    let internNameInputTag: DebugElement;
  //  let genderInputTag: DebugElement[];
    let emailInputTag: DebugElement;
    let mobileNumberInputTag: DebugElement;
    let internshipTypeInputTag: DebugElement;

    beforeEach(() =>
    {
      internshipApplicationFormTag = fixture.debugElement.query(By.css('form'));
      internNameInputTag = fixture.debugElement.query(By.css('#internName'));
     
     
     // genderInputTag = fixture.debugElement.queryAll(By.css("input[type='radio']"));
      emailInputTag = fixture.debugElement.query(By.css('#email'));
      mobileNumberInputTag = fixture.debugElement.query(By.css('#mobileNumber'));
      internshipTypeInputTag = fixture.debugElement.query(By.css('#internshipType'));

    });

    it('0.5-TSC 51/84 - Testing the binding of formGroup to form tag', () =>
    {
      expect(internshipApplicationFormTag.attributes['ng-reflect-form']).toBeTruthy();
    });

    it('0.25-TSC 52/84 - Testing formControlName binding for internName', () =>
    {
      expect(internNameInputTag.attributes['formControlName']).toBe('internName');
    });

    // it('0.25-TSC 53/84 - Testing formControlName binding for gender', () =>
    // {
    //   let genderCount = 0;

    //   for (let element of genderInputTag)
    //   {
    //     if (element.attributes['formControlName'] == 'gender')
    //     {
    //       genderCount++;
    //     }
    //   }

    //   expect(genderCount).toBe(3);
    // });

    it('0.25-TSC 54/84 - Testing formControlName binding for email', () =>
    {
      expect(emailInputTag.attributes['formControlName']).toBe('email');
    });

    it('0.25-TSC 55/84 - Testing formControlName binding for mobileNumber', () =>
    {
      expect(mobileNumberInputTag.attributes['formControlName']).toBe('mobileNumber');
    });

    it('0.25-TSC 56/84 - Testing formControlName binding for internshipType', () =>
    {
      expect(internshipTypeInputTag.attributes['formControlName']).toBe('internshipType');
    });
  });

  /* ---------------------- Component : apply() ------------------------ */

  describe("apply", () =>
  {
    let fakeSuccessResponseObject;
    let fakeErrorResponseObject;

    beforeEach(() =>
    {
      fakeSuccessResponseObject =
      {
        successMessage : "Welcome!"
      };

      fakeErrorResponseObject = new HttpErrorResponse
                                ({
                                  error :
                                  {
                                    message : "Sorry!"
                                  }
                                });
      
      component.internshipApplicationForm.controls['internName'].setValue("Saki Moni");
     // component.internshipApplicationForm.controls['gender'].setValue('F');
      component.internshipApplicationForm.controls['email'].setValue('sakimoni@hotmail.co.in');
      component.internshipApplicationForm.controls['mobileNumber'].setValue('9110918237');
      component.internshipApplicationForm.controls['internshipType'].setValue('W3');

      fixture.detectChanges();
    })

    it("Verifying the functionality of internshipApplicationForm | Expecting InternshipComponent.apply() to call InternshipService.apply()", () =>
    {
      const spy = spyOn(internshipService, "apply").and.returnValue(of(fakeSuccessResponseObject));
      component.apply();
      expect(spy).toHaveBeenCalled();
    })

    it("Verifying the functionality of internshipApplicationForm | Expecting InternshipComponent.apply() to call InternshipService.apply() with accurate data", () =>
    {
      const spy = spyOn(internshipService, "apply").and.returnValue(of(fakeSuccessResponseObject));
      component.apply();
      expect(spy).toHaveBeenCalledWith(component.internshipApplicationForm.value);
    })



    it("Verifying the functionality of internshipApplicationForm | Expecting successMessage to be populated on positive response", fakeAsync(() =>
    {
      spyOn(internshipService, "apply").and.returnValue(of(fakeSuccessResponseObject));
      component.apply();
      tick();
      expect(component.successMessage).toEqual("Welcome!");
    }))

    it("Verifying the functionality of internshipApplicationForm | Expecting errorMessage to be populated on negative response", fakeAsync(() =>
    {
      spyOn(internshipService, "apply").and.returnValue(throwError(fakeErrorResponseObject));
      component.apply();
      tick();
      expect(component.errorMessage).toEqual("Sorry!");
    }));
  });

  /* ---------------------- Static Population : gender ------------------------ */

  // describe("Testing the statically populated gender radio", () =>
  // {
  //   let genderRadio : DebugElement[];

  //   beforeEach(() =>
  //   {
  //     fixture.detectChanges();
  //     genderRadio = fixture.debugElement.queryAll(By.css("input[type='radio']"));
  //   })

  //   it("1-TSC 62/84 - Testing the values of gender radio", () =>
  //   {
  //     let genderCount = 0;

  //     for (let element of genderRadio)
  //     {
  //       if (element.nativeElement.value == 'M' || element.nativeElement['ng-reflect-value'] == 'M')
  //       {
  //         genderCount++;
  //       }

  //       if (element.nativeElement.value == 'F' || element.nativeElement['ng-reflect-value'] == 'F')
  //       {
  //         genderCount++;
  //       }

  //       if (element.nativeElement.value == 'O' || element.nativeElement['ng-reflect-value'] == 'O')
  //       {
  //         genderCount++;
  //       }
  //     }

  //     expect(genderCount).toBe(3);
  //   });
  // });

  /* ---------------------- Dynamic Population : internshipType ------------------------ */

  describe("Testing the dynamically populated internshipType drop down", () =>
  {
    let internshipTypeDropDown : DebugElement;
    let internshipTypeOptions : DebugElement[];

    beforeEach(() =>
    {
      fixture.detectChanges();
      internshipTypeDropDown = fixture.debugElement.query(By.css("select"));
      internshipTypeOptions = internshipTypeDropDown.children;
    })

    it("0.25-TSC 63/84 - Testing the presence of default value", () =>
    {
      let defaultValueCount = 0;

      for (let element of internshipTypeOptions)
      {
        if (element.nativeElement.value == '' || element.nativeElement['ng-reflect-value'] == '')
        {
          if (element.nativeElement.innerHTML.toLowerCase().replace(/ /gi, '') == 'chooseaninternshiptype')
          {
            defaultValueCount++;
          }
        }
      }

      expect(defaultValueCount).toBe(1);
    });

    it("1-TSC 64/84 - Testing the values of internshipType drop down", () =>
    {
      let internshipTypeCount = 0;

      for (let element of internshipTypeOptions)
      {
        if (element.nativeElement.value == 'S3' || element.nativeElement['ng-reflect-value'] == 'S3')
        {
          internshipTypeCount++;
        }

        if (element.nativeElement.value == 'S6' || element.nativeElement['ng-reflect-value'] == 'S6')
        {
          internshipTypeCount++;
        }

        if (element.nativeElement.value == 'W3' || element.nativeElement['ng-reflect-value'] == 'W3')
        {
          internshipTypeCount++;
        }

        if (element.nativeElement.value == 'W6' || element.nativeElement['ng-reflect-value'] == 'W6')
        {
          internshipTypeCount++;
        }
      }

      expect(internshipTypeCount).toBe(4);
    });
  });

  /* ---------------------- Usage of appropriate Bootstrap classes ------------------------ */

  // describe("Testing whether appropriate bootstrap classes are used", () =>
  // {
  //   let internshipApplicationFormTag: DebugElement;
  //   let internNameInputTag: DebugElement;
  //  // let genderInputTag: DebugElement[];
  //   let emailInputTag: DebugElement;
  //   let mobileNumberInputTag: DebugElement;
  //   let internshipTypeInputTag: DebugElement;

  //   let internNameErrorTag: DebugElement;
  //   let emailErrorTag: DebugElement;
  //   let mobileNumberErrorTag: DebugElement;
  //   let internshipTypeErrorTag: DebugElement;

  //   let applyButtonTag: DebugElement;

  //   beforeEach(() =>
  //   {
  //     component.internshipApplicationForm.controls['internName'].setValue(null);
  //    // component.internshipApplicationForm.controls['gender'].setValue(null);
  //     component.internshipApplicationForm.controls['email'].setValue(null);
  //     component.internshipApplicationForm.controls['mobileNumber'].setValue(null);
  //     component.internshipApplicationForm.controls['internshipType'].setValue(null);

  //     component.internshipApplicationForm.controls['internName'].markAsDirty();
  //    // component.internshipApplicationForm.controls['gender'].markAsDirty();
  //     component.internshipApplicationForm.controls['email'].markAsDirty();
  //     component.internshipApplicationForm.controls['mobileNumber'].markAsDirty();
  //     component.internshipApplicationForm.controls['internshipType'].markAsDirty();

  //     fixture.detectChanges();

  //     internshipApplicationFormTag = fixture.debugElement.query(By.css('form'));
  //     internNameInputTag = fixture.debugElement.query(By.css("input[type='text']"));
  //    // genderInputTag = fixture.debugElement.queryAll(By.css("input[type='radio']"));
  //     emailInputTag = fixture.debugElement.query(By.css('#email'));
  //     mobileNumberInputTag = fixture.debugElement.query(By.css('#mobileNumber'));
  //     internshipTypeInputTag = fixture.debugElement.query(By.css('#internshipType'));

  //     internNameErrorTag = fixture.debugElement.query(By.css('#internNameError'));
  //     emailErrorTag = fixture.debugElement.query(By.css('#emailError'));
  //     mobileNumberErrorTag = fixture.debugElement.query(By.css('#mobileNumberError'));
  //     internshipTypeErrorTag = fixture.debugElement.query(By.css('#internshipTypeError'));

  //     applyButtonTag = fixture.debugElement.query(By.css('button'));
  //   });

  //   it("0.2-TSC 65/84 - Usage of form class", () =>
  //   {
  //     expect(internshipApplicationFormTag.attributes['class']).toContain('form');
  //   });

  //   it("0.2-TSC 66/84 - Usage of form-control class in internNameInputTag", () =>
  //   {
  //     expect(internNameInputTag.attributes['class']).toContain('form-control');
  //   });

  //   it("0.2-TSC 67/84 - Usage of form-group class around internNameInputTag", () =>
  //   {
  //     expect(internNameInputTag.parent.attributes['class']).toContain('form-group');
  //   });

  //   // it("0.2-TSC 68/84 - Usage of form-check-input class in genderInputTag", () =>
  //   // {
  //   //   for (let genderElement of genderInputTag)
  //   //   {
  //   //     expect(genderElement.attributes['class']).toBe('form-check-input');
  //   //   }
  //   // });

  //   // it("0.1-TSC 69/84 - Usage of form-check-label class around genderInputTag", () =>
  //   // {
  //   //   for (let genderElement of genderInputTag)
  //   //   {
  //   //     expect(genderElement.parent.attributes['class']).toBe('form-check-label');
  //   //   }
  //   // });

  //   // it("0.1-TSC 70/84 - Usage of form-check class around genderInputTag", () =>
  //   // {
  //   //   for (let genderElement of genderInputTag)
  //   //   {
  //   //     expect(genderElement.parent.parent.attributes['class']).toContain('form-check');
  //   //   }
  //   // });

  //   // it("0.2-TSC 71/84 - Usage of form-check-inline class around genderInputTag", () =>
  //   // {
  //   //   for (let genderElement of genderInputTag)
  //   //   {
  //   //     expect(genderElement.parent.parent.attributes['class']).toContain('form-check-inline');
  //   //   }
  //   // });

  //   it("0.2-TSC 72/84 - Usage of form-control class in emailInputTag", () =>
  //   {
  //     expect(emailInputTag.attributes['class']).toContain('form-control');
  //   });

  //   it("0.2-TSC 73/84 - Usage of form-group class around emailInputTag", () =>
  //   {
  //     expect(emailInputTag.parent.attributes['class']).toBe('form-group');
  //   });

  //   it("0.2-TSC 74/84 - Usage of form-control class in mobileNumberInputTag", () =>
  //   {
  //     expect(mobileNumberInputTag.attributes['class']).toContain('form-control');
  //   });

  //   it("0.2-TSC 75/84 - Usage of form-group class around mobileNumberInputTag", () =>
  //   {
  //     expect(mobileNumberInputTag.parent.attributes['class']).toBe('form-group');
  //   });

  //   it("0.2-TSC 76/84 - Usage of form-control class in internshipTypeInputTag", () =>
  //   {
  //     expect(internshipTypeInputTag.attributes['class']).toContain('form-control');
  //   });

  //   it("0.2-TSC 77/84 - Usage of form-group class around internshipTypeInputTag", () =>
  //   {
  //     expect(internshipTypeInputTag.parent.attributes['class']).toBe('form-group');
  //   });

  //   it("0.5-TSC 78/84 - Usage of btn classes in applyButton", () =>
  //   {
  //     expect(applyButtonTag.attributes['class']).toContain('btn');
  //   });

  //   it("0.5-TSC 79/84 - Usage of text-danger class in internNameErrorTag", () =>
  //   {
  //     expect(internNameErrorTag.attributes['class']).toBe('text-danger');
  //   });

  //   it("0.5-TSC 80/84 - Usage of text-danger class in emailErrorTag", () =>
  //   {
  //     expect(emailErrorTag.attributes['class']).toBe('text-danger');
  //   });

  //   it("0.5-TSC 81/84 - Usage of text-danger class in mobileNumberErrorTag", () =>
  //   {
  //     expect(mobileNumberErrorTag.attributes['class']).toBe('text-danger');
  //   });

  //   it("0.5-TSC 82/84 - Usage of text-danger class in internshipTypeErrorTag", () =>
  //   {
  //     expect(internshipTypeErrorTag.attributes['class']).toBe('text-danger');
  //   });
  // })

  /* ---------------------- Display of success and error messages ------------------------ */

  describe('internshipApplicationForm | Success and Error Messages', () =>
  {

    let successMessageTag : DebugElement;
    let errorMessageTag: DebugElement;

    it('Verifying the functionality of internshipApplicationForm | Expecting error message to be displayed', () =>
    {
      component.errorMessage = "Sorry!";
      component.successMessage = null;

      fixture.detectChanges();
      
      errorMessageTag = fixture.debugElement.query(By.css('div .text-danger'));

      expect(errorMessageTag.nativeElement.innerHTML).toContain("Sorry!");
    });

    it('Verifying the functionality of internshipApplicationForm | Expecting success message to be displayed', () =>
    {
      component.successMessage = "Welcome!";
      component.errorMessage = null;

      fixture.detectChanges();
      
      successMessageTag = fixture.debugElement.query(By.css('div .text-success'));

      expect(successMessageTag.nativeElement.innerHTML).toContain("Welcome!");
    });
  });
});