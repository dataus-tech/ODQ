/**
 * 작성자: 이연권
 * 생성일: 2021.12.21
 * 수정일: 2021.12.21
 * 설명: 진행 상황에 따른 상태값 표기
 */

/**
 * UI [INIT]
 * SelectFile: ON
 * StartRow: OFF set 0
 * ControlBox: 초기화 ON, 설정 ON
 * DataCount: set 0
 * DataGrid: display null
 * ResultGrid: display none
 * RepairGrid : display none
 */
const INIT = 'init'; // 초기화
/**
 * UI [LOAD]
 * SelectFile: OFF
 * StartRow: ON
 * ControlBox: 초기화 ON, 설정 ON
 * DataCount: COUNT
 * DataGrid: SHOW (기본헤더)
 * ResultGrid: display none
 * RepairGrid : display none
 */
const LOAD = 'load'; // 파일로드
/**
 * UI [READY]
 * SelectFile: OFF
 * StartRow: OFF
 * ControlBox: 진단 ON, 초기화 ON, 설정 ON
 * DataCount: COUNT
 * DataGrid: SHOW (옵션헤더)
 * ResultGrid: display none
 * RepairGrid : display none
 */
const READY = 'ready'; // 진단 대기
/**
 * UI [DIAG]
 * SelectFile: OFF
 * StartRow: OFF
 * ControlBox: 진단 OFF, 정비 ON, 보고서 ON, 초기화 ON, 설정 ON
 * DataCount: COUNT
 * DataGrid: SHOW (옵션헤더)
 * ResultGrid: SHOW
 * RepairGrid : display none
 */
const DIAG = 'diag'; // 진단
/**
 * UI [REPAIR]
 * SelectFile: OFF
 * StartRow: OFF
 * ControlBox: 진단 OFF, 정비 OFF, 보고서 ON, 초기화 ON, 설정 ON
 * DataCount: COUNT
 * DataGrid: SHOW (옵션헤더)
 * ResultGrid: display none
 * RepairGrid : SHOW (기본헤더)
 */
const REPAIR = 'repair'; // 정비

const progressKR = {
  init: '초기화',
  load: '로드',
  ready: '준비',
  diag: '진단',
  repair: '정비',
};

export { INIT, LOAD, READY, DIAG, REPAIR, progressKR };
