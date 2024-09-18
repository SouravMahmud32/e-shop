import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product) {
    return (
      <NullData title="Oops! product with the given 'Id' does not exist.."></NullData>
    );
  }

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product}></ProductDetails>
        <div className="flex flex-col mt-20 gap-4">
          <AddRating product={product} user={user}></AddRating>
          <ListRating product={product}></ListRating>
        </div>
      </Container>
    </div>
  );
};

export default Product;
