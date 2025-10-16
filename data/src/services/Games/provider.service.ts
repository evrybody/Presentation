import axios from "axios";

const options = {
  method: 'POST',
  url: 'qwe',
  headers: {'Content-Type': 'application/json', 'X-REQUEST-SIGN': ''},
  data: {casino_id: 'casino_id_example'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error); // to do rework
});