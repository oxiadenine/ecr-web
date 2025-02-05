"use server";

import { headers } from "next/headers";
import getClientIp from "@/lib/client-ip";
import AnalyticsDatabase from "@/data/analytics-db";

export async function storePageViews(pageViews) {
  const clientIp = getClientIp(await headers()) ?? "";

  pageViews.forEach(pageView => {
    const { date, ...rest } = pageView;

    AnalyticsDatabase.pageViews.create({
      id: Bun.randomUUIDv7(),
      ip: clientIp,
      date: date.toISOString(),
      ...rest
    });
  });
}

export async function storePerformanceMetrics(performanceMetrics) {
  performanceMetrics.forEach(performanceMetric => {
    const { id, value, delta, ...rest } = performanceMetric;

    AnalyticsDatabase.performanceMetrics.create({
      id: id.substring(id.indexOf("-") + 1),
      value: Math.round(value),
      delta: Math.round(delta),
      ...rest
    });
  });
}
