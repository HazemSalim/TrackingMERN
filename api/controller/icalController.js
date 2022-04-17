import fs from "fs";
import ics from "ics";
import Tracking from "../models/trackingModel.js";
import { mapTracking } from "../handler/tracking.js";

// @desc    Download ical file
// @route   GET /ical/:id
// @access  Private
export const downloadIcalFile = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ error: "id is not valid" });
  }

  try {
    let tracking = await Tracking.findOne({ tracking_number: id });

    if (!tracking) {
      return res.status(404).json({ error: "tracking is not found" });
    }

    const strDate = new Date(tracking.created_at);
    tracking = mapTracking(tracking);

    ics.createEvent(
      {
        title: `Tracking Customer: ${tracking.customer.customer_name} with Order ${tracking.order_number}`,
        attendees: [
          {
            name: tracking.customer.customer_name,
            email: tracking.customer.customer_email,
            rsvp: true,
            partstat: "ACCEPTED",
            role: "REQ-PARTICIPANT",
          },
        ],

        status: "CONFIRMED",
        busyStatus: "BUSY",
        start: [
          strDate.getFullYear(),
          strDate.getMonth() + 1,
          strDate.getDate(),
          strDate.getHours(),
          strDate.getMinutes(),
        ],
        duration: { days: 1 },
      },
      (error, value) => {
        if (error) {
          return res.status(404).json({ error });
        }
        var file = "event.ics";

        fs.writeFile(file, value, function (err) {
          if (err) {
            return res.status(404).json({ error: err });
          }

          res.download(file);
        });
      }
    );
  } catch (error) {
    return res.status(404).json({ error });
  }
};
