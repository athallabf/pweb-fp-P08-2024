import FacilityReport from '~/server/models/FacilityReport';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    // Handle GET ALL
    try {
      const reports = await FacilityReport.find().populate('user');
      return reports;
    } catch (error) {
      const err = error as Error;
      return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: err.message,
      });
    }
  }

  if (method === 'POST') {
    // Handle POST
    try {
      const body = await readBody(event);
      const report = await FacilityReport.create(body);
      return report;
    } catch (error) {
        const err = error as Error;
        return createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: err.message,
        });
    }
  }

  return createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
