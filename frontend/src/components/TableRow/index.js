import React from "react";
import moment from "moment";
import List from "../styled/List";
import { BsFillEyeFill, BsDownload, BsTable, BsMap } from "react-icons/bs";
import ActionButton from "../styled/ActionButton";

const TableRow = ({
  index,
  tracking_number,
  courier_code,
  noData,
  text,
  customer = {},
  order_number,
  delivery_status,
  toggleModal,
  toggleModalTable,
  toggleModalMap,
  created_at,
  shipping_date,
  delivery_date,

  downloadFile,
}) => {
  const { customer_name } = customer;
  const createdAtDate = moment(created_at).format("LL");
  const shippingDate = shipping_date
    ? moment(shipping_date).format("LL")
    : null;

  const deliveryDate = delivery_date
    ? moment(delivery_date).format("lll")
    : null;

  const statusSpan = (
    <span
      style={{
        color: delivery_status === "delivered" ? "green" : "red",

        fontWeight: "bold",
      }}
    >
      {delivery_status}
    </span>
  );

  return (
    <List data-testid="table-row">
      {noData ? (
        <td colSpan={8} className="text-center">
          {text}
        </td>
      ) : (
        <>
          <td>{index}.</td>
          <td>{tracking_number}</td>
          <td>{order_number}</td>
          <td>{courier_code}</td>
          <td>{customer_name}</td>
          <td>{createdAtDate}</td>
          <td>{shippingDate}</td>
          <td>{deliveryDate}</td>
          <td>{statusSpan}</td>

          <td>
            <ActionButton className="mr-3" onClick={toggleModal}>
              <BsFillEyeFill />
            </ActionButton>
            <ActionButton className="mr-3" onClick={toggleModalTable}>
              <BsTable />
            </ActionButton>
            <ActionButton className="mr-3" onClick={toggleModalMap}>
              <BsMap />
            </ActionButton>

            <ActionButton onClick={() => downloadFile(tracking_number)}>
              <BsDownload />
            </ActionButton>
          </td>
        </>
      )}
    </List>
  );
};

export default TableRow;
