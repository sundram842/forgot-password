import { Component, Input } from '@angular/core';
import { CustomWeek, DayOfWeek, days } from '../../models/batch-constants';
@Component({
  selector: 'app-week-recurrence',
  templateUrl: './week-recurrence.component.html',
  styleUrls: ['./week-recurrence.component.scss']
})
export class WeekRecurrenceComponent {
  public customWeek:typeof CustomWeek =CustomWeek;
  public daysOfWeek: string[] = days;
  @Input({ required: true }) specialDays?:number[];
  public getColorForDay(day: string): string | null {
    if(this.specialDays){
      const specialDaysNames: string[] = this.specialDays?.map(day => DayOfWeek[day]);
      if (specialDaysNames.includes(day)) {
        return CustomWeek.SELECTED; 
      } else {
        return CustomWeek.DEFAULT; 
      }
    }
    return null;
   
  }
}
