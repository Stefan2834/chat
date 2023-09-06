"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/contexts/Default.tsx":
/*!**********************************!*\
  !*** ./src/contexts/Default.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DefaultContext: function() { return /* binding */ DefaultContext; },\n/* harmony export */   DefaultProvider: function() { return /* binding */ DefaultProvider; },\n/* harmony export */   useDefault: function() { return /* binding */ useDefault; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _components_DynamicWidth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/DynamicWidth */ \"./src/components/DynamicWidth.tsx\");\n/* harmony import */ var _customHooks_useCookie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/customHooks/useCookie */ \"./src/customHooks/useCookie.tsx\");\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\n\nconst DefaultContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction useDefault() {\n    _s();\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(DefaultContext);\n    if (!context) {\n        throw new Error(\"useDefault must be used within an DefaultProvider\");\n    }\n    return context;\n}\n_s(useDefault, \"b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=\");\nfunction Reducer(state, action) {\n    switch(action.type){\n        case \"test\":\n            return {\n                ...state,\n                number: action.payload.number\n            };\n        default:\n            return state;\n    }\n}\n_c = Reducer;\nconst verifyToken = async (token)=>{\n    const response = await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"/api/token\", {\n        headers: {\n            Authorization: \"Bearer \".concat(token)\n        }\n    });\n    console.log(response);\n    if (response.data.success) {\n        return response.data;\n    } else {\n        if (!response.data.logout) {\n            const refreshResponse = await axios__WEBPACK_IMPORTED_MODULE_5__[\"default\"].post(\"/api/token\", {}, {\n                withCredentials: true\n            });\n            console.log(refreshResponse);\n            if (refreshResponse.data.success) {\n                return refreshResponse.data;\n            } else {\n                return refreshResponse.data;\n            }\n        }\n        return null;\n    }\n};\nfunction DefaultProvider(param) {\n    let { children } = param;\n    _s1();\n    const initialState = {\n        number: 0\n    };\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(Reducer, initialState);\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [navOpen, setNavOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [darkTheme, setDarkTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [accessToken, setAccessToken] = (0,_customHooks_useCookie__WEBPACK_IMPORTED_MODULE_4__.useCookie)(\"accessToken\", \"\");\n    const server = \"http://localhost:9000\" || 0;\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        verifyToken(accessToken).then((data)=>{\n            var _data;\n            if ((_data = data) === null || _data === void 0 ? void 0 : _data.success) {\n                console.log(data);\n                setUser({\n                    username: data.username,\n                    email: data.email,\n                    avatar: data.avatar\n                });\n            }\n        }).catch((err)=>console.log(err)).finally(()=>setLoading(false));\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const root = document.documentElement;\n        if (darkTheme) {\n            root.style.setProperty(\"--first\", \"#141414\");\n            root.style.setProperty(\"--first-reverse\", \"#fff\");\n            root.style.setProperty(\"--second\", \"#1b1b1b\");\n            root.style.setProperty(\"--third\", \"#2b2b2b\");\n            root.style.setProperty(\"--main\", \"#a9def9\");\n        } else {\n            root.style.setProperty(\"--first\", \"#141414\");\n            root.style.setProperty(\"--first-reverse\", \"#fff\");\n            root.style.setProperty(\"--second\", \"#1b1b1b\");\n            root.style.setProperty(\"--third\", \"#2b2b2b\");\n            root.style.setProperty(\"--main\", \"#a9def9\");\n        }\n    }, [\n        darkTheme\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!loading && user && router.asPath === \"/\") {\n            router.push(\"/main/home\");\n        } else if (!loading && !user && router.asPath !== \"/\") {\n            router.push(\"/\");\n        }\n    }, [\n        router.asPath\n    ]);\n    const value = {\n        state,\n        dispatch,\n        server,\n        user,\n        setUser,\n        navOpen,\n        setNavOpen,\n        darkTheme,\n        setDarkTheme,\n        accessToken,\n        setAccessToken\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(DefaultContext.Provider, {\n        value: value,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_DynamicWidth__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n            navbar: navOpen,\n            children: !loading && children\n        }, void 0, false, {\n            fileName: \"D:\\\\React\\\\chat-app\\\\src\\\\contexts\\\\Default.tsx\",\n            lineNumber: 143,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\React\\\\chat-app\\\\src\\\\contexts\\\\Default.tsx\",\n        lineNumber: 142,\n        columnNumber: 9\n    }, this);\n}\n_s1(DefaultProvider, \"fbjsWgXGnBvrqiK2UmKMAHAVrp4=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        _customHooks_useCookie__WEBPACK_IMPORTED_MODULE_4__.useCookie\n    ];\n});\n_c1 = DefaultProvider;\nvar _c, _c1;\n$RefreshReg$(_c, \"Reducer\");\n$RefreshReg$(_c1, \"DefaultProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dHMvRGVmYXVsdC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFxRztBQUM3RDtBQUNkO0FBQ29DO0FBQ1Y7QUFzQjdDLE1BQU1VLCtCQUFpQlQsb0RBQWFBLENBQWtDVSxXQUFXO0FBRWpGLFNBQVNDOztJQUNaLE1BQU1DLFVBQVVYLGlEQUFVQSxDQUFDUTtJQUMzQixJQUFJLENBQUNHLFNBQVM7UUFDVixNQUFNLElBQUlDLE1BQU07SUFDcEI7SUFDQSxPQUFPRDtBQUNYO0dBTmdCRDtBQVFoQixTQUFTRyxRQUFRQyxLQUFZLEVBQUVDLE1BQWM7SUFDekMsT0FBUUEsT0FBT0MsSUFBSTtRQUNmLEtBQUs7WUFDRCxPQUFPO2dCQUFFLEdBQUdGLEtBQUs7Z0JBQUVHLFFBQVFGLE9BQU9HLE9BQU8sQ0FBQ0QsTUFBTTtZQUFDO1FBQ3JEO1lBQ0ksT0FBT0g7SUFDZjtBQUNKO0tBUFNEO0FBbUJULE1BQU1NLGNBQWMsT0FBT0M7SUFDdkIsTUFBTUMsV0FBVyxNQUFNaEIsNkNBQUtBLENBQUNpQixHQUFHLENBQUMsY0FDN0I7UUFBRUMsU0FBUztZQUFFQyxlQUFlLFVBQWdCLE9BQU5KO1FBQVE7SUFBRTtJQUVwREssUUFBUUMsR0FBRyxDQUFDTDtJQUNaLElBQUlBLFNBQVNNLElBQUksQ0FBQ0MsT0FBTyxFQUFFO1FBQ3ZCLE9BQU9QLFNBQVNNLElBQUk7SUFDeEIsT0FBTztRQUNILElBQUcsQ0FBQ04sU0FBU00sSUFBSSxDQUFDRSxNQUFNLEVBQUU7WUFDdEIsTUFBTUMsa0JBQWtCLE1BQU16Qiw2Q0FBS0EsQ0FBQzBCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRztnQkFBRUMsaUJBQWlCO1lBQUs7WUFDbkZQLFFBQVFDLEdBQUcsQ0FBQ0k7WUFDWixJQUFHQSxnQkFBZ0JILElBQUksQ0FBQ0MsT0FBTyxFQUFFO2dCQUM3QixPQUFPRSxnQkFBZ0JILElBQUk7WUFDL0IsT0FBTztnQkFDSCxPQUFPRyxnQkFBZ0JILElBQUk7WUFDL0I7UUFDSjtRQUFFLE9BQU87SUFDYjtBQUNKO0FBRU8sU0FBU00sZ0JBQWdCLEtBQWtDO1FBQWxDLEVBQUVDLFFBQVEsRUFBd0IsR0FBbEM7O0lBQzVCLE1BQU1DLGVBQXNCO1FBQUVsQixRQUFRO0lBQUU7SUFDeEMsTUFBTW1CLFNBQVNoQyxzREFBU0E7SUFDeEIsTUFBTSxDQUFDVSxPQUFPdUIsU0FBUyxHQUFHbEMsaURBQVVBLENBQWtCVSxTQUFTc0I7SUFDL0QsTUFBTSxDQUFDRyxNQUFNQyxRQUFRLEdBQUdyQywrQ0FBUUEsQ0FBYztJQUM5QyxNQUFNLENBQUNzQyxTQUFTQyxXQUFXLEdBQUd2QywrQ0FBUUEsQ0FBVTtJQUNoRCxNQUFNLENBQUN3QyxTQUFTQyxXQUFXLEdBQUd6QywrQ0FBUUEsQ0FBVTtJQUNoRCxNQUFNLENBQUMwQyxXQUFXQyxhQUFhLEdBQUczQywrQ0FBUUEsQ0FBVTtJQUNwRCxNQUFNLENBQUM0QyxhQUFhQyxlQUFlLEdBQUd4QyxpRUFBU0EsQ0FBQyxlQUFlO0lBQy9ELE1BQU15QyxTQUFpQkMsdUJBQThCLElBQUk7SUFHekRoRCxnREFBU0EsQ0FBQztRQUNOa0IsWUFBWTJCLGFBQWFNLElBQUksQ0FBQyxDQUFDekI7Z0JBQ3ZCQTtZQUFKLEtBQUlBLFFBQUFBLGtCQUFBQSw0QkFBQUEsTUFBTUMsT0FBTyxFQUFFO2dCQUNmSCxRQUFRQyxHQUFHLENBQUNDO2dCQUNaWSxRQUFRO29CQUNKYyxVQUFVMUIsS0FBSzBCLFFBQVE7b0JBQ3ZCQyxPQUFPM0IsS0FBSzJCLEtBQUs7b0JBQ2pCQyxRQUFRNUIsS0FBSzRCLE1BQU07Z0JBQ3ZCO1lBQ0o7UUFDSixHQUFHQyxLQUFLLENBQUMsQ0FBQ0MsTUFBUWhDLFFBQVFDLEdBQUcsQ0FBQytCLE1BQ3pCQyxPQUFPLENBQUMsSUFBTWpCLFdBQVc7SUFDbEMsR0FBRyxFQUFFO0lBSUx4QyxnREFBU0EsQ0FBQztRQUNOLE1BQU0wRCxPQUFPQyxTQUFTQyxlQUFlO1FBQ3JDLElBQUlqQixXQUFXO1lBQ1hlLEtBQUtHLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLFdBQVc7WUFDbENKLEtBQUtHLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLG1CQUFtQjtZQUMxQ0osS0FBS0csS0FBSyxDQUFDQyxXQUFXLENBQUMsWUFBWTtZQUNuQ0osS0FBS0csS0FBSyxDQUFDQyxXQUFXLENBQUMsV0FBVztZQUNsQ0osS0FBS0csS0FBSyxDQUFDQyxXQUFXLENBQUMsVUFBVTtRQUNyQyxPQUFPO1lBQ0hKLEtBQUtHLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLFdBQVc7WUFDbENKLEtBQUtHLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLG1CQUFtQjtZQUMxQ0osS0FBS0csS0FBSyxDQUFDQyxXQUFXLENBQUMsWUFBWTtZQUNuQ0osS0FBS0csS0FBSyxDQUFDQyxXQUFXLENBQUMsV0FBVztZQUNsQ0osS0FBS0csS0FBSyxDQUFDQyxXQUFXLENBQUMsVUFBVTtRQUNyQztJQUVKLEdBQUc7UUFBQ25CO0tBQVU7SUFFZDNDLGdEQUFTQSxDQUFDO1FBQ04sSUFBSSxDQUFDdUMsV0FBV0YsUUFBUUYsT0FBTzRCLE1BQU0sS0FBSyxLQUFLO1lBQzNDNUIsT0FBTzZCLElBQUksQ0FBQztRQUNoQixPQUFPLElBQUksQ0FBQ3pCLFdBQVcsQ0FBQ0YsUUFBUUYsT0FBTzRCLE1BQU0sS0FBSyxLQUFLO1lBQ25ENUIsT0FBTzZCLElBQUksQ0FBQztRQUNoQjtJQUNKLEdBQUc7UUFBQzdCLE9BQU80QixNQUFNO0tBQUM7SUFHbEIsTUFBTUUsUUFBNkI7UUFDL0JwRDtRQUNBdUI7UUFDQVc7UUFDQVY7UUFBTUM7UUFDTkc7UUFBU0M7UUFDVEM7UUFBV0M7UUFDWEM7UUFBYUM7SUFDakI7SUFFQSxxQkFDSSw4REFBQ3ZDLGVBQWUyRCxRQUFRO1FBQUNELE9BQU9BO2tCQUM1Qiw0RUFBQzVELGdFQUFxQkE7WUFBQzhELFFBQVExQjtzQkFDMUIsQ0FBQ0YsV0FBWU47Ozs7Ozs7Ozs7O0FBSTlCO0lBeEVnQkQ7O1FBRUc3QixrREFBU0E7UUFNY0csNkRBQVNBOzs7TUFSbkMwQiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29udGV4dHMvRGVmYXVsdC50c3g/YWNiYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSwgdXNlUmVkdWNlciwgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCBEeW5hbWljV2lkdGhDb21wb25lbnQgZnJvbSAnQC9jb21wb25lbnRzL0R5bmFtaWNXaWR0aCc7XHJcbmltcG9ydCB7IHVzZUNvb2tpZSB9IGZyb20gJ0AvY3VzdG9tSG9va3MvdXNlQ29va2llJztcclxuXHJcbmludGVyZmFjZSBEZWZhdWx0Q29udGV4dFZhbHVlIHtcclxuICAgIHN0YXRlOiBTdGF0ZTtcclxuICAgIGRpc3BhdGNoOiBEaXNwYXRjaDtcclxuICAgIHNlcnZlcjogU3RyaW5nO1xyXG4gICAgdXNlcjogVXNlciB8IG51bGw7XHJcbiAgICBzZXRVc2VyOiAodXNlcjogVXNlciB8IG51bGwpID0+IHZvaWQsXHJcbiAgICBuYXZPcGVuOiBib29sZWFuLFxyXG4gICAgc2V0TmF2T3BlbjogKG5hdk9wZW46IGJvb2xlYW4pID0+IHZvaWQsXHJcbiAgICBkYXJrVGhlbWU6IGJvb2xlYW4sXHJcbiAgICBzZXREYXJrVGhlbWU6IChkYXJrVGhlbWU6IGJvb2xlYW4pID0+IHZvaWQsXHJcbiAgICBhY2Nlc3NUb2tlbjogc3RyaW5nLFxyXG4gICAgc2V0QWNjZXNzVG9rZW46IChhY2Nlc3NUb2tlbjogc3RyaW5nKSA9PiB2b2lkLFxyXG59XHJcbnR5cGUgQWN0aW9uID0geyB0eXBlOiAndGVzdCc7IHBheWxvYWQ6IHsgbnVtYmVyOiBudW1iZXIgfSB9O1xyXG50eXBlIERpc3BhdGNoID0gKGFjdGlvbjogQWN0aW9uKSA9PiB2b2lkO1xyXG5leHBvcnQgdHlwZSBTdGF0ZSA9IHtcclxuICAgIG51bWJlcjogbnVtYmVyO1xyXG59O1xyXG50eXBlIFJlZHVjZXJGdW5jdGlvbiA9IChzdGF0ZTogU3RhdGUsIGFjdGlvbjogQWN0aW9uKSA9PiBTdGF0ZTtcclxuXHJcbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8RGVmYXVsdENvbnRleHRWYWx1ZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VEZWZhdWx0KCkge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoRGVmYXVsdENvbnRleHQpO1xyXG4gICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1c2VEZWZhdWx0IG11c3QgYmUgdXNlZCB3aXRoaW4gYW4gRGVmYXVsdFByb3ZpZGVyJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29udGV4dDtcclxufVxyXG5cclxuZnVuY3Rpb24gUmVkdWNlcihzdGF0ZTogU3RhdGUsIGFjdGlvbjogQWN0aW9uKTogU3RhdGUge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ3Rlc3QnOlxyXG4gICAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgbnVtYmVyOiBhY3Rpb24ucGF5bG9hZC5udW1iZXIgfTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBEZWZhdWx0UHJvdmlkZXJQcm9wcyB7XHJcbiAgICBjaGlsZHJlbjogUmVhY3ROb2RlO1xyXG59XHJcblxyXG50eXBlIFVzZXIgPSB7XHJcbiAgICBlbWFpbDogc3RyaW5nIHwgbnVsbCxcclxuICAgIHVzZXJuYW1lOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgYXZhdGFyOiBzdHJpbmcgfCBudWxsXHJcbn1cclxuXHJcbmNvbnN0IHZlcmlmeVRva2VuID0gYXN5bmMgKHRva2VuOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL3Rva2VuJyxcclxuICAgICAgICB7IGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAgfSB9XHJcbiAgICApXHJcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcclxuICAgIGlmIChyZXNwb25zZS5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZighcmVzcG9uc2UuZGF0YS5sb2dvdXQpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVmcmVzaFJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdCgnL2FwaS90b2tlbicsIHt9LCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWZyZXNoUmVzcG9uc2UpXHJcbiAgICAgICAgICAgIGlmKHJlZnJlc2hSZXNwb25zZS5kYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWZyZXNoUmVzcG9uc2UuZGF0YVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZnJlc2hSZXNwb25zZS5kYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IHJldHVybiBudWxsXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBEZWZhdWx0UHJvdmlkZXIoeyBjaGlsZHJlbiB9OiBEZWZhdWx0UHJvdmlkZXJQcm9wcykge1xyXG4gICAgY29uc3QgaW5pdGlhbFN0YXRlOiBTdGF0ZSA9IHsgbnVtYmVyOiAwIH1cclxuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXHJcbiAgICBjb25zdCBbc3RhdGUsIGRpc3BhdGNoXSA9IHVzZVJlZHVjZXI8UmVkdWNlckZ1bmN0aW9uPihSZWR1Y2VyLCBpbml0aWFsU3RhdGUpO1xyXG4gICAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGU8VXNlciB8IG51bGw+KG51bGwpO1xyXG4gICAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSlcclxuICAgIGNvbnN0IFtuYXZPcGVuLCBzZXROYXZPcGVuXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpXHJcbiAgICBjb25zdCBbZGFya1RoZW1lLCBzZXREYXJrVGhlbWVdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSlcclxuICAgIGNvbnN0IFthY2Nlc3NUb2tlbiwgc2V0QWNjZXNzVG9rZW5dID0gdXNlQ29va2llKCdhY2Nlc3NUb2tlbicsICcnKVxyXG4gICAgY29uc3Qgc2VydmVyOiBTdHJpbmcgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TRVJWRVIgfHwgJydcclxuXHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICB2ZXJpZnlUb2tlbihhY2Nlc3NUb2tlbikudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YT8uc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgICAgIHNldFVzZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBkYXRhLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBkYXRhLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcjogZGF0YS5hdmF0YXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpKVxyXG4gICAgICAgICAgICAuZmluYWxseSgoKSA9PiBzZXRMb2FkaW5nKGZhbHNlKSlcclxuICAgIH0sIFtdKVxyXG5cclxuXHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICAgIGlmIChkYXJrVGhlbWUpIHtcclxuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1maXJzdCcsICcjMTQxNDE0Jyk7XHJcbiAgICAgICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tZmlyc3QtcmV2ZXJzZScsICcjZmZmJyk7XHJcbiAgICAgICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tc2Vjb25kJywgJyMxYjFiMWInKTtcclxuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS10aGlyZCcsICcjMmIyYjJiJyk7XHJcbiAgICAgICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tbWFpbicsIFwiI2E5ZGVmOVwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLWZpcnN0JywgJyMxNDE0MTQnKTtcclxuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1maXJzdC1yZXZlcnNlJywgJyNmZmYnKTtcclxuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zZWNvbmQnLCAnIzFiMWIxYicpO1xyXG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXRoaXJkJywgJyMyYjJiMmInKTtcclxuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1tYWluJywgXCIjYTlkZWY5XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LCBbZGFya1RoZW1lXSlcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmICghbG9hZGluZyAmJiB1c2VyICYmIHJvdXRlci5hc1BhdGggPT09ICcvJykge1xyXG4gICAgICAgICAgICByb3V0ZXIucHVzaCgnL21haW4vaG9tZScpXHJcbiAgICAgICAgfSBlbHNlIGlmICghbG9hZGluZyAmJiAhdXNlciAmJiByb3V0ZXIuYXNQYXRoICE9PSAnLycpIHtcclxuICAgICAgICAgICAgcm91dGVyLnB1c2goJy8nKVxyXG4gICAgICAgIH1cclxuICAgIH0sIFtyb3V0ZXIuYXNQYXRoXSlcclxuXHJcblxyXG4gICAgY29uc3QgdmFsdWU6IERlZmF1bHRDb250ZXh0VmFsdWUgPSB7XHJcbiAgICAgICAgc3RhdGUsXHJcbiAgICAgICAgZGlzcGF0Y2gsXHJcbiAgICAgICAgc2VydmVyLFxyXG4gICAgICAgIHVzZXIsIHNldFVzZXIsXHJcbiAgICAgICAgbmF2T3Blbiwgc2V0TmF2T3BlbixcclxuICAgICAgICBkYXJrVGhlbWUsIHNldERhcmtUaGVtZSxcclxuICAgICAgICBhY2Nlc3NUb2tlbiwgc2V0QWNjZXNzVG9rZW4sXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPERlZmF1bHRDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+XHJcbiAgICAgICAgICAgIDxEeW5hbWljV2lkdGhDb21wb25lbnQgbmF2YmFyPXtuYXZPcGVufT5cclxuICAgICAgICAgICAgICAgIHshbG9hZGluZyAmJiAoY2hpbGRyZW4pfVxyXG4gICAgICAgICAgICA8L0R5bmFtaWNXaWR0aENvbXBvbmVudD5cclxuICAgICAgICA8L0RlZmF1bHRDb250ZXh0LlByb3ZpZGVyPlxyXG4gICAgKVxyXG59Il0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVJlZHVjZXIiLCJ1c2VSb3V0ZXIiLCJheGlvcyIsIkR5bmFtaWNXaWR0aENvbXBvbmVudCIsInVzZUNvb2tpZSIsIkRlZmF1bHRDb250ZXh0IiwidW5kZWZpbmVkIiwidXNlRGVmYXVsdCIsImNvbnRleHQiLCJFcnJvciIsIlJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJudW1iZXIiLCJwYXlsb2FkIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsInJlc3BvbnNlIiwiZ2V0IiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsInN1Y2Nlc3MiLCJsb2dvdXQiLCJyZWZyZXNoUmVzcG9uc2UiLCJwb3N0Iiwid2l0aENyZWRlbnRpYWxzIiwiRGVmYXVsdFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJpbml0aWFsU3RhdGUiLCJyb3V0ZXIiLCJkaXNwYXRjaCIsInVzZXIiLCJzZXRVc2VyIiwibG9hZGluZyIsInNldExvYWRpbmciLCJuYXZPcGVuIiwic2V0TmF2T3BlbiIsImRhcmtUaGVtZSIsInNldERhcmtUaGVtZSIsImFjY2Vzc1Rva2VuIiwic2V0QWNjZXNzVG9rZW4iLCJzZXJ2ZXIiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU0VSVkVSIiwidGhlbiIsInVzZXJuYW1lIiwiZW1haWwiLCJhdmF0YXIiLCJjYXRjaCIsImVyciIsImZpbmFsbHkiLCJyb290IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiYXNQYXRoIiwicHVzaCIsInZhbHVlIiwiUHJvdmlkZXIiLCJuYXZiYXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/contexts/Default.tsx\n"));

/***/ })

});