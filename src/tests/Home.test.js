import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import Home from "../views/Home.vue";

test("mounted", async () => {
  expect(Home).toBeTruthy();

})