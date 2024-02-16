module.exports = {
    success: {
        s0: {
            code: "TaxRateCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "TaxRateUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "TaxRateFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "TaxRateDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoTaxRates",
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
            code: "TaxRateNotFound",
            type: "error"
        }
    }
}