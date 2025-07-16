const router = require('express').Router();

router
  .get('/find_place', async (req, res) => {
    console.log('GET /find_place')

    res.render('widgets/google/find_place', { title: 'Find Place'})

  })

module.exports = router;