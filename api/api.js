import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TRACKINGNUMBERS_PATH = path.join(
  __dirname,
  "files",
  "tracking_numbers.csv"
);

const readCSVFile = () =>
  new Promise((resolve) =>
    fs.readFile(TRACKINGNUMBERS_PATH, "utf8", (_, data) => resolve(data))
  ).then((data) => {
    let arr = [];
    var dataArray = data.split(/\r?\n/);
    for (let i = 1; i < dataArray.length; i++) {
      const rowSplitted = dataArray[i].split(",");
      arr.push({
        tracking_number: rowSplitted[0],
        order_number: rowSplitted[1],
      });
    }
    return arr;
  });

export const trackingNumbers = () => readCSVFile();
