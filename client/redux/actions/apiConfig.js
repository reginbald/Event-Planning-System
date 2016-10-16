let API_PATH = '';
if(process.env.NODE_ENV === 'production') {
  console.log('production path for api');
  API_PATH = '/api/';
}
else{
  console.log('development path for api');
  API_PATH = 'https://event-planning-sep.herokuapp.com/api/';
}
export default API_PATH;
