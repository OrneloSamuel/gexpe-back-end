module.exports = {
    mongodb: {
        uri: 'mongodb://localhost:27017/sif',
        collections: {
            bank: 'banks',
            brand: 'brands',
            cashBox: 'cashboxes',
            company: 'companies',
            county: 'counties',
            customer: 'customers',
            employee: 'employees',
            invoice: 'invoices',
            invoiceItem: 'invoiceItems',
            invoicePaymentMethod: 'invoicePaymentMethods',
            naturality: 'naturalities',
            paymentMethod: 'paymentMethods',
            permission: 'permissions',
            permissionRole: 'permissionRoles',
            person: 'people',
            product: 'products',
            productCategory: 'productCategories',
            productEntry: 'productEntries',
            productOutput: 'productOutput',
            province: 'provinces',
            reasonExemption: 'reasonExemptions',
            role: 'roles',
            roleUser: 'roleUsers',
            supplier: 'suppliers',
            taxRate: 'taxRates',
            user: 'users'
        }
    },
    auth: {
        expiration_time: 15000,
        issuer: "OSPK"
    },
    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
        numerical: "0123456789"
    },
    email: {
        service: "Gmail",
        auth: {
            user: "mailserverpw@gmail.com",
            pass: "ttxirdxzkafhcuel"
        }
    }
}