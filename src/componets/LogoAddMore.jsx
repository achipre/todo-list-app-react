import './logoAddMore.css'
export default function LogoAddMore ({ openModal }) {
  return (
    <div className="iconAdd">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div onClick={openModal} className="circle circle3">
        <div className="plus"></div>
      </div>
    </div>
  )
}
