import { trackingNumbers } from "../api.js";
import { getData, mapTracking } from "../handler/tracking.js";
import Tracking from "../models/trackingModel.js";

// @desc    Load all data from Tracking More API  and save to DB
// @route   GET /tracking/load-all
// @access  Private
export const loadAllFromTrackingsMoreAPI = async (req, res) => {
  const trackingNumbersCSV = await trackingNumbers();

  if (trackingNumbersCSV && trackingNumbersCSV.length > 0) {
    const trackingNumbers = trackingNumbersCSV
      .map((t) => t.tracking_number)
      .join(",");

    let data = await getData(trackingNumbers);
    data = JSON.parse(data);

    if (data.code === 200 && data.data.length > 0) {
      try {
        await Tracking.collection.drop();
      } catch {}

      Tracking.insertMany(data.data).then(function (inserted) {
        res.status(200).json({ success: true });
      });
    } else {
      res.status(500).json({ error: "No data Found" });
    }
  } else {
    res.status(500).json({ error: "No data Found" });
  }
};

// @desc    Load all data from DB with Filter
// @route   GET /tracking/get-trackings
// @access  Private
export const getTrackings = async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      status = "",
      trackingNumbers = "",
      startDate = null,
      endDate = null,
    } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    //Status related filters
    let match = {};

    if (status !== "") {
      match = { delivery_status: status };
    }

    //trackingNumbers filter
    if (trackingNumbers) {
      const arr = trackingNumbers.split(",");
      if (arr.length > 0) {
        //Check if Tracking Numbers not found in DB
        // Go to Tracking More API and get data
        await checkExistingTrackingNumbers(arr);
        match = {
          ...match,
          tracking_number: { $in: arr },
        };
      }
    }

    //Start date filter
    if (startDate) {
      match = {
        ...match,
        created_at: { $gte: new Date(parseInt(startDate)) },
      };
    }

    //End date filter
    if (endDate) {
      match = {
        ...match,
        created_at: { $lte: new Date(parseInt(endDate)) },
      };
    }

    //Querying in Trackings table

    const allTrackings = await Tracking.find(match)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Tracking.countDocuments(match);

    res.status(200).json({
      message: "Success",
      payload: allTrackings.map((tracking) => mapTracking(tracking)),
      total: total,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
// @desc    Load Summary Data from DB
// @route   GET /tracking/get-summary
// @access  Private
export const getSummary = async (req, res) => {
  try {
    //number of orders in the database
    const total = await Tracking.countDocuments();

    //number of orders delivered and avg delivery days
    const deliveredTrackings = await Tracking.find({
      delivery_status: "delivered",
    });
    const deliveredTrackingsTotal = deliveredTrackings.length;
    const avgDeliveryDays = getAvgDeliveryTime(deliveredTrackings);

    //number of orders non delivered
    const nonDeliveredTotal = await Tracking.countDocuments({
      delivery_status: { $ne: "delivered" },
    });

    //number of orders delivered and average time to delivery to a specific destination (US).
    const deliveredTrackingsToDestinationUS = await Tracking.find({
      delivery_status: "delivered",
      destination: "US",
    });

    const avgDeliverySpecificDestinationDays = getAvgDeliveryTime(
      deliveredTrackingsToDestinationUS
    );

    //Return Payload Data
    const payload = {
      total,
      deliveredTotal: deliveredTrackingsTotal,
      nonDeliveredTotal,
      avgDeliveryDays,
      avgDeliverySpecificDestinationDays,
    };

    res.status(200).json({
      message: "Success",
      payload: payload,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getAvgDeliveryTime = (deliveredTrackings) => {
  const deliveredTrackingsTotal = deliveredTrackings.length;

  let avgDeiverySum = 0;
  deliveredTrackings.forEach((tracking) => {
    const trackingInfo = tracking.origin_info?.trackinfo;
    if (trackingInfo && trackingInfo.length > 1) {
      const endDate = new Date(trackingInfo[0].checkpoint_date);
      const startDate = new Date(
        trackingInfo[trackingInfo.length - 1].checkpoint_date
      );
      const diffDays = endDate.getDate() - startDate.getDate();

      avgDeiverySum += diffDays;
    }
  });

  const avgDeliveryDays = (avgDeiverySum / deliveredTrackingsTotal).toFixed(3);

  return avgDeliveryDays;
};

const checkExistingTrackingNumbers = async (trackingNumbers) => {
  const foundTrackingsInDB = await Tracking.find(
    {
      tracking_number: { $in: trackingNumbers },
    },
    { tracking_number: 1, _id: 0 }
  );

  let trackingNumbersNotFoundInDB = [];
  trackingNumbers.forEach((number) => {
    if (
      foundTrackingsInDB.length === 0 ||
      !foundTrackingsInDB.find(
        (tracking) => tracking.tracking_number === number
      )
    )
      trackingNumbersNotFoundInDB.push(number);
  });

  if (trackingNumbersNotFoundInDB.length > 0) {
    let data = await getData(trackingNumbersNotFoundInDB.join(","));

    data = JSON.parse(data);

    if (data.code === 200 && data.data.length > 0) {
      const inserted = await Tracking.insertMany(data.data);
      if (inserted.length > 0) {
        console.log("Inserted " + inserted.length + " documents");
      }
    }
  }
};
