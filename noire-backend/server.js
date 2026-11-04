require("dotenv").config();

const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// SUPABASE CONNECTION
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("NOIRÉ backend is running!");
});

// DATABASE CONNECTION TEST
app.get("/test-db", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("product_reviews")
            .select("id")
            .limit(1);

        if (error) throw error;

        res.json({
            success: true,
            message: "NOIRÉ Supabase connection successful!"
        });

    } catch (error) {
        console.error("Supabase error:", error.message);

        res.status(500).json({
            success: false,
            message: "Supabase connection failed."
        });
    }
});

/* =====================================
   NOIRÉ — CUSTOMER AUTHENTICATION
===================================== */

async function authenticateCustomer(req, res, next) {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please login."
            });
        }

        const accessToken = authHeader.split(" ")[1];

        const { data, error } = await supabase.auth.getUser(accessToken);

        if (error || !data.user) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired login session."
            });
        }

        // Verified customer information
        req.customer = {
            id: data.user.id,
            email: data.user.email
        };

        next();

    } catch (error) {

        console.error("Authentication error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Authentication verification failed."
        });
    }
}
/* =====================================
   TEST CUSTOMER AUTHENTICATION
===================================== */

app.get("/auth-check", authenticateCustomer, (req, res) => {

    res.json({
        success: true,
        message: "Customer authenticated successfully!",
        customer: {
            id: req.customer.id,
            email: req.customer.email
        }
    });

});


/* =====================================
   NOIRÉ — CREATE CUSTOMER ORDER
===================================== */

const crypto = require("crypto");

app.post("/create-order", authenticateCustomer, async (req, res) => {

    let createdOrderId = null;

    try {

        const {
            customer_name,
            phone,
            address,
            city,
            state,
            pincode,
            items,
            payment_method
        } = req.body;

        // VALIDATE CUSTOMER DETAILS

        if (
            !customer_name?.trim() ||
            !phone?.trim() ||
            !address?.trim() ||
            !city?.trim() ||
            !state?.trim() ||
            !pincode?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all delivery details."
            });
        }

        if (!/^[0-9]{6}$/.test(pincode)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid 6-digit PIN code."
            });
        }

        if (!/^[0-9]{10}$/.test(phone.replace(/\D/g, ""))) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid 10-digit mobile number."
            });
        }

        // VALIDATE PAYMENT METHOD

        const paymentMethod = payment_method || "COD";

        if (!["COD", "ONLINE"].includes(paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method."
            });
        }

        // ONLINE GATEWAY WILL BE CONNECTED IN THE NEXT STEP

        if (paymentMethod === "ONLINE") {
            return res.status(400).json({
                success: false,
                message: "Online payment is not configured yet. Please use COD."
            });
        }

        // VALIDATE CART

        if (
            !Array.isArray(items) ||
            items.length === 0 ||
            items.length > 20
        ) {
            return res.status(400).json({
                success: false,
                message: "Your shopping bag is empty or invalid."
            });
        }

        let totalAmount = 0;
        const orderItems = [];

        // VERIFY PRODUCTS AND PRICES FROM DATABASE

        for (const item of items) {

            const productId = Number(item.product_id);
            const quantity = Number(item.quantity);
            const size = item.size;

            if (
                !Number.isSafeInteger(productId) ||
                productId <= 0 ||
                !Number.isInteger(quantity) ||
                quantity < 1 ||
                quantity > 10 ||
                typeof size !== "string" ||
                !size.trim()
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product, size or quantity."
                });
            }

            const { data: product, error: productError } =
                await supabase
                    .from("products")
                    .select("id, name, price, sizes, is_active")
                    .eq("id", productId)
                    .eq("is_active", true)
                    .maybeSingle();

            if (productError) throw productError;

            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: "One or more products are unavailable."
                });
            }

            if (
                !Array.isArray(product.sizes) ||
                !product.sizes.includes(size)
            ) {
                return res.status(400).json({
                    success: false,
                    message: `Selected size is unavailable for ${product.name}.`
                });
            }

            const price = Number(product.price);

            if (!Number.isFinite(price) || price < 0) {
                throw new Error("Invalid product price in database.");
            }

            const subtotal = Math.round(price * quantity * 100) / 100;

            totalAmount += subtotal;

            orderItems.push({
                product_id: product.id,
                product_name: product.name,
                product_price: price,
                size: size,
                quantity: quantity,
                subtotal: subtotal
            });
        }

        totalAmount = Math.round(totalAmount * 100) / 100;

        // GENERATE UNIQUE ORDER NUMBER

        const orderNumber =
            "NOIRE-" +
            Date.now() +
            "-" +
            crypto.randomUUID().slice(0, 8).toUpperCase();

        // CREATE MAIN ORDER

        const { data: order, error: orderError } =
            await supabase
                .from("orders")
                .insert({
                    user_id: req.customer.id,
                    order_number: orderNumber,
                    customer_name: customer_name.trim(),
                    email: req.customer.email,
                    phone: phone.replace(/\D/g, ""),
                    address: address.trim(),
                    city: city.trim(),
                    state: state.trim(),
                    pincode: pincode.trim(),
                    total_amount: totalAmount,
                    payment_method: "COD",
                    payment_status: "Pending",
                    status: "Pending"
                })
                .select()
                .single();

        if (orderError) throw orderError;

        createdOrderId = order.id;

        // SAVE ORDER PRODUCTS

        const itemsToInsert = orderItems.map(item => ({
            ...item,
            order_id: order.id
        }));

        const { error: itemsError } =
            await supabase
                .from("order_items")
                .insert(itemsToInsert);

        if (itemsError) throw itemsError;

        // SUCCESS RESPONSE

        return res.status(201).json({
            success: true,
            message: "Your NOIRÉ order has been placed successfully!",
            order: {
                id: order.id,
                order_number: order.order_number,
                total_amount: totalAmount,
                payment_method: "COD",
                payment_status: "Pending",
                status: "Pending"
            }
        });

    } catch (error) {

        console.error("NOIRÉ order creation error:", error.message);

        // ROLLBACK IF ORDER ITEMS FAILED

        if (createdOrderId !== null) {

            const { error: rollbackError } = await supabase
                .from("orders")
                .delete()
                .eq("id", createdOrderId)
                .eq("user_id", req.customer.id);

            if (rollbackError) {
                console.error(
                    "Order rollback error:",
                    rollbackError.message
                );
            }
        }

        return res.status(500).json({
            success: false,
            message: "Unable to place your order. Please try again."
        });
    }
});


app.listen(PORT, () => {
    console.log(`NOIRÉ backend running at http://localhost:${PORT}`);
});