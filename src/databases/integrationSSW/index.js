import { Sequelize } from 'sequelize'

import { Authorization } from './models/authorization.model.js'
import { Queue } from './models/queue.model.js'
import { Ctrc } from './models/ctrc.model.js'

export class IntegrationSSWContext extends Sequelize {
  
  Authorization = this.define('authorization', new Authorization(), { tableName: 'authorization' })

  Ctrc = this.define('ctrc', new Ctrc(), { tableName: 'ctrc' })

  Queue = this.define('queue', new Queue(), { tableName: 'queue' })

  constructor() {

    super({host: "vps53636.publiccloud.com.br", port: 5433, database: "integrationSSW", password: "@Rped94ft", username: "postgres", dialect: "postgres", timezone: "America/Sao_Paulo", define: {underscored: true, timestamps: false}, logging: true})
    
  }

}