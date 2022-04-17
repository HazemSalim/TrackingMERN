import mongoose from "mongoose";

const TrackingSchema = mongoose.Schema({
  tracking_number: {
    type: String,
  },
  courier_code: {
    type: String,
  },
  order_number: {
    type: String,
  },
  delivery_status: {
    type: String,
  },
  archived: {
    type: Boolean,
  },
  updating: {
    type: Boolean,
  },
  created_at: {
    type: Date,
  },
  update_date: {
    type: Date,
  },
  shipping_date: {
    type: Date,
  },
  customer_name: {
    type: String,
  },
  customer_email: {
    type: String,
  },
  customer_phone: {
    type: String,
  },
  title: {
    type: String,
  },
  logistics_channel: {
    type: String,
  },
  note: {
    type: String,
  },
  destination: {
    type: String,
  },
  original: {
    type: String,
  },
  service_code: {
    type: String,
  },
  weight: {
    type: String,
  },
  substatus: {
    type: String,
  },
  status_info: {
    type: String,
  },
  previously: {
    type: String,
  },
  destination_track_number: {
    type: String,
  },
  exchangeNumber: {
    type: String,
  },
  consignee: {
    type: String,
  },
  scheduled_delivery_date: {
    type: Date,
  },
  Scheduled_Address: {
    type: String,
  },
  latest_event: {
    type: Date,
  },
  lastest_checkpoint_time: {
    type: Date,
  },
  transit_time: {
    type: Number,
  },
  stay_time: {
    type: Number,
  },
  origin_info: {
    courier_code: {
      type: String,
    },
    courier_phone: {
      type: String,
    },
    weblink: {
      type: String,
    },
    reference_number: {
      type: String,
    },
    received_date: {
      type: Date,
    },
    dispatched_date: {
      type: Date,
    },
    departed_airport_date: {
      type: Date,
    },
    arrived_abroad_date: {
      type: Date,
    },
    customs_received_date: {
      type: Date,
    },
    arrived_destination_date: {
      type: Date,
    },
    trackinfo: {
      type: [Object],
    },
  },
  destination_info: {
    courier_code: {
      type: String,
    },
    courier_phone: {
      type: String,
    },
    weblink: {
      type: String,
    },
    reference_number: {
      type: String,
    },
    received_date: {
      type: Date,
    },
    dispatched_date: {
      type: Date,
    },
    departed_airport_date: {
      type: Date,
    },
    arrived_abroad_date: {
      type: Date,
    },
    customs_received_date: {
      type: Date,
    },
    arrived_destination_date: {
      type: Date,
    },
    trackinfo: {
      type: [Object],
    },
  },
});

export default mongoose.model("Tracking", TrackingSchema);
