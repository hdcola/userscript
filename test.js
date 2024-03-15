// ==UserScript==
// @name         Ufile Tax Slip Finder
// @namespace    http://tampermonkey.net/
// @version      2024-03-14
// @description  Find your all tax slips information
// @author       老房东
// @match        https://secure.ufile.ca/T1-2023/Interview*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  createFloatingButton();
})();

function createFloatingButton() {
  // Create floating button
  let getSlipButton = document.createElement("button");
  getSlipButton.innerHTML = "Get Slips";
  getSlipButton.style.position = "fixed";
  getSlipButton.style.top = "40px";
  getSlipButton.style.right = "20px";
  getSlipButton.style.zIndex = "9999";
  getSlipButton.style.borderRadius = "10%";
  getSlipButton.style.backgroundColor = "red";

  // add button to the body
  document.body.appendChild(getSlipButton);

  // add event listener
  getSlipButton.addEventListener("click", function () {
    // get slip info
    let slipInfo = getSlipInfo();
    console.log(slipInfo);
  });

  // Create another floating button
  let getSlipInfoButton = document.createElement("button");
  getSlipInfoButton.innerHTML = "Get Slip Info";
  getSlipInfoButton.style.position = "fixed";
  getSlipInfoButton.style.top = "80px";
  getSlipInfoButton.style.right = "20px";
  getSlipInfoButton.style.zIndex = "9999";
  getSlipInfoButton.style.borderRadius = "10%";
  getSlipInfoButton.style.backgroundColor = "blue";

  // add button to the body
  document.body.appendChild(getSlipInfoButton);

  // add event listener
  getSlipInfoButton.addEventListener("click", function () {
    // get slip info
    let slipInfo = getSlipInfo();
    console.log(slipInfo);
  });

  // Create another floating button
  let clickSlipButton = document.createElement("button");
  clickSlipButton.innerHTML = "Click a slip";
  clickSlipButton.style.position = "fixed";
  clickSlipButton.style.top = "120px";
  clickSlipButton.style.right = "20px";
  clickSlipButton.style.zIndex = "9999";
  clickSlipButton.style.borderRadius = "10%";
  clickSlipButton.style.backgroundColor = "green";

  // add button to the body
  document.body.appendChild(clickSlipButton);

  // add event listener
  clickSlipButton.addEventListener("click", function () {
    // call function to simulate clicking a slip
    clickSlip();
  });
}

// a slip item
// <div _ngcontent-ich-c41="" dt-selected="" class="tocItemWrapper" id="null">
//     <!---->
//     <div _ngcontent-ich-c41="">
//         <div _ngcontent-ich-c41="" class="prependIcon">
//         </div>
//     </div><!---->
//     <p _ngcontent-ich-c41="" class="tocText">
//         <label _ngcontent-ich-c41="" class="tocLabel">T3: CIBC MONEY MARKET FUND</label>
//         <img _ngcontent-ich-c41="" class="tocIcon" style="vertical-align: central;"
//             src="/T1-2023/Content/images/Assets/tocgreyouArrow.png" hidden="">
//         <img _ngcontent-ich-c41="" class="tocIconRemove" style="vertical-align: central;"
//             src="/T1-2023/Content/images/Assets/remove.png">
//     </p>
// </div>
function getSlipInfo() {
  // 创建一个空数组来存储 label 内容
  let labelsArray = [];

  // 获取所有匹配的 div 元素
  let divElements = document.querySelectorAll("div.tocItemWrapper");

  // 遍历每个 div 元素
  divElements.forEach(function (divElement) {
    // 在当前 div 元素中查找 label 元素
    let labelElement = divElement.querySelector("label.tocLabel");
    if (labelElement) {
      // 将 label 内容添加到数组中
      labelsArray.push(labelElement.textContent.trim());
    }
  });

  // 返回数组
  return labelsArray;
}

function clickSlip() {
  // 获取所有匹配的 div 元素
  let divElements = document.querySelectorAll("div.tocItemWrapper");

  // 遍历每个 div 元素
  divElements.forEach(function (divElement) {
    // 在当前 div 元素中查找 label 元素
    let labelElement = divElement.querySelector("label.tocLabel");
    if (labelElement) {
      // 如果 label 内容匹配，则模拟点击
      if (labelElement.textContent.trim() === "T3: CIBC MONEY MARKET FUND") {
        divElement.click();
        //wait for 1 second
        setTimeout(function () {
          // get slip info
          let slipInfo = getSlipInfo();
          console.log(slipInfo);
        }, 1000);
        return;
      }
    }
  });
}

/* <fieldset _ngcontent-ofr-c40="" dt-focus="" class="RowStyleZebraOdd">
    <div _ngcontent-ofr-c40=""><xigl-element _ngcontent-ofr-c40="" _nghost-ofr-c39="">
            <span _ngcontent-ofr-c39="">
                <span _ngcontent-ofr-c39="">
                    <span _ngcontent-ofr-c39="" class="int-label" style="display: block; min-height: 1px;">
                        This T3 slip was issued by
                    </span>
                    <em _ngcontent-ofr-c39="" style="display: none;"></em></span>
            </span>
        </xigl-element>
        <xigl-element _ngcontent-ofr-c40="" _nghost-ofr-c39="">
            <span _ngcontent-ofr-c39="">
                <button _ngcontent-ofr-c39="" tabindex="-1" class="helpItem"></button>
            </span>
        </xigl-element>
        <xigl-element _ngcontent-ofr-c40="" _nghost-ofr-c39="">
            <span _ngcontent-ofr-c39="">
                <span _ngcontent-ofr-c39="">
                    <span _ngcontent-ofr-c39="" class="int-label" style="display: block; min-height: 1px;">
                    </span>
                    <em _ngcontent-ofr-c39="" style="display: none;"></em>
                </span>
            </span>
        </xigl-element>
        <xigl-element _ngcontent-ofr-c40="" _nghost-ofr-c39="">
            <span _ngcontent-ofr-c39="">
                <input _ngcontent-ofr-c39="" type="text" id="null" placeholder=""
                    class="ng-pristine ng-valid ng-touched" maxlength="30" style="width: 250px;">
            </span>

            <div _ngcontent-ofr-c39="">
                <div _ngcontent-ofr-c39="">
                    <div _ngcontent-ofr-c39="" class="input-ok"></div>
                </div>
            </div>
        </xigl-element>
    </div>
    <div _ngcontent-ofr-c40="" class="clear">&nbsp;</div>
</fieldset> */
function getSlipInfo() {
  // 找到所有 fieldset 元素
  let fieldsets = document.querySelectorAll("fieldset");

  // 定义一个空数组来存储结果
  let resultArray = [];

  // 遍历每个 fieldset 元素
  fieldsets.forEach(function (fieldset) {
    // 找到当前 fieldset 中 id 为 "null" 的输入框
    let inputElement = fieldset.querySelector("input#null");

    // 找到当前 fieldset 中的 span 元素中 class 为 "boxNumberContent" 的元素
    let spanElement = fieldset.querySelector("span.boxNumberContent");

    // 如果输入框不为空
    if (inputElement && inputElement.value.trim() !== "" && spanElement) {
      // 将输入框的值和 span 中的内容合并到一个字符串中，并添加到结果数组中
      resultArray.push(
        `${spanElement.textContent.trim()}: ${inputElement.value.trim()}`
      );
    }
  });

  return resultArray;
}

function tryClickElement(tryElement) {
  tryElement.click();
}
