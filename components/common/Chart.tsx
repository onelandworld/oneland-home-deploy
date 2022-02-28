import ReactECharts, { EChartsReactProps } from "echarts-for-react";
import { ReactElement } from "react";

export default function Chart(props: EChartsReactProps): ReactElement {
  return <ReactECharts {...props} />;
}
