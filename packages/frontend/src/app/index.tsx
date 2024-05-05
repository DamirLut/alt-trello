import { render } from 'preact';

import { Providers } from './providers';

import 'ui/global.scss';

const root = document.getElementById('root');
if (!root) throw new Error('root container not found');

render(<Providers />, root);
