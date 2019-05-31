const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder().forBrowser('chrome').build()
const By = webdriver.By
const until = webdriver.until
const url = 'https://www.thespecialone.se/'

const login = async () => {
  await driver.navigate().to(url)
  await driver.findElement(By.name('email')).sendKeys('ronaldo@gmail.com')
  await driver.findElement(By.name('password')).sendKeys('pgebxn')
  return driver.findElement(By.name('login')).click()
}

const shouldVisitHomePage = () => {
  driver.navigate().to(url)
    .then(() => driver.findElement(By.tagName('h2')))
    .then(h2 => h2.getAttribute('innerText'))
    .then(title => {
      console.log('\nTestfall Landnings sida')
      title === 'Login'
        ? console.log('Test Success! - Should navigate to landing page www.thespecialone.se')
        : console.log('Test Failed! - Should navigate to landing page www.thespecialone.se')
    })
    .then(() => findElements('nav-item'))
    .then(navs => {
      navs.length === 3
        ? console.log('Test Success! - Should be 3 nav links')
        : console.log('Test Failed! - Should be 3 nav links')
      navs[1] === 'Login'
        ? console.log('Test Success! - Navlink 2 should be Login')
        : console.log('Test Failed! - Navlink 2 should be Login')
      navs[2] === 'Register'
        ? console.log('Test Success! - Navlink 3 should be Register')
        : console.log('Test Failed! - Navlink 3 should be Register')
    })
}

function testingRoutes () {
  login()
    .then(() => driver.wait(until.elementLocated(By.tagName('h1')))
      .then(h1 => h1.getAttribute('innerText')))
    .then(text => {
      console.log('\nTestfall Login Användare')
      text === 'Home'
        ? console.log('Test Success! - Should Login user')
        : console.log('Test Failed! - Should Login user')
    })
    .then(() => gethTag('manager-name', 'h3'))
    .then(text => {
      text === 'Welcome Christiano Ronaldo!'
        ? console.log('Test Success! - Logged in user should be Christiano Ronaldo')
        : console.log('Test Failed! - Logged in user should be Christiano Ronaldo')
    })
    .then(() => findElements('nav-link'))
    .then(navs => {
      navs[0] === 'Home'
        ? console.log('Test Success! - Navlink 1 should be Home')
        : console.log('Test Failed! - Navlink 1 should be Home')
      navs[1] === 'Manager'
        ? console.log('Test Success! - Navlink 2 should be Manager')
        : console.log('Test Failed! - Navlink 2 should be Manager')
      navs[2] === 'Players'
        ? console.log('Test Success! - Navlink 3 should be Players')
        : console.log('Test Failed! - Navlink 3 should be Players')
      navs[3] === 'Matches'
        ? console.log('Test Success! - Navlink 4 should be Matches')
        : console.log('Test Failed! - Navlink 4 should be Matches')
      navs[4] === 'Training'
        ? console.log('Test Success! - Navlink 5 should be Training')
        : console.log('Test Failed! - Navlink 5 should be Training')
    })
    .then(() => findText('logout'))
    .then(text => {
      text === 'Logout'
        ? console.log('Test Success! - Should be a logout button in navbar')
        : console.log('Test Failed! - Should be a logout button in navbar')
    })
    .then(() => gethTag('player', 'h1'))
    .then(text => {
      console.log('\nTestfall Player Sida')
      text === 'Players'
        ? console.log('Test Success! - Should navigate to Player Page')
        : console.log('Test Failed! - Should navigate to Player Page')
    })
    .then(() => findElements('card'))
    .then(text => {
      text[0].includes('Aggression')
        ? console.log('Test Success! - First player should have Aggression as an attribut')
        : console.log('Test Failed! - First player should have Aggression as an attribut')
      text[1].includes('Aggression')
        ? console.log('Test Success! - Second player should have Aggression as an attribut')
        : console.log('Test Failed! - Second player should have Aggression as an attribut')
    })
    .then(() => findElements('player-name'))
    .then(players => {
      players[0] === 'Cole Moran'
        ? console.log('Test Success! - First player name on page should be Cole Moran')
        : console.log('Test Failed! - First player name on page should be Cole Moran')
      players[1] === 'Gerald Risaliti'
        ? console.log('Test Success! - Second players name on page should be Gerald Risaliti')
        : console.log('Test Failed! - Second player name on page should be Gerald Risaliti')
    })
    .then(() => gethTag('manager', 'h1'))
    .then(text => {
      console.log('\nTestfall Manager Sida')
      text === 'Manager'
        ? console.log('Test Success! - Should navigate to Manager Page')
        : console.log('Test Failed! - Should navigate to Manager Page')
    })
    .then(() => findText('owner'))
    .then(text => {
      text === 'Christiano Ronaldo'
        ? console.log('Test Success! - Should have a manager card with Christiano Ronaldo name as h2')
        : console.log('Test Failed! - Should have a manager card with Christiano Ronaldo name as h2')
    })
    .then(() => findText('edit-profile'))
    .then(text => {
      text === 'Edit profile'
        ? console.log('Test Success! - Should have a button "Edit profile"')
        : console.log('Test Failed! - Should have a button "Edit profile"')
    })
    .then(() => driver.findElement(By.name('comment')).sendKeys('Selenium Webdriver'))
    .then(() => driver.findElement(By.name('send-comment')).click())
    .then(() => driver.sleep(500))
    .then(() => findElements('comment-area'))
    .then(text => {
      text.includes('Selenium Webdriver')
        ? console.log('Test Success! - Should post a comment "Selenium Webdriver" to kalles comments')
        : console.log('Test Failed! - Should post a comment "Selenium Webdriver" to kalles comments')
    })
    .then(() => gethTag('training', 'h1'))
    .then(text => {
      console.log('\nTestfall Training Sida')
      text === 'Training'
        ? console.log('Test Success! - Should navigate to Training Page')
        : console.log('Test Failed! - Should navigate to Training Page')
    })
    .then(() => findText('training-points'))
    .then(text => {
      text.substring(0, 15) === 'Training Points'
        ? console.log('Test Success! - Should display managers training points')
        : console.log('Test Failed! - Should display managers training points')
    })
    .then(() => findElements('option'))
    .then(text => {
      Array.isArray(text)
        ? console.log('Test Success! - Should show a list of players')
        : console.log('Test Failed! - Should show a list of players')
      text[0] === 'Cole Moran'
        ? console.log('Test Success! - Should show a list of players where the first name is Cole Moran')
        : console.log('Test Failed! - Should show a list of players where the first name is Cole Moran')
    })
    .then(() => gethTag('matches', 'h1'))
    .then(text => {
      console.log('\nTestfall Matches Sida')
      text === 'Matches'
        ? console.log('Test Success! - Should navigate to Matches Page')
        : console.log('Test Failed! - Should navigate to Matches Page')
    })
    .then(() => findElements('manager-card'))
    .then(text => {
      Array.isArray(text)
        ? console.log('Test Success! - Should show a list of teams')
        : console.log('Test Failed! - Should show a list of teams')
      const team = text[0].split('\n')
      team[0] === 'Maradona FC'
        ? console.log('Test Success! - Should show a list of teams where the first team name is "Maradona FC"')
        : console.log('Test Failed! - Should show a list of teams where the first team name is "Maradona FC"')
      team[2] === 'Diego Maradona'
        ? console.log('Test Success! - Should show a list of teams where the first username is "Diego Maradona"')
        : console.log('Test Failed! - Should show a list of teams where the first username is "Diego Maradona"')
    })
    .then(() => driver.quit())
}

async function gethTag (name, h1) {
  await driver.findElement(By.name(name)).click()
  const tag = await driver.wait(until.elementLocated(By.tagName(h1)))
  return tag.getAttribute('innerText')
}

function findElements (name) {
  return new Promise((resolve, reject) => {
    driver.wait(until.elementLocated(By.className(name)))
      .then(() => driver.findElements(By.className(name)))
      .then(elements => Promise.all(elements.map(p => p.getAttribute('innerText'))))
      .then(p => resolve(p))
  })
}

async function findText (text) {
  const tag = await driver.wait(until.elementLocated(By.name(text)))
  return tag.getAttribute('innerText')
}

shouldVisitHomePage()
testingRoutes()
