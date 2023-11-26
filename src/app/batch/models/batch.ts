import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/global/utils/adapter';
import { Plan, PlanAdapter } from './plan';
import { User, UserAdapter } from './user';
import { RecurringPattern, RecurringPatternAdapter } from './recurringpattern';
import { EligibilityCriteria, EligibilityCriteriaAdapter } from './eligibility-criteria';
import { Location, LocationAdapter } from 'src/app/location/models/location';
export class Batch {
    id?: number;
    title?: string;
    description?: string;
    instructor?: User;
    batchFee?: number;
    feePerClass?: number;
    maxCapacity?: number;
    recurring?: boolean;
    startDate?: Date;
    endDate?: Date;
    recurringPattern?: RecurringPattern;
    plans?: Plan[] = [];
    eligibilityCriteria?: EligibilityCriteria[];
    location?: Location;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: User;
    updatedBy?: User;
    classesCount?: number;
    repeatOn?: number[];
}
@Injectable({
    providedIn: 'root',
})
export class BatchAdapter implements Adapter<Batch>{
    adapt(data: any): Batch {
        const batch = new Batch();
        try {
            batch.id = data.id ?? data.batchId;
            batch.title = data.title;
            batch.description = data.description;
            batch.instructor = data.instructor ? new UserAdapter().adapt(data.instructor) : new User();
            batch.batchFee = data.batchFees;
            batch.feePerClass = data.feePerClass;
            batch.maxCapacity = data.maxCapacity;
            batch.recurring = data.recurring;
            batch.startDate = data.from;
            batch.endDate = data.to;
            batch.recurringPattern = data.recurringPattern ? new RecurringPatternAdapter().adapt(data.recurringPattern) : new RecurringPattern();
            batch.plans = data.plans && data.plans.length ? data.plans.map((plan: any) => new PlanAdapter().adapt(plan)) : [];
            const eligibilityCriteria = data.eligibilityCriteria;
            if (eligibilityCriteria instanceof Array) {
                batch.eligibilityCriteria = eligibilityCriteria.map((e: any) => new EligibilityCriteriaAdapter().adapt(e))
            }
            batch.location = data.loation ? new LocationAdapter().adapt(data.location) : new Location();
            batch.status = data.status;
            batch.createdAt = data.createdAt;
            batch.updatedAt = data.lastModifiedAt;
            batch.createdBy = data.createdBy ? new UserAdapter().adapt(data.createdBy) : new User();
            batch.updatedBy = data.lastModifiedBy ? new UserAdapter().adapt(data.lastModifiedBy) : new User();
            batch.classesCount = data.numberOfClasses;
            batch.repeatOn = data?.recurringPattern?.repeatOn;

        }
        catch (e) {
            console.log(e);
            throw e;
        }
        return batch;
    }

}
