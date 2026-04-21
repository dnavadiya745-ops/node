// save and make your data centrlize

import React, {  createContext, useState } from 'react'

export const dataContext = createContext();



const usercontenxt = ({children}) => {
  const [centerdata, setCenterData] = useState("")

  return (

    <dataContext.Provider value={{centerdata,setCenterData}}>
      <div>{children}</div>
    </dataContext.Provider>

  )
}

export default usercontenxt;