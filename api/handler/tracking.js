import axios from "axios";
const basePath = "https://api.trackingmore.com/v3";
const apiKey = "pd54geui-pqrd-f6ao-u99e-whhz1lpjle0y";

export async function getData(trackingNumbers) {
  var config = {
    method: "get",
    url: `${basePath}/trackings/get?tracking_numbers=${trackingNumbers}`,
    headers: {
      "Tracking-Api-Key": apiKey,
    },
  };

  return axios(config)
    .then(function (response) {
      return JSON.stringify(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return null;
    });
}

export const mapTracking = (trackingDB) => {
  let tracking = {
    tracking_number: trackingDB.tracking_number,
    courier_code: trackingDB.courier_code,
    order_number: trackingDB.order_number,
    delivery_status: trackingDB.delivery_status,
    created_at: trackingDB.created_at,
    update_date: trackingDB.update_date,
    shipping_date: trackingDB.shipping_date,
    weight: trackingDB.weight,
    delivery_date: getDeliveryDate(trackingDB),

    customer: {
      customer_name: trackingDB.customer_name,
      customer_email: trackingDB.customer_email,
      customer_phone: trackingDB.customer_phone,
    },

    origin_info: {
      courier_code: trackingDB.origin_info.courier_code,
      courier_phone: trackingDB.origin_info.courier_phone,
      received_date: trackingDB.origin_info.received_date,
      trackinfo: [...trackingDB.origin_info.trackinfo],
    },
  };
  return tracking;
};

const getDeliveryDate = (trackingDB) => {
  let delivery_date = null;
  if (trackingDB?.origin_info?.trackinfo?.length > 0) {
    let lastTrack = trackingDB.origin_info.trackinfo[0];
    if (lastTrack.checkpoint_delivery_status === "delivered")
      delivery_date = lastTrack.checkpoint_date;
  }

  return delivery_date;
};
