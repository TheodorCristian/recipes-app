import React from "react";

const Layout = (props) => {
  return (
    <div>
      <main>
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;
