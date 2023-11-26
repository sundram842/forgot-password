import { Location } from "src/app/location/models/location";
import { AgeGroup, EligibilityCriteria } from "./eligibility-criteria";

export enum DayOfWeek {
  Sunday = 1,
  Monday = 2,
  Tuesday = 3,
  Wednesday = 4,
  Thursday = 5,
  Friday = 6,
  Saturday = 7,
}

export enum SelectedView {
  LIST = 'list',
  GRID = 'grid'
}

export enum CustomWeek {
  SELECTED = 'customWeekSelected',
  DEFAULT = 'customeweekDefault',
}

export enum Eligibility {
  AGE = 'age',
  GENDER = 'gender',
  GRATER_THAN = 'greater_than',
  LESS_THAN = 'less_than'
}
export const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  export enum CompareOperator {
    GREATER_THAN = 'greater_tham',
    LESS_THEN = 'less_than'
  }
  
export const eligibilityCriteria: EligibilityCriteria[] = [
  {
    "key": "gender",
    "compareOperator": "equals",
    "value": "male"
  },
  {
    "key": "age",
    "compareOperator": "greater_than",
    "value": "5"
  },
  {
    "key": "age",
    "compareOperator": "less_than",
    "value": "20"
  }
]


export class FilterForm {
  startDate?: string;
  endDate?: string;
  location?: Location;
  ageRange?: AgeGroup;
}