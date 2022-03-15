import Modal from '../../common/Modal';
import { $action } from '@/utils/selector';
import { fetchSettings, updateSettings } from '@/utils/localStorage';
import './style.css';

export default class SettingModal extends Modal {
  setEvents() {
    // 적용
    // validation Check 및 컬럼 적용
    $action.call(this, 'submit-setting', 'click', () => {
      updateSettings({
        setCollWidth: $('#set-coll-width').val(),
        oneGrid: $('#one-grid').is(':checked'),
      });
      alert('설정 내용이 저장되었습니다.\n초기화 버튼을 눌러 다시 시작해주세요!');
      this.hide();
    });

    $action.call(this, 'cancel', 'click', () => {
      this.hide();
    });
  }

  show($select, grid) {
    this.setState({ $select, dataGrid: grid });
    super.show();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    const { pattern } = this.state;

    this.$target.find('.emphasis').text(pattern);
  }

  setHeader() {
    return '설정';
  }

  setBody() {
    const { setCollWidth = '', oneGrid = false } = fetchSettings();

    return `
      <div class="container">
        <div class="form-group row">
          <label class="col-sm-3 col-form-label" title="열 너비를 지정할 수 있습니다. 아무값도 입력하지 않을 경우 너비에 맞춰집니다. ex) 100">열 너비 지정</label>
          <div class="col-sm-3">
            <input id="set-coll-width" type="text" class="form-control" value="${setCollWidth}">
          </div>
        </div>
        <div class="custom-control custom-switch">
          <label class="col-sm-3 custom-control-label" for="one-grid" title="정비 단계에서 원본 그리드의 표시여부를 선택할 수 있습니다.">정비 그리드 한 개 사용</label>
          <input type="checkbox" class="custom-control-input" id="one-grid" ${
            oneGrid ? 'checked' : ''
          }>
        </div>
      </div>
    `;
  }

  setFooter() {
    return `
      <button type="button" class="btn btn-secondary" data-action="cancel">취소</button>
      <button type="button" class="btn btn-primary" data-action="submit-setting">저장</button>
    `;
  }
}
