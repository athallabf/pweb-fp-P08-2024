import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === 'GET') {
    // Handle GET ALL
    try {
      const users = await User.find();
      return users;
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
      const user = await User.create(body);
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
