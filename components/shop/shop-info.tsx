import { Fragment } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type ShopInfoProps = {
  shopId: string;
  shopName: string;
  description?: string;
  isShopOwner?: boolean;
  ownerName?: string;
  shopOwnerUserId: string;
  isPending?: boolean;
};

const ShopInfo = ({
  ownerName,
  shopName,
  isShopOwner = false,
  description,
  isPending,
}: ShopInfoProps) => {
  return (
    <div className="w-full">
      <Card className="shadow-custom bg-[#0f172a]  rounded-[8px] mb-3 border-none">
        <CardContent className="p-3 flex flex-col items-center justify-center">
          <div className="flex justify-center items-center">
            {isPending ? (
              <Skeleton
                className="h-28 w-28 rounded-full
                           border-[#ebf2f7] border-2"
              />
            ) : (
              <Avatar
                className="h-28 w-28 border-2 p-[1px]
              border-[#ebf2f7]"
              >
                <AvatarFallback className="bg-black font-semibold text-3xl text-[#dc2626] uppercase">
                  {shopName?.charAt(0)}
                  {shopName?.charAt(1)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          {isPending ? (
            <Fragment>
              <div className="my-3">
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div>
                <Skeleton className="h-2 w-12" />
              </div>
            </Fragment>
          ) : (
            <>
              <div className="mt-3 text-center">
                {isShopOwner ? (
                  <>
                    <h5 className="font-bold text-base text-red-700">{ownerName}</h5>
                    <p className="text-sm text-gray-500">{shopName}</p>
                  </>
                ) : (
                  <h5 className="font-bold text-base">{shopName}</h5>
                )}
                <div className="mt-1">
                  <span className="text-[10px] inline-block py-[2px] px-2 text-white bg-[#dc2626] rounded-sm font-extralight">
                    last seen 12 hours ago
                  </span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
       <Card className="!bg-transparent shadow-none border-none">
        <div className="p-3 bg-[#dc2626] rounded-[8px]">
          <h5
            className="font-medium text-sm uppercase mb-2
          text-white
          "
          >
            About {isShopOwner ? "You" : "Shop"}
          </h5>
          <p className="text-sm text-black font-light">{description}</p>
        </div>
      </Card>
    </div>
  );
};

export default ShopInfo;
