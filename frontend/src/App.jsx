import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
    const location = useLocation();

   useEffect(() => {
    try {
      console.log(location);
      
      // your analytics call here, e.g. gtag('event', 'page_view', ...)
    } catch (e) {
      console.warn('Analytics error suppressed', e);
    }
  }, [location]);
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App