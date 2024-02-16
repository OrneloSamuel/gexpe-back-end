module.exports = {
    success: {
        s0: {
            code: "ProductOutputCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "ProductOutputUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "ProductOutputFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "ProductOutputDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoProductOutputs",
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
            code: "ProductOutputNotFound",
            type: "error"
        }
    }
}