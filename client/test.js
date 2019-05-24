const webdriver = require('selenium-webdriver')
const { describe, it } = require('mocha')
const { expect } = require('chai')

const driver = new webdriver.Builder().forBrowser('chrome').build()
const By = webdriver.By
const until = webdriver.until
const url = 'http://localhost:3000/'

const login = () => {
  return driver.navigate().to(url)
    .then(() => driver.findElement(By.name('email')).sendKeys('kalle@gmail.com')
      .then(() => driver.findElement(By.name('password')).sendKeys('pgebxn'))
      .then(() => driver.findElement(By.name('login')).click())
      .then(() => driver.wait(until.elementLocated(By.tagName('h1')))
        .then(h1 => h1.getAttribute('innerText')))
      .then(text => {
        expect(text).to.equal('Home', 'You are logged in')
      }))
}

describe('home page', () => {
  it('should visit home page ', () => {
    return driver.navigate().to(url)
      .then(() => driver.findElement(By.tagName('h2'))
        .then(h2 => h2.getAttribute('innerText'))
        .then(title => {
          expect(title).to.equal('Login')
        }))
  })
})

describe('Login user', () => {
  it('should login user', () => {
    login()
      .then(() => driver.findElement(By.name('player')).click())
      .then(() => driver.wait(until.elementLocated(By.tagName('h1'))))
      .then(h1 => h1.getAttribute('innerText'))
      .then(text => {
        console.log(text)
        expect(text).to.equal('Players')
      })
      .then(() => driver.quit())
  })
})
