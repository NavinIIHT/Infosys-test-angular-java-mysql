import { routes } from 'src/app/app-routing.module';

describe("Structural | Routing | AppRoutingModule", ()=>
{
    it("Verifying the structure of routing", () =>
    {
        let flag;

        for (let index in routes)
        {
            let componentGiven;

            let pathGiven = routes[index].path;
            
            if (routes[index].component != undefined)
            {
                componentGiven = routes[index].component.name;
            }
            
            flag = /^[\/]?applyNow$/.test(pathGiven) && componentGiven == "InternshipComponent";

            if (flag == true)
            {
                break;
            }
        }

        expect(flag).toBeTruthy();
    });
})