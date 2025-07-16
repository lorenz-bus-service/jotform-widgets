const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';
const BASE_ID = 'appt6rRawex3xw2RB'

export const getDriverList = async () => {
  console.log('AirtableService.getDriverList()')

  const TABLE_EMPLOYEE = 'tbltlNVBPnZRjn6Ka'
  const VIEW_ACTIVE_EMPLOYEES = 'viwLpF7HcXq0L5dWP'

  const fields = [
    'Employee #',
    'Employee Name',
    'First Name',
    'Last Name',
  ]

  const params = new URLSearchParams({ view: VIEW_ACTIVE_EMPLOYEES });
  fields.forEach(field => params.append('fields[]', field));
  const url = `${AIRTABLE_BASE_URL}/${BASE_ID}/${TABLE_EMPLOYEE}?${params.toString()}`;
  
  // const url = `${ AIRTABLE_BASE_URL }/${ BASE_ID }/${ TABLE_EMPLOYEE }?view=${ VIEW_ACTIVE_EMPLOYEES }&fields%5B%5D=Employee+%23&fields%5B%5D=Employee+Name`
  console.log('url',url)
  
  let allRecords = [];
  let offset = undefined;

  do {

    const pageUrl = offset ? `${url}&offset=${encodeURIComponent(offset)}` : url;
    const response = await fetch(pageUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data.records)) {
      allRecords = allRecords.concat(data.records);
    }
    offset = data.offset;

  } while (offset);

  return allRecords;

};
