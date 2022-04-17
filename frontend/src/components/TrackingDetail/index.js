import React from "react";
import { Row, Col } from "react-bootstrap";
import moment from "moment";

const TrackingDetail = ({
  tracking_number,
  weight,
  customer = {},
  origin_info = {},
}) => {
  const { customer_name, customer_email, customer_phone } = customer;
  const { courier_code, courier_phone, received_date } = origin_info;

  const receivedDate = received_date
    ? moment(received_date).format("LL")
    : null;

  return (
    <>
      <Row>
        <Col xs={12} lg={12} className="mt-2">
          <Row>
            <Col xs={12} lg={4}>
              <b>Tracking Number</b>
              <br />
              {tracking_number}
            </Col>
            <Col xs={12} lg={4}>
              <b>CustomerName</b>
              <br />
              {customer_name}
            </Col>
            <Col xs={12} lg={4}>
              <b>CustomerPhone</b>
              <br />
              {customer_phone}
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={12} className="mt-2">
          <Row>
            <Col xs={12} lg={4}>
              <b>Customer Email</b>
              <br />
              {customer_email}
            </Col>
            <Col xs={12} lg={4}>
              <b>Courier Code</b>
              <br />
              {courier_code}
            </Col>
            <Col xs={12} lg={4}>
              <b>Courier Phone</b>
              <br />
              {courier_phone}
            </Col>
          </Row>
        </Col>

        <Col xs={12} lg={12} className="mt-2">
          <Row>
            <Col xs={12} lg={4}>
              <b>Received Date</b>
              <br />
              {receivedDate}
            </Col>
            <Col xs={12} lg={4}>
              <b>Weight</b>
              <br />
              {weight}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TrackingDetail;
