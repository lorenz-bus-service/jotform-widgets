const airtableService = require('../services/airtable_service')
const router = require('express').Router();

router
  .get('/select_list', (req, res) => {
    res.render('widgets/airtable/select_list', { title: 'SELECT LIST' });
  })
  .get('/document_type_select', async (req, res) => {
    console.log('GET /document_type_select')
    const data = await airtableService.getDocumentTypes();

    res.render('widgets/airtable/document_type_select', { title: 'Document Type Select', records: data });
  })
  .get('/trainee_select', async (req, res) => {
    console.log('GET /trainee_select')
    const data = await airtableService.getTrainees();

    res.render('widgets/airtable/trainee_select', { title: 'Trainee Select', records: data });
  })
  .get('/trainer_select', async (req, res) => {
    console.log('GET /trainee_select')
    const data = await airtableService.getTrainers();

    res.render('widgets/airtable/trainer_select', { title: 'Trainer Select', records: data });
  })
  .get('/find_driver', async (req, res) => {
    console.log('GET /find_driver')

    const { baseId, tableId, viewId } = { 
      baseId: 'appt6rRawex3xw2RB', 
      tableId: 'tbltlNVBPnZRjn6Ka', 
      viewId: 'viwncTnsln3rQc89e' // Jotform - Trainees
      // viewId: 'viwmx8o8MdDgM32ND' // Jotform - Trainers
      // viewId: 'viwLpF7HcXq0L5dWP' // Active Employees
    };

    // const { baseId, tableId, viewId } = req.params;

    const data = await airtableService.getListOfValues(baseId, tableId, viewId);

    res.render(`widgets/airtable/find_driver`, { title: 'Find Driver', records: data})

  })

module.exports = router;