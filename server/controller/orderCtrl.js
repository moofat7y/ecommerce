const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { validationResult } = require("express-validator");
// GET all orders in deb
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate(
      "orderby",
      "firstname lastname mobile email address"
    );
    res.status(200).json(orders);
  } catch (error) {
    if (error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET order by id
exports.getOrderById = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId).populate(
      "products.product orderby",
      "title price images status description firstname lastname mobile email address image"
    );

    if (!order) {
      const error = new Error("This order not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(order);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Update order status
exports.updateOrderStatus = async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }
    if (status === "Canceled") {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: status, expireAt: Date.now() + 604800000 },
        { new: true }
      );
      const update = order.products.map((prod) => {
        return {
          updateOne: {
            filter: { _id: prod.product._id },
            update: {
              $inc: { quantity: -prod.quantity, sold: +prod.quantity },
            },
          },
        };
      });
      await Product.bulkWrite(update, {});
    } else {
      await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: status },
        { new: true }
      );
    }

    res.status(201).json("Order Updated");
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET dashboard details
exports.getDashboardDetails = async (req, res, next) => {
  const monthStrings = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  try {
    let date = new Date();
    let lastDayInCurrentMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    );

    let firstDayInPrevMonth = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      1
    );

    // Get all orders in current month
    const orders = await Order.aggregate([
      {
        $match: {
          // Match only salses that fufils the date constraint below
          $expr: {
            $and: [
              { $gt: ["$createdAt", firstDayInPrevMonth] },
              { $lt: ["$createdAt", lastDayInCurrentMonth] },
            ],
          },
        },
      },
      {
        $group: {
          // Group by both month and year of the sale
          _id: {
            month: { $month: "$createdAt" },
          },
          // Count the no of sales
          sales: {
            $sum: 1,
          },
          totalIncome: {
            $sum: "$paymentIntent.amount",
          },
          avgorderValue: {
            $avg: "$paymentIntent.amount",
          },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
      {
        $project: {
          _id: {
            $arrayElemAt: [monthStrings, "$_id.month"],
          },
          sales: 1,
          totalIncome: { $round: ["$totalIncome", 1] },
          avgorderValue: { $round: ["$avgorderValue", 1] },
        },
      },
    ]);
    let perc = {};
    if (orders[0]?._id !== monthStrings[firstDayInPrevMonth.getMonth() + 1]) {
      orders.unshift({
        sales: 0,
        _id: monthStrings[firstDayInPrevMonth.getMonth() + 1],
        totalIncome: 0,
        avgorderValue: 0,
      });
    }
    if (orders[1]?._id !== monthStrings[lastDayInCurrentMonth.getMonth() + 1]) {
      orders.push({
        sales: 0,
        _id: monthStrings[lastDayInCurrentMonth.getMonth() + 1],
        totalIncome: 0,
        avgorderValue: 0,
      });
    }
    perc = {
      totalSalesPerc:
        orders[0].sales === 0
          ? 100
          : Math.round((orders[1].sales * 100) / orders[0].sales - 100),
      avgOrderValuePerc:
        orders[0].avgorderValue === 0
          ? 100
          : Math.round(
              (orders[1].avgorderValue * 100) / orders[0].avgorderValue - 100
            ),
      totalIncomePerc:
        orders[0].totalIncome === 0
          ? 100
          : Math.round(
              (orders[1].totalIncome * 100) / orders[0].totalIncome - 100
            ),
    };
    // }

    res.status(200).json([...orders, perc]);
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// GET orders by month
exports.getOrdersByMonth = async (req, res, next) => {
  try {
    const monthStrings = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let date = new Date();
    let firstDayInCurrentYear = new Date(date.getFullYear(), 0, 1);

    const orders = await Order.aggregate([
      {
        $match: {
          // createdAt: { $gte: firstDayInCurrentYear, $lte: date },

          // Match only salses that fufils the date constraint below
          $expr: {
            $and: [
              { $gt: ["$createdAt", firstDayInCurrentYear] },
              { $lte: ["$createdAt", date] },
            ],
          },
        },
      },
      {
        $group: {
          // Group by both month and year of the sale
          _id: {
            month: { $month: "$createdAt" },
          },
          // Count the no of sales
          sales: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
      {
        $project: {
          _id: {
            $arrayElemAt: [monthStrings, "$_id.month"],
          },
          sales: 1,
        },
      },
    ]);
    let orderStatus = [];
    for (let i = 1; i <= date.getMonth() + 1; i++) {
      orderStatus.push({ _id: monthStrings[i], sales: 0 });
    }
    const neword = orderStatus.map((order, index) => {
      let sales = orders.find((ord) => ord._id === order._id)?.sales;
      return {
        ...order,
        sales: sales ? sales : order.sales,
      };
    });
    res.status(200).json(neword);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Delete order
exports.deleteOrder = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
