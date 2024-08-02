import { BASE_URL } from "@/constants/site.constant";
import axios from "axios";
class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * Status code: 400
 */
export class BadRequestError extends HttpError {}

/**
 * Status code: 401
 */
export class UnauthorizedError extends HttpError {}

/**
 * Status code: 404
 */
export class NotFoundError extends HttpError {}

/**
 * Status code: 409
 */
export class ConflictError extends HttpError {}

/**
 * Status code: 429
 */
export class TooManyRequestsError extends HttpError {}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // timeout: 5000, // Abort req if no response in specified time
  //withCredentials: true,
});

axiosInstance.interceptors.response.use(
  null,
  (error) => {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error;

      switch (error.response?.status) {
        case 400:
          throw new BadRequestError(errorMessage);

        case 401:
          throw new UnauthorizedError(errorMessage);

        case 404:
          throw new NotFoundError(errorMessage);

        case 409:
          throw new ConflictError(errorMessage);

        case 429:
          throw new TooManyRequestsError(errorMessage);
      }
    }
    throw error;
  },
  {
    synchronous: true,
  },
);

const Api = axiosInstance;

export default Api;
