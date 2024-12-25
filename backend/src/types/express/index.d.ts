declare namespace Express {
  export interface Request {
    user?: {
      _id: string;
      username: string;
      role: string;
    };
  }
}
