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
        if (err) console.log('api/getComment:', err)
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('should include ID "5cc84d74633bb07638436d71"', (done) => {
    backend
      .post('/api/getComment')
      .expect(200)
      .send({
        id: '5cc84d74633bb07638436d71'
      })
      .end((err, res) => {
        if (err) console.log('api/getComment:', err)
        expect(res.body).to.deep.include({
          '_id': '5cc9a9d0961b0b5d7880f1e4',
          'user': 'Kalle Karlsson',
          'userid': '5cc84d74633bb07638436d71',
          'comment': 'Tjena Kalle!',
          'teamName': 'Janglers IF',
          'date': '2019-05-01T14:14:40.268Z',
          '__v': 0 })
        done()
      })
  })

  it('Should return empty if no comments found', (done) => {
    backend
      .post('/api/getComment')
      .send({
        id: 'sadj329ujeasdasdasdasdasdasd'
      })
      .end((err, res) => {
        if (err) console.log('api/getComment:', err)
        expect(res.body).to.be.an('array').that.is.empty
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
      .expect(200)
      .send({
        id: '5cbdc374734115161445abbf'
      })
      .end((err, res) => {
        if (err) console.log('api/players:', err)
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('Should include an array of players"', (done) => {
    backend
      .post('/api/getComment')
      .expect(200)
      .send({
        id: '5cc84d74633bb07638436d71'
      })
      .end((err, res) => {
        if (err) console.log('api/getComment:', err)
        expect(res.body).to.be.an('array')
        done()
      })
  })
})
