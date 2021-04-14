import React, {useState, useEffect} from 'react'

import {ApiService} from '../services/apiServices';

import Loader from "./components/common/Loader";
import HomePage from "./components/pages/homePage";
import HomePagePurchased from "./components/pages/homePagePurchased";
import ConfigurePage from "./newComponents/pages/configurePage";

export default function Main(props) {
  const { currentStore } = props
  const [storeInfo, setStoreInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProfitName, setCurrentProfitName] = useState('');

  useEffect(() =>{
    document.body.style.backgroundColor = 'white'//'#f6f7f9'
    document.body.style.fontFamily = 'Source Sans Pro,Helvetica Neue,arial,sans-serif'
  })

  return (
    <ConfigurePage
      setCurrentPage={setCurrentPage}
      currentProfitName={currentProfitName}
      storeInfo={storeInfo}
      currentStore={currentStore}
    />
  )
}
