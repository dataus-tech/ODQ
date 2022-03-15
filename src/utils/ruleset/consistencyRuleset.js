import { isDate } from 'validator';

export const consistencyRuleset = {
  valid: (cell, { id, target, op, replaceValue }, row) => {
    // 시간순서일관성
    if (id === 'conTime') {
      try {
        if (typeof cell !== 'string' || cell.length < 2) return false;
        const numCell = Number(cell.replace(/[^0-9]/g, ''));
        const numRow = Number(row[target].replace(/[^0-9]/g, ''));
        switch (op) {
          case '>=':
            return numCell >= numRow;
          case '>':
            return numCell > numRow;
          case '<=':
            return numCell <= numRow;
          case '<':
            return numCell < numRow;
        }
      } catch (error) {
        return false;
      }
    }
    // 컬럼 간 논리관계 일관성
    if (id === 'conLogicRelationShip' && cell === replaceValue) return isDate(row[target]);
    return true;
  },
  repair: (cell, { id, target, op, replaceValue }, row) => cell,
};
