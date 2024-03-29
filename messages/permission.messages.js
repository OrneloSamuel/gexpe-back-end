module.exports = {
    success: {
        s0: {
            code: "PermissionCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "PermissionUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "PermissionFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "PermissionDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoPermissions",
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
            code: "PermissionNotFound",
            type: "error"
        }
    }
}