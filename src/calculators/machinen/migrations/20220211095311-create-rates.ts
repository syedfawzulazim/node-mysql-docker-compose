import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

const DATA = [
  {
    name: 'Metallverarbeitung, -bearbeitung und Kaltumformung a',
    type: 'contribution',
    rate: 3.99,
  },
  {
    name: 'Metallverarbeitung, -bearbeitung und Kaltumformung b',
    type: 'contribution',
    rate: 1.79,
  },
  {
    name: 'Chemie, Kunststoff/Gummi und Linoleum',
    type: 'contribution',
    rate: 3.47,
  },
  {
    name: 'Grafisches Gewerbe',
    type: 'contribution',
    rate: 2.3,
  },
  {
    name: 'Anfragepflichtig',
    type: 'contribution',
    rate: 0,
  },
]

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('rates', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      rate: {
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
    return queryInterface.bulkInsert('rates', DATA)
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('rates')
  },
}
