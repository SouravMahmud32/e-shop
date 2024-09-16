"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className=" mt-8">
        <Heading title="Order Details"></Heading>
      </div>
      <div>Order Id: {order.id}</div>
      <div>
        Total Amount:{" "}
        <span className=" font-bold">{formatPrice(order.amount)}</span>
      </div>
      <div className=" flex gap-2 items-center">
        <div>Payment Status: </div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg=" bg-slate-200"
              color=" text-slate-700"
            ></Status>
          ) : order.status === "complete" ? (
            <Status
              text="Completed"
              icon={MdDone}
              bg=" bg-green-200"
              color=" text-slate-700"
            ></Status>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className=" flex gap-2 items-center">
        <div>Delivery Status: </div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="Pending"
              icon={MdAccessTimeFilled}
              bg=" bg-slate-200"
              color=" text-slate-700"
            ></Status>
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="Dispatched"
              icon={MdDeliveryDining}
              bg=" bg-purple-200"
              color=" text-purple-700"
            ></Status>
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="Delivered"
              icon={MdDeliveryDining}
              bg=" bg-green-200"
              color=" text-green-700"
            ></Status>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
