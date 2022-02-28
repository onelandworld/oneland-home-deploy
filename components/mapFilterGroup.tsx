import styled from "styled-components";
import Checkbox from '@material-ui/core/Checkbox';
import { CheckboxProps, Slider, withStyles } from "@material-ui/core";
import {useEffect, useMemo, useState} from "react";

const SkyBuleCheckbox = withStyles({
    root: {
      color: '#7E96B8',
      '&$checked': {
        color: '#12DCF6',
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const MapFilterWarper = styled.div`
    padding: 40px 30px 0 0;
    height: 100%;
    .scroll{
        overflow: hidden;
        overflow-y: auto;
        height: calc(100% - 108px);
    }
`;
const InputWarpper = styled.div`
    border: 1px solid #7E96B8;
    height: 50px;
    border-radius: 4px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    input{
        flex: 1;
        outline: none;
        background: none;
        border: none;
        height: 100%;
        color: #7E96B8;
    }
`;

const TypeGroup = styled.div`
    display: flex;
    flex-direction: column;
    .title{
        color: #7E96B8;
        font-size: 16px;
        margin-bottom: 6px;
    }
    div{
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        i{
            margin-left: 6px;
            font-size: 14px;
            color: #7E96B8;
            &.active{
                color: #12DCF6;
            }
        }
    }
`;

const ClassGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 42px;
    .title{
        color: #7E96B8;
        font-size: 16px;
        margin-bottom: 6px;
    }
    div{
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        i{
            margin-left: 6px;
            font-size: 14px;
            color: #7E96B8;
            &.active{
                color: #12DCF6;
            }
        }
    }
`;

const SizeGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 42px;
    .title{
        color: #7E96B8;
        font-size: 16px;
        margin-bottom: 6px;
    }
    div{
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        div{
            width: 80px;
        }
        i{
            margin-left: 6px;
            font-size: 14px;
            color: #7E96B8;
            &.active{
                color: #12DCF6;
            }
        }
    }
`;

const RecentGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 42px;
    width: 90%;
    .title{
        color: #7E96B8;
        font-size: 16px;
        margin-bottom: 6px;
    }
    div{
        .sliderTitleGroup{
            position: relative;
            height: 16px;
            span{
                position: absolute;
                color: #7E96B8;
                font-size: 14px;
                &.sliderActive{
                    color: #12DCF6;
                }
            }
        }
        .MuiSlider-thumb{
            width: 20px;
            height: 20px;
            background-color: #000000;
            border: 3px solid #12DCF6;
            margin-top: -8px;
        }
        .MuiSlider-track{
            height: 4px;
        }
        .MuiSlider-root{
            color: #12DCF6; 
            height: 4px;
        }
        .MuiSlider-rail{
            color: #7E96B8;
            height: 4px;
        }
        .MuiSlider-mark{
            width: 8px;
            height: 8px;
            background-color: #12DCF6;
            border-radius: 100%;
            top: 36%;
        }
    }
`
interface ICheckBox {
    label: string;
    checked: boolean;
    numberIdentity?: string;
}

interface IProps {
    filterChange: Function
}


const MapFilterGroup = (props: IProps) => {
    const [typeCheckBoxList,setTypeCheckBoxList] = useState([
        {
            label: 'ALL',
            checked:false
        },
        {
            label: 'For Sale',
            checked:false,
            numberIdentity:'1-1'
        },
        {
            label: 'For Rent',
            checked:false,
            numberIdentity:'1-2'
        }
    ]);
    const [classCheckBoxList,setClassCheckBoxList] = useState([
        {
            label: 'ALL',
            checked:false
        },
        {
            label: 'Normal',
            checked:false
        },
        {
            label: 'Premium',
            checked:false
        }
    ]);
    const [sizeCheckBoxList,setSizeCheckBoxList] = useState([
        {
            label: 'ALL',
            checked:false
        },
        {
            label: '1x1',
            checked:false,
            numberIdentity:'2-1'
        },
        {
            label: '3x3',
            checked:false,
            numberIdentity:'2-2'
        },
        {
            label: '6x6',
            checked:false,
            numberIdentity:'2-3'
        },
        {
            label: '12x12',
            checked:false,
            numberIdentity:'2-4'
        },
        {
            label: '24x24',
            checked:false,
            numberIdentity:'2-5'
        }
    ]);
    const marks = [
        {
            value: 0,
            label: '7D',
        },
        {
            value: 25,
            label: '30D',
        },
        {
            value: 50,
            label: '90D',
        },
        {
            value: 75,
            label: '180D',
        },
        {
            value: 100,
            label: 'ALL',
        },
    ];
    const [sliderValue, setSliderValue] = useState(100);

    const recentlistStr = useMemo(()=>{
        let tempStr = '';
        switch (sliderValue) {
            case 0:
                tempStr = '4-1'
                break;
            case 25:
                tempStr = '4-2'
                break;
            case 50:
                tempStr = '4-3'
                break;
            case 75:
                tempStr = '4-4'
                break;
            default:
                break;
        }
        return tempStr;
    },[sliderValue])

    const [districtCheckBoxList,setDistrictCheckBoxList] = useState([
        {
            label: 'ALL',
            checked:false
        },
        {
            label: 'District 1',
            checked:false,
            numberIdentity:'5-1'
        },
        {
            label: 'District 2',
            checked:false,
            numberIdentity:'5-2'
        },
        {
            label: 'District 3',
            checked:false,
            numberIdentity:'5-3'
        }
    ]);

    const [landmarkCheckBoxList,setLandmarkCheckBoxList] = useState([
        {
            label: 'ALL',
            checked:false
        },
        {
            label: 'Care Bears',
            checked:false
        },
        {
            label: 'Atari',
            checked:false
        },
        {
            label: 'The Smurfs',
            checked:false
        },
        {
            label: 'Binance',
            checked:false
        },
        {
            label: 'CoinMarketCap',
            checked:false
        },
        {
            label: 'Avenged Sevenfold',
            checked:false
        },
        {
            label: 'Gemini',
            checked:false
        }
    ]);

    const [landTypeList,setLandTypeList] = useState([
        {
            label: 'Parcel',
            checked:false
        },
        {
            label: 'Estates ',
            checked:false
        }
    ]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
        setSliderValue(newValue as number);
        handleSelectList();
    };

    const checkBoxChange = (list:ICheckBox[], lable: string, status: boolean,stateFn: Function) => {
        if(lable == 'ALL') {
            list.forEach(ele => {
                ele.checked = status;
            });
        } else {
            list.forEach(ele => {
                if (ele.label == lable) {
                    ele.checked = status;
                }
            });
            const isNeedUpdateAllLabel = list.filter(item=>item.label != 'ALL' && item.checked == status).length == list.length - 1;
            list.forEach(ele => {
                if (ele.label == 'ALL') {
                    if (isNeedUpdateAllLabel) {
                        ele.checked = status;
                    } else {
                        ele.checked = false;
                    }
                }
            });
        }
        stateFn([...list]);
        setTimeout(()=>{
            handleSelectList();
        },0)
    }

    useEffect(()=>{
        handleSelectList()
    },[sliderValue])

    const handleSelectList = () => {
        const tempList:ICheckBox[] = [...typeCheckBoxList,...classCheckBoxList,...sizeCheckBoxList,...districtCheckBoxList,...landmarkCheckBoxList,...landTypeList];
        const strList: string[] = [];
        tempList.forEach(item=>{
            if(item.checked && item.numberIdentity) {
                strList.push(item.numberIdentity);
            }
        })
        if(recentlistStr){
            strList.push(recentlistStr);
        }
        props.filterChange(strList);
    }

    return (
        <MapFilterWarper>
            <InputWarpper>
                <input type="text" placeholder="name, address, District..." />
                <img src="images/search.svg" alt="" />
            </InputWarpper>
            <div className="scroll">
                <TypeGroup>
                    <span className="title">TYPE</span>
                    {
                        typeCheckBoxList.map((item, index) => {
                            return <div key={index}>
                                <SkyBuleCheckbox checked={item.checked} onChange={(e) => {
                                    checkBoxChange(districtCheckBoxList,'ALL',false,setDistrictCheckBoxList);
                                    checkBoxChange(typeCheckBoxList,item.label,e.target.checked,setTypeCheckBoxList);
                                }} />
                                <i className={item.checked ? 'active' : ''}>{item.label}</i>
                            </div>
                        })
                    }
                </TypeGroup>
                <ClassGroup>
                    <span className="title">CLASS</span>
                    {
                        classCheckBoxList.map((item, index) => {
                            return <div key={index}>
                                <SkyBuleCheckbox checked={item.checked} onChange={(e) => {
                                    checkBoxChange(districtCheckBoxList,'ALL',false,setDistrictCheckBoxList);
                                    checkBoxChange(classCheckBoxList,item.label,e.target.checked,setClassCheckBoxList);
                                }} />
                                <i className={item.checked ? 'active' : ''}>{item.label}</i>
                            </div>
                        })
                    }
                </ClassGroup>
                <SizeGroup>
                    <span className="title">SIZE</span>
                    <div>
                        {
                            sizeCheckBoxList.slice(0, 3).map((item, index) => {
                                return <div key={index}>
                                    <SkyBuleCheckbox checked={item.checked} onChange={(e) => {
                                        checkBoxChange(districtCheckBoxList,'ALL',false,setDistrictCheckBoxList);
                                        checkBoxChange(sizeCheckBoxList,item.label,e.target.checked,setSizeCheckBoxList);
                                    }} />
                                    <i className={item.checked ? 'active' : ''}>{item.label}</i>
                                </div>
                            })
                        }
                    </div>
                    <div>
                        {
                            sizeCheckBoxList.slice(3, 6).map((item, index) => {
                                return <div key={index}>
                                    <SkyBuleCheckbox checked={item.checked} onChange={(e) => {
                                        checkBoxChange(districtCheckBoxList,'ALL',false,setDistrictCheckBoxList);
                                        checkBoxChange(sizeCheckBoxList,item.label,e.target.checked,setSizeCheckBoxList);
                                    }} />
                                    <i className={item.checked ? 'active' : ''}>{item.label}</i>
                                </div>
                            })
                        }
                    </div>
                </SizeGroup>
                <RecentGroup>
                    <span className="title">Recent Listed</span>
                    <div>
                        <div className="sliderTitleGroup">
                            {
                                marks.map((item, index) => {
                                    return <span key={item.label} style={{ left: `${item.value - (index == 0 ? 0 : 4)}%` }} className={item.value == sliderValue ? 'sliderActive' : ''}>{item.label}</span>
                                })
                            }
                        </div>
                        <Slider
                            step={null}
                            value={sliderValue}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={handleChange}
                        />
                    </div>
                </RecentGroup>
                <ClassGroup>
                    <span className="title">District</span>
                    {
                        districtCheckBoxList.map((item, index) => {
                            return <div key={index}>
                                <SkyBuleCheckbox checked={item.checked} onChange={(e) => {
                                    const tempList:ICheckBox[] = [...typeCheckBoxList,...classCheckBoxList,...sizeCheckBoxList,...landmarkCheckBoxList,...landTypeList];
                                    // 临时写法  为了演示
                                    checkBoxChange(typeCheckBoxList,'ALL',false,setTypeCheckBoxList);
                                    checkBoxChange(classCheckBoxList,'ALL',false,setClassCheckBoxList);
                                    checkBoxChange(sizeCheckBoxList,'ALL',false,setSizeCheckBoxList);
                                    checkBoxChange(landmarkCheckBoxList,'ALL',false,setLandmarkCheckBoxList);
                                    checkBoxChange(landTypeList,'ALL',false,setLandTypeList);
                                    checkBoxChange(districtCheckBoxList,item.label,e.target.checked,setDistrictCheckBoxList);
                                }} />
                                <i className={item.checked ? 'active' : ''}>{item.label}</i>
                            </div>
                        })
                    }
                </ClassGroup>
                <ClassGroup>
                    <span className="title">Landmark</span>
                    {
                        landmarkCheckBoxList.map((item, index) => {
                            return <div key={index}>
                                <SkyBuleCheckbox checked={item.checked} onChange={(e) => {
                                    checkBoxChange(districtCheckBoxList,'ALL',false,setDistrictCheckBoxList);
                                    checkBoxChange(landmarkCheckBoxList,item.label,e.target.checked,setLandmarkCheckBoxList);
                                }} />
                                <i className={item.checked ? 'active' : ''}>{item.label}</i>
                            </div>
                        })
                    }
                </ClassGroup>
                <ClassGroup>
                    <span className="title">Land Type</span>
                    {
                        landTypeList.map((item, index) => {
                            return <div key={index}>
                                <SkyBuleCheckbox checked={item.checked} onChange={(e) => {
                                    checkBoxChange(districtCheckBoxList,'ALL',false,setDistrictCheckBoxList);
                                    checkBoxChange(landTypeList,item.label,e.target.checked,setLandTypeList);
                                }} />
                                <i className={item.checked ? 'active' : ''}>{item.label}</i>
                            </div>
                        })
                    }
                </ClassGroup>
            </div>
        </MapFilterWarper>
    );
}
export default MapFilterGroup
