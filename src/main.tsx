import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from '@/context/AuthProvider.tsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
