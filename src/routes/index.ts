import { Router } from 'express'
import userRoutes from '@bhavin-tank/modules/user/user.routes'

const router = Router()

router.use('/users', userRoutes)

export default router
