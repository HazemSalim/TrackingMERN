import React from "react";
import OriginInfo from "./OriginInfo";

const TrackingDetailTable = ({ origin_info = {} }) => {
  return (
    <>
      {origin_info.trackinfo && origin_info.trackinfo.length > 0 && (
        <>
          <div
            style={{
              overflowY: "auto",
              overflowX: "hidden",
              height: "300px",
              badding: "5px",
            }}
          >
            <OriginInfo TrackInfo={origin_info.trackinfo} />
          </div>
        </>
      )}
    </>
  );
};

export default TrackingDetailTable;
