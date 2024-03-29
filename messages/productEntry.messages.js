module.exports = {
    success: {
        s0: {
            code: "ProductEntryCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "ProductEntryUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "ProductEntryFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "ProductEntryDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoProductEntries",
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
            code: "ProductEntryNotFound",
            type: "error"
        }
    }
}