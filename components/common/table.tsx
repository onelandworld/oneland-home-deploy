import styled from "styled-components";
import { formatTime, shortStr } from "../../../lib/utils";
import { Land, ToRight } from "./icons";
import _ from "lodash";

const TableLayout = styled.table`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  thead {
    background-color: #131823;
    border-radius: 4px;
    text-align: left;

    color: #7e96b8;
    th {
      padding: 15px 8px;
    }
  }
  tbody {
    color: white;
    tr {
      text-align: left;
      height: 48px;
      th {
        padding: 0 8px;
        vertical-align: middle;
      }
    }
  }
`;

const heads: [string, number][] = [
  ["#", 1],
  ["Land", 3],
  ["Transaction", 3],
  ["Price", 2],
  ["Date", 2],
];

export function LandTable(p: { data: any[] }) {
  const { data = [] } = p;
  return (
    <TableLayout>
      {heads.length > 0 && (
        <thead>
          <tr>
            {heads.map(([name, span], i) => (
              <th key={`thead_${i}`} colSpan={span}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody>
        {data.map((item, i) => (
          <tr key={`land_${i}`}>
            <th colSpan={1}>{i + 1}</th>
            <th colSpan={3}>
              <Land style={{ verticalAlign: "middle" }} />
              <span
                style={{ marginLeft: 6, verticalAlign: "middle" }}
              >{`${_.get(item, "metadata.name", "---")}`}</span>
            </th>
            <th colSpan={3}>
              <span>{shortStr(_.get(item, "from", "---"))}</span>
              <ToRight style={{ margin: "0 6px", verticalAlign: "middle" }} />
              <span>{shortStr(_.get(item, "to", "---"))}</span>
            </th>
            <th colSpan={2}>
              <div>{`${_.get(item, "price", "-")}${_.get<string>(
                item,
                "payment_token",
                "-"
              ).toUpperCase()}`}</div>
              <div
                style={{ color: "#7e96b8", fontWeight: "normal", fontSize: 10 }}
              >
                {"$98,999,89"}
              </div>
            </th>
            <th colSpan={2}>
              {formatTime(_.get<number>(item, "timestamp", 0))}
            </th>
          </tr>
        ))}
      </tbody>
    </TableLayout>
  );
}
