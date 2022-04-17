import React, { useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import actions from "../../state/actions";
import Spinner from "../../components/styled/Spinner";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { dashboard, loading, error } = useSelector((state) => state.dashboard);

  const fetchData = async () => {
    await actions.getDashboardData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Row data-testid="dashboard">
      <Col xs={12} lg={12}>
        <Alert variant="success">
          <Alert.Heading>Number of orders</Alert.Heading>
          <p>{dashboard.total}</p>
        </Alert>
      </Col>
      <Col xs={12} lg={12}>
        <Alert variant="info">
          <Alert.Heading>Number of Delivered orders</Alert.Heading>
          <p>{dashboard.deliveredTotal}</p>
        </Alert>
      </Col>
      <Col xs={12} lg={12}>
        <Alert variant="danger">
          <Alert.Heading>Number of Non Delivered orders</Alert.Heading>
          <p>{dashboard.nonDeliveredTotal}</p>
        </Alert>
      </Col>
      <Col xs={12} lg={12}>
        <Alert variant="secondary">
          <Alert.Heading>Average time to delivery (Days)</Alert.Heading>
          <p>{dashboard.avgDeliveryDays}</p>
        </Alert>
      </Col>
      <Col xs={12} lg={12}>
        <Alert variant="warning">
          <Alert.Heading>
            Average time to delivery to a specific destination(US)(Days)
          </Alert.Heading>
          <p>{dashboard.avgDeliverySpecificDestinationDays}</p>
        </Alert>
      </Col>
    </Row>
  );
};

export default Dashboard;
