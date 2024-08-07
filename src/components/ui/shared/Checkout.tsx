import { IEvent } from "@/lib/mongodb/database/models/Event.model";
import React, { useEffect } from "react";
import { Button } from "../button";
import { loadStripe } from "@stripe/stripe-js";
import { checkOutOrder } from "@/lib/mongodb/actions/order.action";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ userId, event }: { userId: string; event: IEvent }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event?._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    await checkOutOrder(order)
  };
  return (
    <form method="POST" action={onCheckout}>
      <Button type="submit" role="link" className="button sm:w-fit">
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};

export default Checkout;
