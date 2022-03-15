import { isDecimal } from 'validator';

export const chargeRuleset = {
  valid: cell => {
    try {
      if (typeof cell === 'number') return true;
      if (cell.length > 1 && cell[0] === '0') return false;
      return isDecimal(cell);
    } catch (error) {
      return false;
    }
  },
  repair: cell => {
    cell = cell
      .replace('억', '00000000')
      .replace('만', '0000')
      .replace('천', '000')
      .replace('k', '000')
      .replace('백', '00')
      .replace('십', '0')
      .replace(/[^0-9\.-]/g, '');
    return isNaN(Number(cell)) ? cell : Number(cell);
  },
};
