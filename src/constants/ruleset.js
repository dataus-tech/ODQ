import { go, groupBy, entries, map } from 'fxjs';

export const ruleset = [
  {
    index: '1',
    id: 'str',
    group: '문자열',
    label: '문자열',
  },
  {
    index: '2',
    id: 'amt',
    group: '금액',
    label: '금액',
    errorDiscription:
      '숫자(금액, 수량, 율) 데이터의 부정확한 입력<br />설명: 숫자 데이터형식은 금액, 수량, 율로 구분하고, 표준데이터 형식은 숫자, 소수점 마이너스(-)로만 표기',
    example:
      '표준형식: ①99999 ②-99999 ③-99999.999<br />예시: ①2,100원 -> 2100 ②->∆128.65% -> -128.65',
  },
  {
    index: '3',
    id: 'qtt',
    group: '수량',
    label: '수량',
    errorDiscription:
      '숫자(금액, 수량, 율) 데이터의 부정확한 입력<br />설명: 숫자 데이터형식은 금액, 수량, 율로 구분하고, 표준데이터 형식은 숫자, 소수점 마이너스(-)로만 표기',
    example:
      '표준형식: ①99999 ②-99999 ③-99999.999<br />예시: ①2,100원 -> 2100 ②∆128.65% -> -128.65',
  },
  {
    index: '4',
    id: 'pec',
    type: '율',
    label: '율',
    errorDiscription:
      '숫자(금액, 수량, 율) 데이터의 부정확한 입력<br />설명: 숫자 데이터형식은 금액, 수량, 율로 구분하고, 표준데이터 형식은 숫자, 소수점 마이너스(-)로만 표기',
    example:
      '표준형식: ①99999 ②-99999 ③-99999.999<br />예시: ①2,100원 -> 2100 ②∆128.65% -> -128.65',
  },
  {
    index: '5-1',
    id: 'wheYN',
    group: '여부',
    label: 'Y, N',
    errorDiscription:
      '여부(Y, N) 데이터의 부정확한 입력<br />설명: 여부 데이터형식은 Y 와 N 구분하고, 영문 대문자 Y와 N으로만 표기',
    example: '표준형식: ①Y ②N<br />예시: ①y -> Y ②n -> N ③예 -> Y ④아니오 -> N',
  },
  {
    index: '5-2',
    id: 'wheSET',
    group: '여부',
    label: '여부값 지정',
    errorDiscription:
      '여부(여부값 지정) 데이터의 부정확한 입력<br />설명: 여부 데이터형식은 지정한 여부값으로만 표기',
    example:
      '표준형식: 여부값 지정 예시①적용 ②미적용<br />예시: ①적 용 -> 적용 ②Y -> 적용 ③미 적용 -> 미적용 ④아니오 -> 미적용',
  },
  {
    index: '6-1',
    id: 'dtYYYYMMDDHH24MISS',
    group: '날짜',
    label: 'YYYY-MM-DD HH24:MI:SS',
    content: '연월일 시간분초',
    errorDiscription:
      '날짜(YYYY-MM-DD HH24:MI:SS) 데이터의 부정확한 입력<br />설명: 년도, 월, 일자간의 표준데이터형식은 하이픈(-)을 사용하고, 시간, 분, 초간에는 콜론(:)을 사용하여 표기',
    example:
      '표준형식:9999-99-99 99:99:99<br />예시: ①2021-08-07 8:9:59 -> 2021-08-07 08:09:59 ②2021/08/078959 -> 2021/08/07 08:09:59',
  },
  {
    index: '6-2',
    id: 'dtYYYYMMDDHH24MI',
    group: '날짜',
    label: 'YYYY-MM-DD HH24:MI',
    content: '연월일 시간분',
    errorDiscription:
      '날짜(YYYY-MM-DD HH24:MI) 데이터의 부정확한 입력<br />설명: 년도, 월, 일자간의 표준데이터형식은 하이픈(-)을 사용하고, 시간, 분간에는 콜론(:)을 사용하여 표기',
    example:
      '표준형식:9999-99-99 99:99<br />예시: ①2021-08-07 8:9 -> 2021-08-07 08:09 ②2021/08/0789 -> 2021/08/07 08:09',
  },
  {
    index: '6-3',
    id: 'dtYYYYMMDDHH24',
    group: '날짜',
    label: 'YYYY-MM-DD HH24',
    content: '연월일 시간',
    errorDiscription:
      '날짜(YYYY-MM-DD HH24) 데이터의 부정확한 입력<br />설명: 년도, 월, 일자간의 표준데이터형식은 하이픈(-)을 사용하고, 시간을 표기',
    example:
      '표준형식:9999-99-99 99<br />예시: ①2021-08-07 8 -> 2021-08-07 08 ②2021/08/078 -> 2021/08/07 08',
  },
  {
    index: '6-4',
    id: 'dtMMDDHH24MI',
    group: '날짜',
    label: 'MM-DD HH24:MI',
    content: '월일 시간분',
    errorDiscription:
      '날짜(MM-DD HH24:MI) 데이터의 부정확한 입력<br />설명: 월, 일자간의 표준데이터형식은 하이픈(-)을 사용하고, 시간, 분간에는 콜론(:)을 사용하여 표기',
    example:
      '표준형식:99-99 99:99<br />예시: ①08-07 8:9 -> 08-07 08:09 ②8월7일8시6분 -> 08-07 08:06',
  },
  {
    index: '6-5',
    id: 'dtHH24MISS',
    group: '날짜',
    label: 'HH24:MI:SS',
    content: '시간분초',
    errorDiscription:
      '날짜(HH24:MI:SS) 데이터의 부정확한 입력<br />설명: 시간, 분, 초간에는 콜론(:)을 사용하여 표기',
    example: '표준형식:99:99:99<br />예시: ①8:6:59 -> 08:06:59 ②8시6분59초 -> 08:06:59',
  },
  {
    index: '6-6',
    id: 'dtYYYYMMDD',
    group: '날짜',
    label: 'YYYY-MM-DD',
    content: '연월일',
    errorDiscription:
      '날짜(YYYY-MM-DD) 데이터의 부정확한 입력<br />설명: 년도, 월, 일자간의 표준데이터형식은 하이픈(-)을 사용하여 표기',
    example: '표준형식:9999-99-99<br />예시: ①21.8.1 -> 2021-08-01 ②21/8/1 -> 2021-08-01',
  },
  {
    index: '6-7',
    id: 'dtHH24MI',
    group: '날짜',
    label: 'HH24:MI',
    content: '시간분',
    errorDiscription:
      '날짜(HH24:MI) 데이터의 부정확한 입력<br />설명: 시간, 분간에는 콜론(:)을 사용하여 표기',
    example: '표준형식:99:99<br />예시: ①8:6 -> 08:06 ②8시6분 -> 08:06',
  },
  {
    index: '6-8',
    id: 'dtYYYYMM',
    group: '날짜',
    label: 'YYYY-MM',
    content: '연월',
    errorDiscription:
      '날짜(YYYY-MM) 데이터의 부정확한 입력<br />설명: 년도, 월간의 표준데이터형식은 하이픈(-)을 사용하여 표기',
    example: '표준형식:9999-99<br />예시: ①21.8 -> 2021-08 ②21/8 -> 2021-08',
  },
  {
    index: '6-9',
    id: 'dtMMDD',
    group: '날짜',
    label: 'MM-DD',
    content: '월일',
    errorDiscription:
      '날짜(MM-DD) 데이터의 부정확한 입력<br />설명: 월, 일자간의 표준데이터형식은 하이픈(-)을 사용하여 표기',
    example: '표준형식:99-99<br />예시: ①5-9 -> 05-09 ②5.9 -> 05:09',
  },
  {
    index: '6-10',
    id: 'dtHH24',
    group: '날짜',
    label: 'HH24',
    content: '시간',
    errorDiscription: '날짜(HH24) 데이터의 부정확한 입력<br />설명: 시간(숫자2자리) 사용하여 표기',
    example: '표준형식:99<br />예시: ①9 -> 09 ②9시 -> 09',
  },
  {
    index: '6-11',
    id: 'dtYYYY',
    group: '날짜',
    label: 'YYYY',
    content: '연도',
    errorDiscription: '날짜(YYYY) 데이터의 부정확한 입력<br />설명: 년도(숫자4자리) 사용하여 표기',
    example: '표준형식: 9999<br />예시: ①21년 -> 2021 ②2021년 -> 2021',
  },
  {
    index: '6-12',
    id: 'dtDD',
    group: '날짜',
    label: 'DD',
    content: '일자',
    errorDiscription: '날짜(DD) 데이터의 부정확한 입력<br />설명: 일자(숫자2자리) 사용하여 표기',
    example: '표준형식: 99<br />예시: ①5월 -> 05 ②5 -> 05',
  },
  {
    index: '6-13',
    id: 'dtMI',
    group: '날짜',
    label: 'MI',
    content: '분',
    errorDiscription: '날짜(MI) 데이터의 부정확한 입력<br />설명: 분(숫자2자리) 사용하여 표기',
    example: '표준형식: 99<br />예시: ①5분 -> 05 ②5 -> 05',
  },
  {
    index: '6-14',
    id: 'dtMM',
    group: '날짜',
    label: 'MM',
    content: '월',
    errorDiscription: '날짜(MM) 데이터의 부정확한 입력<br />설명: 월(숫자2자리) 사용하여 표기',
    example: '표준형식: 99<br />예시: ①5월 -> 05 ②5월 -> 05',
  },
  {
    index: '6-15',
    id: 'dtSS',
    group: '날짜',
    label: 'SS',
    content: '초',
    errorDiscription: '날짜(SS) 데이터의 부정확한 입력<br />설명: 초(숫자2자리) 사용하여 표기',
    example: '표준형식: 99<br />예시: ①5초 -> 05 ②5 -> 05',
  },
  {
    index: '6-16',
    id: 'dtMISS',
    group: '날짜',
    label: 'MI:SS',
    content: '분초',
    errorDiscription:
      '날짜(MI:SS) 데이터의 부정확한 입력<br />설명: 분, 초간에는 콜론(:)을 사용하여 표기',
    example: '표준형식: 99:99<br />예시: ①5:1 -> 05:01 ②5.1 -> 05:01',
  },
  {
    index: '7-1',
    id: 'numPhone',
    group: '번호',
    label: '전화번호',
    errorDiscription:
      '번호(전화번호) 데이터의 부정확한 입력<br />설명: 번호(전화번호)는 다양한 유형의 패턴(상세안내참조) 존재하고, 숫자와 하이픈(-)으로만 표기, 유형별 자릿수 준용',
    example:
      '표준형식: ①99-999-9999 ②99-9999-9999 ③999-999-9999 등<br />예시: ①0632714790 -> 063-271-4790 ②063)2714790 -> 063-271-4790 ③063- 271- 4790 -> 063-271-4790',
  },
  {
    index: '7-2',
    id: 'numPostalCode',
    group: '번호',
    label: '우편번호',
    errorDiscription:
      '번호(우편번호) 데이터의 부정확한 입력<br />설명: 번호(우편번호)는 신우편번호, 구우편번호로 구분하고, 숫자와 하이픈(-)으로만 표기, 유형별 자릿수 준용',
    example:
      '표준형식: ①신우편번호 99999 ②구우편번호 999-999 <br />예시: ①(46987) -> 46987 ②701721 -> 701-721 ③6987 -> 06987',
  },
  {
    index: '7-3',
    id: 'numBusiness',
    group: '번호',
    label: '사업자번호',
    errorDiscription:
      '번호(사업자번호) 데이터의 부정확한 입력<br />설명: 번호(사업자번호)는 숫자와 하이픈(-)으로만 표기, 3자리-2자리-5자리 자릿수를 준용',
    example:
      '표준형식: ①999-99-99999<br />예시: ①4020387956 -> 402-03-87956 ②402 03 87956 -> 402-03-87956',
  },
  {
    index: '7-4',
    id: 'numPattern',
    group: '번호',
    label: '패턴지정번호',
    errorDiscription:
      '번호(패턴지정번호) 데이터의 부정확한 입력<br />설명: 번호(패턴지정번호)는 지정한 유형의 패턴번호만 유효하고, 숫자와 하이픈(-)으로만 표기, 지정한 자릿수 준용',
    example:
      '표준형식: 패턴 지정 예시 주차장관리번호 NNN-N-NNNNNN<br />예시: ①100-01-000001 -> 100-1-000001',
  },
  {
    index: '8',
    id: 'conTime',
    group: '일관성',
    label: '시간순서 일관성',
    errorDiscription:
      '시간순서 데이터의 항목과 항목의 시간순서 규칙 오류<br />설명: 시간순서 데이터 항목 간 점검은 항목과 항목의 시간순서 규칙에 따라 입력',
    example:
      '표준형식: 시작일자 2021-01-01 종료일자 2021-12-31 (종료일자는 시작일자보다 같거나 커야 되는 규칙)<br />예시: 시작일자 2021-12-31 종료일자 2021-01-01 (시작일자가 종료일자 보다 큼)',
  },
  {
    index: '9',
    id: 'conLogicRelationShip',
    group: '일관성',
    label: '컬럼 간 논리관계 일관성',
  },
  {
    index: '10-1',
    id: 'calFormula',
    group: '계산식',
    label: '산식',
    errorDiscription:
      '계산식 > 산식 데이터의 항목 데이터간의 계산 산식 규칙 오류<br />설명: 산식 데이터 항목 간 진단은 항목과 항목의 계산 산식 규칙에 따라 입력',
    example:
      '표준형식: 시간당생산량 12 = 생산량 120/가동시간 10 (시간당생산량은 생산량 나누기 가동시간 규칙)<br />예시: 시간당생산량 11 = 생산량 120/가동시간 10 (계산식에 맞지 않음)',
  },
  {
    index: '10-2',
    id: 'calSum',
    group: '계산식',
    label: '합계',
    errorDiscription:
      '계산식 > 합계 데이터의 항목 데이터간의 계산 합계 규칙 오류<br />설명: 계산 합계 데이터 항목 간 진단은 항목과 항목의 계산 합계 규칙에 따라 입력',
    example:
      '표준형식:전국매출액(억원) 120 = 서울매출액 60 + 부산매출액 40 + 대구매출액 20 (전국매출액은 서울, 부산, 대구 매출액의 합계 규칙 존재)<br />예시: 전국매출액(억원) 120 = 서울매출액 60 + 부산매출액 40 + 대구매출액 10 (계산 합계 규칙에 맞지 않음)',
  },
];

export const groupedRuleset = go(
  ruleset,
  groupBy(({ index }) => index.includes('-')),
  entries,
  map(([key, value]) => value),
);

export const getRulesetGroup = diagTypeId => {
  if (diagTypeId.includes('str')) return '문자열';
  else if (diagTypeId.includes('amt')) return '금액';
  else if (diagTypeId.includes('qtt')) return '수량';
  else if (diagTypeId.includes('pec')) return '율';
  else if (diagTypeId.includes('whe')) return '여부';
  else if (diagTypeId.includes('dt')) return '날짜';
  else if (diagTypeId.includes('num')) return '번호';
  else if (diagTypeId.includes('con')) return '일관성';
  else if (diagTypeId.includes('cal')) return '계산식';
};

export const getRulesetLabel = diagTypeId =>
  ruleset.find(({ id }) => diagTypeId.includes(id)).label;

export const getDateRulesetFormat = diagTypeId => {
  switch (diagTypeId) {
    case 'dtYYYYMMDDHH24MISS':
      return 'yyyy-MM-dd HH:mm:ss';
    case 'dtYYYYMMDDHH24MI':
      return 'yyyy-MM-dd HH:mm';
    case 'dtYYYYMMDDHH24':
      return 'yyyy-MM-dd HH';
    case 'dtMMDDHH24MI':
      return 'MM-dd HH:mm';
    case 'dtHH24MISS':
      return 'HH:mm:ss';
    case 'dtYYYYMMDD':
      return 'yyyy-MM-dd';
    case 'dtHH24MI':
      return 'HH:mm';
    case 'dtYYYYMM':
      return 'yyyy-MM';
    case 'dtMMDD':
      return 'MM-dd';
    case 'dtHH24':
      return 'HH';
    case 'dtYYYY':
      return 'yyyy';
    case 'dtDD':
      return 'dd';
    case 'dtMI':
      return 'mm';
    case 'dtMM':
      return 'MM';
    case 'dtSS':
      return 'ss';
    case 'dtMISS':
      return 'mm:ss';
  }
};
