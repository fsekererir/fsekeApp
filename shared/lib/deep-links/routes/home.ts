import { DEFAULT_ROUTE, Route } from './route';

export default new Route({
  pathname: '/home',
  getTitle: () => 'deepLink_theHomePage',
  handler: () => ({ path: DEFAULT_ROUTE, query: new URLSearchParams() }),
});
