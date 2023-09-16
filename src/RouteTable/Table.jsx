import { memo } from 'react';
export const Table = memo(({ routeName, points }) => {
  return (
    <table border={2}>
      <thead>
        <tr>
          <th>{routeName}</th>
        </tr>
        <th>Point Type</th>
        <th>Calculation Type</th>
        <th>Spread</th>
        <th>Fee Cost </th>
        <th>Tariff Cost Fixed </th>
        <th>Tariff Cost Variable </th>
        <th>Final Cost </th>
        <th>Value </th>
        <th>OTM/ITM</th>
      </thead>
      <tbody>
        {points?.map((point) => {
          return (
            <tr>
              <td>{point?.pointType}</td>
              <td>{point?.calculationType}</td>
              <td>{point?.spread}</td>
              <td>{point?.feeCost}</td>
              <td>{point?.tariffCostFixed}</td>
              <td>{point?.tariffCostVariable}</td>
              <td>{point?.finalCost}</td>
              <td>{point?.value}</td>
              <td>{point?.otmItm}</td>
            </tr>
          );
        })}
        <tr></tr>
      </tbody>
    </table>
  );
});