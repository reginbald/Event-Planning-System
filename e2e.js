require('chromedriver');
var webdriver = require('selenium-webdriver'),
    	By = webdriver.By,
	until = webdriver.until;

var driver = new webdriver.Builder()
	.forBrowser('chrome')
	.build();

driver.get('https://event-planning-sep.herokuapp.com/');

driver.findElement(By.name('username')).sendKeys('janet');
driver.findElement(By.name('password')).sendKeys('janet');

driver.findElement(By.xpath("//*[contains(text(), 'Login')]")).click();
driver.sleep(500);
check_url();
function check_url() {
  var url = driver.getCurrentUrl().then( function(url) {
    if(url === 'https://event-planning-sep.herokuapp.com/profile') {
      console.log('TEST 1: SUCCESS');
      return true;
    }
    else {
      console.log("TEST 1: FAIL - " + url);
    }
  });
  return url;
}
driver.sleep(500);
driver.findElement(By.xpath("//*[contains(text(), 'Create client')]")).click();
driver.sleep(500);
driver.findElement(By.name('name')).sendKeys('SELENIUM');
driver.sleep(500);
driver.findElement(By.name('email')).sendKeys('SELENIUM@selenium.is');
driver.sleep(500);
driver.findElement(By.xpath("//*[contains(text(), 'Submit')]")).click();
driver.sleep(500);
driver.findElement(By.xpath("//*[contains(text(), 'Clients')]")).click();
driver.sleep(500);
var isPresent = driver.findElements(By.xpath("//*[contains(text(), 'SELENIUM')]")).then( function(elem){
  if(elem.length > 0){
  console.log('TEST 2: SUCCESS ');
  }
  else{
    console.log('TEST 2: FAILURE');
  }
});
