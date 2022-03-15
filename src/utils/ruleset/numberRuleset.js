export const numberRuleset = {
  valid: (cell, { id, pattern }) => {
    if (id === 'numPhone')
      return (
        typeof cell !== 'number' &&
        (/^\d{2}-\d{3}-\d{4}$/.test(cell) ||
          /^\d{2}-\d{4}-\d{4}$/.test(cell) ||
          /^\d{3}-\d{3}-\d{4}$/.test(cell) ||
          /^\d{3}-\d{4}-\d{4}$/.test(cell) ||
          /^\d{4}-\d{4}$/.test(cell) ||
          /^\d{4}-\d{3}-\d{4}$/.test(cell) ||
          /^\d{4}-\d{4}-\d{4}$/.test(cell) ||
          /^\d{2}-\d{3}$/.test(cell) ||
          /^\d{3}-\d{4}$/.test(cell) ||
          /^\d{3}-\d{3}$/.test(cell) ||
          /^\d{3}$/.test(cell) ||
          /^\d{4}$/.test(cell))
      );
    if (id === 'numPostalCode')
      return typeof cell !== 'number' && (/^\d{3}-\d{3}$/.test(cell) || /^\d{5}$/.test(cell));
    if (id === 'numBusiness') return typeof cell !== 'number' && /^\d{3}-\d{2}-\d{5}$/.test(cell);
    if (id === 'numPattern') {
      const reducedPattern = pattern
        .split('-')
        .map(_ => `\\d{${_.length}}`)
        .join('-');
      const patternRegExp = new RegExp(`^${reducedPattern}$`);
      return patternRegExp.test(cell);
    }
  },
  repair: (cell, { id, pattern }) => {
    try {
      if (id === 'numPhone') {
        let value = cell
          .replace(/\([^)]+\)/g, '')
          .replace(/(~[0-9]|,[0-9])/g, '')
          .replace(/[^0-9]/g, '');
        return value.length === 8
          ? value.replace(/(\d{4})(\d{4})/, '$1-$2')
          : value.replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3');
      }
      if (id === 'numPostalCode') {
        let value = cell.replace(/[^0-9]/g, '');
        if (value.length === 6) return value.replace(/(^[0-9]{3})([0-9]{3})$/, '$1-$2');
        else return value.padStart(5, '0');
      }
      if (id === 'numBusiness') {
        let value = cell.replace(/[^0-9]/g, '');
        return value.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
      }
      if (id === 'numPattern') {
        let value = cell.replace(/[^0-9]/g, '');
        const patternRegExp1 = new RegExp(
          pattern
            .split('-')
            .map(_ => `(\\d{${_.length}})`)
            .join(''),
        );
        const patternRegExp2 = pattern
          .split('-')
          .map((_, $) => `$${$ + 1}`)
          .join('-');
        return value.replace(patternRegExp1, patternRegExp2);
      }
    } catch (error) {
      return cell;
    }
  },
};
