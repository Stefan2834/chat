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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DefaultContext: function() { return /* binding */ DefaultContext; },\n/* harmony export */   DefaultProvider: function() { return /* binding */ DefaultProvider; },\n/* harmony export */   useDefault: function() { return /* binding */ useDefault; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_DynamicWidth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/DynamicWidth */ \"./src/components/DynamicWidth.tsx\");\n/* harmony import */ var _customHooks_useCookie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/customHooks/useCookie */ \"./src/customHooks/useCookie.tsx\");\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\nconst DefaultContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction useDefault() {\n    _s();\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(DefaultContext);\n    if (!context) {\n        throw new Error(\"useDefault must be used within an DefaultProvider\");\n    }\n    return context;\n}\n_s(useDefault, \"b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=\");\nfunction Reducer(state, action) {\n    switch(action.type){\n        case \"test\":\n            return {\n                ...state,\n                number: action.payload.number\n            };\n        default:\n            return state;\n    }\n}\n_c = Reducer;\nconst verifyToken = async (token)=>{\n    // const response = await axios.get('/api/token',\n    //     { headers: { Authorization: `Bearer ${token}` } }\n    // )\n    // console.log(response)\n    // if (response.data.success) {\n    //     return response.data\n    // } else {\n    //     if(!response.data.logout) {\n    //         const refreshResponse = await axios.post('/api/token', {}, { withCredentials: true })\n    //         console.log(refreshResponse)\n    //         if(refreshResponse.data.success) {\n    //             return refreshResponse.data\n    //         } else {\n    //             return refreshResponse.data\n    //         }\n    //     } \n    //     return null\n    // }\n    return null;\n};\nfunction DefaultProvider(param) {\n    let { children } = param;\n    _s1();\n    const initialState = {\n        number: 0\n    };\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(Reducer, initialState);\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [navOpen, setNavOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [darkTheme, setDarkTheme] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [accessToken, setAccessToken] = (0,_customHooks_useCookie__WEBPACK_IMPORTED_MODULE_4__.useCookie)(\"accessToken\", \"\");\n    const server = \"http://localhost:9000\" || 0;\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        verifyToken(accessToken).then((data)=>{\n            var _data;\n            if ((_data = data) === null || _data === void 0 ? void 0 : _data.success) {\n                console.log(data);\n                setUser({\n                    username: data.username,\n                    email: data.email,\n                    avatar: data.avatar\n                });\n            }\n        }).catch((err)=>console.log(err)).finally(()=>setLoading(false));\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const root = document.documentElement;\n        if (darkTheme) {\n            root.style.setProperty(\"--first\", \"#141414\");\n            root.style.setProperty(\"--first-reverse\", \"#fff\");\n            root.style.setProperty(\"--second\", \"#1b1b1b\");\n            root.style.setProperty(\"--third\", \"#2b2b2b\");\n            root.style.setProperty(\"--main\", \"#a9def9\");\n        } else {\n            root.style.setProperty(\"--first\", \"#141414\");\n            root.style.setProperty(\"--first-reverse\", \"#fff\");\n            root.style.setProperty(\"--second\", \"#1b1b1b\");\n            root.style.setProperty(\"--third\", \"#2b2b2b\");\n            root.style.setProperty(\"--main\", \"#a9def9\");\n        }\n    }, [\n        darkTheme\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!loading && user && router.asPath === \"/\") {\n            router.push(\"/main/home\");\n        } else if (!loading && !user && router.asPath !== \"/\") {\n            router.push(\"/\");\n        }\n    }, [\n        router.asPath\n    ]);\n    const value = {\n        state,\n        dispatch,\n        server,\n        user,\n        setUser,\n        navOpen,\n        setNavOpen,\n        darkTheme,\n        setDarkTheme,\n        accessToken,\n        setAccessToken\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(DefaultContext.Provider, {\n        value: value,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_DynamicWidth__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n            navbar: navOpen,\n            children: !loading && children\n        }, void 0, false, {\n            fileName: \"D:\\\\React\\\\chat-app\\\\src\\\\contexts\\\\Default.tsx\",\n            lineNumber: 145,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\React\\\\chat-app\\\\src\\\\contexts\\\\Default.tsx\",\n        lineNumber: 144,\n        columnNumber: 9\n    }, this);\n}\n_s1(DefaultProvider, \"fbjsWgXGnBvrqiK2UmKMAHAVrp4=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        _customHooks_useCookie__WEBPACK_IMPORTED_MODULE_4__.useCookie\n    ];\n});\n_c1 = DefaultProvider;\nvar _c, _c1;\n$RefreshReg$(_c, \"Reducer\");\n$RefreshReg$(_c1, \"DefaultProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFtQjtZQUMxQ0osS0FBS0csS0FBSyxDQUFDQyxXQUFXLENBQUMsWUFBWTtZQUNuQ0osS0FBS0csS0FBSyxDQUFDQyxXQUFXLENBQUMsV0FBVztZQUNsQ0osS0FBS0csS0FBSyxDQUFDQyxXQUFXLENBQUMsVUFBVTtRQUNyQztJQUVKLEdBQUc7UUFBQ3ZCO0tBQVU7SUFFZDlCLGdEQUFTQSxDQUFDO1FBQ04sSUFBSSxDQUFDMEIsV0FBV0YsUUFBUUYsT0FBT2dDLE1BQU0sS0FBSyxLQUFLO1lBQzNDaEMsT0FBT2lDLElBQUksQ0FBQztRQUNoQixPQUFPLElBQUksQ0FBQzdCLFdBQVcsQ0FBQ0YsUUFBUUYsT0FBT2dDLE1BQU0sS0FBSyxLQUFLO1lBQ25EaEMsT0FBT2lDLElBQUksQ0FBQztRQUNoQjtJQUNKLEdBQUc7UUFBQ2pDLE9BQU9nQyxNQUFNO0tBQUM7SUFHbEIsTUFBTUUsUUFBNkI7UUFDL0I1QztRQUNBVztRQUNBVztRQUNBVjtRQUFNQztRQUNORztRQUFTQztRQUNUQztRQUFXQztRQUNYQztRQUFhQztJQUNqQjtJQUVBLHFCQUNJLDhEQUFDM0IsZUFBZW1ELFFBQVE7UUFBQ0QsT0FBT0E7a0JBQzVCLDRFQUFDcEQsZ0VBQXFCQTtZQUFDc0QsUUFBUTlCO3NCQUMxQixDQUFDRixXQUFZTjs7Ozs7Ozs7Ozs7QUFJOUI7SUF4RWdCRDs7UUFFR2hCLGtEQUFTQTtRQU1jRSw2REFBU0E7OztNQVJuQ2MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbnRleHRzL0RlZmF1bHQudHN4P2FjYmEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZVJlZHVjZXIsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgRHluYW1pY1dpZHRoQ29tcG9uZW50IGZyb20gJ0AvY29tcG9uZW50cy9EeW5hbWljV2lkdGgnO1xyXG5pbXBvcnQgeyB1c2VDb29raWUgfSBmcm9tICdAL2N1c3RvbUhvb2tzL3VzZUNvb2tpZSc7XHJcblxyXG5pbnRlcmZhY2UgRGVmYXVsdENvbnRleHRWYWx1ZSB7XHJcbiAgICBzdGF0ZTogU3RhdGU7XHJcbiAgICBkaXNwYXRjaDogRGlzcGF0Y2g7XHJcbiAgICBzZXJ2ZXI6IFN0cmluZztcclxuICAgIHVzZXI6IFVzZXIgfCBudWxsO1xyXG4gICAgc2V0VXNlcjogKHVzZXI6IFVzZXIgfCBudWxsKSA9PiB2b2lkLFxyXG4gICAgbmF2T3BlbjogYm9vbGVhbixcclxuICAgIHNldE5hdk9wZW46IChuYXZPcGVuOiBib29sZWFuKSA9PiB2b2lkLFxyXG4gICAgZGFya1RoZW1lOiBib29sZWFuLFxyXG4gICAgc2V0RGFya1RoZW1lOiAoZGFya1RoZW1lOiBib29sZWFuKSA9PiB2b2lkLFxyXG4gICAgYWNjZXNzVG9rZW46IHN0cmluZyxcclxuICAgIHNldEFjY2Vzc1Rva2VuOiAoYWNjZXNzVG9rZW46IHN0cmluZykgPT4gdm9pZCxcclxufVxyXG50eXBlIEFjdGlvbiA9IHsgdHlwZTogJ3Rlc3QnOyBwYXlsb2FkOiB7IG51bWJlcjogbnVtYmVyIH0gfTtcclxudHlwZSBEaXNwYXRjaCA9IChhY3Rpb246IEFjdGlvbikgPT4gdm9pZDtcclxuZXhwb3J0IHR5cGUgU3RhdGUgPSB7XHJcbiAgICBudW1iZXI6IG51bWJlcjtcclxufTtcclxudHlwZSBSZWR1Y2VyRnVuY3Rpb24gPSAoc3RhdGU6IFN0YXRlLCBhY3Rpb246IEFjdGlvbikgPT4gU3RhdGU7XHJcblxyXG5leHBvcnQgY29uc3QgRGVmYXVsdENvbnRleHQgPSBjcmVhdGVDb250ZXh0PERlZmF1bHRDb250ZXh0VmFsdWUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlRGVmYXVsdCgpIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KERlZmF1bHRDb250ZXh0KTtcclxuICAgIGlmICghY29udGV4dCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndXNlRGVmYXVsdCBtdXN0IGJlIHVzZWQgd2l0aGluIGFuIERlZmF1bHRQcm92aWRlcicpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbnRleHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFJlZHVjZXIoc3RhdGU6IFN0YXRlLCBhY3Rpb246IEFjdGlvbik6IFN0YXRlIHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlICd0ZXN0JzpcclxuICAgICAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIG51bWJlcjogYWN0aW9uLnBheWxvYWQubnVtYmVyIH07XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgRGVmYXVsdFByb3ZpZGVyUHJvcHMge1xyXG4gICAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcclxufVxyXG5cclxudHlwZSBVc2VyID0ge1xyXG4gICAgZW1haWw6IHN0cmluZyB8IG51bGwsXHJcbiAgICB1c2VybmFtZTogc3RyaW5nIHwgbnVsbCxcclxuICAgIGF2YXRhcjogc3RyaW5nIHwgbnVsbFxyXG59XHJcblxyXG5jb25zdCB2ZXJpZnlUb2tlbiA9IGFzeW5jICh0b2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgICAvLyBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCgnL2FwaS90b2tlbicsXHJcbiAgICAvLyAgICAgeyBoZWFkZXJzOiB7IEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gIH0gfVxyXG4gICAgLy8gKVxyXG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAvLyBpZiAocmVzcG9uc2UuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGFcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgaWYoIXJlc3BvbnNlLmRhdGEubG9nb3V0KSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHJlZnJlc2hSZXNwb25zZSA9IGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvdG9rZW4nLCB7fSwgeyB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSlcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2cocmVmcmVzaFJlc3BvbnNlKVxyXG4gICAgLy8gICAgICAgICBpZihyZWZyZXNoUmVzcG9uc2UuZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gcmVmcmVzaFJlc3BvbnNlLmRhdGFcclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIHJldHVybiByZWZyZXNoUmVzcG9uc2UuZGF0YVxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSBcclxuICAgIC8vICAgICByZXR1cm4gbnVsbFxyXG4gICAgLy8gfVxyXG4gICAgcmV0dXJuIG51bGxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERlZmF1bHRQcm92aWRlcih7IGNoaWxkcmVuIH06IERlZmF1bHRQcm92aWRlclByb3BzKSB7XHJcbiAgICBjb25zdCBpbml0aWFsU3RhdGU6IFN0YXRlID0geyBudW1iZXI6IDAgfVxyXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcclxuICAgIGNvbnN0IFtzdGF0ZSwgZGlzcGF0Y2hdID0gdXNlUmVkdWNlcjxSZWR1Y2VyRnVuY3Rpb24+KFJlZHVjZXIsIGluaXRpYWxTdGF0ZSk7XHJcbiAgICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XHJcbiAgICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKVxyXG4gICAgY29uc3QgW25hdk9wZW4sIHNldE5hdk9wZW5dID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSlcclxuICAgIGNvbnN0IFtkYXJrVGhlbWUsIHNldERhcmtUaGVtZV0gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKVxyXG4gICAgY29uc3QgW2FjY2Vzc1Rva2VuLCBzZXRBY2Nlc3NUb2tlbl0gPSB1c2VDb29raWUoJ2FjY2Vzc1Rva2VuJywgJycpXHJcbiAgICBjb25zdCBzZXJ2ZXI6IFN0cmluZyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NFUlZFUiB8fCAnJ1xyXG5cclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIHZlcmlmeVRva2VuKGFjY2Vzc1Rva2VuKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhPy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgc2V0VXNlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IGRhdGEudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGRhdGEuZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyOiBkYXRhLmF2YXRhclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpXHJcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHNldExvYWRpbmcoZmFsc2UpKVxyXG4gICAgfSwgW10pXHJcblxyXG5cclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKGRhcmtUaGVtZSkge1xyXG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLWZpcnN0JywgJyMxNDE0MTQnKTtcclxuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1maXJzdC1yZXZlcnNlJywgJyNmZmYnKTtcclxuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1zZWNvbmQnLCAnIzFiMWIxYicpO1xyXG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXRoaXJkJywgJyMyYjJiMmInKTtcclxuICAgICAgICAgICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1tYWluJywgXCIjYTlkZWY5XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tZmlyc3QnLCAnIzE0MTQxNCcpO1xyXG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLWZpcnN0LXJldmVyc2UnLCAnI2ZmZicpO1xyXG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXNlY29uZCcsICcjMWIxYjFiJyk7XHJcbiAgICAgICAgICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tdGhpcmQnLCAnIzJiMmIyYicpO1xyXG4gICAgICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLW1haW4nLCBcIiNhOWRlZjlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sIFtkYXJrVGhlbWVdKVxyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFsb2FkaW5nICYmIHVzZXIgJiYgcm91dGVyLmFzUGF0aCA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgIHJvdXRlci5wdXNoKCcvbWFpbi9ob21lJylcclxuICAgICAgICB9IGVsc2UgaWYgKCFsb2FkaW5nICYmICF1c2VyICYmIHJvdXRlci5hc1BhdGggIT09ICcvJykge1xyXG4gICAgICAgICAgICByb3V0ZXIucHVzaCgnLycpXHJcbiAgICAgICAgfVxyXG4gICAgfSwgW3JvdXRlci5hc1BhdGhdKVxyXG5cclxuXHJcbiAgICBjb25zdCB2YWx1ZTogRGVmYXVsdENvbnRleHRWYWx1ZSA9IHtcclxuICAgICAgICBzdGF0ZSxcclxuICAgICAgICBkaXNwYXRjaCxcclxuICAgICAgICBzZXJ2ZXIsXHJcbiAgICAgICAgdXNlciwgc2V0VXNlcixcclxuICAgICAgICBuYXZPcGVuLCBzZXROYXZPcGVuLFxyXG4gICAgICAgIGRhcmtUaGVtZSwgc2V0RGFya1RoZW1lLFxyXG4gICAgICAgIGFjY2Vzc1Rva2VuLCBzZXRBY2Nlc3NUb2tlbixcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8RGVmYXVsdENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT5cclxuICAgICAgICAgICAgPER5bmFtaWNXaWR0aENvbXBvbmVudCBuYXZiYXI9e25hdk9wZW59PlxyXG4gICAgICAgICAgICAgICAgeyFsb2FkaW5nICYmIChjaGlsZHJlbil9XHJcbiAgICAgICAgICAgIDwvRHluYW1pY1dpZHRoQ29tcG9uZW50PlxyXG4gICAgICAgIDwvRGVmYXVsdENvbnRleHQuUHJvdmlkZXI+XHJcbiAgICApXHJcbn0iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlUmVkdWNlciIsInVzZVJvdXRlciIsIkR5bmFtaWNXaWR0aENvbXBvbmVudCIsInVzZUNvb2tpZSIsIkRlZmF1bHRDb250ZXh0IiwidW5kZWZpbmVkIiwidXNlRGVmYXVsdCIsImNvbnRleHQiLCJFcnJvciIsIlJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJudW1iZXIiLCJwYXlsb2FkIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsIkRlZmF1bHRQcm92aWRlciIsImNoaWxkcmVuIiwiaW5pdGlhbFN0YXRlIiwicm91dGVyIiwiZGlzcGF0Y2giLCJ1c2VyIiwic2V0VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwibmF2T3BlbiIsInNldE5hdk9wZW4iLCJkYXJrVGhlbWUiLCJzZXREYXJrVGhlbWUiLCJhY2Nlc3NUb2tlbiIsInNldEFjY2Vzc1Rva2VuIiwic2VydmVyIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NFUlZFUiIsInRoZW4iLCJkYXRhIiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJ1c2VybmFtZSIsImVtYWlsIiwiYXZhdGFyIiwiY2F0Y2giLCJlcnIiLCJmaW5hbGx5Iiwicm9vdCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsImFzUGF0aCIsInB1c2giLCJ2YWx1ZSIsIlByb3ZpZGVyIiwibmF2YmFyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/contexts/Default.tsx\n"));

/***/ })

});