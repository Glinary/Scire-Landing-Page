import React from "react";
import oryol_1 from "./images/DSCF3379.jpg"
import oryol_2 from "./images/DSCF3335.jpg"
import magayon_1 from "./images/DSCF3390.jpg"
import magayon_2 from "./images/DSCF3357.jpg"
import handyong_1 from "./images/DSCF3438.jpg"
import handyong_2 from "./images/DSCF3358.jpg"

// For the Featured Products Section
function FeaturedProducts() {
    console.log("Featured products rendered");

    return (
        <div className="border-2 border-emerald-900 m-10 rounded-lg">
            <h1 className="text-center text-2xl font-bold py-10">Featured Products</h1>

            <div className="px-14 mb-14">
                <div className="flex border border-emerald-900 rounded-md mb-8 h-full px-10 py-8 space-x-8"> {/* Product 1 */}
                    <img src={oryol_1} alt="oryol-1" className="basis-1/4 object-cover h-contain overflow-hidden p-8 border border-[#aaaaaa]"></img>
                    <img src={oryol_2} alt="oryol-2" className="basis-1/4 object-cover h-contain overflow-hidden p-8 border border-[#aaaaaa]"></img>
                    <div className="basis-1/2 h-full py-4 align-middle">
                        <p className="text-2xl font-bold pb-1">Oryol</p>
                        <p className="text-lg">Elemi Rejuvenating Bar Soap</p>
                        <p className="text-md pb-12">Exfoliating, Firming, Lifting, Anti-acne, Hydrating</p>
                        <p className="text-sm">Ingredients: Aqua, Palm Oil, Coconut Oil, Olive Oil, Lye, Aloe Vera, Elemi Oil, Salicylic Acid, Elemi Resinoid</p>
                    </div>
                </div>
                
                <div className="flex border border-emerald-900 rounded-md mb-8 h-full px-10 py-8 space-x-8"> {/* Product 2 */}
                    <img src={magayon_1} alt="magayon-1" className="basis-1/4 object-cover overflow-hidden p-8 border border-[#aaaaaa]"></img>
                    <img src={magayon_2} alt="magayon-2" className="basis-1/4 object-cover overflow-hidden p-8 border border-[#aaaaaa]"></img>
                    <div className="basis-1/2 h-full py-4 align-middle">
                        <p className="text-2xl font-bold pb-1">Magayon</p>
                        <p className="text-lg">Elemi Glow Bar Soap</p>
                        <p className="text-md pb-12">Firming, Lifting, Detoxifying, Mild Exfoliating, Hydrating</p>
                        <p className="text-sm">Ingredients: Palm Oil, Coconut Oil, Olive Oil, Lye, Aloe Vera, Elemi Oil, Elemi Resinoid, Water</p>
                    </div>
                </div>
                
                <div className="flex border border-emerald-900 rounded-md h-full px-10 py-8 space-x-8"> {/* Product 3 */}
                    <img src={handyong_1} alt="handyong-1" className="basis-1/4 object-cover overflow-hidden p-8 border border-[#aaaaaa]"></img>
                    <img src={handyong_2} alt="handyong-2" className="basis-1/4 object-cover overflow-hidden p-8 border border-[#aaaaaa]"></img>
                    <div className="basis-1/2 h-ful py-4 align-middle">
                        <p className="text-2xl font-bold pb-1">Handyong</p>
                        <p className="text-lg">Elemi Fresh Bar Soap</p>
                        <p className="text-md pb-12">Firming, Lifting, Refreshing, Anti-bacterial, Hydrating</p>
                        <p className="text-sm">Ingredients: Palm Oil, Coconut Oil, Olive Oil, Lye, Aloe Vera, Elemi Oil, Tea Tree Oil, Peppermint Oil, Elemi Resinoid, Water</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedProducts;