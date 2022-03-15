import { INIT } from '@/constants/progress.js';
import Component from '@/core/Component.js';
import './style.css';

export default class Discription extends Component {
  initState() {
    return {
      progress: INIT,
    };
  }

  template() {
    const { progress } = this.state;

    return progress === INIT
      ? `
      <article class="card">
        <div class="card-body">
          <strong>[사용법 안내]</strong>
          <p>1. [파일선택] 버튼을 클릭해 CSV파일을 선택하고, 컬럼 헤더 시작행을 입력 후 [시작] 버튼을 클릭합니다.(진단이 처리된 경우는 진단결과 데이터가 조회됩니다.)</p>
          <p>2. 컬럼 헤더 아래의 콤보박스에서 해당되는 데이터 타입인 품질진단기준을 선택합니다.</p>
          <p>&nbsp&nbsp > 개방 표준 데이터셋인 경우는 [개방표준] 버튼을 클릭하면 자동으로 진단규칙을 추천합니다. </p>
          <p>&nbsp&nbsp > 일반 개방 데이터셋인 경우는 [규칙추천] 버튼을 클릭하면 데이터 패턴유형에 진단규칙을 추천(진단규칙 확인 후 최종설정 필요)합니다. </p>
          <p>3. [진단] 버튼을 클릭하여 진단을 실시하고, [보고서] 버튼을 클릭하여 보고서를 생성합니다.(변경된 데이터의 재진단은 초기화 후 진단처리) </p>
        </div>
      </article>
    `
      : '';
  }
}
