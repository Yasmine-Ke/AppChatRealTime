const express = require('express');
const router = express.Router();
const { Sentinvitchat} = require('../controllers/InvitationController');
const { getConversation } = require('../controllers/InvitationController');
const { RejectInvit } = require('../controllers/InvitationController');
const { AcceptInvit } = require('../controllers/InvitationController');
const { sendGroupInvitation } = require('../controllers/InvitationController');
const { AcceptInvitGroupe } = require('../controllers/InvitationController');

router.get('/get', getConversation);
router.post('/update', AcceptInvit);
router.post('/delete',RejectInvit);
router.post('/Sentinvi', Sentinvitchat);
router.post('/Sentinvigroup', sendGroupInvitation);
router.get('/AcceptInvGroupe', AcceptInvitGroupe);


module.exports = router;
