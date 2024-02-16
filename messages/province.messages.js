module.exports = {
    success: {
        s0: {
            code: "ProvinceCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "ProvinceUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "ProvinceFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "ProvinceDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoProvinces",
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
            code: "ProvinceNotFound",
            type: "error"
        }
    }
}