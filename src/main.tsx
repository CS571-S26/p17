import 'bootstrap/dist/css/bootstrap.min.css';
import '@smastrom/react-rating/style.css';
import './global.css';

import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <App />
    </HashRouter>
);
