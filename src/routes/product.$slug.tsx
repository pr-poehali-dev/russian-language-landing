import { createFileRoute, notFound } from "@tanstack/react-router";
import ProductPage from "@/pages/ProductPage";
import { PRODUCTS } from "@/components/dickfon/data";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return {
      slug: product.slug,
      seoTitle: product.seoTitle,
      seoDescription: product.seoDescription,
      image: product.image ?? null,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const url = `https://dickfon.ru/product/${loaderData.slug}`;
    return {
      meta: [
        { title: loaderData.seoTitle },
        { name: "description", content: loaderData.seoDescription },
        { property: "og:title", content: loaderData.seoTitle },
        { property: "og:description", content: loaderData.seoDescription },
        { property: "og:url", content: url },
        { property: "og:type", content: "product" },
        ...(loaderData.image ? [{ property: "og:image", content: loaderData.image }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProductPage,
});
