import express from 'express';
import cors from 'cors';
import { corsOptions } from './index.js';
import * as queries from '../mongodb/queries.js';

const apiPath = '/api/statistics';

/**
 * ALl endpoints defined for the statistics page.
 * @param {express.Express} app
 */
const statisticsEndpoints = (app) => {
  /**
   * Gets the total number of intels we have stored.
   */
  app.options(`${apiPath}/total-intels`, cors(corsOptions));
  app.get(`${apiPath}/total-intels`, cors(corsOptions), async (request, response) => {
    const totalGuilds = await queries.countTotalGuilds();
    response.send({ totalGuilds: totalGuilds });
  });

  /**
   * Gets the most frequently used characters.
   */
  app.options(`${apiPath}/most-frequently-used`, cors(corsOptions));
  app.get(`${apiPath}/most-frequently-used`, cors(corsOptions), async (request, response) => {
    try {
      const mostUsed = await queries.countMostUsedTeams();
      response.send(mostUsed);
    } catch (err) {
      console.log(err);
    }
  });
}

export default statisticsEndpoints;
