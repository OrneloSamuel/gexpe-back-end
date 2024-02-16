module.exports = {
    success: {
        s0: {
            code: "SupplierCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "SupplierUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "SupplierFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "SupplierDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoSuppliers",
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
            code: "SupplierNotFound",
            type: "error"
        }
    }
}