module.exports = {
    success: {
        s0: {
            code: "CompanyCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "CompanyUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "CompanyFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "CompanyDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoCompanies",
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
            code: "CompanyNotFound",
            type: "error"
        }
    }
}