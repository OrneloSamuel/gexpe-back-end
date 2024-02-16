module.exports = {
    success: {
        s0: {
            code: "ProductCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "ProductUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "ProductFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "ProductDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoProducts",
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
            code: "ProductNotFound",
            type: "error"
        }
    }
}