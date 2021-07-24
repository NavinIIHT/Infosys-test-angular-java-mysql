import { AppComponent } from 'src/app/app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from "@angular/core";

describe('Structural | Routing | AppComponent', () =>
{
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let link: DebugElement;
    let routerOutletTag: DebugElement;
    beforeEach(async(() =>
    {
        TestBed.configureTestingModule(
            {
                imports: [RouterTestingModule],
                declarations: [AppComponent]
            })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        link = fixture.debugElement.query(By.css('nav > div > ul > li > a'));
        routerOutletTag = fixture.debugElement.query(By.css('router-outlet'));

    });

    it('Verifying the structure of AppComponent', () =>
    {   
        expect(component).toBeTruthy();
    });

    it('Verifying the structure of routing', () =>
    { 
        expect(link.attributes['ng-reflect-router-link']).toMatch('[\/]?applyNow');
    })

    it('Verifying the structure of routing', () =>
    {
        expect(routerOutletTag).toBeTruthy();
    })
});