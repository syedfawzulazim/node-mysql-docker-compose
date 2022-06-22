import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../../../database/connection'

class Rate extends Model {
  public id!: number
  public name!: string
  public type!: string
  public rate!: number
}

Rate.init(
  {
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
  },
  {
    tableName: 'rates',
    sequelize,
  },
)

export default Rate
