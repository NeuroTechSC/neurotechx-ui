import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";
import Assistant from "./Assistant";

export default () => (
  <Nav navbar className="border-left flex-row">
    <Assistant />
    <Notifications />
    <UserActions />
  </Nav>
);
