import { DataTypes } from 'sequelize'

export class Queue {

  id = {
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.UUID,
  }

  code = {
    field: 'code',
    type: DataTypes.STRING(10),
  }

}