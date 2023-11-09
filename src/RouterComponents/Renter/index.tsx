import Vehicles from '../../pages/customer/vehicles';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { Routes } from '../../types/Routes.enum';
import Vehicle from '../../pages/customer/vehicles/vehicle/inde';
import MyTransactions from '../../pages/customer/mytransactions';
import Booking from '../../pages/owner/bookings/booking';
import ViewDestinationMaps from '../../pages/owner/bookings/ViewDestinationMaps';
import RegisterOwner from '../../pages/customer/registerowner';
import Profile from '../../pages/profile';

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
        <Route
          path={Routes.TRANSACTIONS}
          element={<MyTransactions/>}
        />

        <Route path={Routes.BOOKING+"/:id"} element={<Booking/>}/>
        <Route
          path={`${Routes.SHOW_MAPS}/:id`}
          element={<ViewDestinationMaps/>}
        />
        <Route
          path={Routes.REGISTER_OWNER}
          element={<RegisterOwner/>}
        />
        <Route
          path={Routes.PROFILE}
          element={<Profile/>}
        />
    </ReactRoutes>
  )
}
