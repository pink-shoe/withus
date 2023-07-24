import React, { Fragment, useState } from 'react';
import Modal from '../components/common/Modal';
import SelectMood from '../components/common/SelectMood';
import SelectRound from '../components/common/SelectRound';
import TextCopy from '../components/common/TextCopy';
import RoomSetting from '../components/common/RoomSetting';

export default function About() {

  return (
    <Fragment>
      <TextCopy></TextCopy>
      <RoomSetting></RoomSetting>
    </Fragment>
  );
}
