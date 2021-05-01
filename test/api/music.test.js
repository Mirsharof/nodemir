const chai = require('chai');
const chaihttp = require('chai-http');
const { token } = require('../../app');
const should = chai.should();
const server = require('../../app');
chai.use(chaihttp);

describe('music sahifani test qildik', () => {

    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'bohodir', password: '12345' })
            .end((err, res) => {
                const token = res.body.token
                console.log(token);
                done()
            })
    })
    describe('get music', () => {
        it('get metodi orqali bosh sahifani test qildik', (done) => {
            chai.request(server)
            .get('/music')
            .send("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
        })
      })
    
    // post sorov orqali yangi ma'lumot kiritishni test qilish
    describe('post music', () => {
        it('post metodi orqali bosh sahifani test qildik', (done) => {
           const music ={
               title:'musiqa nomi',
                category: 'nomalum',
                country:'uzbekistan',
                year:1999,
                director_id:'608184d798bf6f24487a4e8f',
                imdb_score:2
           }
            chai.request(server)
            .post('/music')
            .send(music)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('title')
                res.body.should.have.property('category')
                res.body.should.have.property('country')
                res.body.should.have.property('year')
                res.body.should.have.property('director_id')
                res.body.should.have.property('imdb_score')
                done()
            })
        })
      
    });
});