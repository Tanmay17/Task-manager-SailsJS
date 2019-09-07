module.exports = {
    AgentController: {
        "Valid": {
            "company_name": "Marvel Inc.",
            "address":"Somewhere in Titan, Saturn Moon",
            "longitude": 32.2345678,
            "latitude": 34.45678,
            "contact_number": "8765040790",
            "email": "thanos@marvel.com",
            "country": "Saturn",
            "state": "Titan",
            "owner_name": "Thanos",
            "support_contact": "8765040790",
            "status": true,
            "timezone_id": 99,
        },
        "Invalid": {
            "company_name": "Marvel Inc.",
            "address":"Somewhere in Titan, Saturn Moon",
            "longitude": "32.2345678",
            "latitude": "34.45678",
            "contact_number": "8765040790",
            "email": "thanos@marvel.com",
            "country": "Saturn",
            "state": "Titan",
            "owner_name": "Thanos",
            "support_contact": 8765040790,
            "status": true,
            "timezone_id": 99,
        },
        
    },
    ManagerController: {
        createTask: {
            "Valid": {
                description : "TEST description",
                task_location: "TEST location",
                created_by: "t@test.com",
                assigned_to: "v@test.com",
                deadline: 1561684,
                task_attachment_link: ""
            },
            "Invalid": {
                description : "TEST description",
                task_location: "TEST location",
                created_by: "t@test.com",
                assigned_to: "v@test.com",
                deadline: "1561684",
                task_attachment_link: ""
            }
        }
    }
}