import _ from 'lodash';

import defaultClient from '../../../client';

const DOWNLOAD_CHUNK_SIZE = 300;
const getRows = (data, dataPath) => _.get(data, dataPath, []);

/**
 * Provides a function to asynchronously batch-download a whole dataset from
 * the backend.
 *
 * The function uses the parameter downloaderChunkSize from the configuration.js
 * file to determine the size of the chunks to fetch.
 *
 * @param {import('graphql').DocumentNode} query Query to run to fetch the data.
 * @param {import('apollo-client').QueryOptions} variables Variables object for the query.
 * @param {string} dataPath Path where the data array, row count and cursor are inside the query's result.
 * @param {string} [rowField=rows] field in dataPath containing the rows. Default: 'rows'.
 * @param {string} [countField=count] field in dataPath containing the row count. Default: 'count'.
 *
 * @returns {Function} Function that will fetch the whole dataset.
 */
function useBatchDownloader(
  query,
  variables,
  dataPath,
  client = defaultClient,
  rowField = 'rows',
  countField = 'count'
) {
  const rowPath = `${dataPath}.${rowField}`;
  const countPath = `${dataPath}.${countField}`;

  const getDataChunk = async (index, size = DOWNLOAD_CHUNK_SIZE) =>
    client.query({
      query,
      variables: { index, size, ...variables },
    });

  return async function getWholeDataset() {
    let data = [];
    let index = 0;

    const firstChunk = await getDataChunk(index, DOWNLOAD_CHUNK_SIZE);
    data = [...getRows(firstChunk, rowPath)];
    index += 1;

    const count = Math.ceil(_.get(firstChunk, countPath) / DOWNLOAD_CHUNK_SIZE);

    while (index < count) {
      // eslint-disable-next-line
      let res = await getDataChunk(index, DOWNLOAD_CHUNK_SIZE);
      data = [...data, ...getRows(res, rowPath)];
      index += 1;
    }

    return data;
  };
}

export default useBatchDownloader;
