const { describe, it } = require('mocha')
const request = require('supertest')
const { expect } = require('chai')

const backend = request.agent('http://localhost:5000')

// Holds the token to send with post request.
let token = ''

describe('1.2 Testfall M.1 Login', () => {
  it('Should send status 200 if login success', (done) => {
    backend
      .post('/api/login')
      .send({
        email: 'ronaldo@gmail.com',
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
        email: 'ronaldo@gmail.com',
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
        email: 'ronaldo@gmail.com',
        password: 'wrongpassword'
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
        email: 'ronaldo@gmail.com',
        password: 'pgebxn'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log('failing login: ', err)
        delete res.body.user.description
        const user = res.body.user
        expect(user).to.contain.property('_id')
        expect(user).to.contain.property('name')
        expect(user).to.contain.property('email')
        expect(user).to.contain.property('teamName')
        expect(user).to.contain.property('favTeam')
        expect(user).to.contain.property('favPlayer')
        expect(user).to.contain.property('totalPoints')
        expect(user).to.contain.property('lastPlayed')
        done()
      })
  })
})

// *************************************************************************************************************************

describe('3.1 Testfall C.17 Server api/comment/', () => {
  it('Get 200 response on api/getComment', (done) => {
    backend
      .post('/api/comment/getComment')
      .set({
        'x-auth-token': token
      })
      .send({
        id: '5ced5bee3138fa15c89116d3'
      })
      .end((err, res) => {
        if (err) console.log('api/comment/getComment:', err)
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('Should return an array of comments to user ID 5ced5bee3138fa15c89116d3', (done) => {
    backend
      .post('/api/comment/getComment')
      .expect(200)
      .set({
        'x-auth-token': token
      })
      .send({
        id: '5ced5bee3138fa15c89116d3'
      })
      .end((err, res) => {
        if (err) console.log('api/comment/getComment:', err)
        expect(res.body).to.be.an.instanceof(Array)
        done()
      })
  })

  it('Should return empty object if no comments found', (done) => {
    backend
      .post('/api/comment/getComment')
      .set({
        'x-auth-token': token
      })
      .send({
        id: 'sadj329ujeasdasdasdasdasdasd'
      })
      .end((err, res) => {
        if (err) console.log('api/comment/getComment:', err)
        expect(res.body.length).to.equal(0)
        done()
      })
  })

  it(`Should respond with a message 'did you forget to write something?' if comments are typed`, (done) => {
    let MockComment = {
      sendTo: '5cde7e4d4394a8537872a8e7',
      userid: '5ced5bee3138fa15c89116d3',
      teamName: 'Real Madrid',
      user: 'Christiano Ronaldo' }

    backend
      .post('/api/comment/')
      .set({
        'x-auth-token': token
      })
      .send(MockComment)
      .end((err, res) => {
        if (err) console.log('api/comment/getComment:', err)
        expect(res.body).to.deep.equal({ msg: 'did you forget to write something?' })
        done()
      })
  })

  it('Should create new comment save it and send back to client', (done) => {
    const comment = {
      sendTo: '5ced5bee3138fa15c89116d3',
      userid: '5ced5bee3138fa15c89116d3',
      comment: 'Server TESTING COMMENT!',
      teamName: 'Real Madrid',
      user: 'Christiano Ronaldo' }
    backend
      .post('/api/comment')
      .set({
        'x-auth-token': token
      })
      .send(comment)
      .end((err, res) => {
        if (err) console.log('api/comment/getComment:', err)
        delete res.body.date
        delete res.body.__v
        delete res.body._id
        expect(res.body).to.contain.property('user')
        expect(res.body).to.contain.property('userid')
        expect(res.body).to.contain.property('sendTo')
        expect(res.body).to.contain.property('comment')
        expect(res.body).to.contain.property('teamName')
        done()
      })
  })
})

describe('2.1 Testfall M.2 Server api/players', () => {
  it('Get 200 response on api/players', (done) => {
    backend
      .post('/api/players')
      .set({
        'x-auth-token': token
      })
      .expect(200)
      .send({
        id: '5ced5bee3138fa15c89116d3'
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
        id: '5ced5bee3138fa15c89116d3'
      })
      .end((err, res) => {
        if (err) console.log('api/getComment:', err)
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('Should send empty object if no players found"', (done) => {
    backend
      .post('/api/players')
      .set({
        'x-auth-token': token
      })
      .expect(200)
      .send({
        id: '5cde7e4d439341sa4a8537872a8e7'
      })
      .end((err, res) => {
        if (err) console.log(err)
        expect(res.body.length).to.equal(0)
        done()
      })
  })
})

describe('4.1 Testfall M.3 Server api/edit', () => {
  it('Get 200 response on api/edit', (done) => {
    backend
      .get('/api/edit')
      .set({
        'x-auth-token': token
      })
      .expect(200)
      .end((err, res) => {
        if (err) console.log('api/edit:', err)
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('Should respond with an array of all users in database', (done) => {
    backend
      .get('/api/edit')
      .set({
        'x-auth-token': token
      })
      .expect(200)
      .end((err, res) => {
        if (err) console.log('api/edit:', err)
        expect(res.body).to.be.an.instanceof(Array)
        done()
      })
  })
  describe('4.2 Testfall M.12 edit manager', () => {
    it('Should respond edited info about user', (done) => {
      const MockEditUser = {
        desc: 'Välkommen test',
        favPlayer: 'Thiago',
        favTeam: 'Örebro SK',
        email: 'ronaldo@gmail.com'
      }
      backend
        .post('/api/edit')
        .set({
          'x-auth-token': token
        })
        .expect(200)
        .send(MockEditUser)
        .end((err, res) => {
          if (err) console.log('api/edit:', err)
          expect(res.body).to.contain.property('description')
          expect(res.body).to.contain.property('favPlayer')
          expect(res.body).to.contain.property('favTeam')
          expect(res.body).to.contain.property('email')
          done()
        })
    })
  })
})
