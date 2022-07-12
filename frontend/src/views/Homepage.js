import React from "react";
import { useState } from "react";

// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import InsertLink from "../components/InsertLink";
import ShortenedLink from "../components/ShortenedLink";

function Homepage() {
  const [resError, setResError] = useState("");
  const [newLink, setNewLink] = useState("");
  const [invisible, setInvisible] = useState(true);

  return (
    <div>
      <InsertLink setResError={setResError} setNewLink={setNewLink} setInvisible={setInvisible} />
      <ShortenedLink resError={resError} newLink={newLink} invisible={invisible} />
    </div>
  );
}

export default Homepage;
