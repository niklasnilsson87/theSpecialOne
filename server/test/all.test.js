const { describe, it } = require('mocha')
const request = require('supertest')
const { expect } = require('chai')

const server = request.agent('http://localhost:3000')
const backend = request.agent('http://localhost:5000')

let token = ''

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
        token = res.body.token
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
          { '_id': '5cde7e4d4394a8537872a8e7',
            'name': 'Niklas Nilsson',
            'email': 'niklas@gmail.com',
            'teamName': 'Janglers IF',
            'favTeam': 'Manchester',
            'favPlayer': 'Christiano Ronaldo',
            'totalPoints': 58,
            'lastPlayed': 1558100400404 })
        done()
      })
  })
})

// *************************************************************************************************************************

describe('Calling api/comment/getComment', () => {
  it('Get 200 response on api/getComment', (done) => {
    backend
      .post('/api/comment/getComment')
      .set({
        'x-auth-token': token
      })
      .send({
        id: '5cde7e4d4394a8537872a8e7'
      })
      .end((err, res) => {
        if (err) console.log('api/comment/getComment:', err)
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('should return an array of comments to user ID 5cde7e4d4394a8537872a8e7', (done) => {
    backend
      .post('/api/comment/getComment')
      .expect(200)
      .set({
        'x-auth-token': token
      })
      .send({
        id: '5cde7e4d4394a8537872a8e7'
      })
      .end((err, res) => {
        if (err) console.log('api/comment/getComment:', err)
        expect(res.body).to.be.an.instanceof(Array)
        done()
      })
  })

  it('Should return empty object if no comments found', (done) => {
    backend
      .post('/api/getComment')
      .send({
        id: 'sadj329ujeasdasdasdasdasdasd'
      })
      .end((err, res) => {
        if (err) console.log('api/comment/getComment:', err)
        expect(res.body).to.be.an('object').that.is.empty
        done()
      })
  })
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
      .set({
        'x-auth-token': token
      })
      .expect(200)
      .send({
        id: '5cde7e4d4394a8537872a8e7'
      })
      .end((err, res) => {
        if (err) console.log('api/players:', err)
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('Should include an array of players"', (done) => {
    backend
      .post('/api/players')
      .set({
        'x-auth-token': token
      })
      .expect(200)
      .send({
        id: '5cde7e4d4394a8537872a8e7'
      })
      .end((err, res) => {
        // console.log(res.body)
        if (err) console.log('api/getComment:', err)
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('Should send 404 if players not found"', (done) => {
    backend
      .post('/api/players')
      .set({
        'x-auth-token': token
      })
      .expect(400)
      .send({
        id: '5cde7e4d4393414a8537872a8e7'
      })
      .end((err, res) => {
        console.log(res.body)
        if (err) console.log(err)
        expect(res.body).to.equal([])
        done()
      })
  })
})
