import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Filters from "../Filters";

const mockStore = configureStore([]);

describe("Filters component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      trackings: [],
    });
  });

  it("should display the total", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    const el = getByTestId("total");
    expect(el).toBeInTheDocument();
  });

  it("should render the status dropdown", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    const el = getByTestId("status");
    expect(el).toBeInTheDocument();
  });

  it("should render the date picker", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    const el = getByTestId("date-picker");
    expect(el).toBeInTheDocument();
  });

  it("should render the tracking numbers text", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    const el = getByTestId("trackingNumbers");
    expect(el).toBeInTheDocument();
  });

  it("should render the button submit", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    const el = getByTestId("search");
    expect(el).toBeInTheDocument();
  });
});
