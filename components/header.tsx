import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { shortStr } from "../../lib/utils";
import { useWeb3Eth } from "../../lib/web3";
import MenuList from "../components/common/menuList";

const HeaderWrapper = styled.div`
  width: 100%;
  height: 76px;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 38px;
    height: 38px;
    margin-right: 10px;
  }
  span {
    color: #ffffff;
    font-size: 24px;
    span {
      font-size: 20px;
      color: #7e96b8;
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const NavList = styled.div`
  display: flex;
  & > div {
    font-size: 16px;
    font-weight: 500;
    color: #7e96b8;
    margin-right: 24px;
    cursor: pointer;
    position: relative;
    &.active {
      color: white;
    }
  }
`;

const ConnectWallet = styled.div`
  cursor: pointer;
  width: 160px;
  height: 38px;
  border-radius: 8px;
  line-height: 38px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.05);
  color: #12DCF6;
`;

interface IMenuList {
  name: string;
  icon: string;
}
interface INavItem {
  name: string;
  path?: string;
  menuList?: IMenuList[];
  isCanDropDown: boolean;
}
interface IProps {
  navList: INavItem[];
  currentTab: INavItem;
  selectMenuIndex:number;
  handleChange: (item: Object,index:number,isNeedSet:boolean) => void;
}

export default function Header(props: IProps): ReactElement {
  const { navList, currentTab, selectMenuIndex,handleChange} = props;
  const [showList, setShowList] = useState(false);
  const { account, reqAccount } = useWeb3Eth();
  const onClickWallet = () => {
    if (!account) reqAccount();
  };
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <img src="images/logo.svg" alt="" />
        <span>ONELAND </span>
      </HeaderLeft>
      <HeaderRight>
        <NavList>
          {navList.map((item: INavItem) => (
            <div
              key={item.name}
              className={item.name == currentTab.name ? "active" : ""}
              onClick={() => (item.path ? handleChange(item,-1,false) : {})}
              onMouseEnter={() => (item.menuList ? setShowList(true) : {})}
              onMouseLeave={() => setShowList(false)}
            >
              {item.name}{" "}
              {item.isCanDropDown && <img src="images/arrow-down.svg" alt="" />}
              {item.menuList && showList && (
                <MenuList
                  menuList={item.menuList}
                  selectIndex={selectMenuIndex}
                  onClick={(index: number) => {
                    handleChange(item,index,true)
                    setShowList(false);
                  }}
                />
              )}
            </div>
          ))}
        </NavList>
        <ConnectWallet onClick={onClickWallet}>
          {account ? shortStr(account) : "Connect Wallet"}
        </ConnectWallet>
      </HeaderRight>
    </HeaderWrapper>
  );
}
