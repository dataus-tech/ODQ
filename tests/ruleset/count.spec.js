import { countRuleset } from '@/utils/ruleset';

describe('수량 룰셋 유효성 검사', () => {
  it('소수점으로 이루어진 입력값은 정상입니다.', () => {
    const cell = '25.02';
    const result = countRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('비어있는 값은 false를 반환해야 합니다.', () => {
    const [cell1, cell2, cell3, cell4] = ['', ' ', null, undefined];
    const [result1, result2, result3, result4] = [
      countRuleset.valid(cell1),
      countRuleset.valid(cell2),
      countRuleset.valid(cell3),
      countRuleset.valid(cell4),
    ];
    expect(result1).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
    expect(result4).toBe(false);
  });

  it('표준 데이터 예시값은 정상입니다.', () => {
    const cell = '2000';
    const result = countRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('0으로 시작하는 문자열을 false를 반환합니다.', () => {
    const cell = '02000';
    const result = countRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('number 데이터 타입은 정상입니다.', () => {
    const cell = 2000;
    const result = countRuleset.valid(cell);
    expect(result).toBe(true);
  });

  it('-명 한글 단위 사용은 false를 반환합니다.', () => {
    const cell = '2000명';
    const result = countRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('천 단위 쉼표 사용은 false를 반환합니다.', () => {
    const cell = '2,000명';
    const result = countRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('~천명 한글 단위 사용은 false를 반환합니다.', () => {
    const cell = '2천명';
    const result = countRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('천 단위 쉼표(,) 사용, (명) 한글 단위 사용은 false를 반환합니다.', () => {
    const cell = '2,000(명)';
    const result = countRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('kg단위 사용은 false를 반환합니다.', () => {
    const cell = '2kg';
    const result = countRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('천 단위 쉼표 사용은 false를 반환합니다.', () => {
    const cell = '2,000';
    const result = countRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('℃ 단위 사용은 false를 반환합니다.', () => {
    const cell = '20.5℃';
    const result = countRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('~도 단위 사용은 false를 반환합니다.', () => {
    const cell = '20.5도';
    const result = countRuleset.valid(cell);
    expect(result).toBe(false);
  });

  it('mm 단위 사용은 false를 반환합니다.', () => {
    const cell = '20.5mm';
    const result = countRuleset.valid(cell);
    expect(result).toBe(false);
  });
});

describe('수량 룰셋 정비 검사', () => {
  it('[수량]문자열 숫자는 number 형식으로 변환합니다.', () => {
    const cell = '2000';
    const result = countRuleset.repair(cell);
    expect(result).toBe(2000);
  });

  it('[수량]2000명 => 2000', () => {
    const cell = '2000명';
    const result = countRuleset.repair(cell);
    expect(result).toBe(2000);
  });

  it('[수량]2,000명 => 2000', () => {
    const cell = '2,000명';
    const result = countRuleset.repair(cell);
    expect(result).toBe(2000);
  });

  it('[수량]2천명 => 20000', () => {
    const cell = '2천명';
    const result = countRuleset.repair(cell);
    expect(result).toBe(2000);
  });

  it('[수량]2,000(명) => 2000', () => {
    const cell = '2,000(명)';
    const result = countRuleset.repair(cell);
    expect(result).toBe(2000);
  });

  it('[수량]2kg => 2000', () => {
    const cell = '2kg';
    const result = countRuleset.repair(cell);
    expect(result).toBe(2000);
  });

  it('[수량]2,000 => 2000', () => {
    const cell = '2,000';
    const result = countRuleset.repair(cell);
    expect(result).toBe(2000);
  });

  it('[수량]20.5℃ => 20.5', () => {
    const cell = '20.5℃';
    const result = countRuleset.repair(cell);
    expect(result).toBe(20.5);
  });

  it('[수량]20.5도 => 20.5', () => {
    const cell = '20.5도';
    const result = countRuleset.repair(cell);
    expect(result).toBe(20.5);
  });

  it('[수량]20.5mm => 20.5', () => {
    const cell = '20.5mm';
    const result = countRuleset.repair(cell);
    expect(result).toBe(20.5);
  });
});
