import compose from 'compose-function';
import { withRouter } from './with-router';
import { withAuth } from './withAuth';

export const withProviders = compose(withRouter, withAuth);
