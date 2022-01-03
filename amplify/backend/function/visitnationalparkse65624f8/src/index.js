//Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk')

const {Parameters} = await new aws.SSM()
  .getParameters({
    Names: ['API_KEY'].map((secretName) => process.env[secretName]),
    WithDecryption: true,
  })
  .promise()

// Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]

exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify('Hello from Lambda!'),
  }
  return response
}
