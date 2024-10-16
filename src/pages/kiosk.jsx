import React, { useEffect, useState } from 'react'
import kioskAxios from '../assets/js/kioskAxios'

const kiosk = () => {

    useEffect(() => { document.title = 'Kiosk' }, [])
    const [datas, setDatas] = useState([]);
    kioskAxios(setDatas);

    return (
        <div className='container-fluid p-3'>
            {datas.length > 0 ? (
                <>
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                    {datas.map((data, index) => (
                        <div className="col" key={index}>
                            <div onClick={() => window.location.href = `/kiosk/${data.coding}`} id='kiosk-card' className="card bg-success text-white d-flex justify-content-center align-items-center p-3 p-md-5">
                                <h3 className='text-nowrap'>{data.process_type.toUpperCase()}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                </>
            ) : (
                <div className="alert alert-danger text-center">No Data</div>
            )}
        </div>
    )
}

export default kiosk