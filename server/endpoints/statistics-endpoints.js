import cors from 'cors';
import { corsOptions } from './index.js';
import { getStatsData } from '../utils/statistics.js';

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
      response.status(200).send(mostUsed);
    } catch (err) {
      request.log.error('500: Server error on retrieving statistics', err);
      response.status(500).send({});
    }
  });
}

export default statisticsEndpoints;
