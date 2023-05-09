import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';//
import {Buffer} from 'buffer';

import {getMessage} from 'model/api/api';
function App() {
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Kết nối MQTT client đến Adafruit IO
    const options = {
      protocol: 'mqtts',
      username: 'leanhhuy',
      password: 'aio_Gsda08OV8x6IQ6LLSMTrwSN2mUgc'
    };
    const newClient = mqtt.connect('mqtts://io.adafruit.com', options);

    newClient.subscribe('leanhhuy/feeds/humidity');
    
    console.log(newClient);
    newClient.on('message', (topic, message) => {
      console.log(`Received message from ${topic}: ${message.toString()}`);
    });
    // Lưu client vào state
    setClient(newClient);

    // Hủy kết nối khi component unmount
    return () => {
      newClient.end();
    };
  }, []);

  const sendMessage = () => {
    // Gửi tin nhắn đến topic 'test'
    client.publish('leanhhuy/feeds/humidity', "100");
    console.log('Sent');
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
      <form>

      </form>
    </div>
  );
}

export default App;
