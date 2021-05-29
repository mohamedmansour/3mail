import { useOrbitDb } from 'contexts/OrbitDB'
import React, { useEffect } from 'react'

const OrbitDbTest = () => {
  const { odb, db } = useOrbitDb();

  useEffect(() => {
    if (!db) return;

    const all = db.iterator({limit: 10}).collect().map((e: any)  => e.payload.value);
    console.log(all)

  },[db])
  return(<div>
    loading odb db.
  </div>)
}

export default OrbitDbTest;