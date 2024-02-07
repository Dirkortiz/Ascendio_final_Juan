import React, { useEffect, useRef } from "react";
import "./tradingViewWidget.scss";

let tvScriptLoadingPromise;

export const TradingViewWidget = () => {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    // eslint-disable-next-line no-return-assign
    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_50ec9") &&
        "TradingView" in window
      ) {
        // eslint-disable-next-line no-new, new-cap
        new window.TradingView.widget({
          autosize: true,
          symbol: "BTCUSDT",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "es",
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          details: true,
          calendar: true,
          show_popup_button: true,
          container_id: "tradingview_50ec9",
        });
      }
    }
  }, []);

  return (
    <div className="ascendio-graphic-containerPrincipal">
      <div
        className="tradingview-widget-container"
        id="tradingview_50ec9"
      ></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://es.tradingview.com/"
          rel="noopener nofollow noreferrer"
          target="_blank"
        >
          <span className="blue-text">Siga los mercados en TradingView</span>
        </a>
      </div>
    </div>
  );
};
