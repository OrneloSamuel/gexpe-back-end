module.exports = (app) => {

    app.use('/', require("../routes/home.routes"));
    app.use('/banks', require('../routes/bank.routes'));
    app.use('/brands', require('../routes/brand.routes'));
    app.use('/companies', require('../routes/company.routes'));
    app.use('/counties', require('../routes/county.routes'));
    app.use('/customers', require('../routes/customer.routes'));
    app.use('/employees', require('../routes/employee.routes'));
    app.use('/invoices', require('../routes/invoice.routes'));
    app.use('/naturalities', require('../routes/naturality.routes'));
    app.use('/payment-methods', require('../routes/paymentMethod.routes'));
    app.use('/permissions', require('../routes/permission.routes'));
    app.use('/products', require('../routes/product.routes'));
    app.use('/product-categories', require('../routes/productCategory.routes'));
    app.use('/product-entries', require('../routes/productEntry.routes'));
    app.use('/product-outputs', require('../routes/productOutput.routes'));
    app.use('/provinces', require('../routes/province.routes'));
    app.use('/reason-exemptions', require('../routes/reasonExemption.routes'));
    app.use('/roles', require('../routes/role.routes'));
    app.use('/suppliers', require('../routes/supplier.routes'));
    app.use('/tax-rates', require('../routes/taxRate.routes'));
    app.use('/users', require('../routes/user.routes'));
    
}