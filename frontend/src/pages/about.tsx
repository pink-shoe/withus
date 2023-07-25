// 모달창 보여주기 화면(대기실 설정, 게임 결과)

import React, { Fragment } from 'react';
import WaitingModal from '../components/common/WaitingModal';
import ResultModal from '../components/common/ResultModal';

export default function About() {
  return (
    <Fragment>
      <WaitingModal></WaitingModal>
      <div>
        하하하
      </div>
      <ResultModal></ResultModal>
    </Fragment>
  );
}
