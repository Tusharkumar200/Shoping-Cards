import { useContext } from "react"
import  { shoppingCartContext } from "../../context"


export default function CartTile({ singleCartItems }){

        const {handleRemoveFromCart , handleAddToCart} = useContext(shoppingCartContext)

    return(
        <>
            <div className=" grid grid-cols-3 items-start gap-5">
                <div className="col-span-2 flex items-start gap-4">
                    <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
                        <img src={singleCartItems?.thumbnail}
                        className="w-full h-full object-contain" 
                        />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-gray-900">{singleCartItems?.title}</h3>
                        <button onClick={()=> handleRemoveFromCart(singleCartItems , true)} className="text-sm px-4 py-3 bg-black text-white font-extrabold">REMOVE</button>
                    </div>
                </div>
                <div className="ml-auto">
                    <h3 className="text-lg font-bold text-gray-900">${(singleCartItems?.totalPrice).toFixed(2)}</h3>
                    <p className="mt-2 mb-3 font-bold text-[16px]"> 
                        Quantity: {singleCartItems.quantity}</p>
                    <div className="mt-3 flex gap-2">
                        <button 
                        onClick={()=> handleRemoveFromCart(singleCartItems , false)} 
                        disabled ={singleCartItems?.quantity === 1}
                        className="disabled:opacity-50 border border-[#000] bg-transparent">-</button>

                        <button 
                        onClick={()=> handleAddToCart(singleCartItems)}
                        className="border border-[#000] bg-transparent">+</button>
                    </div>
                </div>
            </div>
            <hr className="border-gray-900"/>
        </>
    )
}