import React from 'react';
import { Button, DatePicker, version, Select, Result } from "antd";
const { Option } = Select;



export default function SelectDropDown({ data, className, onChange }) {

  return (

    <Select
      showSearch
      // style={{ width: 200, }}
      // dropdownStyle={{ minWidth: "50%", height: "555px" }}
      placeholder="Search to Select"
      optionFilterProp="children"
      dropdownClassName="kyungwook"
      className={className}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      }
      onChange={onChange}
    >
      {
        (data.length > 0) ? data.map((item, index) => {

          return <Option key={item.no} value={item.no} >{item.name}</Option>;
        }) : []
      };
    </Select>

  );
}
SelectDropDown.defaultProps = {
  data: [],
  className: ``,
  onChange: () => { },
};