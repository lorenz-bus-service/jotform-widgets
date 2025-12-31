import { registerCachedResource } from '../utils/cache_manager.js';

const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';

const EMPLOYEES_BASE = 'appt6rRawex3xw2RB'

const EMPLOYEES_TABLE = 'tbltlNVBPnZRjn6Ka';
const JOTFORM_TRAINEES_VIEW = 'viwncTnsln3rQc89e';
const JOTFORM_TRAINERS_VIEW = 'viwmx8o8MdDgM32ND';

const DOCUMENT_TYPES_TABLE = 'tblkfxKoyzdTr8xbb';
const TRAINING_VIEW = 'viwMDC5w5aJgvi8ay';

export const getListOfValues = async (baseId, tableId, viewId, fields) => {
  console.log('AirtableService.getListOfValues()')

  const params = new URLSearchParams({ view: viewId });
  fields.forEach(field => params.append('fields[]', field));

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

// Register them with the cache manager
const traineeCache = registerCachedResource('trainees', () => getListOfValues(EMPLOYEES_BASE, EMPLOYEES_TABLE, JOTFORM_TRAINEES_VIEW, ['Full Name']));
const trainerCache = registerCachedResource('trainers', () => getListOfValues(EMPLOYEES_BASE, EMPLOYEES_TABLE, JOTFORM_TRAINERS_VIEW, ['Full Name']));

export const getTrainees = async () => {
  console.log('AirtableService.getTrainees()')
  return await traineeCache.get()
  // return await getListOfValues(EMPLOYEES_BASE, EMPLOYEES_TABLE, JOTFORM_TRAINEES_VIEW, ['Full Name']);
}

export const getTrainers = async () => {
  console.log('AirtableService.getTrainers()')
  return await trainerCache.get()
  // return await getListOfValues(EMPLOYEES_BASE, EMPLOYEES_TABLE, JOTFORM_TRAINERS_VIEW, ['Full Name']);
}

export const getDocumentTypes = async () => {
  console.log('AirtableService.getDocumentTypes()')
  return await getListOfValues(EMPLOYEES_BASE, DOCUMENT_TYPES_TABLE, TRAINING_VIEW, ['Name']);
}

export const forceRefreshAll = async () => {
  console.log('AirtableService.forceRefreshAll()')
  await Promise.all([traineeCache.refresh(), trainerCache.refresh()]);
}

export const initCache = async () => {
    console.log('Pre-loading Airtable data...');
    await Promise.all([
        traineeCache.refresh(),
        trainerCache.refresh()
    ]);
    console.log('Cache Ready.');
};

// --- TRIGGER UPDATE ON STARTUP ---
// console.log('Initializing Airtable Cache...');
// traineeCache.refresh(); 
// trainerCache.refresh();