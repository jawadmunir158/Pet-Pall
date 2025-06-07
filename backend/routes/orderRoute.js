import express from 'express'
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, deleteAllOrders } from '../controllers/orderController.js';

import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

//Admin Auth
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)


//User Feature
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.delete('/clear', adminAuth, deleteAllOrders);


//verify Payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
export default orderRouter




