import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import FormControllWrapper from "../styled/FormControllWrapper";
import DatePickerWrapper from "../styled/DatePickerWrapper";

const Filters = ({
  total,
  changeStatus,
  changeTrackingNumbers,
  changeDates,
  handleSearchFn,
}) => {
  const [state, setState] = useState({
    status: "",
    startDate: null,
    trackingNumbers: "",
    endDate: null,
    focusedInput: null,
  });

  const handleChangeTrackingNumbers = (e) => {
    const val = e.target.value.replace(/\s/g, "");
    setState({
      ...state,
      trackingNumbers: val,
    });
    changeTrackingNumbers(val);
  };

  const handleChangeStatus = (e) => {
    setState({
      ...state,
      status: e.target.value,
    });
    changeStatus(e.target.value);
  };

  const handleDateChange = (dates) => {
    const startDate = dates ? dates[0] : null;
    const endDate = dates ? dates[1] : null;

    setState({
      ...state,
      startDate,
      endDate,
    });

    changeDates(startDate, endDate);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleSearchFn();
  };

  return (
    <Row data-testid="filters">
      <Col xs={12} lg={12} className="mb-3 mt-3">
        <Row>
          <Col lg={3} xs={12}>
            <Form.Group>
              <FormControllWrapper data-testid="status">
                <Form.Control
                  as="select"
                  onChange={handleChangeStatus}
                  value={state.status}
                >
                  <option value="">Select Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="expired">Expired</option>
                  <option value="notfound">Not Found</option>
                  <option value="pending">Pending</option>
                  <option value="transit">Transit</option>
                  <option value="pickup">Pickup</option>
                  <option value="undelivered">Undelivered</option>
                  <option value="exception">Exception</option>
                  <option value="InfoReceived">InfoReceived</option>
                </Form.Control>
              </FormControllWrapper>
            </Form.Group>
          </Col>
          <Col lg={3} xs={12}>
            <DatePickerWrapper data-testid="date-picker">
              <DateRangePicker
                onChange={handleDateChange}
                value={[state.startDate, state.endDate]}
              />
            </DatePickerWrapper>
          </Col>
          <Col lg={3} xs={12}></Col>
          <Col lg={3} xs={12}>
            <b data-testid="total">Total: </b>
            {total}
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col lg={9} xs={12}>
            <Form.Group>
              <FormControllWrapper data-testid="trackingNumbers">
                <Form.Control
                  as="textarea"
                  onChange={handleChangeTrackingNumbers}
                  placeholder="Tracking Numbers Separated By Comma"
                  value={state.trackingNumbers}
                ></Form.Control>
              </FormControllWrapper>
            </Form.Group>
          </Col>

          <Col lg={3} xs={12}>
            <Button
              variant="secondary"
              onClick={handleSearch}
              data-testid="search"
            >
              Search
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Filters;
