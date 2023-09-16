import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { Table } from './Table';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const RouteTable = ({ routeData }) => {
    const [data, setData] = useState([])
    const [selecteRouteIds, setSelectedRouteIds] = useState([])


    useEffect(() => {

        if (routeData)
          setData((data) => {
            const newData = [...data];
            const index = newData.findIndex(
              (route) => route?.routeId === routeData?.routeId
            );
            if (index < 0) {
              newData.push(routeData);
            } else {
                const points = [...newData[index].points]

                routeData.points.forEach( point => {
                  const index = points.findIndex(
                    (oldPoint) =>
                      oldPoint?.pointType === point?.pointType &&
                      oldPoint?.calculationType === point?.calculationType
                  );

                  if(index < 0){
                    points.push(point);
                  }else {
                    points[index] = point;
                  }

                } )




              newData[index].points = points;
            }

            return newData;
          });        
    }, [routeData]);

    console.log(routeData);

    const handleChange = (event) => {

         const { options } = event.target;
         const value = [];
         for (let i = 0, l = options.length; i < l; i += 1) {
           if (options[i].selected) {
             value.push(options[i].value);
           }
         }

        setSelectedRouteIds(value);
    }
  return (
    <Box>
      <Select
        multiple
        native
        style={{
          width: 200,
        }}
        value={selecteRouteIds}
        label="Routes"
        onChange={handleChange}
        MenuProps={MenuProps}
      >
        {data.map((route) => (
          <option key={route?.routeId} value={route?.routeId}>
            {route?.routeName}
          </option>
        ))}
      </Select>
      {selecteRouteIds?.map( routeId => {

        const selectedRoute = data.find(route => {
            return route?.routeId?.toString() === routeId
        });
        const { points } = selectedRoute;

        return <Table points={points} routeName={selectedRoute.routeName} />;

      })}
    </Box>
  );
};