import Stripe from "stripe";
import { env } from "../lib/env";

export const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});
