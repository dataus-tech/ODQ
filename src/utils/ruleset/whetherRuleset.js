export const whetherRuleset = {
  valid: (cell, { trueValue = 'Y', falseValue = 'N' }) =>
    RegExp(`^[${trueValue}${falseValue}]$`).test(cell),
  repair: (cell, { trueValue = 'Y', falseValue = 'N' }) => {
    cell += '';
    switch (cell.toLowerCase()) {
      case 'o':
      case 'true':
      case '1':
      case '예':
      case 'y':
      case '적용':
      case '운영':
      case '사용가능':
      case '가능':
        return trueValue;
      case 'x':
      case 'false':
      case '0':
      case 'null':
      case '아니오':
      case '아니요':
      case '미운영':
      case '미적용':
      case '사용불가':
      case '불가':
      case 'n':
        return falseValue;
      default:
        return cell;
    }
  },
};
