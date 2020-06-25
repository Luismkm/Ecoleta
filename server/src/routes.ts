import express from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import PointsControllers from './controllers/PointsControllers'
import ItensControllers from './controllers/ItensControllers'

const routes = express.Router()
const upload = multer(multerConfig)

const pointsControllers = new PointsControllers()
const itensControllers = new ItensControllers()

//Index - Listagem
//Show - exibir um único registro
//Create Update Delete 
routes.get('/itens',itensControllers.index)

//Post cria ou atualiza (req.body)
routes.post('/points', upload.single('image') , pointsControllers.create)
routes.get('/points', pointsControllers.index)
routes.get('/points/:id', pointsControllers.show)


export default routes