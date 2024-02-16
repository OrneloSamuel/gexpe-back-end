module.exports = {
    success: {
        s0: {
            code: "PaymentMethodCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "PaymentMethodUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "PaymentMethodFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "PaymentMethodDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoPaymentMethods",
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
            code: "PaymentMethodNotFound",
            type: "error"
        }
    }
}