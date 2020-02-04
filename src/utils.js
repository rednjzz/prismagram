import { adjectives, nouns } from "./words";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import * as aligo from "./libs/aligo";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}` 
}

export const sendSecretMail = (address, secret) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    from: "rednjzz@prismagram.com",
    to: address,
    subject: "Login secret for Prismagram",
    html: `Hello Your Login secret is <b>${secret}</b>. <br/> Copy paste on the app/website to login`
  }
  sgMail.send(msg);
}

export const generateToken = (id) => {
  return jwt.sign( {id} , process.env.JWT_SECRET )
}

export const generateSecretCode = () => {
  const randomValue = Math.floor(100000 + Math.random() * 900000).toString();
  return randomValue; 
}

export const sendSecretSMS = async (phoneNumber, secretCode) => {
  const Auth = {
    key: process.env.SMSKEY,
    user_id: process.env.SMSUSERID
  }
  const req = {
    headers: {
      'content-type': 'json'
    },
    body: {
      sender: '031-5186-6033',  
      receiver: phoneNumber, 
      msg: `안녕하세요 플랫큐브입니다 고객님의 비밀 번호는 ${secretCode} 입니다 `,	
      // testmode_yn: "Y",
    } 
  }
  try{
    const res = await aligo.send(req, Auth);
    console.log(res);
  } catch (err){
    console.log(err)
  }
}

