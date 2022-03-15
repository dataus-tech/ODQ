import { numberRuleset } from '@/utils/ruleset';

describe('번호 룰셋 유효성 검사', () => {
  const numPhoneRuleset = {
    id: 'numPhone',
  };
  const numPostalRuleset = {
    id: 'numPostalCode',
  };
  const numBusinessRuleset = {
    id: 'numBusiness',
  };

  it('[전화번호]99-999-9999 형식은 true를 반환합니다.', () => {
    const cell = '99-999-9999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]99-9999-9999 형식은 true를 반환합니다.', () => {
    const cell = '99-9999-9999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]999-999-9999 형식은 true를 반환합니다.', () => {
    const cell = '999-999-9999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]999-9999-9999 형식은 true를 반환합니다.', () => {
    const cell = '999-9999-9999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]999-9999-9999 형식은 true를 반환합니다.', () => {
    const cell = '999-9999-9999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]9999-9999 형식은 true를 반환합니다.', () => {
    const cell = '9999-9999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]9999-999-9999 형식은 true를 반환합니다.', () => {
    const cell = '9999-999-9999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]9999-9999-9999 형식은 true를 반환합니다.', () => {
    const cell = '9999-9999-9999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]99-999 형식은 true를 반환합니다.', () => {
    const cell = '99-999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]999-9999 형식은 true를 반환합니다.', () => {
    const cell = '999-9999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]999-999 형식은 true를 반환합니다.', () => {
    const cell = '999-999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]999 형식은 true를 반환합니다.', () => {
    const cell = '999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]9999 형식은 true를 반환합니다.', () => {
    const cell = '9999';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]표준 데이터 예시', () => {
    const cell = '063-271-4790';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(true);
  });

  it('[전화번호]number 형식은 false를 반환합니다.', () => {
    const cell = 999;
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(false);
  });

  it('[전화번호]공백은 false를 반환합니다.', () => {
    const cell = ' ';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(false);
  });

  it('[전화번호]하이픈(-) 미사용은 false를 반환합니다.', () => {
    const cell = '0632714790';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(false);
  });

  it('[전화번호]~개 이상 번호 사용은 false를 반환합니다.', () => {
    const cell = '051-461-3091~5';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(false);
  });

  it('[전화번호]~개 이상 번호 사용 및 표기 추가 사용은 false를 반환합니다.', () => {
    const cell = '051-461-3091~5(제2터미널)';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(false);
  });

  it('[전화번호]~개 이상 번호 사용 및 개수 표기 사용은 false를 반환합니다.', () => {
    const cell = '042-220-2001~2,4';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(false);
  });

  it('[전화번호]중간 공백 채움 사용 false를 반환합니다.', () => {
    const cell = '051 -867 0032';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(false);
  });

  it('[전화번호]없는 유형 자릿수 사용 false를 반환합니다.', () => {
    const [cell1, cell2] = ['0510-8648-302', '0517-11444-45'];
    const result1 = numberRuleset.valid(cell1, numPhoneRuleset);
    const result2 = numberRuleset.valid(cell2, numPhoneRuleset);
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });

  it('[전화번호]하이픈(-) 미사용, 공백으로 표기, 부가 문자 사용 false를 반환합니다.', () => {
    const cell = '‘051 611 1002';
    const result = numberRuleset.valid(cell, numPhoneRuleset);
    expect(result).toBe(false);
  });

  it('[우편번호]99999형식은 true를 반환합니다.', () => {
    const cell = '16077';
    const result = numberRuleset.valid(cell, numPostalRuleset);
    expect(result).toBe(true);
  });

  it('[우편번호]999-999형식은 true를 반환합니다.', () => {
    const cell = '476-706';
    const result = numberRuleset.valid(cell, numPostalRuleset);
    expect(result).toBe(true);
  });

  it('[우편번호]표준데이터 예시는 true를 반환합니다.', () => {
    const [cell1, cell2] = ['46987', '701-721'];
    const result1 = numberRuleset.valid(cell1, numPostalRuleset);
    const result2 = numberRuleset.valid(cell2, numPostalRuleset);
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

  it('[우편번호]숫자 형식은 false를 반환합니다.', () => {
    const cell = 16077;
    const result = numberRuleset.valid(cell, numPostalRuleset);
    expect(result).toBe(false);
  });

  it('[우편번호]공백은 false를 반환합니다.', () => {
    const cell = ' ';
    const result = numberRuleset.valid(cell, numPostalRuleset);
    expect(result).toBe(false);
  });

  it('[우편번호]괄호로 표기 사용은 false를 반환합니다.', () => {
    const cell = '(46987)';
    const result = numberRuleset.valid(cell, numPostalRuleset);
    expect(result).toBe(false);
  });

  it('[우편번호]하이픈(-) 미사용은 false를 반환합니다.', () => {
    const cell = '701721';
    const result = numberRuleset.valid(cell, numPostalRuleset);
    expect(result).toBe(false);
  });

  it('[사업자번호]표준데이터 예시는 true를 반환합니다.', () => {
    const cell = '402-03-87956';
    const result = numberRuleset.valid(cell, numBusinessRuleset);
    expect(result).toBe(true);
  });

  it('[사업자번호]하이픈(-) 미사용은 false를 반환합니다.', () => {
    const cell = '4020387956';
    const result = numberRuleset.valid(cell, numBusinessRuleset);
    expect(result).toBe(false);
  });

  it('[사업자번호]하이픈(-) 미사용 및 공백 표기는 false를 반환합니다.', () => {
    const cell = '402 03 87956';
    const result = numberRuleset.valid(cell, numBusinessRuleset);
    expect(result).toBe(false);
  });

  it('[패턴지정번호]올바른 패턴과 값은 true를 반환합니다.', () => {
    const [cell1, pattern1] = ['2017-01-01', 'NNNN-NN-NN'];
    const [cell2, pattern2] = ['010-8566-7296', 'NNN-NNNN-NNNN'];

    const result1 = numberRuleset.valid(cell1, {
      id: 'numPattern',
      pattern: pattern1,
    });
    const result2 = numberRuleset.valid(cell2, {
      id: 'numPattern',
      pattern: pattern2,
    });
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

  it('[패턴지정번호]올바른 패턴에 맞지 않는 값은 false를 반환합니다.', () => {
    const [cell1, pattern1] = ['2017-01-0', 'NNNN-NN-NN'];
    const [cell2, pattern2] = ['010-8566-296', 'NNN-NNNN-NNNN'];

    const result1 = numberRuleset.valid(cell1, {
      id: 'numPattern',
      pattern: pattern1,
    });
    const result2 = numberRuleset.valid(cell2, {
      id: 'numPattern',
      pattern: pattern2,
    });
    expect(result1).toBe(false);
    expect(result2).toBe(false);
  });
});

describe('번호 룰셋 정비 검사', () => {
  const numPhoneRuleset = {
    id: 'numPhone',
  };
  const numPostalRuleset = {
    id: 'numPostalCode',
  };
  const numBusinessRuleset = {
    id: 'numBusiness',
  };

  it('[전화번호]0632714790 -> 063-271-4790', () => {
    const cell = '0632714790';
    const result = numberRuleset.repair(cell, numPhoneRuleset);
    expect(result).toBe('063-271-4790');
  });

  it('[전화번호]1661-6700 -> 1661-6700', () => {
    const cell = '1661-6700';
    const result = numberRuleset.repair(cell, numPhoneRuleset);
    expect(result).toBe('1661-6700');
  });

  it('[전화번호]051-461-3091~5 -> 051-461-3091', () => {
    const cell = '051-461-3091~5';
    const result = numberRuleset.repair(cell, numPhoneRuleset);
    expect(result).toBe('051-461-3091');
  });

  it('[전화번호]051-461-3091(내선번호15) -> 051-461-3091', () => {
    const cell = '051-461-3091(내선번호15)';
    const result = numberRuleset.repair(cell, numPhoneRuleset);
    expect(result).toBe('051-461-3091');
  });

  it('[전화번호]032-740-7361~2(제2터미널) -> 032-740-7361', () => {
    const cell = '032-740-7361~2(제2터미널)';
    const result = numberRuleset.repair(cell, numPhoneRuleset);
    expect(result).toBe('032-740-7361');
  });

  it('[전화번호]042-220-2001~2,4 -> 042-220-2001', () => {
    const cell = '042-220-2001~2,4';
    const result = numberRuleset.repair(cell, numPhoneRuleset);
    expect(result).toBe('042-220-2001');
  });

  it('[전화번호]051 -867 0032 -> 051-867-0032', () => {
    const cell = '051 -867 0032';
    const result = numberRuleset.repair(cell, numPhoneRuleset);
    expect(result).toBe('051-867-0032');
  });

  it('[전화번호]‘051 611 1002 -> 051-611-1002', () => {
    const cell = '‘051 611 1002';
    const result = numberRuleset.repair(cell, numPhoneRuleset);
    expect(result).toBe('051-611-1002');
  });

  it('[우편번호](46987) -> 46987', () => {
    const cell = '(46987)';
    const result = numberRuleset.repair(cell, numPostalRuleset);
    expect(result).toBe('46987');
  });

  it('[우편번호]701721 -> 701-721', () => {
    const cell = '701721';
    const result = numberRuleset.repair(cell, numPostalRuleset);
    expect(result).toBe('701-721');
  });

  it('[사업자번호]4020387956 -> 402-03-87956', () => {
    const cell = '4020387956';
    const result = numberRuleset.repair(cell, numBusinessRuleset);
    expect(result).toBe('402-03-87956');
  });

  it('[사업자번호]402 03 87956 -> 402-03-87956', () => {
    const cell = '402 03 87956';
    const result = numberRuleset.repair(cell, numBusinessRuleset);
    expect(result).toBe('402-03-87956');
  });

  it('[패턴지정번호]20170101 -> 2017-01-01, 010 8566 7296 -> 010-8566-7296', () => {
    const [cell1, pattern1] = ['20170101', 'NNNN-NN-NN'];
    const [cell2, pattern2] = ['010 8566 7296', 'NNN-NNNN-NNNN'];

    const result1 = numberRuleset.repair(cell1, {
      id: 'numPattern',
      pattern: pattern1,
    });
    const result2 = numberRuleset.repair(cell2, {
      id: 'numPattern',
      pattern: pattern2,
    });
    expect(result1).toBe('2017-01-01');
    expect(result2).toBe('010-8566-7296');
  });
});
