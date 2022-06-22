import { DataTypes, QueryInterface, Sequelize } from 'sequelize'
import {
  CONSTRUCTION_YEAR_QUESTION,
  DEDUCTIBLE_QUESTION,
  INSURANCE_SUM_QUESTION,
  MACHINE_GROUP_QUESTION,
  MACHINE_TYPE_QUESTION,
  NUMBER_OF_PREVIOUS_CLAIMS_QUESTION,
  PREVIOUS_DAMAGE_SUM_QUESTION,
} from '../constants'

const DATA = [
  {
    questionId: 101781,
    type: NUMBER_OF_PREVIOUS_CLAIMS_QUESTION,
  },
  {
    questionId: 101782,
    type: PREVIOUS_DAMAGE_SUM_QUESTION,
  },
  {
    questionId: 106977,
    type: MACHINE_TYPE_QUESTION,
  },
  {
    questionId: 106976,
    type: MACHINE_GROUP_QUESTION,
  },
  {
    questionId: 103062,
    type: CONSTRUCTION_YEAR_QUESTION,
  },
  {
    questionId: 100135,
    type: INSURANCE_SUM_QUESTION,
  },
  {
    questionId: 100145,
    type: DEDUCTIBLE_QUESTION,
  },
]

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('questions', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(128),
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
    return queryInterface.bulkInsert('questions', DATA)
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('questions')
  },
}
