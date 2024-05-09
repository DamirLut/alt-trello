import ReactDOM from 'react-dom/client';

import { Providers } from './providers';

import 'ui/global.scss';

const root = document.getElementById('root');
if (!root) throw new Error('root container not found');

ReactDOM.createRoot(root).render(<Providers />);
