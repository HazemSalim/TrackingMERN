import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import actions from "../../state/actions";
import TableRow from "../TableRow";
import TableHeader from "../TableHeader";
import Modal from "../Modal";
import TrackingDetail from "../TrackingDetail";
import TrackingDetailTable from "../TrackingDetail/table";
import TrackingDetailMap from "../TrackingDetail/map";
import Filters from "../Filters";
import { handleMessage } from "../../handlers";
import { tableHeaders } from "./tableHeaders";
import Paging from "./paging";

const Trackings = () => {
  const { trackings, total, loading, error } = useSelector(
    (state) => state.trackings
  );

  const [state, setState] = useState({
    limit: 10,
    page: 1,
    status: "",
    trackingNumbers: "",
    startDate: null,
    endDate: null,
    showModal: false,
    showModalTable: false,
    showModalMap: false,
    selectedTracking: null,
  });

  const fetchData = async () => {
    const { limit, page, status, trackingNumbers } = state;

    await actions.getTrackingsData({
      limit,
      page,
      status,
      trackingNumbers: trackingNumbers,
      startDate: state.startDate ? state.startDate.getTime() : "",
      endDate: state.endDate ? state.endDate.getTime() : "",
    });
  };

  useEffect(() => {
    fetchData();
  }, [state.page]);

  const toggleModal = (showModal, selectedTracking) => {
    setState({
      ...state,
      showModal,
      selectedTracking,
    });
  };
  const toggleModalMap = (showModalMap, selectedTracking) => {
    setState({
      ...state,
      showModalMap,
      selectedTracking,
    });
  };
  const toggleModalTable = (showModalTable, selectedTracking) => {
    setState({
      ...state,
      showModalTable,
      selectedTracking,
    });
  };

  const changeTrackingNumbers = (trackingNumbers) => {
    setState({
      ...state,
      trackingNumbers,
    });
  };

  const changeStatus = (status) => {
    setState({
      ...state,
      status,
    });
  };

  const changeDates = (startDate, endDate) => {
    setState({
      ...state,
      startDate,
      endDate,
    });
  };

  const handlePagination = (selected) => {
    setState({
      ...state,
      page: selected + 1,
    });
  };

  const handleSearchFn = () => {
    setState({
      ...state,
      page: 1,
    });

    fetchData();
  };

  const downloadFile = (id) => {
    actions.downloadIcalFile(id).then((res) => {
      const href = window.URL.createObjectURL(res);
      const a = document.createElement("a");
      a.download = "event.ics";
      a.href = href;
      a.click();
      a.href = "";
    });
  };

  return (
    <Row data-testid="trackings">
      <Col xs={12} lg={12}>
        <Filters
          total={total}
          changeStatus={changeStatus}
          changeTrackingNumbers={changeTrackingNumbers}
          changeDates={changeDates}
          handleSearchFn={handleSearchFn}
        />
        <Row>
          <Col xs={12} lg={12} className="table-responsive">
            <Table>
              <thead>
                <TableHeader data={tableHeaders} />
              </thead>
              <tbody>
                {trackings && trackings.length ? (
                  trackings.map((tracking, key) => (
                    <TableRow
                      key={key}
                      index={(state.page - 1) * state.limit + (key + 1)}
                      {...tracking}
                      toggleModal={() => toggleModal(true, tracking)}
                      toggleModalMap={() => toggleModalMap(true, tracking)}
                      toggleModalTable={() => toggleModalTable(true, tracking)}
                      downloadFile={() =>
                        downloadFile(tracking.tracking_number)
                      }
                    />
                  ))
                ) : (
                  <TableRow
                    noData
                    text={handleMessage(
                      loading,
                      error,
                      !trackings || !trackings.length
                    )}
                  />
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        {trackings && total > 10 && (
          <Row>
            <Col xs={12} lg={12}>
              <Paging total={total} handlePagination={handlePagination} />
            </Col>
          </Row>
        )}
      </Col>
      <Modal
        showModal={state.showModal}
        toggleModal={toggleModal}
        title="Details of Tracking"
      >
        <TrackingDetail {...state.selectedTracking} />
      </Modal>
      <Modal
        showModal={state.showModalTable}
        toggleModal={toggleModalTable}
        title="Tracking Info"
      >
        <TrackingDetailTable {...state.selectedTracking} />
      </Modal>

      <Modal
        showModal={state.showModalMap}
        toggleModal={toggleModalMap}
        title="Tracking Paths"
      >
        <TrackingDetailMap {...state.selectedTracking} />
      </Modal>
    </Row>
  );
};

export default Trackings;
