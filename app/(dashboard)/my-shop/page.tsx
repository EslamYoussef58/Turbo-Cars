"use client"
import { ListingType } from '@/@types/api.type'
import AllListing from '@/components/shop/all-listing'
import ShopInfo from '@/components/shop/shop-info'
import { getMyShopQueryFn } from '@/lib/fetcher'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const MYShop = () => {

const { data: shopData, isPending } = useQuery({
  queryKey: ["my-shop"],
  queryFn: getMyShopQueryFn
})  
const user = shopData?.user
const shop = shopData?.shop
const listing = shopData?.listings || ([] as ListingType[])

  return (
    <main className='container mx-auto px-4 pt-3 pb-8'>
      <div className="max-w-7xl mx-auto">
        <div className="">
          <div className="pt-1">
            <ShopInfo 
             shopName={shop?.shopName}
              shopId={shop?.$id}
              description={shop?.description}
              isShopOwner={true}
              ownerName={user?.name}
              shopOwnerUserId={user?.$id}
              isPending={isPending}
            />
          </div>
          <div className="pt-1">
            <AllListing  listings={listing} isPending={isPending}/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MYShop