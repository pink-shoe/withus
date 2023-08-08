import axios from 'axios';
import { OPENVIDU_SERVER_SECRET, OPENVIDU_SERVER_URL } from './url';

export async function getToken(roomId: string) {
  const sessionId = await createSession(roomId);
  return await createToken(sessionId);
}

function createSession(roomId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    var data = JSON.stringify({ customSessionId: roomId });
    console.log('OPENVIDU_SERVER_SECRET', OPENVIDU_SERVER_SECRET);
    axios
      .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
        headers: {
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('CREATE SESSION', response);
        resolve(response.data);
      })
      .catch((response) => {
        var error = Object.assign({}, response);
        if (error?.response?.status === 409) {
          resolve(roomId);
        } else {
          console.log(error);
          console.warn(
            'No connection to OpenVidu Server. This may be a certificate error at ' +
              OPENVIDU_SERVER_URL
          );
          // window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
        }
      });
  });
}

function createToken(roomId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    var data = {};
    axios
      .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + roomId + '/connection', data, {
        headers: {
          Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('TOKEN', response);
        // const token = new URLSearchParams(response.data);
        // console.log(token.get('token'));
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
}
