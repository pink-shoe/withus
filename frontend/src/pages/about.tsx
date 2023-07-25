// 모달창 보여주기 화면(대기실 설정, 게임 결과)

import React, { Fragment } from 'react';
import InviteSettingModal from '../components/common/InviteSettingModal';
import ResultModal from '../components/common/ResultModal';

export default function About() {
  return (
    <Fragment>
      <InviteSettingModal></InviteSettingModal>
      <div>
        하하하
      </div>
      <ResultModal></ResultModal>
    </Fragment>
  );
}
