import React from 'react'

const NotificacionesComponent = ({setNotificacion,notificacion}) => {
  return (
    <div className={`w-full bg-${notificacion?.tipo=='warning'?'yellow':(notificacion?.tipo=='info'?'blue':'red')}-100 border-t-4 border-${notificacion?.tipo=='warning'?'yellow':(notificacion?.tipo=='info'?'blue':'red')}-600 text-${notificacion?.tipo=='warning'?'yellow':(notificacion?.tipo=='info'?'blue':'red')}-600 px-6 py-4 flex items-center justify-between shadow-md`}>
                            <div className="flex items-center space-x-3">
                                <svg className={`w-6 h-6 text-${notificacion?.tipo=='warning'?'yellow':(notificacion?.tipo=='info'?'blue':'red')}-600"`} fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M12 6.5c-4.14 0-7.5 3.36-7.5 7.5S7.86 21.5 12 21.5s7.5-3.36 7.5-7.5S16.14 6.5 12 6.5z" />
                                </svg>
                                <div>
                                <p className="font-semibold">{notificacion?.titulo}</p>
                                <p className="text-sm">{notificacion?.mensaje}</p>
                                </div>
                            </div>

                            <button className={`text-${notificacion?.tipo=='warning'?'yellow':(notificacion?.tipo=='info'?'blue':'red')}-500 hover:text-${notificacion?.tipo=='warning'?'yellow':(notificacion?.tipo=='info'?'blue':'red')}-900`} onClick={() => setNotificacion(null)}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            </div>
  )
}

export default NotificacionesComponent
