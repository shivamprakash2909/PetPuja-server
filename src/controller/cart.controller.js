import { User } from "../models/user.models.js";
import { CartProduct } from "../models/cart.models.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    let { quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }
    quantity = quantity ? Number(quantity) : 1;

    const user = await User.findById(userId).populate({
      path: "shopping_cart",
      populate: { path: "product" },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find if product already in cart
    let cartItem = user.shopping_cart.find((item) => item.product._id.toString() === productId);

    if (cartItem) {
      // Update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create new CartProduct
      const newCartItem = new CartProduct({
        product: productId,
        quantity,
      });

      await newCartItem.save();

      user.shopping_cart.push(newCartItem._id);
      await user.save();
    }

    // Populate the updated cart
    await user.populate({
      path: "shopping_cart",
      populate: { path: "product" },
    });

    res.status(200).json({
      message: "Added to cart",
      cart: user.shopping_cart,
    });
  } catch (error) {
    console.error("Error in adding to cart: ", error);
    res.status(400).json({ message: "Error adding to cart" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    const user = await User.findById(userId).populate({
      path: "shopping_cart",
      populate: { path: "product" },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let targetCartItem = user.shopping_cart.find((cartItem) => cartItem.product._id.toString() === itemId);

    if (!targetCartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (targetCartItem.quantity > 1) {
      targetCartItem.quantity -= 1;
      await targetCartItem.save();
    } else {
      await CartProduct.findByIdAndDelete(targetCartItem._id);
      user.shopping_cart = user.shopping_cart.filter(
        (cartId) => cartId._id.toString() !== targetCartItem._id.toString()
      );
      await user.save();
    }

    res.status(200).json({ message: "Removed from cart" });
  } catch (error) {
    console.error("Error in removing cart: ", error);
    res.status(400).json({ message: "Error removing from cart" });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "shopping_cart",
      populate: { path: "product" },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.shopping_cart);
  } catch (error) {
    console.error("Error fetching cart: ", error);
    res.status(400).json({ message: "Error fetching cart" });
  }
};
