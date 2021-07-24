import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InternshipService
{
  constructor(private http : HttpClient) { }

  apply(internData) : Observable<any>
  {
    return this.http.post("http://localhost:3692/GreyPinkUniverse/InternshipAPI/apply/", internData);
  }
}