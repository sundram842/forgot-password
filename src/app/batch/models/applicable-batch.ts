import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/global/utils/adapter';
export class ApplicableBatch{
    batchId?:number;
    title?:string;
    code?:string;
}
@Injectable({
    providedIn: 'root',
})
export class ApplicableBatchAdapter implements Adapter<ApplicableBatch>{
    adapt(data: any): ApplicableBatch {
        const applicableBatch = new ApplicableBatch();
        try {
            applicableBatch.batchId = data.batchId;
            applicableBatch.title = data.title;
            applicableBatch.code = data.code;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
        return applicableBatch ;

    }

}