import {
  isEssential,
  chargeRuleset,
  countRuleset,
  percentRuleset,
  whetherRuleset,
  dateRuleset,
  numberRuleset,
  consistencyRuleset,
  calculationRuleset,
} from '../utils/ruleset';

export function errorFormatter(line, cell, value, columnDef, row) {
  const rtn = { text: value };
  const { essential, ruleset, id } = columnDef;
  let isError = false;
  // 빈 값이면 에러 없음 (null)
  if (!value) return rtn;

  // id 제외
  if (id === 'id') return rtn;

  // 필수값 진단
  if (essential && !isEssential(value)) {
    rtn.addClasses = 'error-cell';
    return rtn;
  }

  const { name } = ruleset;

  // 진단 룰 셋 적용
  if (
    (name === '금액' && !chargeRuleset.valid(value)) ||
    (name === '수량' && !countRuleset.valid(value)) ||
    (name === '율' && !percentRuleset.valid(value)) ||
    (name === '여부' && !whetherRuleset.valid(value, ruleset)) ||
    (name === '날짜' && !dateRuleset.valid(value, ruleset)) ||
    (name === '번호' && !numberRuleset.valid(value, ruleset)) ||
    (name === '일관성' && !consistencyRuleset.valid(value, ruleset, row)) ||
    (name === '계산식' && !calculationRuleset.valid(value, ruleset, row))
  )
    isError = true;

  return isError ? Object.assign(rtn, { addClasses: 'error-cell' }) : rtn;
}
