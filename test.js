// ==UserScript==
// @name         Surplus Marketplace Bidder
// @namespace    http://tampermonkey.net/
// @version      2024-05-05
// @description  Watch bids and place bids automatically
// @author       老房东
// @match        https://surplusmarketplace.com/items/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  createContainer();
})();

function createContainer() {
  let topContainer = document.createElement("div");
  topContainer.style.position = "fixed";
  topContainer.style.top = "100px";
  topContainer.style.right = "10px";
  topContainer.style.width = "50%";
  topContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  topContainer.style.color = "white";
  topContainer.style.padding = "1px";
  topContainer.style.zIndex = "9999";
  topContainer.style.fontSize = "1em";

  document.body.appendChild(topContainer);
  createFloatingButton(topContainer);
}

function createFloatingButton(topContainer) {
  // 创建一个输入框用于显示结果
  let slipsResultInput = document.createElement("textarea");
  // slipsResultInput.setAttribute("readonly", false);
  slipsResultInput.style.width = "100%";
  slipsResultInput.style.height = "50px";
  slipsResultInput.style.overflowY = "scroll";
  slipsResultInput.style.backgroundColor = "transparent";
  slipsResultInput.style.color = "white";
  slipsResultInput.style.padding = "10px";
  slipsResultInput.style.marginBottom = "2px";

  topContainer.appendChild(slipsResultInput);

  // Create Watch Bid button
  let getSlipButton = document.createElement("button");
  getSlipButton.innerHTML = "Watch Bid";
  getSlipButton.style.borderRadius = "10%";
  getSlipButton.style.backgroundColor = "CornflowerBlue";

  topContainer.appendChild(getSlipButton);

  getSlipButton.addEventListener("click", function () {
    slipsResultInput.value = "";
    WatchBid(slipsResultInput).then((result) => {
      console.log(result);
    });
  });
}

async function WatchBid(slipsResultInput) {
  let button = document.querySelector(
    "div.ant-space.ant-space-horizontal.ant-space-align-center > div.ant-space-item > button.ant-btn.ant-btn-link"
  );

  if (button) {
    button.click();
  } else {
    console.log("Button not found");
  }

  // wait 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let lastBidInfo = document.querySelector(
    "tbody.ant-table-tbody > tr.ant-table-row.ant-table-row-level-0"
  );

  if (lastBidInfo) {
    // user is first td element
    // bid amount is second td element
    // time is third td element
    // bid type is last td element
    let user = lastBidInfo
      .querySelector("td.ant-table-cell")
      .textContent.trim();
    let bidAmount = lastBidInfo
      .querySelector("td.ant-table-cell:nth-child(2)")
      .textContent.trim();
    let time = lastBidInfo
      .querySelector("td.ant-table-cell:nth-child(3)")
      .textContent.trim();
    let bidType = lastBidInfo
      .querySelector("td.ant-table-cell:last-child")
      .textContent.trim();
    slipsResultInput.value = `User:${user} Amount:${bidAmount} Bid Time:${time} Type:${bidType}`;
  } else {
    console.log("Last bid info not found");
  }

  return "Watch Bids";
}
