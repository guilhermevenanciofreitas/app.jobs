import { DataTypes } from 'sequelize'

export class Authorization {

  id = {
    field: 'id',
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.UUID,
  }

}