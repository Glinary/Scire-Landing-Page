import React from "react";

// For the Featured Products Section
function FeaturedProducts() {
    console.log("Featured products rendered");

    return (
        <div className="border-2 border-emerald-900 m-10 rounded-lg">
            <h1 className="text-center text-2xl font-bold py-10">Featured Products</h1>

            <div className="px-14 mb-14"> {/* Product 1 */}
                <div className="border border-emerald-900 rounded-md mb-12 px-12 py-4">
                    <div></div>
                    <div></div>
                    <p className="text-2xl font-bold pb-1">Magayon</p>
                    <p className="text-md pb-12">Elemi Glow Bar Soap</p>
                    <p className="text-md">Ingredients: Palm Oil, Coconut Oil, Olive Oil, Lye, Aloe Vera, Elemi Oil, Elemi Resinoid, Water</p>
                </div>
                
                <div className="border border-emerald-900 rounded-md px-12 py-4"> {/* Product 2 */}
                    <div></div>
                    <div></div>
                    <p className="text-2xl font-bold pb-1">Handyong</p>
                    <p className="text-md pb-12">Elemi Fresh Bar Soap</p>
                    <p className="text-md">Ingredients: Palm Oil, Coconut Oil, Olive Oil, Lye, Aloe Vera, Elemi Oil, Tea Tree Oil, Peppermint Oil, Elemi Resinoid, Water</p>
                </div>
            </div>
        </div>
    );
}

export default FeaturedProducts;