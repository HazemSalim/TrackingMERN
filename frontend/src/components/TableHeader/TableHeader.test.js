import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import TableHeader from "../TableHeader";

const mockStore = configureStore([]);

describe("TableHeader component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      trackings: [],
    });
  });

  it("should display data", () => {
    const tableHeaders = [
      "Serial",
      "Tracking Number",
      "Order Number",
      "Courier",
      "Customer",
      "Created Date",
      "Shipping Date",
      "Delivery Date",
      "Status",
      "Actions",
    ];

    const { getByText } = render(
      <Provider store={store}>
        <table>
          <thead>
            <TableHeader data={tableHeaders} />
          </thead>
        </table>
      </Provider>
    );

    expect(getByText(/Serial/i)).toBeInTheDocument();
    expect(getByText(/Tracking Number/i)).toBeInTheDocument();
    expect(getByText(/Order Number/i)).toBeInTheDocument();
    expect(getByText(/Courier/i)).toBeInTheDocument();
    expect(getByText(/Customer/i)).toBeInTheDocument();
    expect(getByText(/Created Date/i)).toBeInTheDocument();
    expect(getByText(/Shipping Date/i)).toBeInTheDocument();
    expect(getByText(/Delivery Date/i)).toBeInTheDocument();
    expect(getByText(/Status/i)).toBeInTheDocument();
    expect(getByText(/Actions/i)).toBeInTheDocument();
  });
});
