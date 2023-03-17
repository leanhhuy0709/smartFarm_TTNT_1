
import { getHumidityData } from "model/api/api";

export const humidityLineChartData = async() => {
  getHumidityData()
  .then((res)=>{
    console.log(res)
    return res
  })
  .catch((err)=>{
    console.log(err)
  })
}

const gradientLineChartData = {
  labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
  datasets: [
    {
      label: "Temperature",
      color: "info",
      data: [19, 18, 18, 16, 15, 17, 18, 20, 20, 19, 22, 23, 25, 24, 26, 27, 29, 33, 30, 22, 19, 18, 17, 15],
    },
  ],
};

export default gradientLineChartData;
