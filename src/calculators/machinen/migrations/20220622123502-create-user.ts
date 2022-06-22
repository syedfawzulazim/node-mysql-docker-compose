import { QueryInterface, DataType, Sequelize, DataTypes } from 'sequelize';

const DATA = [
  {
    name: 'Adnan',
    age: 20
  },
  {
    name: 'Azim',
    age: 21
  },
  {
    name: 'Khan',
    age: 22
  },
  {
    name: 'Syed',
    age: 23
  },
  {
    name: 'Fawzul',
    age: 24
  },
  {
    name: 'Kabir',
    age: 25
  }
]


export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    return queryInterface.bulkInsert('users', DATA)
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('users')
  }
};
