import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

const DATA = [
  {
    deductible: 250,
    factor: 0,
  },
  {
    deductible: 500,
    factor: 0.05,
  },
  {
    deductible: 1000,
    factor: 0.1,
  },
  {
    deductible: 2500,
    factor: 0.2,
  },
]

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('deductible_factors', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      deductible: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      factor: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      createdAt: {
        type: new DataTypes.DATE(),
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
      updatedAt: {
        type: new DataTypes.DATE(),
        allowNull: true,
      },
    })
    return queryInterface.bulkInsert('deductible_factors', DATA)
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('deductible_factors')
  },
}
