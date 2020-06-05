
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
  
        tbl.string('username', 128)
          .notNullable()
          .unique()
        tbl.string('password',128)
          .notNullable()   
        
        tbl.integer("role")
        .unsigned()
        .references("roles.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("roles", tbl => {
        tbl.increments();
  
        tbl.string("name", 128).notNullable().unique();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableExist('users');
};
