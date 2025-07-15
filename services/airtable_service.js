const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';
const BASE_ID = 'appt6rRawex3xw2RB'

export const getDriverList = async () => {
  console.log('AirtableService.getDriverList()')

  const TABLE_EMPLOYEE = 'tbltlNVBPnZRjn6Ka'
  const VIEW_ACTIVE_EMPLOYEES = 'viwLpF7HcXq0L5dWP'

  const url = `${ AIRTABLE_BASE_URL }/${ BASE_ID }/${ TABLE_EMPLOYEE }?view=${ VIEW_ACTIVE_EMPLOYEES }&fields%5B%5D=Employee+%23&fields%5B%5D=Employee+Name`
  console.log('url',url)
  
  return await fetch(url,{
      method: 'GET', 
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
      }
    }
  )
  .then(response => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((data) => data)

};
