module.exports = {
    success: {
        s0: {
            code: "RoleCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "RoleUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "RoleFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "RoleDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoRoles",
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
            code: "RoleNotFound",
            type: "error"
        }
    }
}