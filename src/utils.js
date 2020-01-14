import { adjectives, nouns } from "./words";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";

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


