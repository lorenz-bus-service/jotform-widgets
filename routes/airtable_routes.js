const airtableService = require('../services/airtable_service')
const router = require('express').Router();

router
  .get('/find_driver', async (req, res) => {
    console.log('GET /find_driver')

    const data = await airtableService.getDriverList()

    res.render(`widgets/airtable/find_driver`, { title: 'Find Driver', records: data})

  })

module.exports = router;