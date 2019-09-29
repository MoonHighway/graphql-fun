import fetch from "node-fetch";
import "@babel/polyfill";
import { config } from "dotenv";

//
// TODO: Clear All REDIS Keys Before Starting Tests
//

config();
global.fetch = fetch;
