const router = require('express').Router();

const { loadUsersValidate } = require('../utils/validity');
const { infoUsers, loadUsers } = require('../controllers/users');

router.get('/me', infoUsers);
router.patch('/me', loadUsersValidate, loadUsers);

module.exports = router;