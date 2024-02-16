module.exports = {
    success: {
        s0: {
            code: "CustomerCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "CustomerUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "CustomerFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "CustomerDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoCustomers",
            type: "success"
        },
        s6: {
            http: 200,
            code: "Activated",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "CustomerNotFound",
            type: "error"
        }
    }
}