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
  createContainer();
})();

function createContainer() {
  let topContainer = document.createElement("div");
  topContainer.style.position = "fixed";
  topContainer.style.top = "25px";
  topContainer.style.right = "100px";
  topContainer.style.width = "300px";
  topContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  topContainer.style.color = "white";
  topContainer.style.padding = "10px";
  topContainer.style.zIndex = "9999";
  topContainer.style.fontSize = "0.7em";

  document.body.appendChild(topContainer);
  createFloatingButton(topContainer);
}

function createFloatingButton(topContainer) {
  // 创建一个输入框用于显示 slips 结果
  let slipsResultInput = document.createElement("textarea");
  // slipsResultInput.setAttribute("readonly", false);
  slipsResultInput.style.width = "100%";
  slipsResultInput.style.height = "50px";
  slipsResultInput.style.overflowY = "scroll";
  slipsResultInput.style.backgroundColor = "transparent";
  slipsResultInput.style.color = "white";
  slipsResultInput.style.padding = "5px";
  // slipsResultInput.style.marginBottom = "2px";

  topContainer.appendChild(slipsResultInput);

  // Create get slips button
  let getSlipButton = document.createElement("button");
  getSlipButton.innerHTML = "Get Slips";
  getSlipButton.style.borderRadius = "10%";
  getSlipButton.style.backgroundColor = "CornflowerBlue";

  // add button to the body
  topContainer.appendChild(getSlipButton);

  // add event listener
  getSlipButton.addEventListener("click", function () {
    slipsResultInput.value = "";
    getSlipList(slipsResultInput).then((slipList) => {
      console.log(slipList);
    });
  });

  // Create get slip info button
  let getSlipInfoButton = document.createElement("button");
  getSlipInfoButton.innerHTML = "Get Slip Info";
  getSlipInfoButton.style.borderRadius = "10%";
  getSlipInfoButton.style.backgroundColor = "CornflowerBlue";

  // add button to the body
  topContainer.appendChild(getSlipInfoButton);

  // add event listener
  getSlipInfoButton.addEventListener("click", function () {
    // get slip info
    getSlipInfo().then((slipInfo) => {
      slipsResultInput.value = slipInfo.join("\n");
      console.log(slipInfo);
    });
  });

  // Create get slip info button
  let setSerialNumber = document.createElement("button");
  setSerialNumber.innerHTML = "Make Serial";
  setSerialNumber.style.borderRadius = "10%";
  setSerialNumber.style.backgroundColor = "CornflowerBlue";

  // add button to the body
  topContainer.appendChild(setSerialNumber);

  // add event listener
  setSerialNumber.addEventListener("click", function () {
    // make serial number for each slip label
    makeSerialNumber();
  });

  // Create merge slips button
  let mergeButton = document.createElement("button");
  mergeButton.innerHTML = "Sort Slips";
  mergeButton.style.borderRadius = "10%";
  mergeButton.style.backgroundColor = "CornflowerBlue";

  // add button to the body
  topContainer.appendChild(mergeButton);

  // add event listener
  mergeButton.addEventListener("click", function () {
    // merge slips
    let mergedLines = reSortLines(slipsResultInput.value);
    slipsResultInput.value = mergedLines;
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
async function getSlipList(slipsResultInput) {
  // 创建一个空数组来存储 label 内容
  let labelsArray = [];
  let clickCount = 0;

  let divElements = document.querySelectorAll("div.tocItemWrapper");

  // 遍历每个 div 元素
  for (let divElement of divElements) {
    // 在当前 div 元素中查找 label 元素
    let labelElement = divElement.querySelector("label.tocLabel");
    if (labelElement) {
      let labelText = labelElement.textContent.trim();
      // 只有以 "T3" 或 "T5" 开头的内容才添加到数组中
      if (labelText.startsWith("T3") || labelText.startsWith("T5")) {
        // click the label
        labelElement.click();
        clickCount++;

        // 使用 await 等待 2000 毫秒
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // get slip info
        let slipInfo = await getSlipInfo();
        labelText += " " + slipInfo.join(" ");
        // show and store the result
        slipsResultInput.value += clickCount + ": " + labelText + "\n";
        labelsArray.push(labelText);
      }
    }
  }
  return labelsArray;
}

function makeSerialNumber() {
  let divElements = document.querySelectorAll("div.tocItemWrapper");
  let count = 1;

  // 遍历每个 div 元素
  for (let divElement of divElements) {
    // 在当前 div 元素中查找 label 元素
    let labelElement = divElement.querySelector("label.tocLabel");
    if (labelElement) {
      let labelText = labelElement.textContent.trim();
      // 只有以 "T3" 或 "T5" 开头的内容才添加到数组中
      if (labelText.startsWith("T3") || labelText.startsWith("T5")) {
        // add serial number to the label
        labelElement.textContent = count + ": " + labelText;
        count++;
      }
    }
  }
  return labelsArray;
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
async function getSlipInfo() {
  // 找到所有 fieldset 元素
  let fieldsets = document.querySelectorAll("fieldset");

  // 定义一个空数组来存储结果
  let resultArray = [];

  // 遍历每个 fieldset 元素
  for (let fieldset of fieldsets) {
    // 找到当前 fieldset 中所有的 id 为 "null" 的输入框和所有的 class 为 "boxNumberContent" 的 span 元素
    let inputElements = fieldset.querySelectorAll("input#null");
    let spanElements = fieldset.querySelectorAll("span.boxNumberContent");

    // 遍历每对输入框和 span 元素
    for (let i = 0; i < inputElements.length; i++) {
      let inputElement = inputElements[i];
      let spanElement = spanElements[i];

      // 如果输入框不为空
      if (inputElement && inputElement.value.trim() !== "" && spanElement) {
        // 将输入框的值和 span 中的内容合并到一个字符串中，并添加到结果数组中
        resultArray.push(
          `${spanElement.textContent.trim()}: ${inputElement.value.trim()}`
        );
      }
    }
  }

  return resultArray;
}

// Sorted by similar amounts available
function reSortLines(inputString) {
  let lines = inputString.split("\n");

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let amounts = extractAmounts(line);
    for (let j = i + 1; j < lines.length; j++) {
      let nextLine = lines[j];
      let nextAmounts = extractAmounts(nextLine);
      let sameItemsCount = countCommonItems(amounts, nextAmounts);
      if (sameItemsCount > 0) {
        // move index j to index i + 1
        let removedItem = lines.splice(j, 1)[0];
        lines.splice(i + 1, 0, removedItem);
        break;
      }
    }
  }

  return lines.join("\n");
}

function extractAmounts(line) {
  let amounts = [];
  let regex = /\d+:\s*\$\d+(?:,\d+)?(?:\.\d+)?/g;
  let match;

  while ((match = regex.exec(line)) !== null) {
    amounts.push(match[0]);
  }

  return amounts;
}

function countCommonItems(arr1, arr2) {
  let commonItems = arr1.filter((item) => arr2.includes(item));
  return commonItems.length;
}
