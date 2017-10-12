import { Ng4TranslationsPage } from './app.po';

describe('ng4-translations App', () => {
  let page: Ng4TranslationsPage;

  beforeEach(() => {
    page = new Ng4TranslationsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
