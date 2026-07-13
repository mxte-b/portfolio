import { createRoot } from 'react-dom/client'
import './assets/styles/index.scss'
import './assets/styles/App.scss'
import { PointerTypeProvider } from './assets/hooks/usePointerType.tsx';
import Portfolio from './assets/pages/Portfolio.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <PointerTypeProvider>
    <Portfolio />
  </PointerTypeProvider>
  // </StrictMode>,
)
