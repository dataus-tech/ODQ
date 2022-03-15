export const calculationRuleset = {
  valid: (cell, { id, targets, op }, row) => {
    try {
      // 공백 포함 처리
      if (targets.some(target => row[target].match(/\s/g)) || cell.match(/\s/g)) return false;
      if (id === 'calFormula') {
        const [a, b] = [Number(row[targets[0]]), Number(row[targets[1]])];
        switch (op) {
          case '+':
            return cell == a + b;
          case '-':
            return cell == a - b;
          case '×':
            return cell == a * b;
          case '÷':
            return cell == a / b;
        }
      }
      if (id === 'calSum') return cell == targets.reduce((acc, val) => acc + Number(row[val]), 0);
    } catch (error) {
      return false;
    }
  },
  repair: (cell, { id, targets, op }, row) => {
    try {
      if (id === 'calFormula') {
        const [a, b] = [Number(row[targets[0]]), Number(row[targets[1]])];
        switch (op) {
          case '+':
            return a + b;
          case '-':
            return a - b;
          case '×':
            return a * b;
          case '÷':
            return a / b;
        }
      }
      if (id === 'calSum')
        return targets.reduce(
          (acc, val) =>
            acc + Number(typeof row[val] === 'string' ? row[val].replace(/[^0-9]/g, '') : row[val]),
          0,
        );
    } catch (error) {
      return cell;
    }
  },
};
