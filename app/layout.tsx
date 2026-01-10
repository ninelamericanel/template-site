import "../styles/global.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { Metadata } from "next";
import { ReduxProvider } from "../src/state/provider";

// todo: добавить картинки для превью при отправке ссылки на сайт. Продумать наименования метаданных
// todo: возможно создать объект с повторяющимися строками для метаданных

export const metadata: Metadata = {
  title: "",
  description: "Вкусные торты и десерты с доставкой по городу.",
  keywords: ["торты", "кондитерская", "доставка десертов"],
  openGraph: {
    title: '"',
    description: "Лучшие торты в городе — закажите прямо сейчас!",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Вкусный торт",
      },
    ],
    siteName: "",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@sweet_paradise",
  //   title: '"',
  //   description: "Лучшие торты в городе — закажите прямо сейчас!",
  //   images: ["https://example.com/images/cake.jpg"],
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
