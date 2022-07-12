const server = require('../index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Link Endpoints', () => {

    it('POST /getlink should insert into db', async () => {
      const res = await requestWithSupertest.post('/getlink').send({link:'google.com'});
      expect(res.status).toEqual(200);
      expect(res.text.length).toEqual(8);
    });
  
    it('GET /shortUrl should redirect to Url', async () => {
        // fails when using a fresh database
        // Will need to use a valid pair of short:long urls
        const res = await requestWithSupertest.get('/sv5D0Hqm')
        expect(res.statusCode).toEqual(302)
        expect(res.header.location).toEqual('//google.com')
    });

    it('Integration: Redirect successful after insertion', async () => {
        const res1 = await requestWithSupertest.post('/getlink').send({link:'google.com'});
        const res2 = await requestWithSupertest.get('/' + res1.text)
        expect(res1.status).toEqual(200);
        expect(res1.text.length).toEqual(8);
        expect(res2.statusCode).toEqual(302)
        expect(res2.header.location).toEqual('//google.com')
    });

});