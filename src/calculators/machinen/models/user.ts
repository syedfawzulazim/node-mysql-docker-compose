import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../../../database/connection'

class User extends Model {
  public id!: number 
  public name!: string
  public age!: number
}

User.init(
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
    age: {
      type: DataTypes.NUMBER,
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
    tableName: 'users',
    sequelize,
  },
)

export default User