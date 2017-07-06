import { FoodAppPage } from './app.po';

describe('food-app App', () => {
  let page: FoodAppPage;

  beforeEach(() => {
    page = new FoodAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
