const router = require('express').Router();

const auth = require('../../middelWear/auth');
const validationMethod = require('../../middelWear/validation');
const deleteuser = require('./controller/deleteUser');
const allusers = require('./controller/getAllUsers');
const oneuser = require('./controller/getOneUer');
const stats = require('./controller/stats');
const updateuser = require('./controller/updateuser');
const updateValidation = require('./userValidation');

router.get('/allusers', auth(), allusers);
router.get('/oneuser', auth(), oneuser);
router.delete('/deleteuser', auth(), deleteuser);
router.patch(
    '/updateuser',
    validationMethod(updateValidation),
    auth(),
    updateuser
);
router.get('/stats', auth(), stats);

module.exports = router;