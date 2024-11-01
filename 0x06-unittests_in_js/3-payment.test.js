const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe("Wrap existing method", function () {
  it("Check if the functions called with  the correct arguments", function () {
    sinon.spy(Utils, 'calculateNumber');
    sendPaymentRequestToApi(100, 20);
    expect(Utils.calculateNumber.calledOnce).to.be.true;
    const args = Utils.calculateNumber.getCall(0).args;
    expect(args[0]).to.be.equal('SUM');
    expect(args[1]).to.be.equal(100);
    expect(args[2]).to.be.equal(20);
  });
});
