import axios from 'axios';

const host = 'http://localhost:8000';
//https://io.adafruit.com/api/v2/vanhung4320/feeds/smart-farm-ttnt.humidity/data
/*
const apiHumidity = 'https://io.adafruit.com/api/v2/vanhung4320/feeds/smart-farm-ttnt.humidity/data?key=';
const apiTemperature = 'https://io.adafruit.com/api/v2/vanhung4320/feeds/smart-farm-ttnt.temperature/data?key=';
const apiLuminance = 'https://io.adafruit.com/api/v2/vanhung4320/feeds/smart-farm-ttnt.luminance/data?key=';
*/

const apiHumidity = 'https://io.adafruit.com/api/v2/leanhhuy/feeds/humidity/data?key=';
const apiTemperature = 'https://io.adafruit.com/api/v2/leanhhuy/feeds/temperature/data?key=';
const apiLuminance = 'https://io.adafruit.com/api/v2/leanhhuy/feeds/luminance/data?key=';
const apiBtnH = 'https://io.adafruit.com/api/v2/leanhhuy/feeds/humidity';
const apiBtnT = 'https://io.adafruit.com/api/v2/leanhhuy/feeds/temperature';
const apiBtnL = 'https://io.adafruit.com/api/v2/leanhhuy/feeds/luminance';

const apiSignIn = '/login';
const apiSignUp = '/signup';
const apiUser = '/user';
const apiUserList = '/userlist';
const apiScheduleInfo = '/schedule';
const apiDeviceList = '/devicelist';
const apiAddSchedule = '/add-schedule';
const apiDelSchedule = '/del-schedule';
const apiMessage = '/message';

const key = "aio_Gsda08OV8x6IQ6LLSMTrwSN2mUgc";//Key của Hưng!!! Không để ở đây được vì nó sẽ đổi key nếu up lên github

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
    const result = await axios.post(host + apiScheduleInfo,{
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

export const getButtonHumidity = async () => 
{
    const result = await axios.get(apiBtnH);
    return result.data.last_value;
}

export const getButtonTemperature = async () => 
{
    const result = await axios.get(apiBtnT);
    return result.data.last_value;
}

export const getButtonLuminance = async () => 
{
    const result = await axios.get(apiBtnL);
    return result.data.last_value;
}

export const getMessage = async () => 
{
    const result = await axios.get(host + apiMessage);
    return result.data;
}