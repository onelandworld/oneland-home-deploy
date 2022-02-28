import classNames from "classnames";
import React, { ReactElement } from "react";
import styled from "styled-components";

const MenuListWrapper = styled.div`
  position: absolute;
  z-index: 10;
  padding-top: 10px;
  top: 100%;
  & > div {
    background: #252c41;
    backdrop-filter: blur(100px);
    border-radius: 8px;
    overflow: hidden;
  }
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  height: 48px;
  padding-left: 16px;
  color: #ffffff;
  width: 210px;
  white-space: nowrap;
  z-index: 1000;
  img {
    width: 24px;
    margin-right: 10px;
  }
  &.selected {
    span {
      color: #03fcf7 !important;
    }
  }
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    width: 100%;
  }
  &.disable {
    filter: grayscale(100%);
  }
`;
export interface IMenuList {
  name: string;
  icon?: string;
}
interface IProps {
  menuList: IMenuList[];
  selectIndex: number;
  onClick: (index: number, e: React.MouseEvent) => void;
}

export default function MenuList(props: IProps): ReactElement {
  const { menuList, selectIndex, onClick } = props;

  return (
    <MenuListWrapper>
      <div>
        {menuList.map((item: IMenuList, index: number) => (
          <MenuItem
            className={classNames({
              disable: (item as any).disable,
              selected: selectIndex === index,
            })}
            key={index}
            onClick={(e) => {
              if ((item as any).disable) return;
              e.preventDefault();
              e.stopPropagation();
              onClick(index, e);
            }}
          >
            {item.icon && <img src={item.icon} alt="" />}
            <span>{item.name}</span>
          </MenuItem>
        ))}
      </div>
    </MenuListWrapper>
  );
}
