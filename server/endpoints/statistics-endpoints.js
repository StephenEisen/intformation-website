import cors from 'cors';
import { corsOptions } from './index.js';
import * as queries from '../mongodb/queries.js';
import {getStatsData} from '../utils/statistics.js';

const apiPath = '/api/statistics';

/**
 * ALl endpoints defined for the statistics page.
 * @param {import("express").Express} app Express object
 */
const statisticsEndpoints = (app) => {
  /**
   * Gets the most frequently used characters.
   */
  app.options(`${apiPath}/most-frequently-used`, cors(corsOptions));
  app.get(`${apiPath}/most-frequently-used`, cors(corsOptions), async (request, response) => {
    try {
      const mostUsed = await getStatsData();
      response.send(mostUsed);
    } catch (err) {
      console.log(err);
    }
  });
}

export default statisticsEndpoints;
