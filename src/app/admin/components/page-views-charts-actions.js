"use server";

import AnalyticsDatabase from "@/data/analytics-db";

export async function getPageViewsByDate() {
  const pageViewsMap = new Map([
    [["hour", "Hace un día"], AnalyticsDatabase.pageViews.readByDate(1)],
    [["weekday", "Hace una semana"], AnalyticsDatabase.pageViews.readByDate(7)],
    [["day", "Hace un mes"], AnalyticsDatabase.pageViews.readByDate(30)],
    [["month", "Hace un año"], AnalyticsDatabase.pageViews.readByDate(365)]
  ]);

  const data = new Map();
  
  [...pageViewsMap].forEach(([name, pageViews]) => {
    const dataId = name[0];

    let dataSize;
    let labels;

    if (dataId == "hour") {
      dataSize = 24;
      labels = [...Array(dataSize).keys()].map(key =>
        key > 9 ? `${key}:00` : `0${key}:00`
      );
    } else if (dataId == "weekday") {
      dataSize = 7;
      labels = [...Array(dataSize).keys()].map(key => {
        const weekday = new Intl.DateTimeFormat("es", { weekday: "long" })
          .format(new Date(0, 0, key + 1));
    
        return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}`;
      });
    }
    else if (dataId == "day") {
      dataSize = 31;
      labels = [...Array(dataSize).keys()].map(key => {
        const day = new Intl.DateTimeFormat("es", { day: "2-digit" })
          .format(new Date(0, 0, key + 1));
    
        return `${day.charAt(0).toUpperCase()}${day.slice(1)}`;
      });
    }
    else if (dataId == "month") {
      dataSize = 12;
      labels = [...Array(dataSize).keys()].map(key => {
        const month = new Intl.DateTimeFormat("es", { month: "long" })
          .format(new Date(0, key));
    
        return `${month.charAt(0).toUpperCase()}${month.slice(1)}`;
      });
    }

    const datasets = new Map();

    pageViews.forEach(pageView => {
      const { path, views } = pageView;

      const dataIndex = dataId == "hour"
        ? parseInt(pageView[dataId])
        : parseInt(pageView[dataId]) - 1;
  
      const dataset = datasets.get(path);
  
      if (dataset) dataset[dataIndex] = { x: dataIndex, y: views };
      else {
        const data = [...Array(dataSize).keys()].map(key => ({ x: key, y: 0 }));
        data[dataIndex] = { x: dataIndex, y: views };
  
        datasets.set(path, data);
      }
    });

    data.set(name[1], {
      labels,
      datasets: [...datasets].map(([label, data]) => ({ label, data }))
    });
  });

  return [...data];
}
