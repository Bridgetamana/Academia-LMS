"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BsThreeDotsVertical } from "react-icons/bs";

const CalendarView = () => {
  const [value, setValue] = useState(new Date());

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-white px-6 py-4 rounded-lg">
      <span className="flex gap-6 justify-between items-center">
        <h2 className="lg:text-xl font-semibold">{`${formatDate(value)}`}</h2>
        <button
          type="button"
          className="p-2 rounded-full hover:bg-black/10 active:scale-95"
        >
          <BsThreeDotsVertical className="w-5 h-5" />
        </button>
      </span>
      <Calendar
        onChange={setValue}
        showWeekNumbers
        value={value}
        className="!border-none !w-full"
      />
    </div>
  );
};

export default CalendarView;

// import React from "react";
// import dayjs from "dayjs";
// import "dayjs/locale/zh-cn";
// import { Calendar, Col, Radio, Row, Select, theme, Typography } from "antd";
// import dayLocaleData from "dayjs/plugin/localeData";

// dayjs.extend(dayLocaleData);

// const CalendarView = () => {
//   const { token } = theme.useToken();
//   const onPanelChange = (value, mode) => {
//     console.log(value.format("YYYY-MM-DD"), mode);
//   };
//   const wrapperStyle = {
//     width: 300,
//     border: `1px solid ${token.colorBorderSecondary}`,
//     borderRadius: token.borderRadiusLG,
//   };

//   return (
//     <div style={wrapperStyle}>
//       <Calendar
//         fullscreen={false}
//         headerRender={({ value, type, onChange, onTypeChange }) => {
//           const start = 0;
//           const end = 12;
//           const monthOptions = [];
//           let current = value.clone();
//           const localeData = value.localeData();
//           const months = [];
//           for (let i = 0; i < 12; i++) {
//             current = current.month(i);
//             months.push(localeData.monthsShort(current));
//           }
//           for (let i = start; i < end; i++) {
//             monthOptions.push(
//               <Select.Option key={i} value={i} className="month-item">
//                 {months[i]}
//               </Select.Option>
//             );
//           }
//           const year = value.year();
//           const month = value.month();
//           const options = [];
//           for (let i = year - 10; i < year + 10; i += 1) {
//             options.push(
//               <Select.Option key={i} value={i} className="year-item">
//                 {i}
//               </Select.Option>
//             );
//           }
//           return (
//             <div
//               style={{
//                 padding: 8,
//               }}
//             >
//               <Typography.Title level={4}>Custom header</Typography.Title>
//               <Row gutter={8}>
//                 <Col>
//                   <Radio.Group
//                     size="small"
//                     onChange={(e) => onTypeChange(e.target.value)}
//                     value={type}
//                   >
//                     <Radio.Button value="month">Month</Radio.Button>
//                     <Radio.Button value="year">Year</Radio.Button>
//                   </Radio.Group>
//                 </Col>
//                 <Col>
//                   <Select
//                     size="small"
//                     dropdownMatchSelectWidth={false}
//                     className="my-year-select"
//                     value={year}
//                     onChange={(newYear) => {
//                       const now = value.clone().year(newYear);
//                       onChange(now);
//                     }}
//                   >
//                     {options}
//                   </Select>
//                 </Col>
//                 <Col>
//                   <Select
//                     size="small"
//                     dropdownMatchSelectWidth={false}
//                     value={month}
//                     onChange={(newMonth) => {
//                       const now = value.clone().month(newMonth);
//                       onChange(now);
//                     }}
//                   >
//                     {monthOptions}
//                   </Select>
//                 </Col>
//               </Row>
//             </div>
//           );
//         }}
//         onPanelChange={onPanelChange}
//       />
//     </div>
//   );
// };
// export default CalendarView;
