import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../../../database/connection'

class DeductibleFactor extends Model {
  public id!: number
  public deductible!: number
  public factor!: number
}

DeductibleFactor.init(
  {
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
  },
  {
    tableName: 'deductible_factors',
    sequelize,
  },
)

export default DeductibleFactor
