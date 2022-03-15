import { flat } from 'fxjs/Strict';

const ruleset = [
  { id: 'str', type: '문자열', label: '문자열' },
  { id: 'amt', type: '금액', label: '금액' },
  { id: 'qtt', type: '수량', label: '수량' },
  { id: 'pec', type: '율', label: '율' },
  { id: 'wheYN', type: '여부', label: 'Y, N' },
  { id: 'wheSET', type: '여부', label: '여부값 지정' },
  {
    id: 'dtYYYYMMDDHH24MISS',
    type: '날짜',
    label: 'YYYY-MM-DD HH24:MI:SS',
    content: '연월일 시간분초',
  },
  {
    id: 'dtYYYYMMDDHH24MI',
    type: '날짜',
    label: 'YYYY-MM-DD HH24:MI',
    content: '연월일 시간분',
  },
  {
    id: 'dtYYYYMMDDHH24',
    type: '날짜',
    label: 'YYYY-MM-DD HH24',
    content: '연월일 시간',
  },
  {
    id: 'dtMMDDHH24MI',
    type: '날짜',
    label: 'MM-DD HH24:MI',
    content: '월일 시간분',
  },
  {
    id: 'dtHH24MISS',
    type: '날짜',
    label: 'HH24:MI:SS',
    content: '시간분초',
  },
  {
    id: 'dtYYYYMMDD',
    type: '날짜',
    label: 'YYYY-MM-DD',
    content: '연월일',
    errorDiscription:
      '날짜(YYYY-MM-DD) 데이터의 부정확한 입력<br />설명: 년도, 월, 일자간의 표준데이터형식은 하이픈(-)을 사용하여 표기',
    example: '표준형식:9999-99-99<br />예시: ①21.8.1 -> 2021-08-01 ②21/8/1 -> 2021-08-01',
  },
  { id: 'dtHH24MI', type: '날짜', label: 'HH24:MI', content: '시간분' },
  { id: 'dtYYYYMM', type: '날짜', label: 'YYYY-MM', content: '연월' },
  { id: 'dtMMDD', type: '날짜', label: 'MM-DD', content: '월일' },
  { id: 'dtHH24', type: '날짜', label: 'HH24', content: '시간' },
  { id: 'dtYYYY', type: '날짜', label: 'YYYY', content: '연도' },
  { id: 'dtDD', type: '날짜', label: 'DD', content: '일자' },
  { id: 'dtMI', type: '날짜', label: 'MI', content: '분' },
  { id: 'dtMM', type: '날짜', label: 'MM', content: '월' },
  { id: 'dtSS', type: '날짜', label: 'SS', content: '초' },
  { id: 'dtMISS', type: '날짜', label: 'MI:SS', content: '분초' },
  { id: 'numPhone', type: '번호', label: '전화번호' },
  { id: 'numPostalCode', type: '번호', label: '우편번호' },
  { id: 'numBusiness', type: '번호', label: '사업자번호' },
  { id: 'numPattern', type: '번호', label: '패턴지정번호' },
  { id: 'conTime', type: '일관성', label: '시간순서 일관성' },
  {
    id: 'conLogicRelationShip',
    type: '일관성',
    label: '컬럼 간 논리관계 일관성',
  },
  { id: 'calFormula', type: '계산식', label: '산식' },
  { id: 'calSum', type: '계산식', label: '합계' },
];

const diagtype = [
  { index: '1', id: 'str', type: '문자열', label: '문자열' },
  { index: '2', id: 'amt', type: '금액', label: '금액' },
  { index: '3', id: 'qtt', type: '수량', label: '수량' },
  { index: '4', id: 'pec', type: '율', label: '율' },
  [
    { index: '5-1', id: 'wheYN', type: '여부', label: 'Y, N' },
    { index: '5-2', id: 'wheSET', type: '여부', label: '여부값 지정' },
  ],
  [
    {
      index: '6-1',
      id: 'dtYYYYMMDDHH24MISS',
      type: '날짜',
      label: 'YYYY-MM-DD HH24:MI:SS',
      content: '연월일 시간분초',
    },
    {
      index: '6-2',
      id: 'dtYYYYMMDDHH24MI',
      type: '날짜',
      label: 'YYYY-MM-DD HH24:MI',
      content: '연월일 시간분',
    },
    {
      index: '6-3',
      id: 'dtYYYYMMDDHH24',
      type: '날짜',
      label: 'YYYY-MM-DD HH24',
      content: '연월일 시간',
    },
    {
      index: '6-4',
      id: 'dtMMDDHH24MI',
      type: '날짜',
      label: 'MM-DD HH24:MI',
      content: '월일 시간분',
    },
    {
      index: '6-5',
      id: 'dtHH24MISS',
      type: '날짜',
      label: 'HH24:MI:SS',
      content: '시간분초',
    },
    {
      index: '6-6',
      id: 'dtYYYYMMDD',
      type: '날짜',
      label: 'YYYY-MM-DD',
      content: '연월일',
      errorDiscription:
        '날짜(YYYY-MM-DD) 데이터의 부정확한 입력<br />설명: 년도, 월, 일자간의 표준데이터형식은 하이픈(-)을 사용하여 표기',
      example: '표준형식:9999-99-99<br />예시: ①21.8.1 -> 2021-08-01 ②21/8/1 -> 2021-08-01',
    },
    {
      index: '6-7',
      id: 'dtHH24MI',
      type: '날짜',
      label: 'HH24:MI',
      content: '시간분',
    },
    {
      index: '6-8',
      id: 'dtYYYYMM',
      type: '날짜',
      label: 'YYYY-MM',
      content: '연월',
    },
    {
      index: '6-9',
      id: 'dtMMDD',
      type: '날짜',
      label: 'MM-DD',
      content: '월일',
    },
    {
      index: '6-10',
      id: 'dtHH24',
      type: '날짜',
      label: 'HH24',
      content: '시간',
    },
    {
      index: '6-11',
      id: 'dtYYYY',
      type: '날짜',
      label: 'YYYY',
      content: '연도',
    },
    { index: '6-12', id: 'dtDD', type: '날짜', label: 'DD', content: '일자' },
    { index: '6-13', id: 'dtMI', type: '날짜', label: 'MI', content: '분' },
    { index: '6-14', id: 'dtMM', type: '날짜', label: 'MM', content: '월' },
    { index: '6-15', id: 'dtSS', type: '날짜', label: 'SS', content: '초' },
    {
      index: '6-16',
      id: 'dtMISS',
      type: '날짜',
      label: 'MI:SS',
      content: '분초',
    },
  ],
  [
    { index: '7-1', id: 'numPhone', type: '번호', label: '전화번호' },
    { index: '7-2', id: 'numPostalCode', type: '번호', label: '우편번호' },
    { index: '7-3', id: 'numBusiness', type: '번호', label: '사업자번호' },
    { index: '7-4', id: 'numPattern', type: '번호', label: '패턴지정번호' },
  ],
  [
    { index: '8-1', id: 'conTime', type: '일관성', label: '시간순서 일관성' },
    {
      index: '8-2',
      id: 'conLogicRelationShip',
      type: '일관성',
      label: '컬럼 간 논리관계 일관성',
    },
  ],
  [
    { index: '9-1', id: 'calFormula', type: '계산식', label: '산식' },
    { index: '9-2', id: 'calSum', type: '계산식', label: '합계' },
  ],
];

const flattedRuleset = flat(diagtype);
const dateDiagtypes = flattedRuleset.filter(({ type }) => type === '날짜');

export { diagtype, dateDiagtypes, flattedRuleset };
