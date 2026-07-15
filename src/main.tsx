import './assets/styles/index.scss'
import './assets/styles/App.scss'

import Portfolio from './assets/pages/Portfolio.tsx';

import { createRoot } from 'react-dom/client'
import { PointerTypeProvider } from './assets/hooks/usePointerType.tsx';
import { MandelbrotProvider } from './assets/hooks/useMandelbrot.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <PointerTypeProvider>
    <MandelbrotProvider>
      <Portfolio />
    </MandelbrotProvider>
  </PointerTypeProvider>
  // </StrictMode>,
)
