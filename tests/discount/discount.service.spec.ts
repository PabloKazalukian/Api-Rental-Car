import { AppDataSource } from "../../src/config/data.source";
import { DiscountService } from "../../src/services/discount.service";
import { DiscountEntity, DiscountType } from "../../src/domain/entities/discount.entity";
import { UserService } from "../../src/services/user.service";
import { DiscountDTO } from "../../src/application/dtos/discount.dto";

describe('DiscountService', () => {
    let service: DiscountService = new DiscountService();
    let userService: UserService = new UserService();
    let createdDiscount: DiscountEntity;

    beforeAll(async () => {
        // await AppDataSource.initialize();
        // await AppDataSource.synchronize(true); // limpia y crea

        // Asegurarse de que existan relaciones necesarias
        const { UserSeeder } = await import("../../src/seeds/user.seed");
        const { CarSeeder } = await import("../../src/seeds/car.seed");
        const { RequestSeeder } = await import("../../src/seeds/request.seed");

        await new UserSeeder().run();
        await new CarSeeder().run();
        await new RequestSeeder().run();

        service = new DiscountService();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should create a discount esate es el que importa', async () => {

        const discountTest = new DiscountDTO();
        discountTest.codeDiscount = 'TEST15';
        discountTest.initialDate = new Date('2025-12-31');
        discountTest.expirationDate = new Date('2025-12-31');
        discountTest.percentage = 20;
        discountTest.status = true;
        discountTest.type = DiscountType.PERCENTAGE;
        const user = await userService.findUserByUsername('user');
        console.log(user);
        discountTest.users = [user!];

        createdDiscount = await service.createDiscount(discountTest);

        expect(createdDiscount).toBeDefined();
        expect(createdDiscount.id).toBeDefined();
        expect(createdDiscount.codeDiscount).toBe("TEST15");
    });

    it('should find discount by id', async () => {
        const found = await service.findById(createdDiscount.id);
        expect(found).not.toBeNull();
        expect(found!.codeDiscount).toBe("TEST15");
    });

    it('should list all discounts', async () => {
        const all = await service.findAllDiscount();
        expect(Array.isArray(all)).toBe(true);
        expect(all.length).toBeGreaterThan(0);
    });

    // it('should update a discount', async () => {
    //     const result = await service.updateDiscount(createdDiscount.id, {
    //         percentage: 20,
    //         codeDiscount: "UPDATED20",
    //         // expires: new Date("2026-01-01"),
    //         request_id: {
    //             id: "1"
    //         } as any,
    //     });

    //     expect(result.affected).toBe(1);

    //     const updated = await service.findById(createdDiscount.id);
    //     expect(updated!.code).toBe("UPDATED20");
    // });

    it('should delete a discount', async () => {
        const result = await service.deleteDiscount(createdDiscount.id);
        expect(result.affected).toBe(1);

        const deleted = await service.findById(createdDiscount.id);
        expect(deleted).toBeNull();
    });
});
