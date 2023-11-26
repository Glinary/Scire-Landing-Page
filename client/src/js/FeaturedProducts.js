import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import magayon_1 from "./images/DSCF3390.jpg"
import magayon_2 from "./images/DSCF3357.jpg"
import handyong_1 from "./images/DSCF3438.jpg"
import handyong_2 from "./images/DSCF3358.jpg"

// For the Featured Products Section
function FeaturedProducts() {
    console.log("Featured products rendered");

    return (
        <div className="border-2 border-emerald-900 mt-5 max-[700px]:mx-8 max-[1000px]:mx-14 min-[1000px]:mx-16 rounded-lg max-[1000px]:mb-20">
            <h1 className="text-center text-2xl font-bold max-[1000px]:py-10 min-[1000px]:py-12">Featured Products</h1>

            <div className="max-[1000px]:px-6 max-[1000px]:mb-8 min-[1000px]:px-8 max-[700px]:mb-8 min-[700px]:mb-10 min-[1000px]:mb-14">
                <div className="min-[1000px]:flex border border-emerald-900 border-opacity-40 rounded-md max-[700px]:px-4 max-[700px]:py-4 max-[1000px]:px-6 max-[1000px]:py-8 min-[1000px]:px-6 min-[1000px]:py-8 min-[1000px]:space-x-6 max-[700px]:mb-8 min-[700px]:mb-10 min-[1000px]:mb-14"> {/* Product 2 */}
                    <div className="max-[1000px]:flex min-[1000px]:flex max-[1000px]:space-x-4 min-[1000px]:space-x-4 min-[1000px]:basis-1/2 min-[1000px]:space-y-0">
                        <img src={magayon_1} alt="magayon-1" className="max-[1000px]:basis-1/2 min-[1000px]:basis-1/2 object-cover overflow-hidden max-[700px]:p-2 max-[1000px]:p-4 min-[1000px]:p-4 min-[1400px]:p-6 min-[1000px]:h-contain border border-[#aaaaaa]"></img>
                        <img src={magayon_2} alt="magayon-2" className="max-[1000px]:basis-1/2 min-[1000px]:basis-1/2 object-cover overflow-hidden max-[700px]:p-2 max-[1000px]:p-4 min-[1000px]:p-4 min-[1400px]:p-6 min-[1000px]:h-contain border border-[#aaaaaa]"></img>
                    </div>
                    <div className="min-[1000px]:pt-3 max-[1000px]:pt-4 min-[1000px]:basis-1/2">
                        <p className="max-[1000px]:text-xl min-[1000px]:text-2xl min-[1400px]:text-3xl font-bold pb-1">Magayon</p>
                        <p className="max-[1000px]:text-base min-[1000px]:text-lg min-[1400px]:text-xl max-[1000px]:pb-6 min-[1000px]:pb-8">Elemi Glow Bar Soap</p>
                        <p className="max-[1000px]:text-xs min-[1000px]:text-sm min-[1400px]:text-base">
                            Experience a luxurious and revitalizing bath with Scire Essentials Magayon Elemi Glow Bar Soap.
                            This bar soap is formulated with natural and organic ingredients that firm, lift, detoxify, mildly exfoliate, and hydrate your skin.
                            Infused with Elemi oil, a natural skin rejuvenator, it helps restore your skin's youthful glow and radiance.
                            Perfect for those looking for a relaxing and nourishing bath experience.
                        </p>
                    </div>
                </div>

                <div className="min-[1000px]:flex border border-emerald-900 border-opacity-40 rounded-md max-[700px]:px-4 max-[700px]:py-4 max-[1000px]:px-6 max-[1000px]:py-8 min-[1000px]:px-6 min-[1000px]:py-8 min-[1000px]:space-x-6"> {/* Product 3 */}
                    <div className="max-[1000px]:flex min-[1000px]:flex max-[1000px]:space-x-4 min-[1000px]:space-x-4 min-[1000px]:basis-1/2 min-[1000px]:space-y-0">
                        <img src={handyong_1} alt="handyong-1" className="max-[1000px]:basis-1/2 min-[1000px]:basis-1/2 object-cover overflow-hidden max-[700px]:p-2 max-[1000px]:p-4 min-[1000px]:p-4 min-[1400px]:p-6 min-[1000px]:h-contain border border-[#aaaaaa]"></img>
                        <img src={handyong_2} alt="handyong-2" className="max-[1000px]:basis-1/2 min-[1000px]:basis-1/2 object-cover overflow-hidden max-[700px]:p-2 max-[1000px]:p-4 min-[1000px]:p-4 min-[1400px]:p-6 min-[1000px]:h-contain border border-[#aaaaaa]"></img>
                    </div>
                    <div className="min-[1000px]:pt-3 max-[1000px]:pt-4 min-[1000px]:basis-1/2">
                        <p className="max-[1000px]:text-xl min-[1000px]:text-2xl min-[1400px]:text-3xl font-bold pb-1">Handyong</p>
                        <p className="max-[1000px]:text-base min-[1000px]:text-lg min-[1400px]:text-xl max-[1000px]:pb-6 min-[1000px]:pb-8">Elemi Fresh Bar Soap</p>
                        <p className="max-[1000px]:text-xs min-[1000px]:text-sm min-[1400px]:text-base">
                            Keep your skin feeling fresh and clean all day with Scire Essentials Handyong Elemi Fresh Bar Soap.
                            This bar soap is packed with natural and organic ingredients that firm, lift, refresh, and hydrate your skin.
                            It also has anti-bacterial properties that protect your skin from harmful germs and bacteria.
                            Infused with Elemi oil, it helps rejuvenate your skin, leaving it feeling fresh and revitalized.
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-row items-center justify-center pt-5">
                    <p className="text-center text-xl max-[700px]:text-xs pt-0 pl-0 pb-0 pr-2">
                    Try our Messenger chatbot here: 
                    </p>

                    <ThemeProvider theme={theme}>
                    <FacebookIcon color="primary" />
                    </ThemeProvider>
                </div>

            </div>
        </div>
    );
}

export default FeaturedProducts;