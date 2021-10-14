import voucherCodeGenerator from 'voucher-code-generator';

const generateCode = function () {
  return voucherCodeGenerator.generate({
    length: 6,
    count: 1,
    prefix: 'SHOPWAY-',
    charset: '0123456789qwertyuiopasdfghjklzxcvbnm'
  })[0];
};

export default generateCode;
