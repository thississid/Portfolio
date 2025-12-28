import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: "https://a03e1e24297c7cb5399e1df1e3844372@o4510610200330240.ingest.us.sentry.io/4510610200526848",
      tracesSampleRate: 1,
      enableLogs: true,
      environment: process.env.NODE_ENV,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: "https://a03e1e24297c7cb5399e1df1e3844372@o4510610200330240.ingest.us.sentry.io/4510610200526848",
      tracesSampleRate: 1,
      enableLogs: true,
      environment: process.env.NODE_ENV,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
