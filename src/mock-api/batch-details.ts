export const batchDeatils = {
  "data": {
    "batchCode": "BOX123",
    "batchFees": 299.99,
    "title": "URBAN HIP HOP - EDISON, NJ - EVERY SUNDAY",
    "description": "Urban Hip Hop with Sandesh Shetty in Edison, NJ",
    "term": {
      "termId": 5,
      "termCode": "TERM001"
    },
    "instructor": {
      "id": "asdfasdfasdve4asdffasd",
      "displayName": "John",
      "firstName": "John",
      "lastName": "wick"
    },
    "studentCount": 10,
    "feePerClass": 50,
    "maxCapacity": 16,
    "recurring": true,
    "from": "2023-07-18T13:00:00+00:00",
    "to": "2023-07-18T13:00:00+00:00",
    "recurringPattern": {
      "from": "2023-07-18T13:00:00+00:00",
      "to": "2023-07-18T14:00:00+00:00",
      "interval": 1,
      "neverEnd": false,
      "endDate": "2023-08-24T14:00:00+00:00",
      "endAfterOccurrences": null,
      "frequency": 1,
      "repeatEvery": 1,
      "repeatOn": [
        1,
        5
      ]
    },
    "eligiblilityCriteria": [
      {
        "key": "gender",
        "compareOperator": "equals",
        "value": "male"
      },
      {
        "key": "age",
        "compareOperator": "greater_tham",
        "value": 5
      },
      {
        "key": "age",
        "compareOperator": "less_than",
        "value": 20
      }
    ],
    "plans": [
      {
        "title": "3_months",
        "applicableBatchIds": [
          1,
          2,
          3
        ],
        "discountType": "flat",
        "discountValue": 2
      }
    ],
    "numberOfClasses": 10,
    "id": 1,
    "status": "draft",
    "createdAt": "2023-07-18T00:00:00+00:00",
    "lastModifiedAt": "2023-10-18T00:00:00+00:00",
    "createdBy": {
      "id": 1,
      "firstName": "john",
      "lastName": "lint",
      "displayName": "John"
    },
    "lastModifiedBy": {
      "id": 1,
      "firstName": "john",
      "lastName": "lint",
      "displayName": "John"
    }
  }
}