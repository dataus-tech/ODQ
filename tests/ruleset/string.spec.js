import { stringRuleset } from '@/utils/ruleset';

describe('문자열 룰셋 유효성 검사', () => {
  it('문자열은 항상 true를 반환해야 합니다.', () => {
    const cell = 'apple';
    const result = stringRuleset.valid(cell);
    expect(result).toBe(true);
  });
});

describe('문자열 룰셋 정비 검사', () => {
  it('문자열은 항상 입력값 그대로 반환해야 합니다.', () => {
    const cell = 'apple';
    const result = stringRuleset.repair(cell);
    expect(result).toEqual(cell);
  });
});
