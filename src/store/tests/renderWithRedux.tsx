import React from "react";
import { render, RenderAPI } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { Store } from "@reduxjs/toolkit";

export const renderWithRedux = (component: JSX.Element, store: Store): RenderAPI =>
  render(<Provider store={store}>{component}</Provider>);
