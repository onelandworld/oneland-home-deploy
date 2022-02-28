import React, {ReactElement} from "react";
import styled from "styled-components";

const CommonBtnWrapper = styled.div`
    flex: 1;
    border-radius: 8px;
    height: 36px;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 10px 15px;

    &.grey {
        &.disabled {
            opacity: 0.5;
            cursor: initial;

            &:hover {
                background: rgba(18, 220, 246, 0.15);
            }
        }

        background: rgba(18, 220, 246, 0.15);

        span {
            background: linear-gradient(85.36deg, #F33ABF -46.75%, #03FCF7 122.31%);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    }

    &.light {
        &.disabled {
            cursor: initial;
            opacity: 0.5;

            &:hover {
                background: linear-gradient(109.9deg, #03FCF7 4.27%, #F33ABF 138.06%);
            }
        }

        background: linear-gradient(109.9deg, #03FCF7 4.27%, #F33ABF 138.06%);
        color: #052835;

        &:hover {
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(109.9deg, #03FCF7 4.27%, #F33ABF 138.06%);
        }
    }

    &.red {
        &.disabled {
            opacity: 0.5;
            cursor: initial;
        }

        background: #FF6D5F;
        color: #1C2833;

        &:hover {
            background: rgba(255, 109, 95, 0.9);
        }
    }
`;

interface IProps {
    disabled?: boolean,
    onClick: () => void,
    mode: string,
    icon?: string,
    text: string
}

export default function CommonBtn(props: IProps): ReactElement {
    const {disabled, onClick, mode, icon, text} = props;

    return (
        <CommonBtnWrapper
            className={`common-btn ${mode} 
            ${disabled ? 'disabled' : ''}`}
            onClick={!disabled ? onClick : () => {
            }}
        >
            {
                icon &&
                <img width={24} height={24} src={icon} alt='' style={{marginRight: '16px'}}/>
            }
            <span>{text}</span>
        </CommonBtnWrapper>
    );
}
