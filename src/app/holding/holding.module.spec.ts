import { HoldingModule } from "./holding.module";

describe("HoldingModule", () => {
  let holdingModule: HoldingModule;

  beforeEach(() => {
    holdingModule = new HoldingModule();
  });

  it("should create an instance", () => {
    expect(holdingModule).toBeTruthy();
  });
});
