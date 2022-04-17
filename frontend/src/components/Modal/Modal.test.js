import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Modal from "../styled/ModalStyle";
import TrackingDetail from "../TrackingDetail";

const mockStore = configureStore([]);

afterEach(cleanup);

describe("Modal component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      trackings: {
        trackings: [],
      },
    });
  });

  it("should display data", () => {
    const data = {
      tracking_number: "1ZE2X0010390526665",
      courier_code: "ups",
      order_number: "3",
      delivery_status: "delivered",
      created_at: "2022-03-29T13:52:16.000Z",
      update_date: "2022-03-29T13:52:48.000Z",
      shipping_date: null,
      weight: "12.10LBS",
      delivery_date: "2021-12-07 10:31",
      customer: {
        customer_name: "Federik Probably",
        customer_email: "example@abc.com",
        customer_phone: "+1123456789",
      },
      origin_info: {
        courier_code: "ups",
        courier_phone: "+1 800 742 5877",
        received_date: "2021-12-01T18:46:00.000Z",
        trackinfo: [
          {
            checkpoint_date: "2021-12-07 10:31",
            tracking_detail: "DELIVERED",
            location: "PASADENA,MD,US",
            checkpoint_delivery_status: "delivered",
            checkpoint_delivery_substatus: "delivered001",
          },
          {
            checkpoint_date: "2021-12-06 23:26",
            tracking_detail: "Processing at UPS Facility",
            location: "Baltimore,MD,US",
            checkpoint_delivery_status: "transit",
            checkpoint_delivery_substatus: "transit001",
          },
          {
            checkpoint_date: "2021-12-06 21:07",
            tracking_detail: "Arrived at Facility",
            location: "Baltimore,MD,US",
            checkpoint_delivery_status: "transit",
            checkpoint_delivery_substatus: "transit001",
          },
          {
            checkpoint_date: "2021-12-06 20:44",
            tracking_detail: "Departed from Facility",
            location: "Laurel,MD,US",
            checkpoint_delivery_status: "transit",
            checkpoint_delivery_substatus: "transit001",
          },
          {
            checkpoint_date: "2021-12-06 12:36",
            tracking_detail: "Arrived at Facility",
            location: "Laurel,MD,US",
            checkpoint_delivery_status: "transit",
            checkpoint_delivery_substatus: "transit001",
          },
          {
            checkpoint_date: "2021-12-02 01:07",
            tracking_detail: "Departed from Facility",
            location: "La Mirada,CA,US",
            checkpoint_delivery_status: "transit",
            checkpoint_delivery_substatus: "transit001",
          },
          {
            checkpoint_date: "2021-12-01 21:46",
            tracking_detail: "Origin Scan",
            location: "La Mirada,CA,US",
            checkpoint_delivery_status: "transit",
            checkpoint_delivery_substatus: "transit001",
          },
          {
            checkpoint_date: "2021-12-01 11:33",
            tracking_detail:
              "Shipper created a label, UPS has not received the package yet.",
            location: "US",
            checkpoint_delivery_status: "transit",
            checkpoint_delivery_substatus: "notfound001",
          },
        ],
      },
    };

    const { getByText } = render(
      <Provider store={store}>
        <Modal
          showModal={true}
          toggleModal={() => {}}
          title="Details of Tracking"
        >
          <TrackingDetail {...data} />
        </Modal>
      </Provider>
    );

    expect(getByText(/1ZE2X0010390526665/i)).toBeInTheDocument();
    expect(getByText(/Federik Probably/i)).toBeInTheDocument();
    expect(getByText(/1123456789/i)).toBeInTheDocument();
    expect(getByText(/example@abc.com/i)).toBeInTheDocument();
    expect(getByText(/ups/i)).toBeInTheDocument();
    expect(getByText(/1 800 742 5877/i)).toBeInTheDocument();
    expect(getByText(/12.10LBS/i)).toBeInTheDocument();
  });
});
