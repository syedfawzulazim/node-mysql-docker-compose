import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../../../database/connection'

class Question extends Model {
  public id!: number
  public questionId!: number
  public type!: string
}

Question.init(
  {
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
  },
  {
    tableName: 'questions',
    sequelize,
  },
)

export default Question
