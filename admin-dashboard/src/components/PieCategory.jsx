import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";

function getData() {
  return [
    { asset: "Audio", amount: 210 },
    { asset: "Périphériques", amount: 230 },
    { asset: "Moniteurs", amount: 45 },
    { asset: "Caméras", amount: 60 },
    { asset: "Accessoires", amount: 165 },
    { asset: "Alimentation", amount: 2033 },
    { asset: "Câbles", amount: 200 },
  ];
}

const PieCategory = () => {
  const [options, setOptions] = useState({
    data: getData(),
    title: {
      text: "Ventes totales",
    },
    series: [
      {
        type: "pie",
        angleKey: "amount",
        legendItemKey: "asset",
      },
    ],
  });

  return <AgCharts options={options} />;
};
export default PieCategory;
