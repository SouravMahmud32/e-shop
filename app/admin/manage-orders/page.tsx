import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/actions/getOrders";

const ManageProducts = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Opps! Access Denied!"></NullData>;
  }

  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders}></ManageOrdersClient>
      </Container>
    </div>
  );
};

export default ManageProducts;
