import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import OrderClient from "./OrderClient";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Opps! Access Denied!"></NullData>;
  }

  const orders = await getOrdersByUserId(currentUser.id)

  if (!orders) {
    return <NullData title="No Orders Yet!"></NullData>;
  }

  return (
    <div>
      <Container>
        <OrderClient orders={orders}></OrderClient>
      </Container>
    </div>
  );
};

export default Orders;
