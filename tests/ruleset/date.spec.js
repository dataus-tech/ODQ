import { dateRuleset } from '@/utils/ruleset';

describe('날짜 지정 룰셋 유효성 검사', () => {
  it('정상 id와 값이 들어오면 true를 반환해야 합니다.', () => {
    const testData = [
      { value: '2020-08-07 08:09:59', id: 'dtYYYYMMDDHH24MISS' },
      { value: '2020-08-07 08:09', id: 'dtYYYYMMDDHH24MI' },
      { value: '2020-08-07 08', id: 'dtYYYYMMDDHH24' },
      { value: '08-07 08:09', id: 'dtMMDDHH24MI' },
      { value: '08:09:59', id: 'dtHH24MISS' },
      { value: '2020-08-07', id: 'dtYYYYMMDD' },
      { value: '08:09', id: 'dtHH24MI' },
      { value: '2020-08', id: 'dtYYYYMM' },
      { value: '08-07', id: 'dtMMDD' },
      { value: '08', id: 'dtHH24' },
      { value: '2020', id: 'dtYYYY' },
      { value: '08', id: 'dtDD' },
      { value: '08', id: 'dtMI' },
      { value: '08', id: 'dtMM' },
      { value: '59', id: 'dtSS' },
      { value: '09:59', id: 'dtMISS' },
    ];
    expect(
      testData.reduce((acc, { value, id }) => acc && dateRuleset.valid(value, { id }), true),
    ).toBe(true);
  });

  it("[ 2020년, '20년, 2020년도 ]값이 들어오면 false를 반환해야 합니다.", () => {
    const id = 'dtYYYY';
    const wrongData = ['2020년', "'20년", '2020년도'];

    wrongData.forEach(cell => {
      expect(dateRuleset.valid(cell, { id })).toBe(false);
    });
  });

  it('숫자가 들어오면 false를 반환해야 합니다.', () => {
    const [id, cell] = ['dtYYYY', 100];
    expect(dateRuleset.valid(cell, { id })).toBe(false);
  });

  it('빈 값 들어오면 false를 반환해야 합니다.', () => {
    const [id, cell] = ['dtYYYY', ''];
    expect(dateRuleset.valid(cell, { id })).toBe(false);
  });

  it('3 false를 반환해야 합니다.', () => {
    const [id, cell] = ['dtMM', '3'];
    expect(dateRuleset.valid(cell, { id })).toBe(false);
  });
});

describe('날짜 지정 룰셋 정비 검사', () => {
  it('[연도]2022년 -> 2022', () => {
    const [id, cell] = ['dtYYYY', '2022년'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022');
  });

  it("[연도]'22년 -> 2022", () => {
    const [id, cell] = ['dtYYYY', "'22년"];
    expect(dateRuleset.repair(cell, { id })).toBe('2022');
  });

  it('[연도]2022년도 -> 2022', () => {
    const [id, cell] = ['dtYYYY', '2022년도'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022');
  });

  it('[연월]2022년02월 -> 2022-02', () => {
    const [id, cell] = ['dtYYYYMM', '2022년02월'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02');
  });

  it('[연월]2022년 02월 -> 2022-02', () => {
    const [id, cell] = ['dtYYYYMM', '2022년 02월'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02');
  });

  it("[연월]'22년02월 -> 2022-02", () => {
    const [id, cell] = ['dtYYYYMM', "'22년02월"];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02');
  });

  it("[연월]'22/2 -> 2022-02", () => {
    const [id, cell] = ['dtYYYYMM', "'22/2"];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02');
  });

  it("[연월]'22.2 -> 2022-02", () => {
    const [id, cell] = ['dtYYYYMM', "'22.2"];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02');
  });

  it('[연월]2022.2 -> 2022-02', () => {
    const [id, cell] = ['dtYYYYMM', '2022.2'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02');
  });

  it('[연월]2022/02 -> 2022-02', () => {
    const [id, cell] = ['dtYYYYMM', '2022/02'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02');
  });

  it('[연월]02/2022 -> 2022-02', () => {
    const [id, cell] = ['dtYYYYMM', '02/2022'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02');
  });

  it('[연월일]2022.02.01 -> 2022-02-01', () => {
    const [id, cell] = ['dtYYYYMMDD', '2022.02.01'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01');
  });

  it('[연월일]20220201 -> 2022-02-01', () => {
    const [id, cell] = ['dtYYYYMMDD', '20220201'];
    console.log(dateRuleset.repair(cell, { id }));
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01');
  });

  it('[연월일]2022/02/01 -> 2022-02-01', () => {
    const [id, cell] = ['dtYYYYMMDD', '2022/02/01'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01');
  });

  it('[연월일]2022-2-1 -> 2022-02-01', () => {
    const [id, cell] = ['dtYYYYMMDD', '2022-2-1'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01');
  });

  it("[연월일]'22-2-1 -> 2022-02-01", () => {
    const [id, cell] = ['dtYYYYMMDD', "'22-2-1"];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01');
  });

  it('[연월일]2022년2월1일 -> 2022-02-01', () => {
    const [id, cell] = ['dtYYYYMMDD', '2022년2월1일'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01');
  });

  it("[연월일]'22.2.1 -> 2022-02-01", () => {
    const [id, cell] = ['dtYYYYMMDD', "'22.2.1"];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01');
  });

  it("[연월일]'22.2.1 -> 2022-02-01", () => {
    const [id, cell] = ['dtYYYYMMDD', "'22.2.1"];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01');
  });

  it('[연월일 시간]2022-02-01 23시 -> 2022-02-01 23', () => {
    const [id, cell] = ['dtYYYYMMDDHH24', '2022-02-01 23시'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01 23');
  });

  it('[연월일 시간]2022-02-0123 -> 2022-02-01 23', () => {
    const [id, cell] = ['dtYYYYMMDDHH24', '2022-02-0123'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01 23');
  });

  it('[연월일 시간분]2022-02-01 0809 -> 2022-02-01 08:09', () => {
    const [id, cell] = ['dtYYYYMMDDHH24MI', '2022-02-01 0809'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01 08:09');
  });

  it('[연월일 시간분]2022-02-01 8:9 -> 2022-02-01 08:09', () => {
    const [id, cell] = ['dtYYYYMMDDHH24MI', '2022-02-01 8:9'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01 08:09');
  });

  it('[연월일 시간분]2022-02-01 8시9분 -> 2022-02-01 08:09', () => {
    const [id, cell] = ['dtYYYYMMDDHH24MI', '2022-02-01 8시9분'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01 08:09');
  });

  it('[연월일 시간분초]2022-02-01 8:9:59 -> 2022-02-01 08:09:59', () => {
    const [id, cell] = ['dtYYYYMMDDHH24MISS', '2022-02-01 8:9:59'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01 08:09:59');
  });

  it('[연월일 시간분초]20220201080959 -> 2022-02-01 08:09:59', () => {
    const [id, cell] = ['dtYYYYMMDDHH24MISS', '20220201080959'];
    expect(dateRuleset.repair(cell, { id })).toBe('2022-02-01 08:09:59');
  });

  it('[월]6 -> 06', () => {
    const [id, cell] = ['dtMM', '6'];
    expect(dateRuleset.repair(cell, { id })).toBe('06');
  });

  it('[월]6월 -> 06', () => {
    const [id, cell] = ['dtMM', '6월'];
    expect(dateRuleset.repair(cell, { id })).toBe('06');
  });

  it('[월]06월 -> 06', () => {
    const [id, cell] = ['dtMM', '06월'];
    expect(dateRuleset.repair(cell, { id })).toBe('06');
  });

  it('[월일]5-9 -> 05-09', () => {
    const [id, cell] = ['dtMMDD', '5-9'];
    expect(dateRuleset.repair(cell, { id })).toBe('05-09');
  });

  it('[월일]5/9 -> 05-09', () => {
    const [id, cell] = ['dtMMDD', '5/9'];
    expect(dateRuleset.repair(cell, { id })).toBe('05-09');
  });

  it('[월일]05.09 -> 05-09', () => {
    const [id, cell] = ['dtMMDD', '05.09'];
    expect(dateRuleset.repair(cell, { id })).toBe('05-09');
  });

  it('[월일]5.9 -> 05-09', () => {
    const [id, cell] = ['dtMMDD', '5.9'];
    expect(dateRuleset.repair(cell, { id })).toBe('05-09');
  });

  it('[월일]5월9일 -> 05-09', () => {
    const [id, cell] = ['dtMMDD', '5월9일'];
    expect(dateRuleset.repair(cell, { id })).toBe('05-09');
  });

  it('[월일 시간분]05-09 8:6 -> 05-09 08:06', () => {
    const [id, cell] = ['dtMMDDHH24MI', '05-09 8:6'];
    expect(dateRuleset.repair(cell, { id })).toBe('05-09 08:06');
  });

  it('[월일 시간분]05.09 8:6 -> 05-09 08:06', () => {
    const [id, cell] = ['dtMMDDHH24MI', '05.09 8:6'];
    expect(dateRuleset.repair(cell, { id })).toBe('05-09 08:06');
  });

  it('[월일 시간분]05-098:6 -> 05-09 08:06', () => {
    const [id, cell] = ['dtMMDDHH24MI', '05-09 8:6'];
    expect(dateRuleset.repair(cell, { id })).toBe('05-09 08:06');
  });

  it('[월일 시간분]5월9일 8시6분 -> 05-09 08:06', () => {
    const [id, cell] = ['dtMMDDHH24MI', '5월9일 8시6분'];
    expect(dateRuleset.repair(cell, { id })).toBe('05-09 08:06');
  });

  it('[일]5일 -> 05', () => {
    const [id, cell] = ['dtDD', '5일'];
    expect(dateRuleset.repair(cell, { id })).toBe('05');
  });

  it('[일]5 -> 05', () => {
    const [id, cell] = ['dtDD', '5'];
    expect(dateRuleset.repair(cell, { id })).toBe('05');
  });

  it('[시간]9시 -> 09', () => {
    const [id, cell] = ['dtHH24', '9시'];
    expect(dateRuleset.repair(cell, { id })).toBe('09');
  });

  it('[시간]오후9시 -> 09', () => {
    const [id, cell] = ['dtHH24', '오후9시'];
    expect(dateRuleset.repair(cell, { id })).toBe('09');
  });

  it('[시간]9 -> 09', () => {
    const [id, cell] = ['dtHH24', '9'];
    expect(dateRuleset.repair(cell, { id })).toBe('09');
  });

  it('[시간]Pm9 -> 09', () => {
    const [id, cell] = ['dtHH24', 'Pm9'];
    expect(dateRuleset.repair(cell, { id })).toBe('09');
  });

  it('[시간분]8/9 -> 08:09', () => {
    const [id, cell] = ['dtHH24MI', '8/9'];
    expect(dateRuleset.repair(cell, { id })).toBe('08:09');
  });

  it('[시간분]8시 9분 -> 08:09', () => {
    const [id, cell] = ['dtHH24MI', '8시 9분'];
    expect(dateRuleset.repair(cell, { id })).toBe('08:09');
  });

  it('[시간분]08;09 -> 08:09', () => {
    const [id, cell] = ['dtHH24MI', '08;09'];
    expect(dateRuleset.repair(cell, { id })).toBe('08:09');
  });

  it('[시간분]08-09 -> 08:09', () => {
    const [id, cell] = ['dtHH24MI', '08-09'];
    expect(dateRuleset.repair(cell, { id })).toBe('08:09');
  });

  it('[시간분초]23/08/08 -> 23:08:08', () => {
    const [id, cell] = ['dtHH24MISS', '23/08/08'];
    expect(dateRuleset.repair(cell, { id })).toBe('23:08:08');
  });

  it('[시간분초]23:8:8 -> 23:08:08', () => {
    const [id, cell] = ['dtHH24MISS', '23:8:8'];
    expect(dateRuleset.repair(cell, { id })).toBe('23:08:08');
  });

  it('[시간분초]23시8분8초 -> 23:08:08', () => {
    const [id, cell] = ['dtHH24MISS', '23시8분8초'];
    expect(dateRuleset.repair(cell, { id })).toBe('23:08:08');
  });

  it('[시간분초]23 08 08 -> 23:08:08', () => {
    const [id, cell] = ['dtHH24MISS', '23 08 08'];
    expect(dateRuleset.repair(cell, { id })).toBe('23:08:08');
  });

  it('[분]5분 -> 05', () => {
    const [id, cell] = ['dtMI', '5분'];
    expect(dateRuleset.repair(cell, { id })).toBe('05');
  });

  it('[분]5 -> 05', () => {
    const [id, cell] = ['dtMI', '5'];
    expect(dateRuleset.repair(cell, { id })).toBe('05');
  });

  it('[분초]5:1 -> 05:01', () => {
    const [id, cell] = ['dtMISS', '5:1'];
    expect(dateRuleset.repair(cell, { id })).toBe('05:01');
  });

  it('[분초]5분 1초 -> 05:01', () => {
    const [id, cell] = ['dtMISS', '5분 1초'];
    expect(dateRuleset.repair(cell, { id })).toBe('05:01');
  });

  it('[초]9초 -> 09', () => {
    const [id, cell] = ['dtSS', '9초'];
    expect(dateRuleset.repair(cell, { id })).toBe('09');
  });

  it('[초]9 -> 09', () => {
    const [id, cell] = ['dtSS', '9'];
    expect(dateRuleset.repair(cell, { id })).toBe('09');
  });
});
