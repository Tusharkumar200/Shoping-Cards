

import { Route, Routes } from 'react-router-dom'
import CartListPage from './pages/cardList'
import ProductDetailsPage from './pages/productDetails'
import ProductListPage from './pages/productList'
import ShoppingCartProvider from './context'

function App() {
 
  return (
    <>
      <div>

        <Routes>
          <Route path='/products' element={<ProductListPage />} />
          <Route path='/cart' element={<CartListPage></CartListPage>} />
          <Route path='/product-details/:id' element={<ProductDetailsPage  />} />
          <Route path='/shoping-cart' element={<ShoppingCartProvider />} />
        </Routes>
        
        
        
        

      </div>
        
    </>
  )
}

export default App
