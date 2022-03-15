import { chargeRuleset } from '@/utils/ruleset';

describe('금액 룰셋 유효성 검사', () => {
  it('입력값에 숫자로만 된 입력값은 정상입니다.', () => {
    const cell = '23497';
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('음수 숫자 입력값은 정상입니다.', () => {
    const cell = '-23497';
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('소수점 양수 숫자 입력값은 정상입니다.', () => {
    const cell = '234.97';
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('소수점 음수 숫자 입력값은 정상입니다.', () => {
    const cell = '-234.97';
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('입력값에 0이 맨 앞에 포함되어 있으면 false를 반환합니다.', () => {
    const cell = '09';
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('입력값에 문자가 포함되어있으면 false를 반환해야합니다.', () => {
    const cell = '23497a';
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('입력값에 숫자에 공백이 포함되어있으면 false를 반환해야합니다.', () => {
    const cell = '23497 ';
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('입력값에 숫자에 공백이 포함되어있으면 false를 반환해야합니다.', () => {
    const cell = ' 23497';
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('입력값이 숫자로 입력되어 있으면 정상입니다.', () => {
    const cell = 2403974;
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('천단위 쉼표 사용은 false를 반환합니다.', () => {
    const cell = '2,000,000,000';
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('원화기호 사용은 false를 반환합니다.', () => {
    const cell = '₩2000000000';
    const result = chargeRuleset.valid(cell);
    expect(result).toBe(false);
  });
});

describe('금액 룰셋 정비 검사', () => {
  it('[금액]20원 -> 20', () => {
    const cell = '20원';
    const result = chargeRuleset.repair(cell);
    expect(result).toBe(20);
  });

  it('[금액]2백원 -> 2000000000', () => {
    const cell = '2백원';
    const result = chargeRuleset.repair(cell);
    expect(result).toBe(200);
  });

  it('[금액]2천원 -> 2000000000', () => {
    const cell = '2천원';
    const result = chargeRuleset.repair(cell);
    expect(result).toBe(2000);
  });

  it('[금액]2만원 -> 2000000000', () => {
    const cell = '2만원';
    const result = chargeRuleset.repair(cell);
    expect(result).toBe(20000);
  });

  it('[금액]2십만원 -> 200000', () => {
    const cell = '2십만원';
    const result = chargeRuleset.repair(cell);
    expect(result).toBe(200000);
  });

  it('[금액]2백만원 -> 2000000', () => {
    const cell = '2백만원';
    const result = chargeRuleset.repair(cell);
    expect(result).toBe(2000000);
  });

  it('[금액]2천만원 -> 20000000', () => {
    const cell = '2천만원';
    const result = chargeRuleset.repair(cell);
    expect(result).toBe(20000000);
  });

  it('[금액]2억원 -> 2000000000', () => {
    const cell = '2억원';
    const result = chargeRuleset.repair(cell);
    expect(result).toBe(200000000);
  });

  it('천단위 쉼표 사용은 콤마를 제거하여 반환합니다.', () => {
    const cell = '2,000,000,000';
    const result = chargeRuleset.repair(cell);
    expect(result).toBe(2000000000);
  });

  it('원화기호 사용은 원화 기호를 제거하여 반환합니다.', () => {
    const cell = '₩2000000000';
    const result = chargeRuleset.repair(cell);
    expect(result).toBe(2000000000);
  });
});
