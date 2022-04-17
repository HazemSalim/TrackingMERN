import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Paging from "./paging";

const mockStore = configureStore([]);

describe("Paging component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      absences: {
        absences: [
          {
            _id: "608c98be476b18964bfd8849",
            admitterI: null,
            admitterNote: "",
            confirmedAt: "2021-01-09T17:43:29.000Z",
            createdAt: "2021-01-09T16:45:47.000Z",
            crewId: 352,
            endDate: "2021-01-11T00:00:00.000Z",
            id: 2634,
            memberNote: "Nachmittag 0,5 Tage. Danke.",
            rejectedAt: null,
            startDate: "2021-01-11T00:00:00.000Z",
            type: "vacation",
            userId: 649,
            user: {
              _id: "608c958b69e35395c08190bc",
              crewId: 352,
              id: 713,
              image: "https://loremflickr.com/300/400",
              name: "Ines",
              userId: 649,
            },
          },
        ],
      },
    });
  });

  it("should render pagination", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Paging />
      </Provider>
    );

    const el = getByTestId("pagination");
    expect(el).toBeInTheDocument();
  });
});
