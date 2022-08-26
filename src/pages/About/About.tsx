import React from "react";
import classes from "./About.module.css";

function About() {
  return (
    <div className={classes.container}>
      Created By <br></br>Benichou Mordehai ,<br></br>053.8226006
      skieurfou@hotmail.com
      <p>Fullstack developer,Sept 2022</p>
      <hr></hr>
      <p>React application with TypeScript</p>
      <hr></hr>
      <p>Node server with TypeScript</p>
      <hr></hr>
      <p>database: MongoDb</p>
      <hr></hr>
    </div>
  );
}

export default About;
