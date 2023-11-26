import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/global/utils/adapter';
export class EligibilityCriteria{
    key?:string;
    compareOperator?:string;
    value?:string;

}
@Injectable({
    providedIn: 'root',
})
export class EligibilityCriteriaAdapter implements Adapter<EligibilityCriteria>
{
    adapt(data: any): EligibilityCriteria {
        const  eligibilityCriteria = new EligibilityCriteria ();
        try{
            eligibilityCriteria.key = data.key;
            eligibilityCriteria.compareOperator = data.compareOperator;
            eligibilityCriteria.value = data.value;

        }
        catch (e) {
            console.log(e);
            throw e;
        }
        return eligibilityCriteria;
    }

}

export class AgeGroup{
    key?:number;
    value?:string;
}
@Injectable({
    providedIn: 'root',
})
export class AgeGroupAdapter implements Adapter<AgeGroup>
{
    adapt(data: any): AgeGroup {
        const ageGroup = new AgeGroup();
        ageGroup.key = data.key;
        ageGroup.value = data.value;
        return ageGroup;
    }
    
}