import { Suspense } from 'react';
import AppRoutes from './routes'

function App() {
  return (
    <Suspense fallback={<div className='loading'/>}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;