module.exports = {
    success: {
        s0: {
            code: "ReasonExemptionCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "ReasonExemptionUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "ReasonExemptionFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "ReasonExemptionDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoReasonExemptions",
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
            code: "ReasonExemptionNotFound",
            type: "error"
        }
    }
}