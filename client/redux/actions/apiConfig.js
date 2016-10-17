let API_PATH = '';
if(process.env.NODE_ENV === 'production') {
  API_PATH = '/api/';
}
else{
  API_PATH = 'https://event-planning-sep.herokuapp.com/api/';
}
export default API_PATH;
