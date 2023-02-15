import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'mascotas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('codigo_animal').primary();
      table.string('nombre_animal', 100).notNullable();
      table.integer('especie').notNullable();
      table.integer('raza').notNullable();
      table.integer('genero').notNullable();
      table.integer('edad').notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
