import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react-native";

import ProductItem from ".";

describe("ProductItem", () => {
  const defaultProps = {
    product: {
      id: 1,
      name: "Test Product",
      category: "Test Category",
      price: "5.00",
      oldPrice: "6.00",
      stock: 0,
    },
    index: 2,
    onAddToWishListPressed: jest.fn(),
    isItemInWishList: jest.fn(),
    onRemoveFromWishListPressed: jest.fn(),
    onAddToCartPressed: jest.fn(),
  };
  afterEach(cleanup);
  it("renders sold out when stock is zero", () => {
    const { getByText } = render(<ProductItem {...defaultProps} />);
    expect(getByText("SOLD OUT")).toBeTruthy();
  });

  it("adds item to wishlist", () => {
    const { getByTestId } = render(<ProductItem {...defaultProps} />);
    fireEvent.press(getByTestId("wishListButton"));
    expect(defaultProps.onAddToWishListPressed).toHaveBeenCalledWith(
      defaultProps.product
    );
  });

  it("shows correct product name", () => {
    const { getByText } = render(<ProductItem {...defaultProps} />);
    expect(getByText("Test Product")).toBeTruthy();
  });

  it("shows correct product category", () => {
    const { getByText } = render(<ProductItem {...defaultProps} />);
    expect(getByText("Test Category")).toBeTruthy();
  });

  it("shows correct currency format", () => {
    const { getByText } = render(<ProductItem {...defaultProps} />);
    expect(getByText("£5.00")).toBeTruthy();
  });

  it("shows struck through old text format", () => {
    const { getByText } = render(<ProductItem {...defaultProps} />);
    expect(getByText("£̶6̶.̶0̶0̶")).toBeTruthy();
  });
});
