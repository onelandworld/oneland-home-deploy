import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Chart from "./common/Chart";
import { ChartTool } from "./common/chartTool";
import axios from "axios";
import { SERVICE_ADDRESS } from "../constants";
import moment from "moment";
import _ from "lodash";
import { useGet } from "../../lib/hooks/useGet";
import {
  getHeatMap,
  getHorizonOverview,
  getLandPrice,
  getLandTrade,
  getLeaders,
  getMarketValue,
  getTradeVolume,
  getUsersTrend,
} from "../../lib/http";
import { useOneState } from "../../lib/hooks/tools";
import {
  Currency,
  formatDelta,
  getNum,
  HeatmapType,
  name2type,
  PriceType,
  roundNum,
  shortStr,
  Timespan,
  type2name,
  UsersType,
  VolumeType,
} from "../../lib/utils";
import { ArrowDown, ArrowUp } from "./common/icons";

const MarketHorizonWarpper = styled.div`
  display: flex;
  height: calc(100% - 76px);
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  flex-direction: column;
  .section-one {
    background: url("../images/horizonBg.svg") no-repeat;
    background-size: 100%, 100%;
    width: 100%;
    padding: 0 220px;
    .card-warpper {
      display: flex;
      .card-left {
        .card-one {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(100px);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 290px;
          height: 130px;
          padding: 20px;
          margin-bottom: 10px;
          .top {
            display: flex;
            justify-content: space-between;
            color: white;
            font-size: 12px;
            align-items: center;
            .coin-unit {
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              width: 82px;
              height: 32px;
              span {
                color: #7e96b8;
                cursor: pointer;
                &.selected {
                  background-color: #020012;
                  border-radius: 8px;
                  color: white;
                  padding: 4px;
                }
              }
            }
          }
          .bottom {
            display: flex;
            align-items: flex-end;
            height: 40px;
            span {
              color: white;
              font-size: 24px;
              span {
                font-size: 12px;
                color: #7e96b8;
                padding-left: 10px;
              }
            }
          }
        }
        .card-two {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(100px);
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          width: 290px;
          height: 182px;
          padding: 20px;
          .top {
            display: flex;
            justify-content: space-between;
            color: white;
            font-size: 12px;
          }
          .middle {
            height: 70px;
          }
          .bottom {
            color: white;
            font-size: 24px;
            margin-top: 10px;
            div {
              display: flex;
              align-items: center;
              margin-top: 6px;
              .up {
                color: #32cb9d;
              }
              .down {
                color: #ef4c56;
              }
              span {
                color: #32cb9d;
                font-size: 12px;
                margin-right: 4px;
              }
              .tip {
                width: 12px;
                height: 12px;
              }
            }
          }
        }
      }
      .card-right {
        flex: 1;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(100px);
        border-radius: 16px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .chart-warpper {
          flex: 1;
          margin-top: 34px;
        }
      }
    }
  }
  .section-two {
    background: url("../images/horizonBgTwo.svg") no-repeat;
    background-size: 100%, 100%;
    width: 100%;
    padding: 0 220px 80px 220px;
    display: flex;
    flex-direction: column;
  }
  .section-three {
    background: #13151b;
    /* background: linear-gradient(
      180deg,
      #e7dff8 0%,
      #faf8fd 22.92%,
      #ffffff 99.99%,
      #231938 100%
    ); */
    width: 100%;
    padding: 80px 220px;
    .table-box {
      width: 100%;
      height: 894px;
      display: flex;
      justify-content: center;
      padding-top: 30px;

      .table-title {
        color: white;
        font-weight: 600;
        font-size: 24px;
      }
      .table-left {
        display: flex;
        /* width: 440px; */
        flex: 1;
        flex-direction: column;
        margin-right: 86px;
        .table-item {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #7e96b8;
          justify-content: space-between;
          height: 84px;
          .left {
            display: flex;
            align-items: center;
            .index {
              background: linear-gradient(
                127.2deg,
                #03fcf7 -5.24%,
                #3ae8f3 43.25%,
                #fc6cff 89.21%
              );
              background-clip: text;
              -webkit-background-clip: text;
              color: transparent;
              font-size: 18px;
              margin-right: 20px;
              font-weight: 600;
            }
            .name {
              font-weight: 600;
              display: flex;
              flex-direction: column;
              .title {
                color: white;
                font-size: 18px;
                margin-bottom: 6px;
                white-space: nowrap;
              }
              div {
                img {
                  width: 8px;
                  height: 14px;
                  margin-right: 6px;
                }
                span {
                  white-space: nowrap;
                  color: #7e96b8;
                  font-size: 14px;
                }
              }
            }
          }
          .right {
            font-weight: 600;
            display: flex;
            flex-direction: column;
            .address {
              white-space: nowrap;
              text-decoration-line: underline;
              color: white;
              font-size: 16px;
              margin-bottom: 6px;
            }
            div {
              display: flex;
              align-items: center;
              img {
                width: 20px;
                height: 20px;
                margin-right: 6px;
              }
              .value {
                color: white;
                font-size: 16px;
                margin-right: 6px;
              }
              .date {
                font-size: 14px;
                color: #7e96b8;
              }
            }
          }
        }
      }
      .table-right {
        flex: 1;
        .table-item-right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #7e96b8;
          height: 84px;
          .index {
            background: linear-gradient(
              127.2deg,
              #03fcf7 -5.24%,
              #3ae8f3 43.25%,
              #fc6cff 89.21%
            );
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            font-size: 18px;
            margin-right: 20px;
            font-weight: 600;
          }
          .address {
            color: white;
            font-weight: 600;
            font-size: 16px;
            text-decoration-line: underline;
          }
          div {
            display: flex;
            flex-direction: column;
            .value {
              color: white;
              font-size: 16px;
              margin-bottom: 6px;
            }
            .approve {
              font-size: 14px;
              color: #7e96b8;
            }
          }
        }
      }
    }
  }
  .section-four {
    /* height: 536px; */
    background: linear-gradient(
      180deg,
      #e7dff8 0%,
      #faf8fd 22.92%,
      #ffffff 99.99%,
      #231938 100%
    );
    padding: 80px 220px;
    width: 100%;

    .metaverseBox {
      display: inline-block;
      float: right;
      margin-top: 16px;
      vertical-align: bottom;
      div {
        display: inline-block;
        /* background: #191f2d; */
        border-radius: 8px;
        margin-right: 10px;
        padding: 6px 10px;
        height: 30px;
        font-weight: 600;
        font-size: 12px;
        color: #7e96b8;
        cursor: pointer;
        &.selected {
          background: #7e96b8;
          color: white;
          span {
            /* background: linear-gradient(
              127.2deg,
              #03fcf7 -5.24%,
              #3ae8f3 43.25%,
              #fc6cff 89.21%
            ); */

            /* background-clip: text;
            -webkit-background-clip: text;
            color: transparent; */
          }
        }
      }
    }
    .metaTable {
      width: 100%;
      /* padding-left: 26px; */
      margin-bottom: 48px;
      margin-top: 26px;
      .head {
        display: flex;
        height: 48px;
        background: #7e96b8;
        padding-left: 8px;
        color: white;
        font-weight: 600;
        font-size: 12px;
        width: 100%;
        align-items: center;
        span {
          flex: 1;
        }
      }
      .body {
        display: flex;
        flex-direction: column;
        .row {
          display: flex;
          height: 48px;
          color: black;
          font-weight: 600;
          font-size: 12px;
          width: 100%;
          align-items: center;
          div {
            flex: 1;
            display: flex;
            align-items: center;
            img {
              margin-right: 6px;
            }
          }

          span {
            flex: 1;
          }
        }
      }
    }
  }
  .section-five {
    background: url("../images/footer-bg.svg") no-repeat;
    background-size: 100%, 100%;
    position: relative;
    margin-top: -224px;
    .footer {
      height: 206px;
      margin-top: 396px;
      padding: 0 244px 0 120px;
      bottom: 0;
      width: 1440px;
      display: flex;
      justify-content: space-between;
      .footerLeft {
        display: flex;
        .footLogo {
          display: flex;
          flex-direction: column;
          color: #ffffff;
          margin-right: 140px;
          span {
            font-size: 14px;
          }
          div {
            display: flex;
            margin-bottom: 22px;
            img {
              width: 38px;
              height: 38px;
              margin-right: 10px;
            }
            div {
              display: flex;
              flex-direction: column;
              .oneland {
                font-size: 24px;
                line-height: 24px;
              }
              .yourLand {
                font-size: 14px;
              }
            }
          }
        }
        .footInfo {
          display: flex;
          div {
            display: flex;
            flex-direction: column;
            margin-right: 60px;
            span {
              font-size: 14px;
              color: rgba(126, 150, 184, 0.6);
              margin-bottom: 12px;
              font-weight: 500;
              transition: all 0.2s;
              cursor: pointer;
              &:hover {
                color: #12dcf6;
              }
              &:nth-child(1) {
                color: white;
                line-height: 150%;
              }
            }
          }
        }
      }
      .footerRight {
        display: flex;
        flex-direction: column;
        span {
          color: white;
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 20px;
        }
        div {
          display: flex;
          i {
            margin-right: 20px;
            cursor: pointer;
            transition: all 0.2s;
          }
        }
      }
    }
  }
  .in {
    width: 20px;
    height: 20px;
    background-image: url("/images/in.svg");
    &:hover {
      background-image: url("/images/in_hover.svg");
    }
  }
  .twiter {
    width: 20px;
    height: 20px;
    background-size: cover;
    background-image: url("/images/twiter.svg");
    &:hover {
      background-image: url("/images/twiter_hover.svg");
    }
  }
  .facebook {
    width: 20px;
    height: 20px;
    background-image: url("/images/facebook.svg");
    &:hover {
      background-image: url("/images/facebook_hover.svg");
    }
  }
  .circle {
    width: 20px;
    height: 20px;
    background-image: url("/images/circle.svg");
    &:hover {
      background-image: url("/images/circle_hover.svg");
    }
  }
`;
const BigTitle = styled.div<{ margin?: string; color?: string }>`
  color: ${({ color }) => color || "#FFFFFF"};
  font-size: 42px;
  font-weight: 900;
  margin: ${({ margin }) => margin || "0px"};
`;
const ChartBox = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(100px);
  border-radius: 14px;
  padding: 20px;
  margin-top: 20px;
  .chart-data {
    min-height: 320px;
    max-height: 320px;
    margin-top: 24px;
  }
`;
export interface SetState {
  // overview
  totallandCurrency: Currency;
  // tradingCurrency
  tradingCurrency: Currency;
  // heatmap
  heatmapType: HeatmapType;
  heatmapTimespan: Timespan;
  heatmapCurrency: Currency;
  // landtrade
  landtradeType: PriceType;
  landtradeTimespan: Timespan;
  landtradeCurrency: Currency;
  // marketvalue
  marketvalueType: HeatmapType;
  marketvalueTimespan: Timespan;
  marketvalueCurrency: Currency;
  // landprice
  landpriceType: PriceType;
  landpriceTimespan: Timespan;
  landpriceCurrency: Currency;
  // tradevolume
  tradevolumeType: VolumeType;
  tradevolumeTimespan: Timespan;
  tradevolumeCurrency: Currency;
  // users
  usersType: UsersType;
  usersTimespan: Timespan;
}
export const MarketHorizon: React.FC = () => {
  const chartOneTab = ["Land Value", "Token Value"];
  const chartTwoTab = ["Avg.Price", "Floor.Price"];
  const chartThreeTab = ["Volume", "Quantity"];
  const chartFourTab = ["Unique Owner", "Unique Trader"];

  const [state, setState] = useOneState<SetState>({
    totallandCurrency: "usdt",
    tradingCurrency: "usdt",
    // heatmap
    heatmapType: "land",
    heatmapTimespan: "year",
    heatmapCurrency: "usdt",
    // landtrade
    landtradeType: "avg",
    landtradeTimespan: "year",
    landtradeCurrency: "usdt",
    // marketvalue
    marketvalueType: "land",
    marketvalueTimespan: "year",
    marketvalueCurrency: "usdt",
    // landprice
    landpriceType: "avg",
    landpriceTimespan: "year",
    landpriceCurrency: "usdt",
    // tradevolume
    tradevolumeType: "volume",
    tradevolumeTimespan: "year",
    tradevolumeCurrency: "usdt",
    // users
    usersType: "owner",
    usersTimespan: "year",
  });
  const {
    totallandCurrency,
    tradingCurrency,
    // heatmap
    heatmapType,
    heatmapTimespan,
    heatmapCurrency,
    // landtrade
    landtradeType,
    landtradeTimespan,
    landtradeCurrency,
    // marketvalue
    marketvalueType,
    marketvalueTimespan,
    marketvalueCurrency,
    // landprice
    landpriceType,
    landpriceTimespan,
    landpriceCurrency,
    // tradevolume
    tradevolumeType,
    tradevolumeTimespan,
    tradevolumeCurrency,
    // users
    usersType,
    usersTimespan,
  } = state;

  const [metaversesData, setMetaversesData] = useState([] as any);
  const [selectMetaVerseTab, setSelectMetaVerseTab] = useState(0);
  useEffect(() => {
    getMetaverses();
  }, []);

  const [overviewData] = useGet(() => getHorizonOverview());
  const overviewOption = useMemo(() => {
    if (!overviewData) return {};
    const delta = getNum(overviewData, "onelandHeatIndicator.delta", 0);
    const color = delta >= 0 ? "#06E694" : "#EF4C56";
    return {
      grid: { top: 10, right: 20, bottom: 15, left: 20 },
      xAxis: {
        type: "category",
        boundaryGap: false,
        show: false,
      },
      axisLine: {
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          data: overviewData.onelandHeatIndicator?.history || [],
          type: "line",
          symbol: "none",
          lineStyle: {
            width: 2, //外边线宽度
            color: color, //外边线颜色
          },
          smooth: true,
        },
      ],
    };
  }, [overviewData]);
  const [heatmap] = useGet(
    () => getHeatMap(heatmapType, heatmapCurrency, heatmapTimespan),
    [heatmapType, heatmapCurrency, heatmapTimespan]
  );
  const heatmapOption = useMemo(() => {
    if (heatmap) {
      const handleData = heatmap.list.map((item: any) => {
        return {
          name: item.name,
          value: roundNum(item.value, 0),
          //   itemStyle: {
          //     color: item.value > 0 ? "#32CB9D" : "#C54ABA",
          //   },
          delta: formatDelta(item.delta, true),
        };
      });
      return {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "treemap",
            roam: "false",
            width: "100%",
            height: "100%",
            nodeClick: "false",
            breadcrumb: "false",
            colorMappingBy: "value",

            label: {
              width: "100%",
              height: "100%",
              color: "#052835",
              padding: 20,
              formatter: (param: any) => {
                return [
                  `{name|${param.name}}`,
                  `{value|${param.value}}`,
                  `{delta|${param.data.delta}}`,
                ].join("\n");
              },
              rich: {
                name: {
                  fontWeight: "600",
                  fontSize: 24,
                  lineHeight: 30,
                },
                value: {
                  fontWeight: "600",
                  fontSize: 14,
                  lineHeight: 22,
                },
                delta: {
                  fontWeight: "600",
                  fontSize: 12,
                  lineHeight: 14,
                },
              },
            },
            itemStyle: {
              normal: {
                borderWidth: 0,
                borderRadius: 8,
                borderColor: "rgba(255, 255, 255, 0.05)", //边框颜色
                gapWidth: 4, //方块内部边框粗细
              },
            },
            data: handleData,
          },
        ],
      };
    }
    return {};
  }, [heatmap]);
  const [landtrade] = useGet(
    () => getLandTrade(landtradeType, landtradeCurrency, landtradeTimespan),
    [landtradeType, landtradeTimespan, landtradeCurrency]
  );
  const landtradeOption = useMemo(() => {
    if (!landtrade) return {};
    const currency = type2name(landtradeCurrency);
    const rValue = _.map(landtrade, "symbolSize");
    // const minR = _.min(rValue);
    const maxY = roundNum(_.max(_.map(landtrade, "price")) * 1.3, 0);
    const maxR = _.max(rValue);
    const MAXR = 150;
    const scale = maxR / MAXR;

    const handleData = landtrade.map((item: any) => {
      return {
        name: item.name,
        oData: item,
        value: [
          item.tradeNum,
          roundNum(item.price),
          roundNum(item.symbolSize / scale, 0),
        ],
      };
    });
    return {
      grid: { top: 50, right: 50, bottom: 100, left: 60 },
      colorBy: "data",
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "cross",
        },
      },
      xAxis: {
        nameLocation: "middle",
        nameGap: 24,
        name: "Quantity of land traded",
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,.2)",
          },
        },
      },
      yAxis: {
        max: maxY,
        nameStyle: {
          padding: [0, 0, 0, 100],
        },
        name:
          landtradeType === "avg"
            ? `Avg.Price(in ${currency})`
            : `Floor.Price(in ${currency})`,
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,.2)",
          },
        },
      },
      series: [
        {
          type: "scatter",
          symbolSize: (val: any) => {
            return val[2];
          },
          data: handleData,
        },
      ],
    };
  }, [landtrade, landtradeType]);

  const [marketvalue] = useGet(
    () =>
      getMarketValue(marketvalueType, marketvalueTimespan, marketvalueCurrency),
    [marketvalueType, marketvalueTimespan, marketvalueCurrency]
  );
  const marketvalueOption = useMemo(() => {
    if (!marketvalue) return {};
    const handleData = marketvalue.map((item: any) => {
      const data = item.list.map((d: any) => {
        return {
          name: item.name,
          oData: item,
          value: [d.date, roundNum(d.value, 0)],
        };
      });
      return {
        type: "line",
        stack: "Total",
        name: item.name,
        areaStyle: {
          opacity: 0.5,
        },
        emphasis: {
          focus: "series",
        },
        data: data,
      };
    });
    return {
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "time",
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,.2)",
          },
        },
      },
      grid: { top: 10, right: 40, bottom: 10, left: 80 },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,.2)",
          },
        },
      },
      series: handleData,
    };
  }, [marketvalue]);

  const [landprice] = useGet(
    () => getLandPrice(landpriceType, landpriceTimespan, landpriceCurrency),
    [landpriceType, landpriceTimespan, landpriceCurrency]
  );
  const landpriceOption = useMemo(() => {
    if (!landprice) return {};
    const handleData = landprice.map((item: any) => {
      const data = item.list.map((d: any) => {
        return [d.date, roundNum(d.value)];
      });
      return {
        name: item.name,
        data: data,
        type: "line",
        smooth: true,
      };
    });
    return {
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
      },
      grid: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 20,
        containLabel: true,
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,.2)",
          },
        },
      },
      series: handleData,
    };
  }, [landprice]);

  const [tradevolume] = useGet(
    () =>
      getTradeVolume(tradevolumeType, tradevolumeTimespan, tradevolumeCurrency),
    [tradevolumeType, tradevolumeTimespan, tradevolumeCurrency]
  );
  const tradevolumeOption = useMemo(() => {
    if (!tradevolume) return {};
    const handleData = tradevolume.map((item: any) => {
      const data = item.list.map((d: any) => {
        return [d.date, roundNum(d.value)];
      });
      return {
        type: "bar",
        name: item.name,
        emphasis: {
          focus: "series",
        },
        stack: "Ad",
        barWidth: 10,
        itemStyle: {
          width: 10,
          borderRadius: [5, 5, 0, 0],
        },
        data: data,
      };
    });
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 20,
        containLabel: true,
      },
      xAxis: {
        type: "time",
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,.2)",
          },
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,.2)",
          },
        },
      },
      series: handleData,
    };
  }, [tradevolume]);
  const [users] = useGet(
    () => getUsersTrend(usersType, usersTimespan),
    [usersType, usersTimespan]
  );
  const usersOption = useMemo(() => {
    if (!users) return {};
    const handleData = users.map((item: any) => {
      const data = item.list.map((d: any) => {
        return [d.date, roundNum(d.value)];
      });
      return {
        name: item.name,
        data: data,
        type: "line",
        smooth: true,
      };
    });
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
        //   data: xData,
      },
      grid: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 20,
        containLabel: true,
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "rgba(255,255,255,.2)",
          },
        },
      },
      series: handleData,
    };
  }, [users]);
  const [leaders] = useGet(() => getLeaders(), []);

  const getMetaverses = async () => {
    const res = await axios.get(`${SERVICE_ADDRESS}assets/metaverses`);
    if (res.data.code == 200) {
      const basicData = res.data.data.basic?.map((item: any) => {
        return {
          name: item.name,
          logoUrl: item.logoUrl,
          data: [
            item.totalLandSupply ?? "--",
            item.marketSupply ?? "--",
            item.listed ?? "--",
            item.parcelArea ?? "--",
            item.totalArea ?? "--",
            item.nativeToken ?? "--",
          ],
        };
      });
      const marketCapData = res.data.data.marketCap?.map((item: any) => {
        return {
          name: item.name,
          logoUrl: item.logoUrl,
          data: [
            item.landMarketCap ?? "--",
            item.landChange7d ?? "--",
            item.tokenMarketCap ?? "--",
            item.tokenChange7d ?? "--",
            item.landTokenRatio ?? "--",
          ],
        };
      });
      const priceData = res.data.data.price?.map((item: any) => {
        return {
          name: item.name,
          logoUrl: item.logoUrl,
          data: [
            item.avgPrice ?? "--",
            item.avgChange24h ?? "--",
            item.avgChange7d ?? "--",
            item.floorPrice ?? "--",
            item.floorChange24h ?? "--",
            item.floorChange7d ?? "--",
            item.tokenPrice ?? "--",
            item.tokenChange24h ?? "--",
            item.tokenChange7d ?? "--",
          ],
        };
      });
      const volumnLiquidityData = res.data.data.volumnLiquidity?.map(
        (item: any) => {
          return {
            name: item.name,
            logoUrl: item.logoUrl,
            data: [
              item.volume24h ?? "--",
              item.change24h ?? "--",
              item.volume7d ?? "--",
              item.change7d ?? "--",
              item.volume30d ?? "--",
              item.change30d ?? "--",
              item.sales ?? "--",
              item.turnover ?? "--",
            ],
          };
        }
      );
      const holderData = res.data.data.holder?.map((item: any) => {
        return {
          name: item.name,
          logoUrl: item.logoUrl,
          data: [
            item.uniqueOwners ?? "--",
            item.top10Wealth ?? "--",
            item.top100Wealth ?? "--",
            item.avgHoldingPeriod ?? "--",
            item.diamondHands ?? "--",
          ],
        };
      });
      const publicAttentionData = res.data.data.publicAttention?.map(
        (item: any) => {
          return {
            name: item.name,
            logoUrl: item.logoUrl,
            data: [
              item.gooleSearch7d ?? "--",
              item.googleSearch7dChange ?? "--",
              item.twitterFllowers ?? "--",
              item.twitterFllowers7dChange ?? "--",
              item.discordMembers ?? "--",
              item.discordMembers7dChange ?? "--",
            ],
          };
        }
      );
      const datas = [
        {
          value: "Basics",
          tableHeaders: [
            "Metaverse",
            "Total Lands Supply",
            "Market supply",
            "Listed",
            "Parcel area",
            "Total area",
            "nativeToken",
          ],
          tableBodys: basicData,
        },
        {
          value: "MarketCap",
          tableHeaders: [
            "Metaverse",
            "Land Market Cap",
            "7d Change",
            "Token Market Cap",
            "7d Change",
            "Land Token Ratio",
          ],
          tableBodys: marketCapData,
        },
        {
          value: "Price",
          tableHeaders: [
            "Metaverse",
            "Avg Price",
            "24h Change",
            "7d Change",
            "Floor Price",
            "24h Change",
            "7d Change",
            "Token Price",
            "24h Change",
            "7d Change",
          ],
          tableBodys: priceData,
        },
        {
          value: "Volume&Liquidity",
          tableHeaders: [
            "Metaverse",
            "24h Volume",
            "Change",
            "7d Volume",
            "Change",
            "30d Volume",
            "Change",
            "Sales",
            "Turnover",
          ],
          tableBodys: volumnLiquidityData,
        },
        {
          value: "Holder",
          tableHeaders: [
            "Metaverse",
            "Unique Owners",
            "Top 10 Owners Wealth %",
            "Top 100 Owners Wealth %",
            "Avg Holding Period",
            "Diamond Hands %",
          ],
          tableBodys: holderData,
        },
        {
          value: "Public Attention",
          tableHeaders: [
            "Metaverse",
            "Google Searches 7d",
            "Change",
            "Twitter Followers",
            "7d Change",
            "Discord Members",
            "7d Change",
          ],
          tableBodys: publicAttentionData,
        },
      ];
      setMetaversesData(datas);
    }
  };

  return (
    <MarketHorizonWarpper>
      {/***********************************************************Market Horizon ***************************** */}
      <section className="section-one">
        <BigTitle margin="72px 0 30px 0">MARKET HORIZON</BigTitle>
        <div className="card-warpper">
          <div className="card-left">
            <div className="card-one">
              <div className="top">
                <span>Total Land Value</span>
                <div className="coin-unit">
                  <span
                    className={totallandCurrency === "usdt" ? "selected" : ""}
                    onClick={() => setState({ totallandCurrency: "usdt" })}
                  >
                    USD
                  </span>
                  <span
                    className={totallandCurrency === "eth" ? "selected" : ""}
                    onClick={() => setState({ totallandCurrency: "eth" })}
                  >
                    ETH
                  </span>
                </div>
              </div>
              <div className="bottom">
                {/* <img src="images/eth.svg" alt="" /> */}
                <span>
                  {totallandCurrency === "eth"
                    ? roundNum(getNum(overviewData, "totalLandValue"), 0)
                    : roundNum(
                        getNum(overviewData, "totalLandValue") *
                          getNum(overviewData, "usdtRate", 6),
                        0
                      )}
                  <span>{type2name(totallandCurrency)}</span>
                </span>
              </div>
            </div>
            <div className="card-one">
              <div className="top">
                <span>Trading Volume - Daily</span>
                <div className="coin-unit">
                  <span
                    className={tradingCurrency === "usdt" ? "selected" : ""}
                    onClick={() => setState({ tradingCurrency: "usdt" })}
                  >
                    USD
                  </span>
                  <span
                    className={tradingCurrency === "eth" ? "selected" : ""}
                    onClick={() => setState({ tradingCurrency: "eth" })}
                  >
                    ETH
                  </span>
                </div>
              </div>
              <div className="bottom">
                {/* <img src="images/eth.svg" alt="" /> */}
                <span>
                  {tradingCurrency === "eth"
                    ? roundNum(getNum(overviewData, "dailyTrandingVolumn"), 0)
                    : roundNum(
                        getNum(overviewData, "dailyTrandingVolumn") *
                          getNum(overviewData, "usdtRate", 6),
                        0
                      )}
                  <span>{type2name(tradingCurrency)}</span>
                </span>
              </div>
            </div>
            <div className="card-two">
              <div className="top">
                <span>OneLand Heat Indicator</span>
                <img src="images/sun.svg" alt="" />
              </div>
              <div className="middle">
                <Chart option={overviewOption}></Chart>
              </div>
              <div className="bottom">
                <span>
                  {overviewData?.onelandHeatIndicator?.dailyTrandingVolumn}
                </span>
                <div>
                  {getNum(overviewData, "onelandHeatIndicator.delta", 0) >=
                  0 ? (
                    <ArrowUp />
                  ) : (
                    <ArrowDown />
                  )}
                  <span
                    className={
                      getNum(overviewData, "onelandHeatIndicator.delta", 0) >= 0
                        ? "up"
                        : "down"
                    }
                  >
                    {formatDelta(
                      getNum(overviewData, "onelandHeatIndicator.delta", 0)
                    )}
                  </span>
                  <img src="images/tip.svg" alt="" className="tip" />
                </div>
              </div>
            </div>
          </div>
          <div className="card-right">
            <ChartTool
              title="Metaverse HeatMap"
              tabArr={chartOneTab}
              selChartOneName={type2name(heatmapType)}
              tabChange={(n: string) => setState({ heatmapType: name2type(n) })}
              dateChange={(n: string) =>
                setState({ heatmapTimespan: name2type(n) })
              }
              unitChange={(n: string) =>
                setState({ heatmapCurrency: name2type(n) })
              }
            ></ChartTool>
            <div className="chart-warpper">
              <Chart option={heatmapOption}></Chart>
            </div>
          </div>
        </div>
        <ChartBox>
          <ChartTool
            title="Land Trade View"
            tabArr={chartTwoTab}
            selChartOneName={type2name(landtradeType)}
            tabChange={(n: string) => setState({ landtradeType: name2type(n) })}
            dateChange={(n: string) =>
              setState({ landtradeTimespan: name2type(n) })
            }
            unitChange={(n: string) =>
              setState({ landtradeCurrency: name2type(n) })
            }
          ></ChartTool>

          <Chart option={landtradeOption} className="chart-data"></Chart>
        </ChartBox>
      </section>
      {/***********************************************************Trends ***************************** */}
      <section className="section-two">
        <BigTitle margin="84px 0 10px 0" style={{}}>
          TRENDS
        </BigTitle>
        <ChartBox>
          <ChartTool
            title="Market VALUE TREND"
            tabArr={chartOneTab}
            selChartOneName={type2name(marketvalueType)}
            tabChange={(n: string) =>
              setState({ marketvalueType: name2type(n) })
            }
            dateChange={(n: string) =>
              setState({ marketvalueTimespan: name2type(n) })
            }
            unitChange={(n: string) =>
              setState({ marketvalueCurrency: name2type(n) })
            }
          ></ChartTool>
          <Chart option={marketvalueOption} className="chart-data"></Chart>
        </ChartBox>
        <ChartBox>
          <ChartTool
            title="Land Price Trend"
            tabArr={chartTwoTab}
            selChartOneName={type2name(landpriceType)}
            tabChange={(n: string) => setState({ landpriceType: name2type(n) })}
            dateChange={(n: string) =>
              setState({ landpriceTimespan: name2type(n) })
            }
            unitChange={(n: string) =>
              setState({ landpriceCurrency: name2type(n) })
            }
          ></ChartTool>
          <Chart option={landpriceOption} className="chart-data"></Chart>
        </ChartBox>
        <ChartBox>
          <ChartTool
            title="Trade Volume Trend"
            tabArr={chartThreeTab}
            selChartOneName={type2name(tradevolumeType)}
            tabChange={(n: string) =>
              setState({ tradevolumeType: name2type(n) })
            }
            dateChange={(n: string) =>
              setState({ tradevolumeTimespan: name2type(n) })
            }
            unitChange={(n: string) =>
              setState({ tradevolumeCurrency: name2type(n) })
            }
          ></ChartTool>
          <Chart option={tradevolumeOption} className="chart-data"></Chart>
        </ChartBox>
        <ChartBox>
          <ChartTool
            title="Users Trend"
            tabArr={chartFourTab}
            noUnit={true}
            selChartOneName={type2name(usersType)}
            tabChange={(n: string) => setState({ usersType: name2type(n) })}
            dateChange={(n: string) =>
              setState({ usersTimespan: name2type(n) })
            }
            unitChange={(n: string): void => {}}
          ></ChartTool>
          <Chart option={usersOption} className="chart-data"></Chart>
        </ChartBox>
      </section>
      <section className="section-four">
        <BigTitle margin="0" color="#000" style={{ display: "inline-block" }}>
          METAVERSES
        </BigTitle>
        <div className="metaverseBox">
          {metaversesData?.map((item: any, index: number) => (
            <div
              key={item.value}
              onClick={() => setSelectMetaVerseTab(index)}
              className={selectMetaVerseTab === index ? "selected" : ""}
            >
              <span>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="metaTable">
          <div className="head">
            {metaversesData[selectMetaVerseTab]?.tableHeaders?.map(
              (item: any, index: number) => (
                <span key={`${item}_${index}`}>{item}</span>
              )
            )}
          </div>
          <div className="body">
            {metaversesData[selectMetaVerseTab]?.tableBodys?.map(
              (item: any, index: number) => (
                <div key={`${item.name}_${index}`} className="row">
                  <div>
                    <img width={24} height={24} src={item.logoUrl} alt="" />
                    <span>{item.name}</span>
                  </div>
                  {item.data.map((d: any, index: number) => (
                    <span key={`${d}_${index}`}>{d}</span>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <section className="section-three">
        <BigTitle color="#ffffff">LEADERBOARDS</BigTitle>
        <div className="table-box">
          <div className="table-left">
            <span className="table-title">History Top Sales</span>
            {leaders?.sales?.map((item: any) => (
              <div key={`${item.address}_${item.index}`} className="table-item">
                <div className="left">
                  <span className="index">NO.{item.index}</span>
                  <div className="name">
                    <span className="title">{item.name}</span>
                    <div>
                      <img src="images/mirror.svg" alt="" />
                      <span className="coordinate">{item.position}</span>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <span className="address">
                    {shortStr(
                      _.get(leaders, `owners.${item.index - 1}.address`),
                      4,
                      2
                    )}
                    {"->"}
                    {shortStr(item.address, 4, 2)}
                  </span>
                  <div>
                    <img src="images/eth.svg" alt="" />
                    <span className="value">
                      {roundNum(item.price)} {item.blockchain.toUpperCase()}
                    </span>
                    <span className="date">
                      {moment(item.tradeTime).format("YYYY-MM-DD")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="table-right">
            <span className="table-title">Land Owner Rich List</span>
            {leaders?.owners?.map((item: any) => (
              <div
                key={`${item.name}_${item.index}`}
                className="table-item-right"
              >
                <span className="index">NO.{item.index}</span>
                <span className="address">{shortStr(item.address)}</span>
                <div>
                  <div>
                    <span className="value">{item.parcels} parcels</span>
                    <span className="approve">
                      approx. {roundNum(item.price)}{" "}
                      {item.blockchain.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-five" style={{ display: "none" }}>
        <div className="footer">
          <div className="footerLeft">
            <div className="footLogo">
              <div>
                <img src="images/logo.svg" alt="" />
                <div>
                  <span className="oneland">ONELAND</span>
                  <span className="youLand">Active your land</span>
                </div>
              </div>
              <span>© 2020 Oneland</span>
            </div>
            {/* <div className="footInfo">
                            <div>
                                <span>Marketplace</span>
                                <span>Buy</span>
                                <span>Sell</span>
                                <span>Lease</span>
                                <span>Forum</span>
                            </div>
                            <div>
                                <span>Landfi</span>
                                <span>mortgage</span>
                                <span>Fragmentate</span>
                                <span>Invest fund</span>
                            </div>
                            <div>
                                <span>Resources</span>
                                <span>White paper</span>
                                <span>Github</span>
                                <span>FAQ</span>
                            </div>
                        </div> */}
          </div>
          <div className="footerRight">
            <span>Community</span>
            <div>
              <i className="in"></i>
              <i className="twiter"></i>
              <i className="facebook"></i>
              <i className="circle"></i>
            </div>
          </div>
        </div>
      </section>
    </MarketHorizonWarpper>
  );
};
