import { calculationRuleset } from '@/utils/ruleset';

describe('[계산식]산식 룰셋 유효성 검사', () => {
  const cell = '5';
  const ruleset = {
    id: 'calFormula',
    targets: ['a', 'b'],
    op: '+',
  };
  const row = {
    a: '2',
    b: '3',
    c: '5',
  };

  it('[산식]a와 b컬럼의 값의 합은 c컬럼 값입니다.', () => {
    const result = calculationRuleset.valid(cell, ruleset, row);
    expect(result).toBe(true);
  });

  it('[산식]a, b 또는 c 컬럼에 공백이 포함되어있을 경우 false를 반환합니다.', () => {
    const result1 = calculationRuleset.valid(cell, ruleset, {
      ...row,
      a: '2 ',
    });
    expect(result1).toBe(false);
    const result2 = calculationRuleset.valid(cell, ruleset, {
      ...row,
      b: ' 3',
    });
    expect(result2).toBe(false);
    const result3 = calculationRuleset.valid(' 5', ruleset, row);
    expect(result3).toBe(false);
  });

  it('[산식]a, b 또는 c가 문자열로 구성되어있을 경우 false를 반환합니다.', () => {
    const result1 = calculationRuleset.valid(cell, ruleset, {
      ...row,
      a: 'asdf',
    });
    expect(result1).toBe(false);
    const result2 = calculationRuleset.valid(cell, ruleset, {
      ...row,
      b: 'apple',
    });
    expect(result2).toBe(false);
    const result3 = calculationRuleset.valid('afbc', ruleset, row);
    expect(result3).toBe(false);
  });
});

describe('[계산식] 합계 룰셋 유효성 검사', () => {
  const cell = '10';
  const ruleset = {
    id: 'calSum',
    targets: ['a', 'b', 'c', 'd'],
  };
  const row = {
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    sum: '10',
  };

  it('[합계]모든 targets의 합계는 cell 값입니다.', () => {
    const result = calculationRuleset.valid(cell, ruleset, row);
    expect(result).toBe(true);
  });
});
