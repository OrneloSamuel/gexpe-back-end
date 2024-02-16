module.exports = {
    success: {
        s0: {
            code: "CountyCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "CountyUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "CountyFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "CountyDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoCounties",
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
            code: "CountyNotFound",
            type: "error"
        }
    }
}