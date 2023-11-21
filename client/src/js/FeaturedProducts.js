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
        <div className="border-2 border-emerald-900 mt-5 max-[700px]:mx-8 max-[1000px]:mx-14 min-[1000px]:mx-16 rounded-lg">
            <h1 className="text-center text-2xl font-bold max-[1000px]:py-10 min-[1000px]:py-12">Featured Products</h1>

            <div className="max-[1000px]:px-6 max-[1000px]:mb-8 min-[1000px]:px-8 min-[1000px]:mb-8">
                <div className="min-[1000px]:flex border border-emerald-900 rounded-md max-[700px]:px-4 max-[700px]:py-4 max-[1000px]:px-6 max-[1000px]:py-8 min-[1000px]:px-6 min-[1000px]:py-8 min-[1000px]:space-x-6 mb-6"> {/* Product 1 */}
                    <div className="max-[1000px]:flex min-[1000px]:flex max-[1000px]:space-x-4 min-[1000px]:space-x-4 min-[1000px]:basis-1/2 min-[1000px]:space-y-0">
                        <img src={oryol_1} alt="oryol-1" className="max-[1000px]:basis-1/2 min-[1000px]:basis-1/2 object-cover overflow-hidden max-[700px]:p-2 max-[1000px]:p-4 min-[1000px]:p-4 min-[1400px]:p-6 min-[1000px]:h-contain border border-[#aaaaaa]"></img>
                        <img src={oryol_2} alt="oryol-2" className="max-[1000px]:basis-1/2 min-[1000px]:basis-1/2 object-cover overflow-hidden max-[700px]:p-2 max-[1000px]:p-4 min-[1000px]:p-4 min-[1400px]:p-6 min-[1000px]:h-contain border border-[#aaaaaa]"></img>
                    </div>
                    <div className="max-[1000px]:pt-3 max-[1000px]:pt-4 min-[1000px]:basis-1/2">
                        <p className="max-[1000px]:text-xl min-[1000px]:text-2xl min-[1400px]:text-3xl font-bold pb-1">Oryol</p>
                        <p className="max-[1000px]:text-base min-[1000px]:text-lg min-[1400px]:text-xl">Elemi Rejuvenating Bar Soap</p>
                        <p className="max-[1000px]:text-sm max-[1000px]:pb-6 min-[1000px]:text-base min-[1000px]:pb-8 min-[1400px]:text-lg">Exfoliating, Firming, Lifting, Anti-acne, Hydrating</p>
                        <p className="max-[1000px]:text-xs min-[1000px]:text-sm min-[1400px]:text-base">Ingredients: Aqua, Palm Oil, Coconut Oil, Olive Oil, Lye, Aloe Vera, Elemi Oil, Salicylic Acid, Elemi Resinoid</p>
                    </div>
                </div>

                <div className="min-[1000px]:flex border border-emerald-900 rounded-md max-[700px]:px-4 max-[700px]:py-4 max-[1000px]:px-6 max-[1000px]:py-8 min-[1000px]:px-6 min-[1000px]:py-8 min-[1000px]:space-x-6 mb-6"> {/* Product 1 */}
                    <div className="max-[1000px]:flex min-[1000px]:flex max-[1000px]:space-x-4 min-[1000px]:space-x-4 min-[1000px]:basis-1/2 min-[1000px]:space-y-0">
                        <img src={magayon_1} alt="magayon-1" className="max-[1000px]:basis-1/2 min-[1000px]:basis-1/2 object-cover overflow-hidden max-[700px]:p-2 max-[1000px]:p-4 min-[1000px]:p-4 min-[1400px]:p-6 min-[1000px]:h-contain border border-[#aaaaaa]"></img>
                        <img src={magayon_2} alt="magayon-2" className="max-[1000px]:basis-1/2 min-[1000px]:basis-1/2 object-cover overflow-hidden max-[700px]:p-2 max-[1000px]:p-4 min-[1000px]:p-4 min-[1400px]:p-6 min-[1000px]:h-contain border border-[#aaaaaa]"></img>
                    </div>
                    <div className="max-[1000px]:pt-3 max-[1000px]:pt-4 min-[1000px]:basis-1/2">
                        <p className="max-[1000px]:text-xl min-[1000px]:text-2xl min-[1400px]:text-3xl font-bold pb-1">Magayon</p>
                        <p className="max-[1000px]:text-base min-[1000px]:text-lg min-[1400px]:text-xl">Elemi Glow Bar Soap</p>
                        <p className="max-[1000px]:text-sm max-[1000px]:pb-6 min-[1000px]:text-base min-[1000px]:pb-8 min-[1400px]:text-lg">Firming, Lifting, Detoxifying, Mild Exfoliating, Hydrating</p>
                        <p className="max-[1000px]:text-xs min-[1000px]:text-sm min-[1400px]:text-base">Ingredients: Aqua, Palm Oil, Coconut Oil, Olive Oil, Lye Aloe Vera, Elemi Oil, Elemi Resinoid</p>
                    </div>
                </div>

                <div className="min-[1000px]:flex border border-emerald-900 rounded-md max-[700px]:px-4 max-[700px]:py-4 max-[1000px]:px-6 max-[1000px]:py-8 min-[1000px]:px-6 min-[1000px]:py-8 min-[1000px]:space-x-6 mb-6"> {/* Product 1 */}
                    <div className="max-[1000px]:flex min-[1000px]:flex max-[1000px]:space-x-4 min-[1000px]:space-x-4 min-[1000px]:basis-1/2 min-[1000px]:space-y-0">
                        <img src={handyong_1} alt="handyong-1" className="max-[1000px]:basis-1/2 min-[1000px]:basis-1/2 object-cover overflow-hidden max-[700px]:p-2 max-[1000px]:p-4 min-[1000px]:p-4 min-[1400px]:p-6 min-[1000px]:h-contain border border-[#aaaaaa]"></img>
                        <img src={handyong_2} alt="handyong-2" className="max-[1000px]:basis-1/2 min-[1000px]:basis-1/2 object-cover overflow-hidden max-[700px]:p-2 max-[1000px]:p-4 min-[1000px]:p-4 min-[1400px]:p-6 min-[1000px]:h-contain border border-[#aaaaaa]"></img>
                    </div>
                    <div className="max-[1000px]:pt-3 max-[1000px]:pt-4 min-[1000px]:basis-1/2">
                        <p className="max-[1000px]:text-xl min-[1000px]:text-2xl min-[1400px]:text-3xl font-bold pb-1">Handyong</p>
                        <p className="max-[1000px]:text-base min-[1000px]:text-lg min-[1400px]:text-xl">Elemi Fresh Bar Soap</p>
                        <p className="max-[1000px]:text-sm max-[1000px]:pb-6 min-[1000px]:text-base min-[1000px]:pb-8 min-[1400px]:text-lg">Firming, Lifting, Refreshing, Anti-bacterial, Hydrating</p>
                        <p className="max-[1000px]:text-xs min-[1000px]:text-sm min-[1400px]:text-base">Ingredients: Aqua, Palm Oil, Coconut Oil, Olive Oil, Lye, Aloe Vera, Elemi Oil, Tea Tree Oil, Peppermint Oil, Elemi Resinoid</p>
                    </div>
                </div>

                
                
                
            </div>
        </div>
    );
}

export default FeaturedProducts;