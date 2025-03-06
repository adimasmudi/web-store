const chai = await import('chai');
const chaiAsPromised = (await import('chai-as-promised')).default; // accessing default export
const chaiHttp = (await import('chai-http')).default;
const sinon = (await import('sinon')).default;
const sinonChai = (await import('sinon-chai')).default;

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.use(sinonChai);

global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;
