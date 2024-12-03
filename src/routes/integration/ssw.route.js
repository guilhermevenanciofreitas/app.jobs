import { Router } from 'express'
import { IntegrationSSWController } from '../../controllers/integration/ssw.controller.js'
  
export class IntegrationSSWRoute {

    router = Router()
    controller = new IntegrationSSWController()

    constructor() {
        this.intializeRoutes()
    }

    intializeRoutes() {
        this.router.post('/generate', async (req, res) => await this.controller.generate(req, res))
        this.router.post('/import', async (req, res) => await this.controller.import(req, res))
    }

}