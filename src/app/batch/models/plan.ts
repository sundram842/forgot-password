import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/global/utils/adapter';
import { ApplicableBatch, ApplicableBatchAdapter } from './applicable-batch';
export class Plan {
  title?: string;
  default?: boolean;
  applicableBatches?: ApplicableBatch[];
  discountType?: string;
  discountValue?: number;
  totalPrice?: number;
  discountPrice?: number;
  classStartDate?: Date;
  classEndDate?: Date;
}
@Injectable({
  providedIn: 'root',
})
export class PlanAdapter implements Adapter<Plan> {
  adapt(data: any): Plan {
    const plan = new Plan();
    try {
      plan.title = data.title;
      plan.default = data.default;
      const applicableBatches = data.applicableBatchIds;
      if (applicableBatches instanceof Array) {
        plan.applicableBatches = applicableBatches.map((e: any) =>
          new ApplicableBatchAdapter().adapt(e)
        );
      }
      plan.discountType = data.discountType;
      plan.discountValue = data.discountValue;
      plan.totalPrice = data.totalPrice;
      plan.discountPrice = data.discountPrice;
      plan.classStartDate = data.classStartDate;
      plan.classEndDate = data.classEndDate;
    } catch (e) {
      console.log(e);
      throw e;
    }
    return plan;
  }
}
