import { whetherRuleset } from '@/utils/ruleset';

describe('여부/여부값 지정 룰셋 유효성 검사', () => {
  const ruleset = { trueValue: 'Y', falseValue: 'N' };

  it('Y, N값은 true를 반환해야 합니다.', () => {
    const [Y, N] = ['Y', 'N'];
    const result1 = whetherRuleset.valid(Y, ruleset);
    const result2 = whetherRuleset.valid(N, ruleset);
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

  it('Y, N 여부는 [y, n, 0, 1, 2, 적용, 미적용, 운영, 미운영, 사용가능, 사용불가, 가능, 불가]값은 false를 반환해야 합니다.', () => {
    const testData = [
      'y',
      'n',
      0,
      1,
      2,
      '0',
      '1',
      '2',
      '적용',
      '미적용',
      '운영',
      '미운영',
      '사용가능',
      '사용불가',
      '가능',
      '불가',
    ];
    expect(testData.reduce((acc, cell) => acc || whetherRuleset.valid(cell, ruleset), false)).toBe(
      false,
    );
  });

  it('여부값 지정일 경우 룰셋에 입력한 여부값이 들어오면 true를 반환합니다.', () => {
    const [Y, N] = ['O', 'X'];
    const result1 = whetherRuleset.valid(Y, { trueValue: 'O', falseValue: 'X' });
    const result2 = whetherRuleset.valid(N, { trueValue: 'O', falseValue: 'X' });
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

  it('여부값 지정에 공백이나 숫자가 들어올경우', () => {
    // TODO
  });
});

describe('여부/여부값 지정 룰셋 정비 검사', () => {
  const ruleset = { trueValue: 'Y', falseValue: 'N' };

  it('Y, N값은 그대로 반환돼야 합니다.', () => {
    const [Y, N] = ['Y', 'N'];
    const result1 = whetherRuleset.repair(Y, ruleset);
    const result2 = whetherRuleset.repair(N, ruleset);
    expect(result1).toBe('Y');
    expect(result2).toBe('N');
  });

  it(`Y, N 여부는 [y, n, 0, 1, 2, 적용, 미적용, 운영, 미운영, 사용가능, 사용불가, 가능, 불가]값에 
  Truthy, Falsy한 값을 판단하여 반환해야 합니다.`, () => {
    const trueValues = [
      'Y',
      'y',
      'O',
      'o',
      'TRUE',
      'true',
      '1',
      1,
      '적용',
      '운영',
      '예',
      '사용가능',
      '가능',
    ];

    const falseValues = [
      'N',
      'n',
      'X',
      'x',
      'FALSE',
      'false',
      '0',
      0,
      '미적용',
      '미운영',
      '아니오',
      '아니요',
      '사용불가',
      '불가',
    ];

    trueValues.forEach(cell => {
      const result = whetherRuleset.repair(cell, ruleset);
      expect(result).toBe('Y');
    });

    falseValues.forEach(cell => {
      const result = whetherRuleset.repair(cell, ruleset);
      expect(result).toBe('N');
    });
  });
});
