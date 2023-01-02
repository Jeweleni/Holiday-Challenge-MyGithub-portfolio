import React from "react";
// import { Link } from "react-router-dom";

const User = ({ id, name, description, chooseRepo, html_url }) => {
  
  
  return (
    // <Link to={`/portfolio/${id}`}>
      <div
        
        id="user-data"
        style={{
          border: "2px",
          backgroundColor: "white",
          borderRadius: "10px",
          textAlign:"center",
        }}
        onClick={chooseRepo}
      >
        <article key={id}>
          <h3>{name}</h3>
          <p>{description}</p>
          <a href={html_url}>
          <button style={{border:'1px '}}>Click</button>
          </a>
        </article>
      </div>
    // </Link>
  );
};

export default User;