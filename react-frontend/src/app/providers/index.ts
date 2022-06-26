import compose from 'compose-function';
import { withRouter } from './with-router';
import { withAuth } from './withAuth';
import { withOrganization } from './withOrganization';

export const withProviders = compose(withRouter, withAuth, withOrganization);
