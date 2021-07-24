import { Pipe, PipeTransform } from '@angular/core';

@Pipe
({
  name: 'internshipType'
})

export class InternshipTypePipe implements PipeTransform
{
  transform(value: string): string
  {
    switch (value)
    {
      case "S3":
        return "Summer Internship - 3 Months";
    
      case "S6":
        return "Summer Internship - 6 Months";

      case "W3":
        return "Winter Internship - 3 Months";

      case "W6":
        return "Winter Internship - 6 Months";
    }
  }
}