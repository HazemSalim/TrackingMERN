import React from "react";

const TrackingDetailMap = ({ origin_info = {} }) => {
  let locations = [];
  if (origin_info.trackinfo && origin_info.trackinfo.length > 0) {
    origin_info.trackinfo.forEach((element) => {
      if (
        element.location &&
        element.location !== "US" &&
        !locations.includes(element.location)
      ) {
        locations.push(element.location);
      }
    });
  }

  const locationSrc = `routes.html?locs=${locations.join("$^").slice(0, -2)}`;

  return (
    <div style={{ height: "500px" }}>
      <iframe src={locationSrc} width={"100%"} height={"100%"}></iframe>
    </div>
  );
};

export default TrackingDetailMap;
