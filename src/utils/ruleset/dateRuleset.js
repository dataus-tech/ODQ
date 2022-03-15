import { isMatch, format, parse, parseISO } from 'date-fns';
import { getDateRulesetFormat } from '@/constants/ruleset';

export const dateRuleset = {
  valid: (cell, { id }) => {
    if (typeof cell !== 'string') return false;
    return (
      cell === '' ||
      (isMatch(cell, getDateRulesetFormat(id)) && cell.length === getDateRulesetFormat(id).length)
    );
  },
  repair: (cell, { id }) => {
    let value = cell;
    try {
      switch (id) {
        case 'dtYYYYMMDDHH24MISS':
          value = value
            .replaceAll('/', '-')
            .replaceAll('.', '-')
            .replaceAll("'", '20')
            .replace(/(년도|년|월)/g, '-')
            .replace(/일/, ' ')
            .replace(/(시|분)/, ':')
            .replace(/초/, '');
          if (value.length === 14)
            value = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)} ${value.slice(
              8,
              10,
            )}:${value.slice(10, 12)}:${value.slice(12, 14)}`;
          {
            let [y, m, d, h, mi, s] = value.split(/[-\s:]/g);
            value =
              [y, m.padStart(2, '0'), d.padStart(2, '0')].join('-') +
              ' ' +
              [h.padStart(2, '0'), mi.padStart(2, '0'), s.padStart(2, '0')].join(':');
          }
          break;
        case 'dtYYYYMMDDHH24MI':
          value = value
            .replaceAll('/', '-')
            .replaceAll('.', '-')
            .replaceAll("'", '20')
            .replace(/(년도|년|월)/g, '-')
            .replace(/시/, ':')
            .replace(/일/, ' ')
            .replace(/분/, '');
          {
            let [y, m, d, h, mi] = value.split(/[-\s:]/g);
            value =
              [y, m.padStart(2, '0'), d.padStart(2, '0')].join('-') +
              ' ' +
              [
                h.padStart(2, '0').slice(0, 2),
                !!mi ? mi.padStart(2, '0') : h.slice(h.length - 1).padStart(2, '0'),
              ].join(':');
          }
          break;
        case 'dtYYYYMMDDHH24':
          value = value
            .replaceAll('/', '-')
            .replaceAll('.', '-')
            .replaceAll("'", '20')
            .replace(/(년도|년|월)/g, '-')
            .replace(/(일|시)/g, '');
          {
            const [y, m, d] = value.split('-');
            if (d > 2)
              value =
                [y, m.padStart(2, '0'), d.slice(0, 2)].join('-') +
                ' ' +
                d.slice(2).padStart(2, '0');
          }
          break;
        case 'dtMMDDHH24MI':
          value = value
            .replaceAll('/', '-')
            .replaceAll('.', '-')
            .replaceAll("'", '20')
            .replace('월', '-')
            .replace(/(시|시간)/, ':')
            .replace(/(일|분)/g, '');
          break;
        case 'dtHH24MISS':
          value = value
            .replace(/(시간|시|분)/g, ':')
            .replace(/초/, '')
            .replace(/[;//.-]/g, ':')
            .replace(/[^0-9:]/g, ':');
          break;
        case 'dtYYYYMMDD':
          value = value
            .replaceAll('/', '-')
            .replaceAll('.', '-')
            .replaceAll("'", '20')
            .replace(/(년도|년|월)/g, '-')
            .replace('일', '');
          {
            if (value.length === 8) {
              value = `${value.slice(0, 4)}-${value.slice(5, 6)}-${value.slice(7, 8)}`;
            }
            const [y, m, d] = value.split('-');
            if (m.length === 1 || d.length === 1)
              value = [y, m.padStart(2, '0'), d.padStart(2, '0')].join('-');
          }
          break;
        case 'dtHH24MI':
          value = value
            .replace(/(시간|시)/, ':')
            .replace(/분/, '')
            .replace(/[;//.-]/g, ':')
            .replace(/[^0-9:]/g, '');
          break;
        case 'dtYYYYMM':
          value = value
            .replaceAll(' ', '')
            .replaceAll('/', '-')
            .replaceAll('.', '-')
            .replaceAll("'", '20')
            .replace(/(년도|년)/g, '-')
            .replace('월', '');
          {
            let [y, m] = value.split('-');
            if (y.length < m.length) [y, m] = [m, y];
            value = [y, m.padStart(2, '0')].join('-');
          }
          break;
        case 'dtMMDD':
          value = value.replace(/[/.월]/g, '-').replace(/[^0-9-]/g, '');
          break;
        case 'dtHH24':
        case 'dtYYYY':
        case 'dtDD':
        case 'dtMI':
        case 'dtMM':
        case 'dtSS':
          value = value
            .replace("'", '20')
            .replace(/[^0-9]/g, '')
            .padStart(2, '0');
          break;
        case 'dtMISS':
          value = value
            .replace('분', ':')
            .replace('초', '')
            .replace(/[^0-9:]/g, '');
          break;
      }
      return format(parse(value, getDateRulesetFormat(id), new Date()), getDateRulesetFormat(id));
    } catch (error) {
      return cell;
    }
  },
};
