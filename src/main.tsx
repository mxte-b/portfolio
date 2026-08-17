import './assets/styles/index.scss'
import './assets/styles/App.scss'

import Portfolio from './assets/pages/Portfolio.tsx';

import { createRoot } from 'react-dom/client'
import { DevicePreferencesProvider } from './assets/hooks/useDevicePreferences.tsx';
import { WaypointRouterProvider } from './assets/hooks/useWaypointRouter.tsx';
import { LoaderProvider } from './assets/hooks/useLoader.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <DevicePreferencesProvider>
    <LoaderProvider>
      <WaypointRouterProvider>
        <Portfolio />
      </WaypointRouterProvider>
    </LoaderProvider>
  </DevicePreferencesProvider>
  // </StrictMode>,
)
