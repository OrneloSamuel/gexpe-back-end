module.exports = {
    success: {
        s0: {
            code: "BankCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "BankUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "BankFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "BankDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoBanks",
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
            code: "BankNotFound",
            type: "error"
        }
    }
}