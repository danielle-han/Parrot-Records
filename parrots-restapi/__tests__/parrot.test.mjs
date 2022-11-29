// import
import mongoose from "mongoose";
import * as parrots from '../parrots_model.mjs';
// to run tests: npm test or jest

// unit tests: simple function that gets 2 parameters: 
// 1st: string that describes the test
// 2nd: another function that expresses the action that is tested

describe("Parrot model", () => {
    it("create and save parrot successfully", async () => {
        const savedParrot = await parrots.createParrot("Kiwi", 30, 8, 10, "11-15-13", "parrotlet");
        expect(savedParrot._id).toBeDefined();
        expect(savedParrot.name).toBe("Kiwi");
        expect(savedParrot.weight).toBe(30);
    });
});

