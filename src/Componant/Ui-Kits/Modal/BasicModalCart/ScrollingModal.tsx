import { ScrollingContent } from '../../../../utils/Constant'
import { useState } from 'react';
import CommonModal from '../Common/CommonModal';
import WedDesigners from './WedDesigners';
import UXDesigner from './UXDesigner';
import { Btn } from '../../../../AbstractElements';

const ScrollingModal = () => {
  const [scrollingModal, setScrollingModal] = useState(false);
  const scrollModalToggle = () => setScrollingModal(!scrollingModal);
  return (
    <>
      <Btn color="success" onClick={scrollModalToggle}>{ScrollingContent}</Btn>
      <CommonModal isOpen={scrollingModal} toggle={scrollModalToggle} title="Scrolling Modal">
        <WedDesigners />
        <UXDesigner />
      </CommonModal>
    </>
  )
}

export default ScrollingModal