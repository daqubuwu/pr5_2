/******/ (function () {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ 493: /***/ function () {
      // extracted by mini-css-extract-plugin
      /***/
    },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/global */
  /******/ !(function () {
    /******/ __webpack_require__.g = (function () {
      /******/ if (typeof globalThis === "object") return globalThis;
      /******/ try {
        /******/ return this || new Function("return this")();
        /******/
      } catch (e) {
        /******/ if (typeof window === "object") return window;
        /******/
      }
      /******/
    })();
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  !(function () {
    "use strict"; // CONCATENATED MODULE: ./src/graph-tabs.js

    class GraphTabs {
      constructor(selector, options) {
        let defaultOptions = {
          isChanged: () => {},
        };
        this.options = Object.assign(defaultOptions, options);
        this.selector = selector;
        this.tabs = document.querySelector(`[data-tabs="${selector}"]`);

        if (this.tabs) {
          this.tabList = this.tabs.querySelector(".tabs__nav");
          this.tabsBtns = this.tabList.querySelectorAll(".tabs__nav-btn");
          this.tabsPanels = this.tabs.querySelectorAll(".tabs__panel");
        } else {
          console.error("Селектор data-tabs не существует!");
          return;
        }

        this.check();
        this.init();
        this.events();
      }

      check() {
        if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {
          console.error("Количество элементов с одинаковым data-tabs больше одного!");
          return;
        }

        if (this.tabsBtns.length !== this.tabsPanels.length) {
          console.error("Количество кнопок и элементов табов не совпадает!");
          return;
        }
      }

      init() {
        this.tabList.setAttribute("role", "tablist");
        this.tabsBtns.forEach((el, i) => {
          el.setAttribute("role", "tab");
          el.setAttribute("tabindex", "-1");
          el.setAttribute("id", `${this.selector}${i + 1}`);
          el.classList.remove("tabs__nav-btn--active");
        });
        this.tabsPanels.forEach((el, i) => {
          el.setAttribute("role", "tabpanel");
          el.setAttribute("tabindex", "-1");
          el.setAttribute("aria-labelledby", this.tabsBtns[i].id);
          el.classList.remove("tabs__panel--active");
        });
        this.tabsBtns[0].classList.add("tabs__nav-btn--active");
        this.tabsBtns[0].removeAttribute("tabindex");
        this.tabsBtns[0].setAttribute("aria-selected", "true");
        this.tabsPanels[0].classList.add("tabs__panel--active");
      }

      events() {
        this.tabsBtns.forEach((el, i) => {
          el.addEventListener("click", (e) => {
            let currentTab = this.tabList.querySelector("[aria-selected]");

            if (e.currentTarget !== currentTab) {
              this.switchTabs(e.currentTarget, currentTab);
            }
          });
          el.addEventListener("keydown", (e) => {
            let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);
            let dir = null;

            if (e.which === 37) {
              dir = index - 1;
            } else if (e.which === 39) {
              dir = index + 1;
            } else if (e.which === 40) {
              dir = "down";
            } else {
              dir = null;
            }

            if (dir !== null) {
              if (dir === "down") {
                this.tabsPanels[i].focus();
              } else if (this.tabsBtns[dir]) {
                this.switchTabs(this.tabsBtns[dir], e.currentTarget);
              }
            }
          });
        });
      }

      switchTabs(newTab, oldTab = this.tabs.querySelector("[aria-selected]")) {
        newTab.focus();
        newTab.removeAttribute("tabindex");
        newTab.setAttribute("aria-selected", "true");
        oldTab.removeAttribute("aria-selected");
        oldTab.setAttribute("tabindex", "-1");
        let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
        let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);
        this.tabsPanels[oldIndex].classList.remove("tabs__panel--active");
        this.tabsPanels[index].classList.add("tabs__panel--active");
        this.tabsBtns[oldIndex].classList.remove("tabs__nav-btn--active");
        this.tabsBtns[index].classList.add("tabs__nav-btn--active");
        this.options.isChanged(this);
      }
    }
    // EXTERNAL MODULE: ./src/graph-tabs.css
    var graph_tabs = __webpack_require__(493); // CONCATENATED MODULE: ./src/index.js
    __webpack_require__.g.GraphTabs = GraphTabs;
  })();
  /******/
})();

const tabs = new GraphTabs("tab");
