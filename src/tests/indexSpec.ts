/*
1. add supatest for testing presence of api route
2. add test for successful conversion of the image.
3. add test for file which does not exist.
4. add test that cached file is returned


*/

import request from 'supertest';
import app from '../index';

describe('Image resize API', () => {
  it('endpoint /api/images exists', () => {
    return request(app).get('/api/images').expect(400);
  });

  it('/api/images return 400 if filename not supplied', () => {
    return request(app).get('/api/images?width=200&height=200').expect(400);
  });
  it('/api/images return 400 if height or width is not supplied', () => {
    return request(app)
      .get('/api/images?filename=argentina&height=200')
      .expect(400);
  });
  it('/api/images return 404 if file with provided filename does not exists', () => {
    return request(app)
      .get('/api/images?filename=filethatdoesnotexists&width=200&height=200')
      .expect(404);
  });
  it('/api/images return 200 if all parameters are correct', () => {
    return request(app)
      .get('/api/images?filename=fjord&width=200&height=200')
      .expect(200);
  });
});
