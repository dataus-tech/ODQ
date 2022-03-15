import { consistencyRuleset } from '@/utils/ruleset';

describe('시간순서일관성 룰셋 유효성 검사', () => {
  const ruleset = {
    id: 'conTime',
    target: 'c',
    op: '<=',
  };
  const row = {
    a: '2017-01-01',
    b: '2017-01-02',
    c: '2017-01-03',
  };
  it('[시간순서일관성]a: 2017-01-01 c: 2017-01-03 op: <= 는 true를 반환합니다.', () => {
    const cell = row['a'];
    const result = consistencyRuleset.valid(cell, ruleset, row);
    expect(result).toBe(true);
  });

  it('[시간순서일관성]a: 2020-01-01 c: 2020-12-31 op: <= 는 true를 반환합니다.', () => {
    const cell = { ...row, a: '2020-01-01' }['a'];
    const result = consistencyRuleset.valid(cell, ruleset, { ...row, c: '2020-12-31' });
    expect(result).toBe(true);
  });

  it('[시간순서일관성]종료일자가 시작일자보다 시간순서가 앞으로 표기된 경우 false를 반환합니다.', () => {
    const cell = { ...row, a: '2020-01-01' }['a'];
    const result = consistencyRuleset.valid(cell, ruleset, { ...row, c: '2019-12-31' });
    expect(result).toBe(false);
  });

  it('[시간순서일관성]종료일자가 시작일자보다 시간순서가 앞으로 표기된 경우 false를 반환합니다.', () => {
    const cell = { ...row, a: '2020-01-01' }['a'];
    const result = consistencyRuleset.valid(cell, ruleset, { ...row, c: '2019-12-31' });
    expect(result).toBe(false);
  });

  it('[시간순서일관성]cell 입력값이 비정상 값인 경우 false를 반환합니다.', () => {
    const errorCells = ['', ' ', 1214, true, false, null];
    errorCells.forEach(cell => {
      const result = consistencyRuleset.valid(cell, ruleset, row);
      expect(result).toBe(false);
    });
  });
});

describe('논리관계 일관성 룰셋 유효성 검사', () => {
  const ruleset = {
    id: 'conLogicRelationShip',
    target: 'c',
    replaceValue: 'Y',
  };
  const row = {
    a: 'Y',
    b: '2017-01-02',
    c: '2020-01-01',
  };
  it('[논리관계 일관성]a: Y c: 2020-01-01 replaceValue: Y는 true를 반환합니다.', () => {
    const cell = row['a'];
    const result = consistencyRuleset.valid(cell, ruleset, row);
    expect(result).toBe(true);
  });

  it('[논리관계 일관성]a: N c: 2020-01-01 replaceValue: Y는 true를 반환합니다.', () => {
    const cell = row['a'];
    const result = consistencyRuleset.valid(cell, ruleset, row);
    expect(result).toBe(true);
  });

  it('[논리관계 일관성]a: N c: fff replaceValue: Y는 true를 반환합니다.', () => {
    const cell = 'N';
    const result = consistencyRuleset.valid(cell, ruleset, { ...row, c: 'fff' });
    expect(result).toBe(true);
  });

  it('[논리관계 일관성]a: Y c: fff replaceValue: Y는 true를 반환합니다.', () => {
    const cell = row['a'];
    const result = consistencyRuleset.valid(cell, ruleset, { ...row, c: 'fff' });
    expect(result).toBe(false);
  });

  it('[논리관계 일관성]여부가 존재하는데 일자가 존재하지 않으면 false를 반환합니다.', () => {
    const cell = row['a'];
    const result = consistencyRuleset.valid(cell, ruleset, { ...row, c: '' });
    expect(result).toBe(false);
  });
});
