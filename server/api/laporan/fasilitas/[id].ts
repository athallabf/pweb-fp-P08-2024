import FacilityReport from '~/server/models/FacilityReport';

export default defineEventHandler(async (event) => {
  const { params } = event.context;
  if (!params || !params.id) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request: Missing ID parameter',
    });
  }
  const { id } = params;
  const method = getMethod(event);

  if (method === 'GET') {
    // Handle GET BY ID
    try {
      const report = await FacilityReport.findById(id).populate('user');
      if (!report) {
        return createError({
          statusCode: 404,
          statusMessage: 'Facility Report not found',
        });
      }
      return report;
    } catch (error) {
        const err = error as Error;
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: err.message,
        });
    }
  }

  if (method === 'DELETE') {
    // Handle DELETE
    try {
      const report = await FacilityReport.findByIdAndDelete(id);
      if (!report) {
        return createError({
          statusCode: 404,
          statusMessage: 'Facility Report not found',
        });
      }
      return { message: 'Facility Report deleted successfully' };
    } catch (error) {
        const err = error as Error;
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: err.message,
        });
    }
  }

  return createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed',
  });
});
