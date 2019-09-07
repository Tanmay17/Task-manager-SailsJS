module.exports = {
    AgentController: {},
    ManagerController: {
        getAllTask:{
            "Valid": {
                createdBy: "t@test.com"
            },
            "Invalid": {
                createdBy: 131,
            }
        },
        createTask: {
            "Valid": {
                description : "TEST description",
                taskLocation: "TEST location",
                createdBy: "t@test.com",
                assignedTo: "",
                deadline: 1561684,
                taskAttachmentLink: ""
            },
            "Invalid": {
                description : "TEST description",
                taskLocation: "TEST location",
                createdBy: "t@test.com",
                assignedTo: "v@test.com",
                deadline: "1561684",
                taskAttachmentLink: ""
            }
        },
        assignTask: {
            "Valid": {
                assignedTo: "v@test.com",
            },
            "Invalid": {
                id : 12,
                assignedTo: "v@test.com",
            }
        }
    }
}