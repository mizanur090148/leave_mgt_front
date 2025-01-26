import { P } from '../../../../AbstractElements'
import {  blockquote } from '../../../../Data/Ui-Kits/Typography/Typography'

const DynamicBlockquotes = () => {
  return (
    <>
      {blockquote.map(({ text, name, className, color }, index) => (
        <div className={`figure text-${className} d-block dark-blockquote bg-light-${color}`} key={index}>
        <blockquote className={`blockquote light-card mb-2 bg-light-${color}`}>
          <P className={`mb-0 txt-${color}`}>{text}</P>
          <footer className="blockquote-footer pt-3">{name}</footer>
        </blockquote>
      </div>
      ))}
    </>
  )
}

export default DynamicBlockquotes