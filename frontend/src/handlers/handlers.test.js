import moment from "moment";
import { trimText, getNumberOfDays, handleMessage } from "../handlers";

describe("trimText handler", () => {
  it("should trim the text", () => {
    expect(trimText("This is my text which would be trimmed", 15)).toBe(
      "This is my text..."
    );
  });

  it("should handle the empty text", () => {
    expect(trimText("", 5)).toBe("");
  });

  it("should handle the small text from given length", () => {
    expect(trimText("My Text", 20)).toBe("My Text");
  });
});

describe("getNumberOfdays handler", () => {
  it("should display 17", () => {
    expect(getNumberOfDays(moment("2021-02-23"), moment("2021-03-11"))).toBe(
      17
    );
  });

  it("should handle empty case", () => {
    expect(getNumberOfDays()).toBe(0);
  });
});

describe("handleMessage handler", () => {
  it("should handle no input case", () => {
    expect(handleMessage()).toBe("");
  });

  it("should handle error case", () => {
    expect(handleMessage(false, true, false)).toBe(
      "Something went wrong with backend."
    );
  });

  it("should handle loading case", () => {
    expect(handleMessage(true, false, false)).toBe("Loading...");
  });

  it("should handle no data found case", () => {
    expect(handleMessage(false, false, true)).toBe("No Data Found.");
  });
});
