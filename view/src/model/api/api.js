import axios from 'axios';

const host = 'http://localhost:8000';
const apiHumidity = 'https://io.adafruit.com/api/v2/leanhhuy/feeds/humidity/data?key=';
const apiTemperature = 'https://io.adafruit.com/api/v2/leanhhuy/feeds/temperature/data?key=';
const apiLuminance = 'https://io.adafruit.com/api/v2/leanhhuy/feeds/luminance/data?key=';
const apiSignIn = '/login';
const apiSignUp = '/signup';
const apiUser = '/user';
const apiUserList = '/userlist';
const apiScheduleInfo = '/schedule';
const apiDeviceList = '/devicelist';
const apiAddSchedule = '/add-schedule';
const apiDelSchedule = '/del-schedule';

const key = "aio_dvKF40U3ysleCxts2HrhN0JtAcXF";

export const getHumidityData = async () => {
    //const result = await axios.get(host + apiHumidity);    
    const result = await axios.get(apiHumidity + key);    
    return result.data;
}

export const getTemperatureData = async () => {
    const result = await axios.get(apiTemperature + key);
    return result.data;
}

export const getLuminanceData = async () => {
    const result = await axios.get(apiLuminance + key);
    return result.data;
}

export const postSignIn = async (username, password) =>
{
    const result = await axios.post(host + apiSignIn, {username, password});
    return result.data;
}

export const postSignUp = async (data) =>
{
    const result = await axios.post(host + apiSignUp, {data});
    return result.data;
}

export const getUserData = async () =>
{
    const result = await axios.get(host + apiUser,{
        headers: {
          'token': localStorage.getItem("token")
        }
      });
    return result.data;
}

export const getUserListData = async () =>
{
    const result = await axios.get(host + apiUserList,{
        headers: {
          'token': localStorage.getItem("token")
        }
      });
    return result.data;
}

export const getScheduleData = async () =>
{
    const result = await axios.get(host + apiScheduleInfo,{
        headers: {
          'token': localStorage.getItem("token")
        }
      });
    return result.data;
}

export const getDeviceListData = async () =>
{
    const result = await axios.get(host + apiDeviceList,{
        headers: {
          'token': localStorage.getItem("token")
        }
      });
    return result.data;
}

export const putAddSchedule = async (data) =>
{
    const result = await axios.put(host + apiAddSchedule, {
        headers: {
            'token': localStorage.getItem("token")
          },
        data});
    return result.data;
}

export const putDelSchedule = async (data) =>
{
    const result = await axios.put(host + apiDelSchedule, {
        headers: {
            'token': localStorage.getItem("token")
          },
        data});
    return result.data;
}

