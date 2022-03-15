import { parse } from 'papaparse';
import languageEncoding from 'detect-file-encoding-and-language';
import { FILE_ENCODINGS, MAX_FILE_SIZE } from '@/constants/file';

async function parseCSV(csvFile) {
  const [isEncodingValid, encoding] = await encodingCheck(csvFile);
  if (!sizeCheck(csvFile))
    return Promise.reject(
      `파일이 너무 큽니다.\n${Math.floor(
        MAX_FILE_SIZE / 1024 ** 2,
      )}MB 이하 파일을 업로드 해주세요.`,
    );
  if (!isEncodingValid)
    return Promise.reject(
      `파일 인코딩이 유효하지 않습니다. 현재 인코딩 [${
        encoding ?? '확인불가'
      }] \n허용 파일 인코딩 [${FILE_ENCODINGS.join(', ')}]`,
    );

  return new Promise(function (resolve, reject) {
    parse(csvFile, {
      // header: true,
      complete: ({ data, meta: { fields } }) => {
        return resolve({ data, fields });
      },
      error: function (error) {
        return reject(error);
      },
    });
  });
}

/**
 * 파일 인코딩 확인
 */
async function encodingCheck(file) {
  const { encoding } = await languageEncoding(file);
  return [FILE_ENCODINGS.reduce((acc, enc) => acc || enc === encoding, false), encoding];
}

/**
 * 파일 용량 확인
 */
function sizeCheck(file) {
  return MAX_FILE_SIZE >= file.size;
}

export { parseCSV };
