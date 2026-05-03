/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';
import { UsageProvider } from './components/UsageProvider';
import { CookieConsent } from './components/CookieConsent';

export default function App() {
  return (
    <BrowserRouter>
      <UsageProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tools/:id" element={<ToolPage />} />
          </Route>
        </Routes>
        <CookieConsent />
      </UsageProvider>
    </BrowserRouter>
  );
}
