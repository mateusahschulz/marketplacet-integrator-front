import { Suspense } from 'react';
import AppRoutes from './routes'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Suspense fallback={<div className='loading'/>}>
      <ToastContainer />
      <AppRoutes />
    </Suspense>
  );
}

export default App;