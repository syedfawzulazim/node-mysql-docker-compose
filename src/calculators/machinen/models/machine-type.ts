import { DataTypes, Model, Sequelize } from 'sequelize'
import sequelize from '../../../database/connection'

class MachineType extends Model {
  public id!: number
  public group!: string
  public type!: string
  public machineQuestion!: boolean
  public allocation!: string | null
  public plasticProcessing!: string | null
  public metalStoneGlassProcessing!: string | null
  public woodProcessing!: string | null
}

MachineType.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    group: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    type: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    machineQuestion: {
      type: new DataTypes.BOOLEAN(),
      allowNull: false,
    },
    allocation: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    plasticProcessing: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    metalStoneGlassProcessing: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    woodProcessing: {
      type: new DataTypes.STRING(128),
      allowNull: true,
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
    tableName: 'machine_types',
    sequelize,
  },
)

export default MachineType
