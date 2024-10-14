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
                <h1 className='text-center'>Kiosk</h1>
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-2">
                    {datas.map((data, index) => (
                        <div className="col" key={index}>
                            <div onClick={() => window.location.href = `/kiosk/${data.coding}`} id='kiosk-card' className="card bg-success text-white d-flex justify-content-center align-items-center p-3 p-md-5">
                                <h1>{data.process_type}</h1>
                                <a className='text-white'>CLICK ME FOR DETAILS</a>
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