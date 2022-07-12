import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Button, TextField } from "@mui/material";
import validator from "validator";

function InsertLink({setResError, setNewLink, setInvisible}) {

  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");

  const addLink = () => {
    setLinkError("");
    setResError("");
    setInvisible(true);
    if (link.length < 1) {
      setLinkError("Input link should not be empty");
      return;
    }
    if (!validator.isURL(link)) {
      setLinkError("Invalid URL");
      return;
    }
    setInvisible(false);
    console.log(link);

    Axios.post("//" + process.env.REACT_APP_BASE_URL + "getlink", { link: link })
      .then((res) => {
        console.log(res);
        setNewLink(res.data);
      })
      .catch(function (error) {
        setResError(
          "Server error, please contact hongxian@comp.nus.edu.sg for urgent attention..."
        );
        if (error.response) {
          console.log("Response Error, data: ", error.response.data);
          console.log("Response Error, header: ", error.response.headers);
        } else if (error.request) {
          console.log("Request Error: ", error.request);
        } else {
          console.log("Error ", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <div className="App">
      <div className="information">
        <label></label>
        <TextField
          className="textfield"
          id="filled-basic"
          placeholder="Input Link"
          variant="filled"
          style={{ fontSize: "20px" }}
          onChange={(event) => {
            setLink(event.target.value);
          }}
        />
        <div className="error">{linkError}</div>
        <Button
          onClick={addLink}
          variant="outlined"
          style={{ fontSize: "18px" }}
        >
          Shorten URL
        </Button>
      </div>
    </div>
  );
}

export default InsertLink;
