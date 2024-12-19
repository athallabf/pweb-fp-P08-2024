import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const { params } = event.context;
  if (!params || !params.id) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Missing user ID',
    });
  }
  const { id } = params;
  const method = getMethod(event);

  if (method === 'GET') {
    // Handle GET BY ID
    try {
      const user = await User.findById(id);
      if (!user) {
        return createError({
          statusCode: 404,
          statusMessage: 'User not found',
        });
      }
      return user;
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
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return createError({
          statusCode: 404,
          statusMessage: 'User not found',
        });
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
        const err = error as Error;
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: err.message,
        });
    }
  }

  if (method === 'PUT' || method === 'PATCH') {
    // Handle UPDATE
    try {
      const body = await readBody(event);
      const user = await User.findByIdAndUpdate(id, body, { new: true });
      if (!user) {
        return createError({
          statusCode: 404,
          statusMessage: 'User not found',
        });
      }
      return user;
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
