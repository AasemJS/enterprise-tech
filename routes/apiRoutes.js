import { Router } from 'express'
const router    = Router()

import { index, store, destroy } from '../controllers/apiControllers.js'

// Routes for get, post, and delete

router.get('/getImages', index)
router.post('/addImages', store)
router.delete('/deleteImages', destroy)

export default router