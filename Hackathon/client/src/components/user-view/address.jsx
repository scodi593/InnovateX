import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  fetchAddress,
} from "@/store/user/address-slice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
};

const UserAddress = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.userAddress);
  const { toast } = useToast();

  function handleDeleteAddress(event) {
    event.preventDefault()
    dispatch(deleteAddress(user?.id)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddress(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }
  function handleManageAddress(event) {
    event.preventDefault()
    dispatch(
      addNewAddress({
        ...formData,
        userId: user?.id,
      })).then((data) => {

        if (data?.payload?.success) {
          dispatch(fetchAddress(user?.id));
          setFormData(initialAddressFormData);
          toast({
            title: "Address Added successfully",
          });
        }
      });
  }

  useEffect(() => {
    dispatch(fetchAddress(user?.id));
  }, [dispatch]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>{address ? "Your Address" : "Add New Address"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {address ? (
          <AddressCard
            addressInfo={address}
            handleDeleteAddress={handleDeleteAddress}
          />
        ) : (
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText="Add Address"
            onSubmit={handleManageAddress}
            isBtnDisabled={!Object.values(formData).every((val) => val)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default UserAddress;
