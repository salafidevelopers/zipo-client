import React from "react";

const ShareIcon = ({ src }) => {
  return (
    <img
      src={src}
      width={29}
      style={{ marginLeft: "5px", display: "inline" }}
      alt="share"
    />
  );
};

export default ShareIcon;
