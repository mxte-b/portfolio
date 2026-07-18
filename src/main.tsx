import './assets/styles/index.scss'
import './assets/styles/App.scss'

import Portfolio from './assets/pages/Portfolio.tsx';

import { createRoot } from 'react-dom/client'
import { DevicePreferencesProvider } from './assets/hooks/useDevicePreferences.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <DevicePreferencesProvider>
    <Portfolio />
  </DevicePreferencesProvider>
  // </StrictMode>,
)
