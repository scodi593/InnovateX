import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import React from 'react'

const AddressCard = ({addressInfo,handleDeleteAddress}) => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white">
    <Label className="text-left">Address: {addressInfo?.address}</Label>
    <Label className="text-left">City: {addressInfo?.city}</Label>
    <Label className="text-left">Pincode: {addressInfo?.pincode}</Label>
    <Label className="text-left">Phone: {addressInfo?.phone}</Label>
    <div className="mt-4">
      <Button onClick={handleDeleteAddress}>Delete</Button>
    </div>
  </div>
  )
}

export default AddressCard
