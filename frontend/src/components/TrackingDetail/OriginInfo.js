import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import moment from "moment";

const OriginInfo = ({ TrackInfo }) => {
  return TrackInfo.map((track, index) => (
    <Row key={index}>
      <Col xs={12} lg={12} className="mt-2">
        <Row>
          <Col xs={12} lg={12}>
            <Alert variant="success">
              <Alert.Heading>
                {track.checkpoint_date
                  ? moment(track.checkpoint_date).format("lll")
                  : ""}
              </Alert.Heading>
              <p>{track.tracking_detail}</p>

              <p className="mb-0">
                Status:{track.checkpoint_delivery_status}
                {" - "} SubStatus :{track.checkpoint_delivery_substatus}
              </p>
            </Alert>
          </Col>
        </Row>
      </Col>
    </Row>
  ));
};
export default OriginInfo;
