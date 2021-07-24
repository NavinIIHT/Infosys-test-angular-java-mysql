import { InternshipTypePipe } from 'src/app/internship/internship-type.pipe';

describe('Structural | Pipe | InternshipTypePipe', () =>
{
  let pipe : InternshipTypePipe;

  beforeEach(() =>
  {
    pipe = new InternshipTypePipe();
  })

  it('Verifying the structure of InternshipTypePipe', () =>
  {
    expect(pipe).toBeTruthy();
  });

  it('Verifying the return value of InternshipTypePipe for input : S3', () =>
  {
    let returnValue = pipe.transform("S3");
    returnValue = returnValue.toLowerCase().replace(/ /gi, "");
    expect(returnValue).toBe("summerinternship-3months")
  })

  it('Verifying the return value of InternshipTypePipe for input : S6', () =>
  {
    let returnValue = pipe.transform("S6");
    returnValue = returnValue.toLowerCase().replace(/ /gi, "");
    expect(returnValue).toBe("summerinternship-6months")
  })

  it('Verifying the return value of InternshipTypePipe for input : W3', () =>
  {
    let returnValue = pipe.transform("W3");
    returnValue = returnValue.toLowerCase().replace(/ /gi, "");
    expect(returnValue).toBe("winterinternship-3months")
  })

  it('Verifying the return value of InternshipTypePipe for input :  W6', () =>
  {
    let returnValue = pipe.transform("W6");
    returnValue = returnValue.toLowerCase().replace(/ /gi, "");
    expect(returnValue).toBe("winterinternship-6months")
  })
});