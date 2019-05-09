const express = require("express");

const { getLeagueInfo, updateLeagueInfo } = require('../controllers/league')

const router = express.Router();
router.get('/', getLeagueInfo)
router.post('/post', updateLeagueInfo) // post: from frontend you post to the backend

module.exports = router