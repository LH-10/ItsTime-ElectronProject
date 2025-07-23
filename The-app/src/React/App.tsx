import { createRoot } from 'react-dom/client';
import AppRoute from './AppRoute';
import { HashRouter } from 'react-router-dom';
const root = createRoot(document.body);
root.render(
    <>
        <HashRouter>
            <AppRoute/>
        </HashRouter>
    </>
);