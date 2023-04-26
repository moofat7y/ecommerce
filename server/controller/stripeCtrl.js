const Cart = require("../models/cartModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
let endpointSecret = "";
// endpointSecret =
//   "whsec_de04190f5a895ad7b7d82c872e4a110346c9f16f0852336e323b7e9a318c61df";

// Create order cash by visa
exports.createCheckoutSession = async (req, res, next) => {
  try {
    const userCart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );
    if (!userCart.products.length > 0) {
      const error = new Error("عربة التسوق فارغه");
      error.statusCode = 403;
      throw error;
    }

    const line_items = userCart.products.map((prod) => {
      return {
        price_data: {
          currency: "egp",
          product_data: {
            name: prod.product.title,
            images: [prod.product.images[0]?.secure_url],
          },
          unit_amount: +`${prod.price}00`,
        },
        quantity: prod.quantity,
      };
    });
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.user._id,
        // cart: JSON.stringify(userCart),
      },
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ["EG"],
      },
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.id,
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    throw error;
  }
};

exports.stripeHook = async (request, response, next) => {
  const sig = request.headers["stripe-signature"];

  let eventType;
  let data;
  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("webhook verified");
    } catch (err) {
      console.log(`webhook ${err}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = request.body.data.object;
    eventType = request.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log(customer);
        console.log(data);
        // Make action after success*****
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
};
