import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

const TITLE = "DICKFON — Официальный сайт | Микрофон в виде члена";
const DESCRIPTION =
  "DICKFON — официальный сайт. Микрофон в форме мужского достоинства: модели для караоке, петличка для блогеров, эксклюзив на заказ. Заказать по +7 (993) 103-07-83.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "DICKFON — Самый необычный микрофон" },
      {
        property: "og:description",
        content: "Микрофон в форме члена — лучший подарок на вечеринку. Модели для караоке, петличка, эксклюзив на заказ.",
      },
      { property: "og:url", content: "https://dickfon.ru/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://dickfon.ru/" }],
  }),
  component: Index,
});
