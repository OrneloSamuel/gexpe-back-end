module.exports = {
    success: {
        s0: {
            code: "InvoiceCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "InvoiceUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "InvoiceFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "InvoiceDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoInvoices",
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
            code: "InvoiceNotFound",
            type: "error"
        }
    }
}