import Vehicles from '../../pages/customer/vehicles'
import { Routes as ReactRoutes,Route } from 'react-router-dom';
import { Routes } from '../../types/Routes.enum';
import Vehicle from '../../pages/customer/vehicles/vehicle/inde';

export default function Renter() {
  return (
    <ReactRoutes>
        <Route
            path={Routes.HOME}
            element={<Vehicles/>}
        />
        <Route
            path={`${Routes.VEHICLE}/:id`}
            element={<Vehicle/>}
        />
    </ReactRoutes>
  )
}
