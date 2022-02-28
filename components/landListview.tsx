import styled from "styled-components";
import MapItem from "./mapItem";
import MenuList, { IMenuList } from "./common/menuList";
import { useState } from "react";

const LandListViewWapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 233px);
  overflow: hidden;
  overflow-y: auto;
  padding: 0 20px;
  .sort {
    display: flex;
    justify-content: space-between;

    & > div {
      display: flex;
      align-items: center;
    }

    .sandBox {
      img {
        width: 32px;
        border-radius: 5px;
      }
      div {
        color: #ffffff;
        font-weight: 500;
        font-size: 24px;
        line-height: 140%;
        margin-left: 8px;
      }
    }

    .landSize {
      position: relative;
    }

    span {
      color: #7e96b8;
      font-size: 16px;
      &.sortType {
        color: #03fcf7;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }
  .listData {
    flex: 1;
    display: flex;
    margin-top: 18px;
    justify-content: flex-start;
    > div {
      margin: 0 45px 45px 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const LandListViewItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScrollBox = styled.div`
  overflow: hidden;
  height: calc(100% - 18px);
  overflow-y: auto;
`;

const LandListView = () => {
  const [selectIndex, setSelectIndex] = useState(0);
  const [showList, setShowList] = useState(false);
  const menuList: IMenuList[] = [
    {
      name: "Price",
    },
    {
      name: "Recently listed",
    },
    {
      name: "Name",
    },
    {
      name: "Value index",
    },
    {
      name: "District",
    },
    {
      name: "Premium",
    },
  ];
  return (
    <LandListViewWapper>
      <LandListViewItem>
        <div className="sort">
          <div className="sandBox">
            <img src="images/sandBox-icon.svg" alt="" />
            <div>
              The SandBox <span>(4)</span>
            </div>
          </div>
          <div
            className="landSize"
            onMouseEnter={() => setShowList(true)}
            onMouseLeave={() => setShowList(false)}
          >
            <span>sorting : </span>
            <span className="sortType">
              &nbsp;Land Size&nbsp;
              <img src="images/arrow_blue.svg" alt="" />
            </span>
            {showList && (
              <MenuList
                menuList={menuList}
                selectIndex={selectIndex}
                onClick={(index: number) => {
                  setSelectIndex(index);
                  setShowList(false);
                }}
              />
            )}
          </div>
        </div>
        <ScrollBox>
          <div className="listData">
            <MapItem hideBtn={true} height="375px"></MapItem>
            <MapItem hideBtn={true} height="375px"></MapItem>
            <MapItem hideBtn={true} height="375px"></MapItem>
            <MapItem hideBtn={true} height="375px"></MapItem>
          </div>
        </ScrollBox>
      </LandListViewItem>
      <LandListViewItem>
        <div className="sort">
          <div className="sandBox">
            <img src="images/decentraland.svg" alt="" />
            <div>
              Decentraland <span>(3)</span>
            </div>
          </div>
        </div>
        <ScrollBox>
          <div className="listData">
            <MapItem hideBtn={true} height="375px"></MapItem>
            <MapItem hideBtn={true} height="375px"></MapItem>
            <MapItem hideBtn={true} height="375px"></MapItem>
          </div>
        </ScrollBox>
      </LandListViewItem>
    </LandListViewWapper>
  );
};

export default LandListView;
