import { DiscountController } from "../../src/infrastructure/interfaces/http/controllers/discount.controller";
import { HttpResponse } from "../../src/infrastructure/gateways/response/http.response";
import { Request, Response } from "express";

// helpers para mocks
const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("📦 DiscountController - getAllDiscount", () => {
    it("debería devolver un array vacío si no hay descuentos", async () => {
        const discountSvcMock = {
            findAllDiscount: jest.fn().mockResolvedValue([]),
        };

        const res = await mockResponse();
        const req = {} as Request;

        const controller = new DiscountController(discountSvcMock as any, new HttpResponse());
        await controller.getAllDiscount(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            statusMsg: "Success",
            data: [],
        });
    });
});


describe("📦 DiscountController - getDiscountById", () => {
    it("debería devolver 404 si no encuentra el descuento", async () => {
        const discountSvcMock = {
            findById: jest.fn().mockResolvedValue(null),
        };

        const res = mockResponse();
        const req = {
            params: { id: "123" }
        } as unknown as Request;

        const controller = new DiscountController(discountSvcMock as any, new HttpResponse());
        await controller.getDiscountById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 404,
            statusMsg: "Not Found",
            message: "Solicitud no encontrada",
        });
    });
});