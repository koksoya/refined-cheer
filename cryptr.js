const axios = require('axios');

axios.get('https://refined-cheer.firebaseio.com/bornova/-LeH91bmAvAWAxddo98V/00fb06430aed8963d664d8f0af3f6b68ff084ee1c9fadc2a0ccd047d09872444695392bb13ea57a33be9705009573338f036249e6d7a8fbd3ccf5e693432a044f6f663198557600665898131cc34dbc2b61d75dc0658f7e0d77027f1174a7b2c5e07511f271eeed5.json')
  .then(response => console.log(response.data));
