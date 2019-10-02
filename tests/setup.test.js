import fetch from "node-fetch";
import "@babel/polyfill";
import { config } from "dotenv";
config();
global.waitTime = parseInt(process.env.TEST_WAIT_TIME);
global.fetch = fetch;
