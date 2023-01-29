import React from 'react'
import './loadingIndicator.styles.scss';

function LoadingIndicator({ showLoader,color }) {
  return (

    <div id='loading' style={{
      color:color?color:'#fff',
       visibility: showLoader ? 'visible' : 'hidden',
        animation: showLoader ? ' anim 1.5s infinite  ease-in-out' : 'none' }}>

    </div>
  )
}

export default LoadingIndicator