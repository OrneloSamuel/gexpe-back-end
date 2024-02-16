module.exports = {
    success: {
        s0: {
            code: "ProductCategoryCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "ProductCategoryUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "ProductCategoryFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "ProductCategoryDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoProductCategories",
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
            code: "ProductCategoryNotFound",
            type: "error"
        }
    }
}