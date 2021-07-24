import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { InternshipService } from 'src/app/internship/internship.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InternshipComponent } from 'src/app/internship/internship.component';
import { InternshipTypePipe } from 'src/app/internship/internship-type.pipe';

class InternshipServiceStub
{
  apply() { }
}
@Pipe({name : 'internshipType'})
class InternshipTypePipeStub implements PipeTransform
{
  transform(value: any)
  {
    return "Pipe";
  }
}
describe('Structural | Component | InternshipComponent', () =>
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

  it('Verifying the Structure of InternshipComponent', () =>
  {
    expect(component).toBeTruthy();
  });

  it('Verifying the structure of internshipTypeList', () =>
  {
    component.ngOnInit();

    let internshipTypeList = ["S3", "S6", "W3", "W6"];
    
    for (let internshipType of internshipTypeList)
    {
      expect(component.internshipTypeList).toContain(internshipType);
    }
  });


  describe('Testing the internshipApplicationForm', () =>
  {
    beforeEach(() =>
    {
      component.ngOnInit();
    });

    it("Verifying the structure of internshipApplicationForm ", () =>
    {
      expect(component.internshipApplicationForm).toBeDefined();
    });
  

  /* ---------------------- Form Fields : Binding ------------------------ */

  describe('internshipApplicationForm', () =>
  {
    let internshipApplicationFormTag: DebugElement;
    let internNameInputTag: DebugElement;
     let emailInputTag: DebugElement;
    let mobileNumberInputTag: DebugElement;
    let internshipTypeInputTag: DebugElement;

    beforeEach(() =>
    {
      internshipApplicationFormTag = fixture.debugElement.query(By.css('form'));
      internNameInputTag = fixture.debugElement.query(By.css('#internName'));
     
        
      emailInputTag = fixture.debugElement.query(By.css('#email'));
      mobileNumberInputTag = fixture.debugElement.query(By.css('#mobileNumber'));
      internshipTypeInputTag = fixture.debugElement.query(By.css('#internshipType'));

    });





xit('Verifying the structure of internshipApplicationForm | Testing whether the pipe is called', () =>
    {
      let defaultOptionCount = 0;
      let internshipTypeCount = 0;
  
      component.internshipTypeList = ["Alpha", "Beta"];
      fixture.detectChanges();
      
      let internshipTypeOptions = fixture.debugElement.query(By.css('#internshipType')).children;
      for (let internshipType of internshipTypeOptions)
      {
        if (internshipType.nativeElement.value == '' || internshipType.nativeElement['ng-reflect-value'] == '')
        {
          if (internshipType.nativeElement.textContent.toLowerCase().replace(/ /gi, '') == 'chooseaninternshiptype')
          {
            defaultOptionCount++;
          }
        }
  
        if (component.internshipTypeList.includes(internshipType.nativeElement.value) || component.internshipTypeList.includes(internshipType.nativeElement['ng-reflect-value']))
        {
          if (internshipType.nativeElement.textContent == 'Pipe')
          {

            internshipTypeCount++;
          }
        }
      }
 
      expect(defaultOptionCount).toBe(1);
      expect(internshipTypeCount).toBe(3);
    });
  
    it('Verifying the structure of internshipApplicationForm | Testing whether the internshipType drop down is dynamic', () =>
    {
      let testInternshipTypes = [
                                  ['Alpha'],
                                  ['Alpha', 'Beta'],
                                  ['Alpha', 'Beta', 'Gamma'],
                                  ['Alpha', 'Beta', 'Gamma', 'Delta'],
                                  ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon']
                                ];
  
      for (let internshipTypeList of testInternshipTypes)
      {
        component.internshipTypeList = internshipTypeList;
  
        fixture.detectChanges();
  
        let internshipTypeOptions = fixture.debugElement.queryAll(By.css('option'));
  
        expect(internshipTypeOptions.length).toBe(internshipTypeList.length + 1);
      }
    });








    it('Verifying the structure of internshipApplicationForm | Expecting FormGroup Binding to be accurate', () =>
    {
      expect(internshipApplicationFormTag.attributes['ng-reflect-form']).toBeTruthy();
    });

    it('Verifying the structure of internshipApplication | Expecting formControlName binding to be accurate for internName', () =>
    {
      expect(internNameInputTag.attributes['formControlName']).toBe('internName');
    });



    it('Verifying the structure of internshipApplicationForm | Expecting formControlName binding to be accurate for  email', () =>
    {
      expect(emailInputTag.attributes['formControlName']).toBe('email');
    });

    it('Verifying the structure of internshipApplicationForm | Expecting formControlName binding to be accurate for mobileNumber', () =>
    {
      expect(mobileNumberInputTag.attributes['formControlName']).toBe('mobileNumber');
    });

    it('Verifying the structure of internshipApplicationForm | Expecting formControlName binding to be accurate for internshipType', () =>
    {
      expect(internshipTypeInputTag.attributes['formControlName']).toBe('internshipType');
    });
  });




  /* ---------------------- Usage of appropriate Bootstrap classes ------------------------ */

  describe("internshipApplicationForm | Usage of Bootstrap Classes", () =>
  {
    let internshipApplicationFormTag: DebugElement;
    let internNameInputTag: DebugElement;
     let emailInputTag: DebugElement;
    let mobileNumberInputTag: DebugElement;
    let internshipTypeInputTag: DebugElement;

    let internNameErrorTag: DebugElement;
    let emailErrorTag: DebugElement;
    let mobileNumberErrorTag: DebugElement;
    let internshipTypeErrorTag: DebugElement;

    let applyButtonTag: DebugElement;

    beforeEach(() =>
    {
      component.internshipApplicationForm.controls['internName'].setValue(null);
        component.internshipApplicationForm.controls['email'].setValue(null);
      component.internshipApplicationForm.controls['mobileNumber'].setValue(null);
      component.internshipApplicationForm.controls['internshipType'].setValue(null);

      component.internshipApplicationForm.controls['internName'].markAsDirty();
        component.internshipApplicationForm.controls['email'].markAsDirty();
      component.internshipApplicationForm.controls['mobileNumber'].markAsDirty();
      component.internshipApplicationForm.controls['internshipType'].markAsDirty();

      fixture.detectChanges();

      internshipApplicationFormTag = fixture.debugElement.query(By.css('form'));
      internNameInputTag = fixture.debugElement.query(By.css("input[type='text']"));
        emailInputTag = fixture.debugElement.query(By.css('#email'));
      mobileNumberInputTag = fixture.debugElement.query(By.css('#mobileNumber'));
      internshipTypeInputTag = fixture.debugElement.query(By.css('#internshipType'));

      internNameErrorTag = fixture.debugElement.query(By.css('#internNameError'));
      emailErrorTag = fixture.debugElement.query(By.css('#emailError'));
      mobileNumberErrorTag = fixture.debugElement.query(By.css('#mobileNumberError'));
      internshipTypeErrorTag = fixture.debugElement.query(By.css('#internshipTypeError'));

      applyButtonTag = fixture.debugElement.query(By.css('button'));
    });


    it("Verifying the structure of internshipApplicationForm | Expecting form-control class in interName", () =>
    {
      expect(internNameInputTag.attributes['class']).toContain('form-control');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting form-group class in  internName", () =>
    {
      expect(internNameInputTag.parent.attributes['class']).toContain('form-group');
    });

  
    it("Verifying the structure of internshipApplicationForm | Expecting form-control class in email", () =>
    {
      expect(emailInputTag.attributes['class']).toContain('form-control');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting form-group class in email", () =>
    {
      expect(emailInputTag.parent.attributes['class']).toBe('form-group');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting form-control class in mobileNumber", () =>
    {
      expect(mobileNumberInputTag.attributes['class']).toContain('form-control');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting form-group class in mobileNumber", () =>
    {
      expect(mobileNumberInputTag.parent.attributes['class']).toBe('form-group');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting form-control class in internshipType", () =>
    {
      expect(internshipTypeInputTag.attributes['class']).toContain('form-control');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting form-group class in internshipType", () =>
    {
      expect(internshipTypeInputTag.parent.attributes['class']).toBe('form-group');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting btn class in Apply", () =>
    {
      expect(applyButtonTag.attributes['class']).toContain('btn');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting text-danger class in internNameError", () =>
    {
      expect(internNameErrorTag.attributes['class']).toBe('text-danger');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting text-danger class in emailError", () =>
    {
      expect(emailErrorTag.attributes['class']).toBe('text-danger');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting text-danger class in mobileNumberError", () =>
    {
      expect(mobileNumberErrorTag.attributes['class']).toBe('text-danger');
    });

    it("Verifying the structure of internshipApplicationForm | Expecting text-danger class in internshipTypeError", () =>
    {
      expect(internshipTypeErrorTag.attributes['class']).toBe('text-danger');
    });
  })
  });
});
  
