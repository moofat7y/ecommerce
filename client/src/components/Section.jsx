import React from "react";

const Section = (props) => {
  return (
    <section className={props.className + " py-5"}>
      <div className="container">{props.children}</div>
    </section>
  );
};

export default Section;
