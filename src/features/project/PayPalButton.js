import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createDonation } from "./projectSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PayPalButton({ amount, projectId, userId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatedAmount, setUpdatedAmount] = useState(amount);
  const [buttonRendered, setButtonRendered] = useState(false);

  useEffect(() => {
    setUpdatedAmount(amount);
    setButtonRendered(false);
  }, [amount]);

  useEffect(() => {
    if (updatedAmount > 0 && updatedAmount === amount) {
      setButtonRendered(true);
    } else {
      setButtonRendered(false);
    }
  }, [updatedAmount, amount]);

  return (
    <>
      {buttonRendered && (
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: updatedAmount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            let status = false;
            return actions.order.capture().then((details) => {
              if (details.status === "COMPLETED") {
                status = true;
              }
              const capturedAmount = details.purchase_units[0].amount.value;
              try {
                dispatch(
                  createDonation({
                    projectId,
                    userId,
                    amount: Number(capturedAmount),
                    status,
                  })
                );
                setTimeout(() => {
                  navigate("/users/account");
                }, 3000);
              } catch (error) {
                console.log(error);
              }
              // const name = details.payer.name.given_name;
              toast.success(
                `Your transaction completed. Thank you for your support!`
              );
            });
          }}
        />
      )}
    </>
  );
}

export default PayPalButton;
