import { GithubTrackerPage } from './app.po';

describe('github-tracker App', function() {
  let page: GithubTrackerPage;

  beforeEach(() => {
    page = new GithubTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
