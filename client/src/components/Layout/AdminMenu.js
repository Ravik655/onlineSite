import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin panel</h4>
          <NavLink
            to="/Dashboard/Admin/Create-Category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/Dashboard/Admin/Create-Product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/Dashboard/Admin/Product"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/Dashboard/Admin/Order"
            className="list-group-item list-group-item-action"
          >
            Order
          </NavLink>
          <NavLink
            to="/Dashboard/Admin/Create-Users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
