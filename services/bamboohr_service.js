export const getEmployeeList = async () => {
  console.log('BambooHrService.getEmployeeList()')

  const url = `https://api.bamboohr.com/api/gateway.php/${ process.env.BAMBOOHR_API_SUBDOMAIN }/v1/employees/directory`
  console.log('url',url)
  
  return await fetch(url,{
      method: 'GET', 
      headers: {
          Accept: 'application/json',
          Authorization: "Basic " + Buffer.from(process.env.BAMBOOHR_API_KEY + ":password").toString('base64')
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
