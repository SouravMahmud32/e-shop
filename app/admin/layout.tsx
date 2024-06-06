import { title } from "process";
import React from "react";
import AdminNav from "../components/admin/AdminNav";


export const metadata = {
    title: 'E-Shop Admin',
    description: 'E-Shop Admin Dashboard'
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav></AdminNav>
      {children}
    </div>
  );
};

export default AdminLayout;
