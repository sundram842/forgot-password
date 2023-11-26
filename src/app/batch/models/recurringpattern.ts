import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/global/utils/adapter';
export class RecurringPattern {
    startDate?: Date;
    endDate?: Date;
    interval?: number;
    neverEnd?: boolean;
    recurrenceEndDate?: Date;
    frequency?:number;
    repeatEvery?: number;
    repeatOn?: number[];
}
@Injectable({
    providedIn: 'root',
})
export class RecurringPatternAdapter implements Adapter<RecurringPattern>{
    adapt(data: any): RecurringPattern {
        const recurringPattern = new RecurringPattern ();
        try{
            recurringPattern.startDate = data.from;
            recurringPattern.endDate= data.to;
            recurringPattern.interval = data.interval;
            recurringPattern.neverEnd = data.neverEnd;
            recurringPattern.recurrenceEndDate = data.endDate;
            recurringPattern.frequency = data.frequency;
            recurringPattern.repeatEvery = data.repeatEvery;
            recurringPattern.repeatOn = data.repeatOn;
            recurringPattern.frequency = data.frequency;

        }
        catch (e) {
            console.log(e);
            throw e;
        }
        return recurringPattern;
    }

}
