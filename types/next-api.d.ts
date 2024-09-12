import { NextApiRequest } from "next";
import { MockRequest } from "node-mocks-http";

declare global {
  type MockNextApiRequest = NextApiRequest & MockRequest;
}
