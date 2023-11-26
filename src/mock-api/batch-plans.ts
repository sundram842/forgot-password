export const batchPlans = {
    "batchId": 1,
    "title": "Hip-hop",
    "code": "HH001",
    "plans": [
        {
            "title": "current term",
            "default": true,
            "applicableBatches": [],
            "totalPrice": 500,
            "discountedPrice": 500,
            "classStartDate": "2023-12-30T00:00:00",
            "classEndDate": "2024-04-30T00:00:00"
        },
        {
            "title": "3 Months",
            "isdefault": false,
            "applicableBatches": [
                {
                    "batchId": 1,
                    "code": "B001",
                    "title": "bollywood"
                },
                {
                    "batchId": 2,
                    "code": "F001",
                    "title": "free-style"
                }
            ],
            "discountType": "flat",
            "discountValue": 10,
            "totalPrice": 800,
            "discountedPrice": 600,
            "classStartDate": "2023-12-10T00:00:00",
            "classEndDate": "2024-06-10T00:00:00"
        }
    ]
}