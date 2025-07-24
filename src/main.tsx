import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from './context/context.tsx'
import { Providerapi } from './context/contextapi.tsx'


createRoot(document.getElementById('root')!).render(
  
      
<Providerapi>
    <Provider>
        <App />
      </Provider>
</Providerapi>


)
