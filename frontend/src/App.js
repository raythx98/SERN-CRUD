import "./App.css";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "@fontsource/roboto";
import Axios from "axios";
import validator from "validator";

function App() {
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [resError, setResError] = useState("");
  const [newLink, setNewLink] = useState("");
  const [visible, setVisible] = useState(true);
  const base_url = "localhost:3001/";

  const displayInfo = () => {
    console.log(link);
  };

  const addLink = () => {
    setLinkError("");
    setResError("");
    setVisible(true);
    if (link.length < 1) {
      setLinkError("Input link should not be empty");
      return;
    }
    if (!validator.isURL(link)) {
      setLinkError("Invalid URL");
      return;
    }
    setVisible(false);
    console.log(link);
    
    Axios.post("//" + base_url + "getlink", { link: link })
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
      {visible ? null : resError ? (
        <div className="error information">{resError}</div>
      ) : (
        <div className="newlink information">
          <label>Your shortened link is: </label>
          <p>
            {/* <ContentCopyIcon
              onClick={() => {
                if ('clipboard' in navigator) {
                  navigator.clipboard.writeText(base_url+newLink);
                  console.log("copied to clipboard API");
                  alert("Copied to Clipboard!");
                } else {
                  console.log("unable to use clipboard");
                }
              }}
              style={{justifyItems:"center"}}
            ></ContentCopyIcon>
            &nbsp; */}
            <a
              href={"//" + base_url + newLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {base_url}
              {newLink}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
