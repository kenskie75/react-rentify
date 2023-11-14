
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { Routes } from '../../types/Routes.enum';
import AdminDashboard from '../../pages/admin/admindashboard';
import SideNavigation from '../../component/SideNavigation';
import Requests from '../../pages/admin/Requests';

export default function AdminRoute() {
  return (
    <>
    <SideNavigation>
    <ReactRoutes>
        <Route
            path={Routes.HOME}
            element={<AdminDashboard/>}
            
        />
        <Route
          path={Routes.OWNER_REQUEST}
          element={<Requests/>}
        />
       
    </ReactRoutes>
    </SideNavigation>
    </>
  )
}
