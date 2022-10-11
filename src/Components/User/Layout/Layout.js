import React from "react";
import ClientHeader from "../ClientHeader/ClientHeader";

const Layout = (props) => {
  return (
    <div>
      <ClientHeader />
      <main>
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;
