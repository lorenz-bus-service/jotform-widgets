const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';
const BASE_ID = 'appt6rRawex3xw2RB'

export const getListOfValues = async (baseId, tableId, viewId) => {
  console.log('AirtableService.getListOfValues()')

  // const fields = [
  //   'Employee #',
  //   'Employee Name',
  //   'First Name',
  //   'Last Name',
  // ]

  const params = new URLSearchParams({ view: viewId });
  // fields.forEach(field => params.append('fields[]', field));

  const url = `${AIRTABLE_BASE_URL}/${ baseId }/${ tableId }?${params.toString()}`;
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

export const getTrainees = async () => {
  console.log('AirtableService.getTrainees()')

  // Employees
  const TABLE_ID = 'tbltlNVBPnZRjn6Ka';
  // Jotform - Trainees
  const VIEW_ID = 'viwncTnsln3rQc89e';
  const fields = ['Full Name'];

  const params = new URLSearchParams({ view: VIEW_ID });
  fields.forEach(field => params.append('fields[]', field));  

  const url = `${AIRTABLE_BASE_URL}/${BASE_ID}/${TABLE_ID}?${params.toString()}`;

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
}

export const getTrainers = async () => {
  console.log('AirtableService.getTrainers()')

  // Employees
  const VIEW_ID = 'viwmx8o8MdDgM32ND';
  // Jotform - Trainers
  const TABLE_ID = 'tbltlNVBPnZRjn6Ka';
  const fields = ['Full Name'];

  const params = new URLSearchParams({ view: VIEW_ID });
  fields.forEach(field => params.append('fields[]', field));  

  const url = `${AIRTABLE_BASE_URL}/${BASE_ID}/${TABLE_ID}?${params.toString()}`;

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
}

export const getDocumentTypes = async () => {
  console.log('AirtableService.getDocumentTypes()')

  const TABLE_ID = 'tblkfxKoyzdTr8xbb'; // Document Types
  const VIEW_ID = 'viwMDC5w5aJgvi8ay';  // Training
  const fields = ['Name'];

  const params = new URLSearchParams({ view: VIEW_ID });
  fields.forEach(field => params.append('fields[]', field));  

  const url = `${AIRTABLE_BASE_URL}/${BASE_ID}/${TABLE_ID}?${params.toString()}`;
  console.log('url', url)

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
}