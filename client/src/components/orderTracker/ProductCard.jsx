import React from 'react'

const ProductCard = ({prod, color, quantity}) => {
  return (
    <div className="col-12 col-xl-6 p-1">
        <div className="products d-flex flex-wrap bg-white shadow-sm p-3 rounded-3 gap-1 gap-sm-2">
            <div className='w-fit-content d-flex p-2 p-md-3 bg-secondary rounded-3'>
            <img src={prod.images[0].secure_url} alt="" className='w-100 h-100 object-cover' />
            </div>
            <div className='col-6 col-md-5 d-flex flex-column gap-2 py-2 ms-auto'>
                <span className="prod-title card-title">
                    {prod.title}
                </span>
                <p className='prod-description card-text fs-7 m-0'>
                    {prod.description}
                </p>
                <div className="d-flex align-items-center gap-3">
                    <div className='d-flex'>
                        اللون : 
                        <span 
                            className="colors p-3 me-2 rounded-circle shadow-sm border border-1" 
                            style={{"background": `${color}`}}>
                        </span>
                    </div>
                </div>
            </div>
            <div className='w-fit-content d-flex flex-column gap-2 py-2 px-md-3'>
                <span className="prod-price px-3 py-2 bg-primary text-white rounded-3">
                    <span className=''>{(prod.price * quantity)}</span> جنيه
                </span>
                <span className="prod-quantity">
                الكمية :  <span className='text-muted me-1 fs-7'>{quantity}</span>
                </span>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
