import UserAddress from '@/components/user-view/address'
import Payment from '@/components/user-view/payment'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from 'react'

const UserAccount = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Payment</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Payment/>
            </TabsContent>
            <TabsContent value="address">
            <UserAddress/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  )
}

export default UserAccount
