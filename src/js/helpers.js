// This file contains couple of functions that we reuse over and over in our project.

import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

//Returns a new Promise which will reject after a certain time.
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  

export const getJSON = async function(url){
    try{
    const fetchPro = fetch(url); 
    const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;

    }catch(err){
        console.log(err);
    }
}

export const sendJSON = async function(url,uploadData){
  try{
  const fetchPro = fetch(url,{
    method: 'POST',
    headers:{
      'Content_Type' : 'application/json'
    },
    body: JSON.stringify(uploadData),
  });
  const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;

  }catch(err){
      console.log(err);
  }
};
