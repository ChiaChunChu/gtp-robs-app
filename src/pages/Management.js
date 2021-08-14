import { Route, Switch } from "react-router-dom";
import ManagementNavigation from "../components/layout/ManagementNavigation";
import CustomersInfo from "../components/CustomersInfo";
import AllBookings from "../components/AllBookings";

function ManagementPage() {
  return (
    <div>
      <ManagementNavigation />
      <Switch>
        <Route path="/management/customers-info">
          <CustomersInfo />
        </Route>
        <Route path="/management/all-bookings">
          <AllBookings />
        </Route>
      </Switch>
    </div>
  );
}

export default ManagementPage;
