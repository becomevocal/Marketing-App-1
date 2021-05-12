import React, { useState } from 'react'
import ConfigurePage from "./components/pages/configurePage";

export default function Main() {
  const [storeInfo, setStoreInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProfitName, setCurrentProfitName] = useState('');

  return (
    <ConfigurePage
      setCurrentPage={setCurrentPage}
      currentProfitName={currentProfitName}
      storeInfo={storeInfo}
    />
  )
}
