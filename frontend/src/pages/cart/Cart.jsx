import React from "react";
import Layout from "../../components/layout/Layout";
function Cart() {
  return (
    <div>
      <Layout>
        <div className="max-w-screen-xl flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0 mx-auto my-4 px-4">
          {/* <div className="flex flex-col gap-8 lg:w-[65%]">
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onDelete={() => deleteCart(item)}
                onUpdateQuantity={(newQuantity) =>
                  updateQuantity(item, newQuantity)
                }
              />
            ))}
          </div> */}

          {/* <CartTotal
            totalAmount={totalAmount}
            shipping={shipping}
            grandTotal={grandTotal}
          /> */}
        </div>
      </Layout>
    </div>
  );
}

export default Cart;
