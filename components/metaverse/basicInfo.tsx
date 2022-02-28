import React, { Fragment, useMemo } from "react";
import styled from "styled-components";
import { useGet } from "../../../lib/hooks/useGet";
import { useCurrentProject } from "../../../lib/hooks/useProjects";
import {
  getKeyData,
  getKeyInfo,
  getKeyTags,
  getLandSupply,
} from "../../../lib/http";
import Chart from "../common/Chart";
import { ArrowDown, ArrowUp } from "../common/icons";
import _ from "lodash";
import { formatDelta } from "../../../lib/utils";

const GridLayout = styled.div`
  color: white;
  flex: 1;
  width: 100%;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, min-content);
  grid-gap: 1rem;
  margin-top: 1rem;
`;

const itemAttrs = (p: { span: number }) => {
  return { span: p.span };
};

const GridItem = styled.div.attrs(itemAttrs)`
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  grid-column: span ${(p) => p.span};
`;

const GridItem2 = styled(GridItem)`
  background: #07090f;
  padding: 10px;
  .title {
    font-size: 12px;
    color: #7e9688;
    line-height: 1.5;
    font-weight: 600;
  }
  .index {
    float: right;
    font-size: 12px;
    line-height: 1.5;
    font-weight: 600;
  }
  .text {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 600;
    margin: 4px 0;
  }
  .up {
    font-size: 12px;
    line-height: 1.5;
    font-weight: 600;
    color: #32cb9d;
  }
  .down {
    font-size: 12px;
    line-height: 1.5;
    font-weight: 600;
    color: #ef4c56;
  }
`;

const ItemTitle = styled.div`
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;
`;

const TagsLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
`;
const Tag = styled.span`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
  border-radius: 4px;
  padding: 10px 15px;
  white-space: nowrap;
  margin-right: 10px;
  margin-bottom: 20px;

  &.style0 {
    background: rgba(145, 109, 254, 0.15);
    border: 1px solid #916dfe;
  }
  &.style1 {
    background: rgba(253, 204, 106, 0.15);
    border: 1px solid #fdcc6a;
  }
  &.style2 {
    background: rgba(197, 74, 186, 0.15);
    border: 1px solid #c54aba;
  }
  &.style3 {
    background: rgba(18, 220, 246, 0.15);
    border: 1px solid #12dcf6;
  }
  &.style4 {
    background: rgba(50, 203, 157, 0.15);
    border: 1px solid #32cb9d;
  }
`;

const KeyInfoLayout = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr min-content 1fr min-content 1fr;
  margin-top: 20px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  text-align: left;
  .left {
    padding-right: 1rem;
    white-space: nowrap;
    color: #7e96b8;
  }
`;

export function BasicInfo() {
  const { id } = useCurrentProject();
  const [keyTags] = useGet(() => getKeyTags(id), [id]);
  const [keyData] = useGet(() => getKeyData(id), [id]);
  const [keyInfo] = useGet(() => getKeyInfo(id), [id]);
  const [landSupply] = useGet(() => getLandSupply(id), [id]);
  const tags: string[] = useMemo(() => {
    return (keyTags || []).map((item: any) => item.name);
  }, [keyTags]);

  const infos: ([string, string] | [string, string, number])[] = useMemo(() => {
    return [
      ["Native Token:", `$${_.get(keyInfo, "nativeToken", "-")}`],
      ["Floor Price:", `${_.get(keyInfo, "floorPrice", "-")}ETH`],
      ["Unique Owners:", `${_.get(keyInfo, "uniqueOwners", "-")}`],
      ["Contract:", `${_.get(keyInfo, "contract.0", "-")}`],
      ["Avg. Price:", `${_.get(keyInfo, "avgPrice", "-")}ETH`],
      ["Listed:", `${_.get(keyInfo, "listed", "-")}`],
      ["Total Supply:", `${_.get(keyInfo, "totalSupply", "-")} parcels`],
      ["Land Volume (7d):", `${_.get(keyInfo, "landVolume", "-")} ETH`],
      ["Listing Rate:", formatDelta(_.get(keyInfo, "listingRate"))],
      ["Land Sizes:", _.get<string[]>(keyInfo, "sizes", []).join(","), 2],
      ["Token Price:", `$${_.get(keyInfo, "tokenPrice", "-")}`],
      ["Top10 Weaith %:", formatDelta(_.get(keyInfo, "top10wealth"))],
      ["Token Volume (24h):", `$${_.get(keyInfo, "tokenVolume", "-")}`],
      ["Top100 Weaith %:", formatDelta(_.get(keyInfo, "top100wealth"))],
      ["Parcel Area:", `${_.get(keyInfo, "parcelArea")} Sq.meters`],
      ["Est. Land Market Cap:", `${_.get(keyInfo, "landMarketCap")} ETH`],
      ["Avg. Holding Preiod:", _.get(keyInfo, "avgHoldingPreiod")],
      ["Total Area:", `${_.get(keyInfo, "totalArea")} Sq.meters`],
      ["Token Market Cap:", `$${_.get(keyInfo, "tokenMarketCap")}`],
      ["Turnover Ratio 7d:", formatDelta(_.get(keyInfo, "turnoverRatio7d"))],
    ];
  }, [keyInfo]);

  const keydatas: { name: string; value: number; delta: number }[] =
    useMemo(() => {
      const nameMap: { [k: string]: string } = {
        floorPrice: "Floor Price",
        landMarkCapValue: "Land Market Cap",
        volume7d: "Volume(7d)",
        uniqueHolder: "Unique Holder",
      };
      return _.map(keyData || {}, (item, key) => {
        return {
          name: nameMap[key] as string,
          value: item.value as number,
          delta: item.delta as number,
        };
      });
    }, [keyData]);
  const createLabel = (tit: string, sub: string) => {
    return {
      position: "outer",
      alignTo: "edge",
      margin: "10%",
      formatter: [`{tit|${tit}}`, `{sub|${sub}}`].join("\n"),
      rich: {
        tit: {
          color: "#12DCF6",
          fontSize: 16,
          align: "center",
        },
        sub: {
          color: "#7E96B8",
          fontSize: 13,
          align: "center",
          lineHeight: 24,
        },
      },
    };
  };
  const option = useMemo(() => {
    const total = _.get(landSupply, "totalSupply", 1);
    const listed = _.get(landSupply, "listedSupply", 0);
    const listedRdius = formatDelta(Math.sqrt(listed / total));
    return {
      colorBy: "series",
      tooltip: {
        trigger: "item",
        valueFormatter: (value: any) => {
          if (value === 1)
            return _.get(landSupply, "totalSupply", "-");
          return _.get(landSupply, "listedSupply", "-");
        },
      },
      series: [
        {
          type: "pie",
          radius: "100%",
          startAngle: -120,
          label: createLabel(
            "Total Supply",
            _.get(landSupply, "totalSupply", "-")
          ),
          data: [{ value: 1, name: "Total Supply" }],
          color: "#12DCF6",
          top: 20,
          bottom: 20,
        },
        {
          type: "pie",
          startAngle: 130,
          radius: listedRdius,
          zlevel: 20,
          label: createLabel(
            "Listed Supply",
            _.get(landSupply, "listedSupply", "-")
          ),
          data: [{ value: 2, name: "Listed Supply" }],
          color: "#C54ABA",
          top: 20,
          bottom: 20,
        },
      ],
    };
  }, [landSupply]);

  return (
    <GridLayout>
      {/* ----------------------------------------------------Key Tags---------------------------- */}
      <GridItem span={1}>
        <ItemTitle>Key Tags</ItemTitle>
        <TagsLayout>
          {tags.map((tag, index) => (
            <Tag key={`tag_${index}`} className={`style${index % 5}`}>
              {tag}
            </Tag>
          ))}
        </TagsLayout>
      </GridItem>
      {/* ----------------------------------------------------Key Data---------------------------- */}
      <GridItem span={1}>
        <ItemTitle>Key Data</ItemTitle>
        <GridLayout>
          {keydatas.map((item, i) => (
            <GridItem2 span={1} key={`keydata_${i}`}>
              <div>
                <span className="title">{item.name}</span>
                <span className="index">#{i + 1}</span>
              </div>
              <div className="text">{item.value}</div>
              <div className={item.delta > 0 ? "up" : "down"}>
                {item.delta > 0 ? <ArrowUp /> : <ArrowDown />}
                <span>{formatDelta(item.delta).replace("-", "")}</span>
              </div>
            </GridItem2>
          ))}
        </GridLayout>
      </GridItem>
      {/* ----------------------------------------------------Key Info---------------------------- */}
      <GridItem span={2}>
        <ItemTitle>Key Info</ItemTitle>
        <KeyInfoLayout>
          {infos.map(([name, value, span], index) => (
            <Fragment key={`infos_${index}`}>
              <span className="left" style={{ gridRow: `span ${span || 1}` }}>
                {name}
              </span>
              <span style={{ gridRow: `span ${span || 1}` }}>{value}</span>
            </Fragment>
          ))}
        </KeyInfoLayout>
      </GridItem>
      {/* ----------------------------------------------------Land Supply---------------------------- */}
      <GridItem span={2}>
        <ItemTitle>Land Supply</ItemTitle>
        <div style={{ height: 400 }}>
          <Chart option={option} />
        </div>
      </GridItem>
    </GridLayout>
  );
}
