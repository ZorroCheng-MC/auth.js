import { createMocks, RequestMethod } from "node-mocks-http";
import handler from "../../../pages/api/log-activity";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";

jest.mock("next-auth/react");
jest.mock("@prisma/client");

describe("/api/log-activity", () => {
  let mockPrismaCreate: jest.Mock;

  beforeEach(() => {
    mockPrismaCreate = jest.fn();
    (PrismaClient as jest.MockedClass<typeof PrismaClient>).mockImplementation(
      () =>
        ({
          activity: { create: mockPrismaCreate },
        }) as any
    );
  });

  function mockRequestResponse(method: RequestMethod = "POST") {
    const { req, res } = createMocks<MockNextApiRequest, NextApiResponse>({
      method,
    });
    req.env = {} as any; // Add this line to mock the 'env' property
    return { req, res };
  }

  it("returns 401 for unauthenticated requests", async () => {
    const { req, res } = mockRequestResponse();

    (getSession as jest.Mock).mockResolvedValueOnce(null);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({ error: "Unauthorized" });
  });

  it("logs activity for authenticated requests", async () => {
    const { req, res } = mockRequestResponse();
    req.body = {
      page: "test-page",
      action: "test-action",
    };

    (getSession as jest.Mock).mockResolvedValueOnce({
      user: { id: "test-user-id" },
    });

    mockPrismaCreate.mockResolvedValueOnce({ id: "test-activity-id" });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(mockPrismaCreate).toHaveBeenCalledWith({
      data: {
        userId: "test-user-id",
        page: "test-page",
        action: "test-action",
      },
    });
  });

  it("returns 405 for non-POST requests", async () => {
    const { req, res } = mockRequestResponse("GET");

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
  });
});
