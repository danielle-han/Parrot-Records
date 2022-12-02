// import
import mongoose from "mongoose";
import * as parrots from '../parrots_model.mjs';

describe("Parrot model", () => {
    it("create and save parrot successfully", async () => {
        const savedParrot = await parrots.createParrot("test_parrot", 30, 8, 10, "11-15-13", "parrotlet");
        expect(savedParrot._id).toBeDefined();
        expect(savedParrot.name).toBe("test_parrot");
        expect(savedParrot.weight).toBe(30);
    });

    it("return all parrots", async () => {
        const all_parrots = await parrots.findParrots();
        // how to check if all were returned?
        console.log(all_parrots); // allparrots: list - count, make sure count is same
    });

    it("find parrot by id", async () => {
        const new_parrot = await parrots.createParrot("test_parrot", 28, 8, 9, "12-01-13", "parrotlet");
        const parrot = await parrots.findParrotById(new_parrot._id);
        expect(parrot.name).toBe("test_parrot");
        expect(parrot.weight).toBe(28);
        
    });

    it("find parrot(s) by name", async () => {
        const parrot = await parrots.findParrotByName("test_parrot");
        for (let i = 0; i < parrot.length; i++) {
            expect(parrot[i].name).toBe("test_parrot");
        } 
    });

    it("edit parrot information", async () => {
        const parrot = await parrots.createParrot("test_parrot", 28, 8, 9, "12-01-13", "parrotlet");
        const countModified = await parrots.editParrot(parrot._id, "test_parrot", 28, 8, 9, "12-01-13", "cockatiel");
        const edited_parrot = await parrots.findParrotById(parrot._id);
        expect(countModified).toBe(1);
        expect(edited_parrot.name).toBe("test_parrot");
        expect(edited_parrot.weight).toBe(28);
        expect(edited_parrot.species).toBe("cockatiel");
        
    });

    it("delete parrot by id", async () => {
        const parrot = await parrots.findParrotByName("test_parrot");
        const length = parrot.length;
        let countDeleted = 0;
        for (let i = 0; i < parrot.length; i++) {
            let deleted = await parrots.deleteById(parrot[i]._id);
            countDeleted += deleted;
        } 
        expect(countDeleted).toBe(length);
    });

    it("return all parrots - check all tests were deleted", async () => {
        const all_parrots = await parrots.findParrots();
        // how to check if all were returned?
        console.log(all_parrots); // allparrots: list - count, make sure count is same
    });

});

