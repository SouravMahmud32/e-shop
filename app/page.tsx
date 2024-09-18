export const revalidate = 0;

import { products } from "@/utils/products";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title="Oops! No Products Found, click 'ALL' to clear filters "></NullData>
    );
  }

  // suffle function products

  function suffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const suffleProducts = suffleArray(products);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner></HomeBanner>
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {suffleProducts.map((product: any) => {
            return <ProductCard data={product} key={product.id}></ProductCard>;
          })}
        </div>
      </Container>
    </div>
  );
}
