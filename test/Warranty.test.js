import pkg from 'hardhat';
const { ethers } = pkg;
import { expect } from 'chai';

describe("Warranty Contract", function () {
  let Warranty;
  let warranty;

  beforeEach(async function () {
    Warranty = await ethers.getContractFactory("Warranty");
    warranty = await Warranty.deploy();
    await warranty.deployed();
  });

  it("should create a warranty", async function () {
    await warranty.createWarranty("Laptop", 24);
    const warrantyInfo = await warranty.getWarrantyInfo();

    expect(warrantyInfo.productName).to.equal("Laptop");
    expect(warrantyInfo.warrantyPeriod).to.equal(24);
    expect(warrantyInfo.isActive).to.equal(true);
  });

  it("should claim a warranty", async function () {
    await warranty.createWarranty("Laptop", 24);
    await warranty.claimWarranty();

    const warrantyInfo = await warranty.getWarrantyInfo();
    expect(warrantyInfo.isActive).to.equal(false);
  });
});
