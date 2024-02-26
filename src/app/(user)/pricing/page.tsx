import React from 'react'
import { PricingDetails } from '../../../lib/helpers/pricing'
const Page = () => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical.</p>
                    <div className="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6">
                        <button className="py-1 px-4 bg-indigo-500 text-white focus:outline-none">Monthly</button>
                        <button className="py-1 px-4 focus:outline-none">Annually</button>
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    {PricingDetails.map((plan) => {
                        return (
                            <div className="p-4 xl:w-1/4 md:w-1/2 w-full" key={String(plan.name)}>
                                <div className={`h-full p-6 rounded-lg border-2 ${plan.popular ? "border-indigo-500" : "border-gray-300"} flex flex-col relative overflow-hidden`}>
                                    {plan.popular ? <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span> : (<span></span>)}
                                    <h2 className="text-sm tracking-widest title-font mb-1 font-medium">{plan.name}</h2>
                                    {plan.price ? (
                                        <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">₹{plan.price.toString()}</h1>
                                    ) : (
                                        <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">Free</h1>
                                    )}
                                    {plan.features.map((feature) => {
                                        return (
                                            <p className="flex items-center text-gray-600 mb-2" key={String(feature)}>
                                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                                                        <path d="M20 6L9 17l-5-5"></path>
                                                    </svg>
                                                </span>{feature}
                                            </p>
                                        )
                                    })}
                                    {plan.price ? (
                                        <button className={`flex items-center mt-auto text-white ${plan.popular ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-400 hover:bg-gray-500 "}  border-0 py-2 px-4 w-full focus:outline-none rounded`}>Get Now
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    ) : (
                                        <button disabled className="flex items-center mt-auto text-white bg-gray-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Current Plan
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    )}

                                    <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Page
