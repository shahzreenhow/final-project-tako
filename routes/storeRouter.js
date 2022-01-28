const router = require('express').Router()
const storeCtrl = require('../controllers/storeCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/stores')
    .get(storeCtrl.getStores)
    .post(auth, authAdmin, storeCtrl.createStore)


router.route('/stores/:id')
    .delete(auth, authAdmin, storeCtrl.deleteStore)
    .put(auth, authAdmin, storeCtrl.updateStore)



module.exports = router