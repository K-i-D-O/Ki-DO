import { useEffect } from "react";
import Script from "next/script";
import { StoreProvider } from "easy-peasy";
import { ToastContainer } from "react-toastify";
import AOS from "aos";

import Layout from "@/components/layouts/layout";
import AppContextProvider from "@/services/auth/AppContext";

import createStore from "@/store/index";
import "@/styles/fullcalendar.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import "@/styles/aos.css";
import "@/styles/layout.css";
import { useRouter } from "next/router";

const store = createStore();

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Google Analytics 조회수 측정하기 (유입, 이탈)
  useEffect(() => {
    const handleRouteChange = (url) => {};
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    AOS.init({
      offset: 50,
    });
    function setScreenSize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setScreenSize();
    window.addEventListener("resize", setScreenSize);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <StoreProvider store={store}>
        <AppContextProvider>
          <Layout>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </AppContextProvider>
      </StoreProvider>
    </>
  );
}
