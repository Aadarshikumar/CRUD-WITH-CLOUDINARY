const knex = require("knex")({
    client:"mysql",
    connection:{
        host: "localhost",
        user: "root",
        password:"Aadarsh@123",
        database: "harry"
    }
});

//// For user Table
knex.schema.createTable("user", table => {
    table.increments("id").primary();
    table.string("name")
    table.string("email")
    table.string("password")
    table.timestamp('created_at').defaultTo(knex.fn.now())
}).then((result) => {
    console.log("Table Created");
}).catch((err) =>{
    // console.log(err);
});


//// for cloud tables
knex.schema.createTable("gallery", table => {
    table.increments('id').primary()
    table.integer("testingId").unsigned().nullable()
    table.string("avatar")
    table.string("cloudinary_id")
    table.foreign("testingId").references("user.id")

}).then((result) =>{
    console.log("Create Table 2");
}).catch((err) => {
    // console.log("table not Created");
});

module.exports = knex