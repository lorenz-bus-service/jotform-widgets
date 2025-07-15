const bamboohrService = require('../services/bamboohr_service')
const router = require('express').Router();

router
  .get('/find_employee', async (req, res) => {
    console.log('GET /find_employee')

    const data = await bamboohrService.getEmployeeList()

    res.render(`widgets/bamboohr/find_employee`, { title: 'Find Employee', employees: data.employees})

  })

module.exports = router;