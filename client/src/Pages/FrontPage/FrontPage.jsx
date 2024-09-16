import React from 'react'
import { MainSlideShow } from '../../Components/MainSlideShow/MainSlideShow'
import { FrontCards } from '../../Components/FrontCards/FrontCards'
import { FrontComments } from '../../Components/FrontComments/FrontComments'
import { GetEmplyoees } from '../../Components/Employees/GetEmplyoees'

export const FrontPage = () => {
  return (
    <>
    <MainSlideShow />
    <FrontCards />
    <FrontComments />
    <GetEmplyoees />
    </>
  )
}
