import React from "react";

class CartOverlay extends React.Component {
  render(){
    return (
      <div>
        <h5>My Bag, items</h5>
        <div>
          <p>Total</p>
          <p>$100</p>
        </div>
        <button>VIEW BAG</button>
        <button>CHECK OUT</button>
      </div>
    )
  }
}

export default CartOverlay;
