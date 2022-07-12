import React from "react";

function ShortenedLink({resError, newLink, invisible}) {
  return (
    <div>
      {invisible ? null : resError ? (
        <div className="error information">{resError}</div>
      ) : (
        <div className="newlink information">
          <label>Your shortened link is: </label>
          <p>
            {/* <ContentCopyIcon
            onClick={() => {
              if ('clipboard' in navigator) {
                navigator.clipboard.writeText(process.env.REACT_APP_BASE_URL+newLink);
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
              href={"//" + process.env.REACT_APP_BASE_URL + newLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {process.env.REACT_APP_BASE_URL}
              {newLink}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default ShortenedLink;
