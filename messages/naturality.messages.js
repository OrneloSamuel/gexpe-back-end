module.exports = {
    success: {
        s0: {
            code: "NaturalityCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "NaturalityUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "NaturalityFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "NaturalityDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoNaturalities",
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
            code: "NaturalityNotFound",
            type: "error"
        }
    }
}