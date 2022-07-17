import {resizeImage} from '../../services/imageService';
describe('Images are resized', () => {
  it('throws error if image is not present', async () => {
    const filename = 'filedoesnotexists';
    return resizeImage(filename, 200, 200, 'not_needed').catch((err) => {
      expect(err.message).toContain('Input file is missing');
    });
  });
});
