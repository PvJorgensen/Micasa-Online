import React from 'react'
import { MainSlideShow } from '../../Components/MainSlideShow/MainSlideShow'
import { FrontCards } from '../../Components/FrontCards/FrontCards'
import { FrontComments } from '../../Components/FrontComments/FrontComments'

export const FrontPage = () => {
  return (
    <>
    <MainSlideShow />
    <FrontCards />
    <FrontComments />
    </>
  )
}
