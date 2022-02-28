import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useCurrentProject } from "../../../lib/hooks/useProjects";
import Chart from "../common/Chart";
import _ from "lodash";
import * as echarts from "echarts";
import { LandTable } from "../common/table";
import { useGet } from "../../../lib/hooks/useGet";
import {
  getMarketCapAndVolume,
  getRecentTopSales,
  getSalesTransferAndLiquidity,
  getTradePlots,
} from "../../../lib/http";
import { formatDelta } from "../../../lib/utils";

const ItemLayout = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  margin-top: 1rem;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 20px;
`;

const ItemHeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  .i_title {
    font-size: 18px;
    line-height: 1.4;
    font-weight: 600;
    color: white;
  }
  .i_radio {
    background: #131823;
    border-radius: 8px;

    .i_radio_item {
      display: inline-block;
      color: #7e96b8;
      cursor: pointer;
      font-size: 16px;
      line-height: 1.6;
      padding: 0 5px;
      margin: 6px;
      &.active {
        color: white;
        font-weight: 600;
        background: #020012;
        border-radius: 8px;
      }
    }
  }
`;

function ItemHeader(p: {
  title: string;
  options?: string[];
  current?: string;
  onChange?: (opt: string, e: React.MouseEvent) => void;
}) {
  const { title, current = "7D", options = ["7D", "30D", "3M"], onChange } = p;
  const [active, setActive] = useState(current);
  return (
    <ItemHeaderLayout>
      <div className="i_title"> {title}</div>
      <div className="i_radio">
        {options.map((item, index) => (
          <div
            key={`i_radio_item_${index}`}
            className={`i_radio_item ${active === item && "active"}`}
            onClick={(e) => {
              setActive(item);
              onChange && onChange(item, e);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </ItemHeaderLayout>
  );
}
const colors = ["#c54aba", "#fdcc6a", "#916dfe", "#12dcf6"];

const TopicLayout = styled.div`
  display: inline-block;
  margin-right: 40px;
  white-space: nowrap;
  font-weight: 600;
  line-height: 1.5;
  .top {
    display: block;
    color: #7e96b8;
    .point {
      vertical-align: middle;
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 3px;
      &.s0 {
        background-color: ${colors[0]};
      }
      &.s1 {
        background-color: ${colors[1]};
      }
      &.s2 {
        background-color: ${colors[2]};
      }
      &.s3 {
        background-color: ${colors[3]};
      }
    }
    .title {
      display: inline-block;
      font-size: 12px;
      margin: 0 4px;
    }
    .tips {
      display: inline-block;
    }
  }
  .bottom {
    display: block;
    color: white;
    margin-top: 4px;
    .value {
      display: inline-block;
      font-size: 16px;
    }
    .compare {
      display: inline-block;
      font-size: 12px;
      margin-left: 4px;
      &.up {
        color: #32cb9d;
      }
      &.down {
        color: #ef4c56;
      }
    }
  }
`;
interface Topic {
  title: string;
  value: string;
  tips?: string;
  compare?: ["up" | "down", string];
}
function ItemTopics(p: { items: Topic[] }) {
  const { items } = p;
  return (
    <div style={{ margin: "20px 0" }}>
      {items.map((topic, index) => (
        <TopicLayout key={`topic_${index}`}>
          <div className="top">
            <div className={`point s${index % 4}`} />
            <div className="title">{topic.title}</div>
            {/* <div className="tips"/> */}
          </div>
          <div className="bottom">
            <div className="value">{topic.value}</div>
            {topic.compare && (
              <div className={`compare ${topic.compare[0]}`}>
                {topic.compare[1]}
              </div>
            )}
          </div>
        </TopicLayout>
      ))}
    </div>
  );
}

let cDate = new Date();
const nDate = (interval: number) => {
  const date = new Date(+cDate + interval);
  cDate = date;
  return [cDate.getFullYear(), cDate.getMonth() + 1, cDate.getDate()].join("/");
};

const tipFormatter = function (params: any) {
  let data = params.data;
  //   console.info('params: ', params.data)
  var date = new Date(data[0]);
  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " : " +
    data[1]
  );
};

const axisFormatter = function (params: any) {
  let data = params[0].data;
  //   console.info('params: ', params.data)
  var date = new Date(data[0]);
  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " : " +
    data[1]
  );
};

const getDateInfo = (opt: string): { interval: number; count: number } => {
  let interval = 24 * 3600 * 1000;
  let count = 1;
  if (opt === "7D") {
    // interval = interval * 24
    count = 7;
  }
  if (opt === "30D") {
    // interval = interval * 24 * 30
    count = 30;
  }
  if (opt === "3M") {
    count = 90;
  }
  return { interval, count };
};

const createDelta = (delta: number): Topic["compare"] => {
  if (delta) {
    return [delta > 0 ? "up" : "down", formatDelta(delta, true)];
  }
  return undefined;
};
export function TradeAnalytics() {
  const { id } = useCurrentProject();

  const [tradeOpt, setTradeOpt] = useState("7D");

  const dates: string[] = useMemo(() => {
    const info = getDateInfo(tradeOpt);
    const list: string[] = [];
    for (let index = 0; index < info.count; index++) {
      list.push(nDate(info.interval));
    }
    return list;
  }, [tradeOpt]);
  const [tradeData] = useGet(() => getTradePlots(id), [id]);
  const tradeTopics: Topic[] = useMemo(() => {
    return [
      {
        title: "Floor Price",
        value: _.get(tradeData, "floorPrice.value", "-"),
        compare: createDelta(_.get(tradeData, "floorPrice.delta")),
      },
      {
        title: "Avg Price(7D)",
        value: _.get(tradeData, "avgPrice.value", "-"),
        compare: createDelta(_.get(tradeData, "avgPrice.delta")),
      },
      {
        title: "Max Price(7D)",
        value: _.get(tradeData, "maxPrice.value", "-"),
        compare: createDelta(_.get(tradeData, "maxPrice.delta")),
      },
      //   {
      //     title: "Min Price(7D)",
      //     value: _.get(tradeData, "minPrice.value", "-"),
      //     compare: createDelta(_.get(tradeData, "minPrice.delta")),
      //   },
    ];
  }, [tradeData]);
  const tradeOptions = useMemo(() => {
    // const minTime = new Date(dates[0]).getTime();
    // const maxTime = new Date(dates[dates.length - 1]).getTime();
    // const points = _.map(_.range(dates.length * 5), () => [
    //   _.random(minTime, maxTime, false),
    //   _.round(_.random(0.1, 10), 2),
    // ]);
    // const max = _.map(dates, (item) => [
    //   (item as string).replaceAll("-", "/"),
    //   _.round(_.random(4.1, 10), 2),
    // ]);
    // const min = _.map(dates, (item) => [
    //   (item as string).replaceAll("-", "/"),
    //   _.round(_.random(0.1, 4), 2),
    // ]);
    // const avg = _.map(min, (item,index) => [
    //    item[0],
    //   _.round(((min[index][1] as number) + (max[index][1] as number))/2, 2),
    // ]);

    const points = _.map(_.get(tradeData, "resultList", []), (item) => [
      (item.date as string).replaceAll("-", "/"),
      item.value,
    ]);
    const max = _.map(_.get(tradeData, "priceList", []), (item) => [
      (item.date as string).replaceAll("-", "/"),
      item.maxPrice,
    ]);
    const min = _.map(_.get(tradeData, "priceList", []), (item) => [
      (item.date as string).replaceAll("-", "/"),
      item.floorPrice,
    ]);
    const avg = _.map(_.get(tradeData, "priceList", []), (item) => [
      (item.date as string).replaceAll("-", "/"),
      item.avgPrice,
    ]);
    return {
      tooltip: {
        trigger: "axis",
        // formatter: axisFormatter,
      },
      grid: {
        left: 0,
        right: 20,
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: "dotted",
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
      series: [
        {
          symbolSize: 20,
          data: points,
          type: "scatter",
          itemStyle: {
            color: "rgba(18, 220, 246, 0.1)",
            borderWidth: 1,
            borderColor: "rgba(18, 220, 246, 0.5)",
          },
          tooltip: {
            trigger: "item",
            formatter: tipFormatter,
          },
        },
        {
            name: "Floor Price",
            type: "line",
            showSymbol: false,
            data: min,
            itemStyle: {
              color: colors[0],
            },
          },
        {
          name: "Avg Price",
          type: "line",
          showSymbol: false,
          data: avg,
          itemStyle: {
            color: colors[1],
          },
        },
        {
          name: "Max Price",
          type: "line",
          showSymbol: false,
          data: max,
          itemStyle: {
            color: colors[2],
          },
        },

      ],
    };
  }, [tradeData, dates]);

  const [marketData] = useGet(() => getMarketCapAndVolume(id), [id]);
  const marketTopics: Topic[] = useMemo(() => {
    return [
      {
        title: "Market Cap",
        value: _.get(marketData, "marketCap.value", "-"),
        compare: createDelta(_.get(marketData, "marketCap.delta")),
      },
      {
        title: "Volume",
        value: _.get(marketData, "volume.value", "-"),
        compare: createDelta(_.get(marketData, "volume.delta")),
      },
    ];
  }, [marketData]);
  const marketOption = useMemo(() => {
    const volume = _.map(marketData?.resultList || [], (item) => [
      (item.date as string).replaceAll("-", "/"),
      item.volume,
    ]);
    const cap = _.map(marketData?.resultList || [], (item) => [
      (item.date as string).replaceAll("-", "/"),
      item.marketCap,
    ]);
    return {
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: 0,
        right: 20,
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: "dotted",
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
      series: [
        {
          name: "Volume",
          type: "bar",
          roundCap: true,
          data: volume,
          barWidth: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#32E8FF" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#007CEE" },
            ]), 
            borderRadius: [5, 5, 0, 0],
          },
        },
        {
          name: "Market Cap",
          type: "line",
          showSymbol: false,
          stack: "Total",
          smooth: true,
          data: cap,
          itemStyle: {
            color: colors[0],
          },
        },
      ],
    };
  }, [marketData]);
  const [salesData] = useGet(() => getSalesTransferAndLiquidity(id), [id]);
  const salesTopics: Topic[] = useMemo(() => {
    return [
      {
        title: "Sales",
        value: _.get(salesData, "sales.value", "-"),
        compare: createDelta(_.get(salesData, "sales.delta")),
      },
      {
        title: "Transfer",
        value: _.get(salesData, "transfers.value", "-"),
        compare: createDelta(_.get(salesData, "transfers.delta")),
      },
      {
        title: "Liquidity",
        value: _.get(salesData, "liquidity.value", "-"),
        compare: createDelta(_.get(salesData, "liquidity.delta")),
      },
    ];
  }, [salesData]);

  const salesOption = useMemo(() => {
    const sale = _.map(_.get(salesData, "resultList", []), (item) => [
      (item.date as string).replaceAll("-", "/"),
      item.sales,
    ]);
    const transfer = _.map(_.get(salesData, "resultList", []), (item) => [
      (item.date as string).replaceAll("-", "/"),
      item.transfers,
    ]);
    const liquidity = _.map(_.get(salesData, "resultList", []), (item) => [
      (item.date as string).replaceAll("-", "/"),
      item.liquidity,
    ]);
    return {
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: 0,
        right: 20,
        bottom: 0,
        containLabel: true,
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: "dotted",
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
      series: [
        {
          name: "Sales",
          type: "line",
          showSymbol: false,
          //   smooth: true,
          data: sale,
          itemStyle: {
            color: colors[0],
          },
        },
        {
          name: "Transfer",
          type: "line",
          showSymbol: false,
          //   smooth: true,
          data: transfer,
          itemStyle: {
            color: colors[1],
          },
        },
        {
          name: "Transfer",
          type: "line",
          showSymbol: false,
          //   smooth: true,
          data: liquidity,
          itemStyle: {
            color: colors[2],
          },
        },
      ],
    };
  }, [salesData]);

  const [recentTopSales] = useGet(() => getRecentTopSales(id), [id]);
  return (
    <div style={{ width: "100%", overflowY: "auto" }}>
      {/************************************Trade Plots**********************************************/}
      <ItemLayout>
        <ItemHeader title="Trade Plots" onChange={(opt) => setTradeOpt(opt)} />
        <ItemTopics items={tradeTopics} />
        <Chart option={tradeOptions} style={{ height: 300 }} />
      </ItemLayout>
      {/********************************* Market Cap & Volume ******************************************/}
      <ItemLayout>
        <ItemHeader
          title="Market Cap & Volume"
          onChange={(opt) => setTradeOpt(opt)}
        />
        <ItemTopics items={marketTopics} />
        <Chart option={marketOption} style={{ height: 300 }} />
      </ItemLayout>
      {/**************************** Sales, Transfers & Liquidity ****************************************/}
      <ItemLayout>
        <ItemHeader
          title="Sales, Transfers & Liquidity"
          onChange={(opt) => setTradeOpt(opt)}
        />
        <ItemTopics items={salesTopics} />
        <Chart option={salesOption} style={{ height: 300 }} />
      </ItemLayout>
      {/******************************* Recent Top Sales ******************************************/}
      <ItemLayout>
        <ItemHeader title="Recent Top Sales" />
        <LandTable data={recentTopSales}></LandTable>
      </ItemLayout>
    </div>
  );
}
