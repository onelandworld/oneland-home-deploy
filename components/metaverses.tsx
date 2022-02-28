import { useState } from "react";
import styled from "styled-components";
import useProjects from "../../lib/hooks/useProjects";
import MenuList from "./common/menuList";
import MapFilterGroup from "./mapFilterGroup";
import { BasicInfo } from "./metaverse/basicInfo";
import { HolderAnalytics } from "./metaverse/holderAnalytics";
import { MetaverseActivity } from "./metaverse/metaverseActivity";
import { TradeAnalytics } from "./metaverse/tradeAnalytics";
import { SandBoxInfo } from "./sandBoxInfo";

const MarketWapper = styled.div`
  display: flex;
  height: calc(100% - 76px);
`;
const LeftWapper = styled.div`
  width: 368px;
  padding-left: 50px;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
`;
const LeftProjectInfo = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #7e96b8;
    font-size: 18px;
    margin-right: 22px;
  }
  & > div {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    span {
      color: white;
      font-weight: 600;
      font-size: 18px;
      padding: 0 33px 0 8px;
    }
  }
`;
const RightWapper = styled.div`
  flex: 1;
  background: #131823;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const TabWapper = styled.div``;
const TabList = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  div {
    color: #7e96b8;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-right: 50px;
    position: relative;
    img {
      margin-right: 8px;
    }
    &.active {
      font-weight: bold;
      color: #12dcf6;
      &::after {
        content: " ";
        display: flex;
        width: 20px;
        height: 2px;
        background: #12dcf6;
        position: absolute;
        bottom: -10px;
        left: calc(50% - 10px);
      }
    }
  }
`;

export const Metaverses = () => {
  const selectTabList = [
    {
      key: "basicInfo",
      name: "Basic Info",
      icon: "images/overview.svg",
      hoverIcon: "images/overview-hover.svg",
    },
    {
      key: "activities",
      name: "Activities",
      icon: "images/overview.svg",
      hoverIcon: "images/overview-hover.svg",
    },
    {
      key: "tradeAnalytics",
      name: "Trade Analytics",
      icon: "images/overview.svg",
      hoverIcon: "images/overview-hover.svg",
    },
    {
      key: "holderAnalytics",
      name: "Holder Analytics",
      icon: "images/overview.svg",
      hoverIcon: "images/overview-hover.svg",
    },
  ];
  const [selectkey, setSelectKey] = useState(selectTabList[0].key);
  const [strList, setStrList] = useState<string[]>([]);
  const { currentIndex, projects, toProject } = useProjects();
  const [showList, setShowList] = useState(false);

  return (
    <MarketWapper>
      <LeftWapper>
        <LeftProjectInfo>
          <span>Project</span>
          <div
            onMouseEnter={() => setShowList(true)}
            onMouseLeave={() => setShowList(false)}
          >
            <img src={projects[currentIndex].icon} alt="" />
            <span>{projects[currentIndex].name}</span>
            <img src="images/arrow-down.svg" alt="" />
            {showList && (
              <MenuList
                menuList={projects}
                selectIndex={currentIndex}
                onClick={(index: number) => {
                  toProject("/main?type=Metaverses", projects[index]);
                }}
              />
            )}
          </div>
        </LeftProjectInfo>
        <SandBoxInfo></SandBoxInfo>
        {(selectkey == "mapView" || selectkey == "listView") && (
          <MapFilterGroup
            filterChange={(data: string[]) => {
              setStrList([...data]);
            }}
          ></MapFilterGroup>
        )}
      </LeftWapper>
      <RightWapper>
        <TabWapper>
          <TabList>
            {selectTabList.map((item) => (
              <div
                key={item.key}
                className={item.key == selectkey ? "active" : ""}
                onClick={() => {
                  if (item.key != selectkey) {
                    setSelectKey(item.key);
                  }
                }}
              >
                <img
                  src={item.key == selectkey ? item.hoverIcon : item.icon}
                  alt=""
                />
                {item.name}
              </div>
            ))}
          </TabList>
        </TabWapper>
        {selectkey == "basicInfo" && <BasicInfo />}
        {selectkey == "activities" && <MetaverseActivity />}
        {selectkey == "tradeAnalytics" && <TradeAnalytics />}
        {selectkey == "holderAnalytics" && <HolderAnalytics />}
      </RightWapper>
    </MarketWapper>
  );
};
