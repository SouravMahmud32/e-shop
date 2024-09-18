import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params;
    let query: any = {};

    // If category is provided, add it to the query
    if (category) {
      query.category = category;
    }

    // If a search term is provided, use it to search in 'name' or 'description'
    if (searchTerm) {
      query.OR = [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive", // Case insensitive search
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];
    }

    const products = await prisma.product.findMany({
      where: query,
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch products");
  }
}
