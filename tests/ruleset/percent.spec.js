import { percentRuleset } from '@/utils/ruleset';

describe('율 룰셋 유효성 검사', () => {
  it('소숫점으로 이루어진 값은 정상입니다.', () => {
    const cell = '1212.0';
    const result = percentRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('소숫점으로 이루어진 값은 정상입니다.', () => {
    const cell = 1212.0;
    const result = percentRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('음수와 소수점으로 이루어진 값은 정상입니다.', () => {
    const cell = '-128.66';
    const result = percentRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('음수와 소수점으로 이루어진 값은 정상입니다.', () => {
    const cell = -128.66;
    const result = percentRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('"퍼센트" 사용은 false를 반환합니다.', () => {
    const cell = '-128.66퍼센트';
    const result = percentRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('% 사용은 false를 반환합니다.', () => {
    const cell = '-128.66%';
    const result = percentRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('(%), 천 단위 쉼표 사용은 false를 반환합니다.', () => {
    const cell = '-1,212.0(%)';
    const result = percentRuleset.valid(cell);
    expect(result).toBe(false);
  });
});

describe('율 룰셋 정비 검사', () => {
  it('[율]문자열 숫자는 number 형식으로 변환합니다.', () => {
    const cell = '2000';
    const result = percentRuleset.repair(cell);
    expect(result).toBe(2000);
  });

  it('[율]-128.66퍼센트 => -128.66', () => {
    const cell = '-128.66퍼센트';
    const result = percentRuleset.repair(cell);
    expect(result).toBe(-128.66);
  });

  it('[율]-128.66% => -128.66', () => {
    const cell = '-128.66%';
    const result = percentRuleset.repair(cell);
    expect(result).toBe(-128.66);
  });

  it('[율]-1,212.0(%) => -1212.0', () => {
    const cell = '-1,212.0(%)';
    const result = percentRuleset.repair(cell);
    expect(result).toBe(-1212.0);
  });
});
