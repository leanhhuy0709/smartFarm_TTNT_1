import axios from 'axios';

const host = 'http://localhost:8000';
const apiHumidity = '/humidity';
const apiTemperature = '/temperature';
const apiLuminance = '/luminance';
const apiSignIn = '/login';
const apiSignUp = '/signup';
const apiUser = '/user';
const apiUsers = '/users';

export const getHumidityData = async () => {
    const result = await axios.get(host + apiHumidity);    
    return result.data;
}

export const getTemperatureData = async () => {
    const result = await axios.get(host + apiTemperature);
    return result.data;
}

export const getLuminanceData = async () => {
    const result = await axios.get(host + apiLuminance);
    return result.data;
}

export const postSignIn = async (username, password) =>
{
    const result = await axios.post(host + apiSignIn, {username, password});
    return result.data;
}

export const postSignUp = async (username, password, name) =>
{

    const result = await axios.post(host + apiSignUp, {username, password, name});
    return result.data;
}

export const getUserData = async () =>
{
    const result = await axios.get(host + apiUser + "/" + localStorage.getItem("userID").toString());
    return result.data;
}


export const getUsersData = async () =>
{
    const result = await axios.get(host  + apiUsers);
    return result.data;
}