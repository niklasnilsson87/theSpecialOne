const { describe, it } = require('mocha')
const request = require('supertest')
const { expect } = require('chai')

const server = request.agent('http://localhost:3000')
const backend = request.agent('http://localhost:5000')

describe('Calling api/getComment', () => {
  it('Get 200 response on api/getComment', (done) => {
    backend
      .post('/api/getComment')
      .expect(200)
      .send({
        id: '5cbf2d6f4175170e483fee9a'
      })
      .end((err, res) => {
        console.log(res.body)
        if (err) console.log('api/getComment:', err)
        expect(res.status).to.equal(200)
        done()
      })
  })

  // it('should include ID "5cbf2d6f4175170e483fee9a"', (done) => {
  //   backend
  //     .post('/api/getComment')
  //     .expect(200)
  //     .send({
  //       id: '5cbf2d6f4175170e483fee9a'
  //     })
  //     .end((err, res) => {
  //       console.log(res.body)
  //       if (err) console.log('api/getComment:', err)
  //       expect(res.body).to.contain()
  //       done()
  //     })
  // })
})

describe(`Calling root ('/')`, () => {
  it('GET 200 response on root', (done) => {
    server
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.status).to.equal(200)
        done()
      })
  })
})

describe('Calling api/players', () => {
  it('Get 200 response on api/players', (done) => {
    backend
      .post('/api/players')
      .expect(200)
      .send({
        id: '5cbdc374734115161445abbf'
      })
      .end((err, res) => {
        // console.log(res)
        if (err) console.log('api/players:', err)
        expect(res.status).to.equal(200)
        done()
      })
  })
})

describe('1.2 Testfall M.1 Login', () => {
  it('Should send status 200 if login success', (done) => {
    backend
      .post('/api/login')
      .send({
        email: 'niklas@gmail.com',
        password: 'pgebxn'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log('failing login: ', err)
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('Should send status 400 if login fails', (done) => {
    backend
      .post('/api/login')
      .send({
        email: 'niklas@gmail.com',
        password: 'wrongPassword'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log('failing login: ', err)
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('Should send object message "msg: User does not exist" if user not found in DB ', (done) => {
    backend
      .post('/api/login')
      .send({
        email: 'usernotfound@gmail.com',
        password: '1234'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log('failing login: ', err)
        expect(res.res.text).to.equal(`{"msg":"User does not exist"}`)
        done()
      })
  })

  it('Should send object message "msg: Please enter all fields" if no fields are passed', (done) => {
    backend
      .post('/api/login')
      .send({
        email: '',
        password: ''
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log('failing login: ', err)
        expect(res.res.text).to.equal(`{"msg":"Please enter all fields"}`)
        done()
      })
  })

  it('Should send object message "msg: Invalid credentials" if password does not match', (done) => {
    backend
      .post('/api/login')
      .send({
        email: 'niklas@gmail.com',
        password: 'jibber'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log('failing login: ', err)
        expect(res.res.text).to.equal(`{"msg":"Invalid credentials"}`)
        done()
      })
  })

  it('Should respond with id, name, email, teamName if login success', (done) => {
    backend
      .post('/api/login')
      .send({
        email: 'niklas@gmail.com',
        password: 'pgebxn'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log('failing login: ', err)
        delete res.body.user.description
        expect(res.body.user).to.deep.equal(
          { 'id': '5cbf1df9430c070d80cb5c0b',
            'name': 'Niklas Nilsson',
            'email': 'niklas@gmail.com',
            'teamName': 'Janglers IF',
            'favTeam': '',
            'favPlayer': '' })
        done()
      })
  })
})
