(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+tZ6":
/*!****************************************************************!*\
  !*** ./libs/swap/forms/src/lib/directives/utilities/cursor.ts ***!
  \****************************************************************/
/*! exports provided: cursorPositionFor, setCursorPositionFor, nextCursorPositionFor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cursorPositionFor", function() { return cursorPositionFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCursorPositionFor", function() { return setCursorPositionFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextCursorPositionFor", function() { return nextCursorPositionFor; });
/* harmony import */ var _mask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mask */ "6gzr");

function cursorPositionFor(el) {
    return (el.nativeElement || el).selectionStart;
}
/**
 * Set cursor position at a given `nativeEl` from a `ElementRef` or its wrapper.
 */
function setCursorPositionFor(el, nextPos) {
    const nativeEl = el.nativeElement || el;
    nativeEl.selectionStart = nativeEl.selectionEnd = nextPos;
}
/** Adjusts cursorPosition for input element. Skips non decimal/letter chars.
 * @param addingAtLeft cursor will it keep its position.
 * @param decimalsOnly if should takes into consideration both decimals and letters for determining cursor position */
function nextCursorPositionFor(el, previousValue, nextValue, addingAtLeft = false, decimalsOnly = false, removingAtLeft = false) {
    const initialCursorPosition = cursorPositionFor(el);
    const maskCheck = decimalsOnly ? /[^\d]/ : /[^\w]/;
    const isAdding = removingAtLeft || !addingAtLeft
        ? nextValue.length > (previousValue === null || previousValue === void 0 ? void 0 : previousValue.length)
        : nextValue.length >= (previousValue === null || previousValue === void 0 ? void 0 : previousValue.length);
    let nextCursorPosition = initialCursorPosition;
    if (addingAtLeft && previousValue) {
        if (isAdding) {
            nextCursorPosition += nextValue.length - previousValue.length - 1;
        }
        else if (previousValue.length > nextValue.length) {
            nextCursorPosition += nextValue.length - previousValue.length + 1;
        }
        else {
            nextCursorPosition +=
                Object(_mask__WEBPACK_IMPORTED_MODULE_0__["unmaskedNumericValueFor"])(previousValue) >
                    Object(_mask__WEBPACK_IMPORTED_MODULE_0__["unmaskedNumericValueFor"])(nextValue)
                    ? 1
                    : 0;
        }
    }
    let testPosition = nextCursorPosition - 1;
    while (maskCheck.test(nextValue[testPosition])) {
        if (isAdding) {
            testPosition++;
            nextCursorPosition++;
        }
        else {
            testPosition--;
            nextCursorPosition--;
        }
        if (testPosition < 0) {
            nextCursorPosition = initialCursorPosition + 1;
            break;
        }
    }
    return nextCursorPosition;
}


/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./apps/app/src/main.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/runner/work/swap/swap/apps/app/src/main.ts */"iEOa");


/***/ }),

/***/ "04Sp":
/*!**************************************************************!*\
  !*** ./libs/swap/forms/src/lib/directives/mask.directive.ts ***!
  \**************************************************************/
/*! exports provided: MaskDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskDirective", function() { return MaskDirective; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _utilities_mask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities/mask */ "6gzr");
/* harmony import */ var _utilities_mask_validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities/mask-validation */ "YseE");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _utilities_cursor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utilities/cursor */ "+tZ6");









class MaskDirective {
    constructor(selfNgControl, elRef) {
        this.selfNgControl = selfNgControl;
        this.elRef = elRef;
        this._destroy = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        /**
         * Adicione validação para que a entrada corresponda
         * ao comprimento da máscara, senão retorna o erro de
         * validação `invalidLength` no` ngControl`.
         */
        this.validateMaskInput = false;
        /** Defina valores claros para o formControl */
        this.unmasked = false;
    }
    /**
     * Formatos de máscara, aceita um único ou vários,
     * combinando por pedido. por exemplo, "DDD-WWW.CCC"
     *
     * D: números; C: letras; W: ambos;
     *
     * Todos os outros caracteres são tratados como
     * parte da máscara que acabou de ser exibida.
     * */
    set mask(value) {
        this._mask = Array.isArray(value)
            ? [...value].sort((a, b) => a.length - a.length)
            : value;
    }
    get mask() {
        return this._mask;
    }
    ngOnInit() {
        var _a, _b;
        if (!this.mask) {
            console.warn('WebrMask: Um valor de Máscara é necessário para que a diretiva seja iniciada.');
            return;
        }
        this.control = (_b = (_a = this.selfNgControl) === null || _a === void 0 ? void 0 : _a.control) !== null && _b !== void 0 ? _b : this.ngControl;
        if (!this.control) {
            console.warn('WebrMask: É necessário um FormControl para que a diretiva seja iniciada.');
            return;
        }
        this.nativeEl = this.elRef.nativeElement.hasChildNodes()
            ? this.elRef.nativeElement.getElementsByTagName('input')[0]
            : this.elRef.nativeElement;
        if (!this.nativeEl) {
            console.warn('WebrMask: Um elRef do tipo de entrada é necessário para que a diretiva seja iniciada.');
            return;
        }
        if (this.validateMaskInput) {
            this.control.setValidators([
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required,
                Object(_utilities_mask_validation__WEBPACK_IMPORTED_MODULE_2__["maskFormatValidator"])(this.mask),
            ]);
        }
        this.control.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(this.control.value), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroy))
            .subscribe((value) => this.setValue(this.maskValueFor(value)));
    }
    setValue(nextValue) {
        const nextCursorPosition = nextValue
            ? Object(_utilities_cursor__WEBPACK_IMPORTED_MODULE_6__["nextCursorPositionFor"])(this.nativeEl, this.previousValue, nextValue)
            : Object(_utilities_cursor__WEBPACK_IMPORTED_MODULE_6__["cursorPositionFor"])(this.nativeEl);
        this.previousValue = nextValue;
        this.control.setValue(nextValue, { emitEvent: false });
        if (this.unmasked && nextValue) {
            this.control.setValue(Object(_utilities_mask__WEBPACK_IMPORTED_MODULE_1__["unmaskedValueFor"])(nextValue), {
                emitEvent: false,
                emitModelToViewChange: false,
            });
        }
        Object(_utilities_cursor__WEBPACK_IMPORTED_MODULE_6__["setCursorPositionFor"])(this.nativeEl, nextCursorPosition);
    }
    maskValueFor(value) {
        if (!value)
            return '';
        const unmaskedValue = Object(_utilities_mask__WEBPACK_IMPORTED_MODULE_1__["unmaskedValueFor"])(value);
        const nextMask = !Array.isArray(this.mask)
            ? this.mask
            : this.mask.find((mask) => Object(_utilities_mask__WEBPACK_IMPORTED_MODULE_1__["unmaskedValueFor"])(mask).length >= unmaskedValue.length) || this.mask[this.mask.length - 1];
        return Object(_utilities_mask__WEBPACK_IMPORTED_MODULE_1__["matchAndReplaceFor"])(unmaskedValue, nextMask);
    }
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
        this._destroy.unsubscribe();
    }
}
MaskDirective.ɵfac = function MaskDirective_Factory(t) { return new (t || MaskDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ElementRef"])); };
MaskDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineDirective"]({ type: MaskDirective, selectors: [["input", "swap-mask", ""]], inputs: { ngControl: "ngControl", mask: ["swap-mask", "mask"], validateMaskInput: "validateMaskInput", unmasked: "unmasked" } });


/***/ }),

/***/ "2CvL":
/*!******************************************!*\
  !*** ./apps/app/src/app/shared/index.ts ***!
  \******************************************/
/*! exports provided: NavigationService, Navigation, SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation */ "tZZ+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavigationService", function() { return _navigation__WEBPACK_IMPORTED_MODULE_0__["NavigationService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navigation", function() { return _navigation__WEBPACK_IMPORTED_MODULE_0__["Navigation"]; });

/* harmony import */ var _shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared.module */ "3ewj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return _shared_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"]; });





/***/ }),

/***/ "35IU":
/*!****************************************************************!*\
  !*** ./apps/app/src/app/containers/slider/slider.container.ts ***!
  \****************************************************************/
/*! exports provided: SliderContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderContainer", function() { return SliderContainer; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _libs_swap_forms_src_lib_components_slider_slider_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/components/slider/slider.component */ "Hi7J");
/* harmony import */ var _libs_swap_forms_src_lib_directives_control_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/directives/control.directive */ "ARs9");
/* harmony import */ var _components_form_footer_form_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/form-footer/form-footer.component */ "b9dF");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "SVse");







class SliderContainer {
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({
            control: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](59),
        });
    }
}
SliderContainer.ɵfac = function SliderContainer_Factory(t) { return new (t || SliderContainer)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"])); };
SliderContainer.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SliderContainer, selectors: [["ng-component"]], decls: 9, vars: 4, consts: [["id", "swap", 3, "formGroup"], ["swap-slider", ""], ["type", "range", "swap-control", "", "formControlName", "control"], ["swap-form", "swap"]], template: function SliderContainer_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "footer", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 2, ctx.form.value));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _libs_swap_forms_src_lib_components_slider_slider_component__WEBPACK_IMPORTED_MODULE_2__["SliderComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["RangeValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _libs_swap_forms_src_lib_directives_control_directive__WEBPACK_IMPORTED_MODULE_3__["ControlDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _components_form_footer_form_footer_component__WEBPACK_IMPORTED_MODULE_4__["FormFooterComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["JsonPipe"]], encapsulation: 2 });


/***/ }),

/***/ "37kt":
/*!********************************************************************!*\
  !*** ./libs/swap/layout/src/lib/directives/nav-focus.directive.ts ***!
  \********************************************************************/
/*! exports provided: NavFocusDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavFocusDirective", function() { return NavFocusDirective; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");




class NavFocusDirective {
    constructor(router) {
        this.router = router;
        console.log(this.mainHeader);
        router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((e) => e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]))
            .subscribe(() => {
            // const mainHeader = document.querySelector('#main-content-header');
            const mainHeader = this.mainHeader;
            mainHeader.addEventListener('focus', console.log);
            console.log(mainHeader);
            if (mainHeader) {
                mainHeader.focus();
            }
        });
    }
    get mainHeader() {
        return this._mainHeader;
    }
    set mainHeader(el) {
        console.log(el);
        this._mainHeader = el;
    }
}
NavFocusDirective.ɵfac = function NavFocusDirective_Factory(t) { return new (t || NavFocusDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
NavFocusDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: NavFocusDirective, selectors: [["", "swap-nav-focus", ""]], inputs: { mainHeader: ["main-header", "mainHeader"] } });


/***/ }),

/***/ "3ewj":
/*!**************************************************!*\
  !*** ./apps/app/src/app/shared/shared.module.ts ***!
  \**************************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");


class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](SharedModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]] }); })();


/***/ }),

/***/ "5MdJ":
/*!******************************************************!*\
  !*** ./libs/swap/layout/src/lib/components/index.ts ***!
  \******************************************************/
/*! exports provided: TabComponent, TabsContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs */ "VTa+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabComponent", function() { return _tabs__WEBPACK_IMPORTED_MODULE_0__["TabComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabsContainer", function() { return _tabs__WEBPACK_IMPORTED_MODULE_0__["TabsContainer"]; });




/***/ }),

/***/ "6gzr":
/*!**************************************************************!*\
  !*** ./libs/swap/forms/src/lib/directives/utilities/mask.ts ***!
  \**************************************************************/
/*! exports provided: maskedNumericValueFor, unmaskedNumericValueFor, unmaskedValueFor, hasNonDecimalCharacters, matchAndReplaceFor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maskedNumericValueFor", function() { return maskedNumericValueFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmaskedNumericValueFor", function() { return unmaskedNumericValueFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmaskedValueFor", function() { return unmaskedValueFor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasNonDecimalCharacters", function() { return hasNonDecimalCharacters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchAndReplaceFor", function() { return matchAndReplaceFor; });
function maskedNumericValueFor(value = '', thousandSeparator = ' ', decimalSeparator = '.', prefix = '', digitsAfterSeparator = 2, maxDigits = 12, allowNegatives = true) {
    var _a;
    const isNegative = allowNegatives && ((_a = String(value).match(/-/g)) === null || _a === void 0 ? void 0 : _a.length) === 1;
    let baseValue = unmaskedNumericValueFor(value, true);
    baseValue =
        (baseValue.length >= 1 && String(parseInt(baseValue, 10))) || '000';
    const integerLength = baseValue.length - digitsAfterSeparator;
    const cents = baseValue
        .substr((integerLength > 0 && integerLength) || 0)
        .padStart(digitsAfterSeparator, '0');
    let integerValue = baseValue
        .substring(0, baseValue.length - digitsAfterSeparator > maxDigits
        ? maxDigits
        : baseValue.length - digitsAfterSeparator)
        .padStart(1, '0');
    if (thousandSeparator)
        integerValue = integerValue.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    return `${prefix ? `${prefix} ` : ''}${isNegative ? '-' : ''}${integerValue}${decimalSeparator}${cents}`;
}
function unmaskedNumericValueFor(value, removeNegative = false) {
    return removeNegative
        ? String(value).replace(/[^0-9]+/g, '')
        : String(value).replace(/[^0-9-]+/g, '');
}
function unmaskedValueFor(value) {
    return String(value).replace(/[^\w]+/g, '');
}
function hasNonDecimalCharacters(value) {
    return !/^-?\d+$/.test(String(value));
}
function matchAndReplaceFor(text, pattern) {
    let patternOffset = 0;
    const testPositionFunc = (prevText, cur, i) => {
        switch (pattern[i + patternOffset]) {
            case 'D':
                if (/[\d]/.test(cur))
                    return `${prevText}${cur}`;
                break;
            case 'C':
                if (/[\A-Z, a-z]/.test(cur))
                    return `${prevText}${cur}`;
                break;
            case 'W':
                if (/[\w]/.test(cur))
                    return `${prevText}${cur}`;
                break;
            default: {
                if (/[^\w]/.test(pattern[i + patternOffset])) {
                    patternOffset++;
                    return testPositionFunc(`${prevText}${pattern[i + patternOffset - 1]}`, cur, i);
                }
            }
        }
        patternOffset--;
        return `${prevText}`;
    };
    return text.split('').reduce(testPositionFunc, '');
}


/***/ }),

/***/ "6vcy":
/*!**************************************************************!*\
  !*** ./apps/app/src/app/containers/radio/radio.container.ts ***!
  \**************************************************************/
/*! exports provided: RadioContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadioContainer", function() { return RadioContainer; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _libs_swap_forms_src_lib_components_selection_radio_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/components/selection/radio.component */ "tiYt");
/* harmony import */ var _libs_swap_forms_src_lib_directives_control_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/directives/control.directive */ "ARs9");
/* harmony import */ var _components_form_footer_form_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/form-footer/form-footer.component */ "b9dF");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "SVse");







class RadioContainer {
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({
            control: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](2),
        });
    }
}
RadioContainer.ɵfac = function RadioContainer_Factory(t) { return new (t || RadioContainer)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"])); };
RadioContainer.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RadioContainer, selectors: [["ng-component"]], decls: 13, vars: 6, consts: [["id", "swap", 3, "formGroup"], ["swap-radio", ""], ["type", "radio", "swap-control", "", "formControlName", "control", "name", "control", 3, "value"], ["swap-form", "swap"]], template: function RadioContainer_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "footer", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](12, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](12, 4, ctx.form.value));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _libs_swap_forms_src_lib_components_selection_radio_component__WEBPACK_IMPORTED_MODULE_2__["RadioComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["RadioControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _libs_swap_forms_src_lib_directives_control_directive__WEBPACK_IMPORTED_MODULE_3__["ControlDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _components_form_footer_form_footer_component__WEBPACK_IMPORTED_MODULE_4__["FormFooterComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["JsonPipe"]], encapsulation: 2 });


/***/ }),

/***/ "7J5F":
/*!**************************************!*\
  !*** ./libs/swap/forms/src/index.ts ***!
  \**************************************/
/*! exports provided: SwapFormsModule, ButtonComponent, OptionComponent, SelectPanelComponent, SelectComponent, SelectService, CheckboxComponent, RadioComponent, SliderComponent, TextfieldComponent, InputBase, CheckboxGroupDirective, ControlDirective, CurrencyMaskDirective, MaskDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_swap_forms_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/swap-forms.module */ "eoJu");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SwapFormsModule", function() { return _lib_swap_forms_module__WEBPACK_IMPORTED_MODULE_0__["SwapFormsModule"]; });

/* harmony import */ var _lib_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/components */ "yhS3");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonComponent", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["ButtonComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OptionComponent", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["OptionComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectPanelComponent", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["SelectPanelComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectComponent", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["SelectComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectService", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["SelectService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxComponent", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["CheckboxComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioComponent", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["RadioComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SliderComponent", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["SliderComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextfieldComponent", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["TextfieldComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputBase", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["InputBase"]; });

/* harmony import */ var _lib_directives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/directives */ "AyPR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxGroupDirective", function() { return _lib_directives__WEBPACK_IMPORTED_MODULE_2__["CheckboxGroupDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControlDirective", function() { return _lib_directives__WEBPACK_IMPORTED_MODULE_2__["ControlDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CurrencyMaskDirective", function() { return _lib_directives__WEBPACK_IMPORTED_MODULE_2__["CurrencyMaskDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MaskDirective", function() { return _lib_directives__WEBPACK_IMPORTED_MODULE_2__["MaskDirective"]; });






/***/ }),

/***/ "8+y3":
/*!***********************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/select/interfaces/index.ts ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _option_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./option.interface */ "PGz9");
/* empty/unused harmony star reexport *//* harmony import */ var _select_panel_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select-panel.interface */ "9L8Q");
/* empty/unused harmony star reexport *//* harmony import */ var _select_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./select.interface */ "CLCU");
/* empty/unused harmony star reexport */




/***/ }),

/***/ "9L8Q":
/*!****************************************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/select/interfaces/select-panel.interface.ts ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "A78c":
/*!********************************************************************!*\
  !*** ./libs/swap/layout/src/lib/components/tabs/tabs.container.ts ***!
  \********************************************************************/
/*! exports provided: TabsContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsContainer", function() { return TabsContainer; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "SVse");



const _c0 = function (a0) { return { "active": a0 }; };
function TabsContainer_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup.enter", function TabsContainer_li_1_Template_a_keyup_enter_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const tab_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.selectTab(tab_r1); })("keyup.space", function TabsContainer_li_1_Template_a_keyup_space_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const tab_r1 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.selectTab(tab_r1); })("click", function TabsContainer_li_1_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const tab_r1 = ctx.$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.selectTab(tab_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, tab_r1.active == true));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](tab_r1.tabTitle);
} }
const _c1 = ["*"];
class TabsContainer {
    constructor() {
        this.currentTabChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.ifTabSelected = false;
        this.tabs = [];
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
    }
    addTab(tab) {
        this.tabs.push(tab);
    }
    selectTab(tab) {
        this.tabs.forEach((tab) => (tab.active = false));
        this.currentTabChange.emit(tab);
        tab.active = true;
    }
    ngAfterContentInit() {
        this.tabs.forEach((tab) => {
            if (tab.active) {
                this.selectTab(tab);
                this.ifTabSelected = true;
            }
        });
        if (!this.ifTabSelected) {
            this.selectTab(this.tabs[0]);
        }
    }
}
TabsContainer.ɵfac = function TabsContainer_Factory(t) { return new (t || TabsContainer)(); };
TabsContainer.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TabsContainer, selectors: [["swap-tabs"]], inputs: { disabled: "disabled" }, outputs: { currentTabChange: "currentTabChange" }, exportAs: ["swapTabs"], ngContentSelectors: _c1, decls: 4, vars: 3, consts: [[1, "tabs__tab-bar"], ["class", "tabs__tab", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "overlay"], [1, "tabs__tab", 3, "ngClass"], ["tabindex", "0", "role", "button", 3, "keyup.enter", "keyup.space", "click"]], template: function TabsContainer_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TabsContainer_li_1_Template, 3, 4, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 2);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.tabs);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("display", ctx.disabled ? "block" : "none");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgClass"]], styles: ["[_nghost-%COMP%] {\n  padding: 10px 10px;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n}\n\n.tabs__tab-bar[_ngcontent-%COMP%] {\n  padding: 0px;\n  align-self: center;\n  border-radius: 4px;\n  overflow: hidden;\n  margin-bottom: -12px;\n  z-index: 1000;\n  border: 1px solid rgba(0, 0, 0, 0.25);\n}\n\n.tabs__tab[_ngcontent-%COMP%] {\n  background-color: white;\n  color: #2159f3;\n  display: inline-block;\n  padding: 4px 10px;\n  cursor: pointer;\n}\n\n.tabs__tab.active[_ngcontent-%COMP%] {\n  background-color: #2159f3;\n  color: white;\n}\n\n.overlay[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.24);\n  position: absolute;\n  z-index: 1000;\n  opacity: 0.5;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  top: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RhYnMuY29udGFpbmVyLnNjc3MiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zdHlsZXMvX3ZhcmlhYmxlcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQURGOztBQUdBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0VBQ0EsYUFBQTtFQUNBLHFDQUFBO0FBQUY7O0FBRUE7RUFDRSx1QkNqQjJCO0VEa0IzQixjQ25CZ0M7RURvQmhDLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBQ0E7RUFDRSx5QkN6QmdDO0VEMEJoQyxZQ3pCMkI7QUQyQjdCOztBQUFBO0VBQ0UsK0JDM0I0QjtFRDRCNUIsa0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7QUFHRiIsImZpbGUiOiJ0YWJzLmNvbnRhaW5lci5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vLi4vLi4vLi4vc3JjL3N0eWxlcy92YXJpYWJsZXMnO1xuXG46aG9zdCB7XG4gIHBhZGRpbmc6IDEwcHggMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnRhYnNfX3RhYi1iYXIge1xuICBwYWRkaW5nOiAwcHg7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW4tYm90dG9tOiAtMTJweDtcbiAgei1pbmRleDogMTAwMDtcbiAgYm9yZGVyOiAxcHggc29saWQgJHNlZWstcHJpbWFyeS1wcmVzc2VkLWRyb3Atc2hhZG93LWNvbG9yO1xufVxuLnRhYnNfX3RhYiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRzZWVrLXByaW1hcnktZGVmYXVsdC1jb2xvcjtcbiAgY29sb3I6ICRzZWVrLXByaW1hcnktZGVmYXVsdC1iYWNrZ3JvdW5kO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBhZGRpbmc6IDRweCAxMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4udGFic19fdGFiLmFjdGl2ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRzZWVrLXByaW1hcnktZGVmYXVsdC1iYWNrZ3JvdW5kO1xuICBjb2xvcjogJHNlZWstcHJpbWFyeS1kZWZhdWx0LWNvbG9yO1xufVxuLm92ZXJsYXkge1xuICBiYWNrZ3JvdW5kOiAkc2Vlay1wcmltYXJ5LWRlZmF1bHQtYm9yZGVyO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDEwMDA7XG4gIG9wYWNpdHk6IDAuNTtcbiAgYm90dG9tOiAwO1xuICByaWdodDogMDtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xufVxuIiwiJHNlZWstcHJpbWFyeS1kZWZhdWx0LWJhY2tncm91bmQ6IHJnYmEoMzMsIDg5LCAyNDMsIDEpO1xuJHNlZWstcHJpbWFyeS1kZWZhdWx0LWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xuJHNlZWstcHJpbWFyeS1kZWZhdWx0LWJvcmRlcjogcmdiYSgwLCAwLCAwLCAwLjI0KTtcbiRzZWVrLXByaW1hcnktcHJlc3NlZC1kcm9wLXNoYWRvdy1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcbiJdfQ== */"], changeDetection: 0 });


/***/ }),

/***/ "AP1M":
/*!***************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/selection/index.ts ***!
  \***************************************************************/
/*! exports provided: CheckboxComponent, RadioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _checkbox_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkbox.component */ "TU54");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxComponent", function() { return _checkbox_component__WEBPACK_IMPORTED_MODULE_0__["CheckboxComponent"]; });

/* harmony import */ var _radio_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./radio.component */ "tiYt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioComponent", function() { return _radio_component__WEBPACK_IMPORTED_MODULE_1__["RadioComponent"]; });





/***/ }),

/***/ "ARs9":
/*!*****************************************************************!*\
  !*** ./libs/swap/forms/src/lib/directives/control.directive.ts ***!
  \*****************************************************************/
/*! exports provided: ControlDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlDirective", function() { return ControlDirective; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");



class ControlDirective {
    constructor(ngControl) {
        this.ngControl = ngControl;
        this.placeholderSpace = ' ';
    }
}
ControlDirective.ɵfac = function ControlDirective_Factory(t) { return new (t || ControlDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControl"])); };
ControlDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: ControlDirective, selectors: [["", "swap-control", ""], ["", "swap-control", ""]], hostVars: 1, hostBindings: function ControlDirective_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("placeholder", ctx.placeholderSpace);
    } } });


/***/ }),

/***/ "AyPR":
/*!*****************************************************!*\
  !*** ./libs/swap/forms/src/lib/directives/index.ts ***!
  \*****************************************************/
/*! exports provided: CheckboxGroupDirective, ControlDirective, CurrencyMaskDirective, MaskDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _checkbox_group_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkbox-group.directive */ "p29b");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxGroupDirective", function() { return _checkbox_group_directive__WEBPACK_IMPORTED_MODULE_0__["CheckboxGroupDirective"]; });

/* harmony import */ var _control_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control.directive */ "ARs9");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControlDirective", function() { return _control_directive__WEBPACK_IMPORTED_MODULE_1__["ControlDirective"]; });

/* harmony import */ var _currency_mask_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./currency-mask.directive */ "zEfI");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CurrencyMaskDirective", function() { return _currency_mask_directive__WEBPACK_IMPORTED_MODULE_2__["CurrencyMaskDirective"]; });

/* harmony import */ var _mask_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mask.directive */ "04Sp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MaskDirective", function() { return _mask_directive__WEBPACK_IMPORTED_MODULE_3__["MaskDirective"]; });







/***/ }),

/***/ "CLCU":
/*!**********************************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/select/interfaces/select.interface.ts ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "D3Gz":
/*!*******************************************************!*\
  !*** ./apps/app/src/app/containers/checkbox/index.ts ***!
  \*******************************************************/
/*! exports provided: CheckboxContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _checkbox_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkbox.container */ "hwII");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxContainer", function() { return _checkbox_container__WEBPACK_IMPORTED_MODULE_0__["CheckboxContainer"]; });




/***/ }),

/***/ "FL4A":
/*!******************************************************!*\
  !*** ./libs/swap/layout/src/lib/directives/index.ts ***!
  \******************************************************/
/*! exports provided: NavFocusDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nav_focus_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav-focus.directive */ "37kt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavFocusDirective", function() { return _nav_focus_directive__WEBPACK_IMPORTED_MODULE_0__["NavFocusDirective"]; });




/***/ }),

/***/ "H+Ab":
/*!**********************************************!*\
  !*** ./apps/app/src/app/containers/index.ts ***!
  \**********************************************/
/*! exports provided: CheckboxContainer, RadioContainer, SelectContainer, SliderContainer, TextfieldContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _checkbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkbox */ "D3Gz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxContainer", function() { return _checkbox__WEBPACK_IMPORTED_MODULE_0__["CheckboxContainer"]; });

/* harmony import */ var _radio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./radio */ "zWPF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioContainer", function() { return _radio__WEBPACK_IMPORTED_MODULE_1__["RadioContainer"]; });

/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./select */ "gSzf");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectContainer", function() { return _select__WEBPACK_IMPORTED_MODULE_2__["SelectContainer"]; });

/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slider */ "KPs+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SliderContainer", function() { return _slider__WEBPACK_IMPORTED_MODULE_3__["SliderContainer"]; });

/* harmony import */ var _textfield__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./textfield */ "QFPg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextfieldContainer", function() { return _textfield__WEBPACK_IMPORTED_MODULE_4__["TextfieldContainer"]; });








/***/ }),

/***/ "Hi7J":
/*!***********************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/slider/slider.component.ts ***!
  \***********************************************************************/
/*! exports provided: SliderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderComponent", function() { return SliderComponent; });
/* harmony import */ var _input_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../input-base */ "ubDZ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");



const _c0 = ["swap-slider", ""];
function SliderComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
const _c1 = [[["", "swap-control", ""], ["", "swap-control", ""]], [["span"]], [["output"]]];
const _c2 = ["[swap-control],[swap-control]", "span", "output"];
class SliderComponent extends _input_base__WEBPACK_IMPORTED_MODULE_0__["InputBase"] {
}
SliderComponent.ɵfac = function SliderComponent_Factory(t) { return ɵSliderComponent_BaseFactory(t || SliderComponent); };
SliderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SliderComponent, selectors: [["label", "swap-slider", ""]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], attrs: _c0, ngContentSelectors: _c2, decls: 3, vars: 1, consts: [[4, "ngIf"]], template: function SliderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SliderComponent_ng_container_2_Template, 2, 0, "ng-container", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showError);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], encapsulation: 2 });
const ɵSliderComponent_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](SliderComponent);


/***/ }),

/***/ "ILnU":
/*!************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/button/index.ts ***!
  \************************************************************/
/*! exports provided: ButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _button_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button.component */ "stxj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonComponent", function() { return _button_component__WEBPACK_IMPORTED_MODULE_0__["ButtonComponent"]; });




/***/ }),

/***/ "JtHq":
/*!***********************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/select/option.component.ts ***!
  \***********************************************************************/
/*! exports provided: OptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionComponent", function() { return OptionComponent; });
/* harmony import */ var _select_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select.service */ "TqVX");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interfaces */ "8+y3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");




class OptionComponent {
    constructor(dropdownService) {
        this.dropdownService = dropdownService;
        this.active = false;
        this._select = this.dropdownService.getSelect();
    }
    get selected() {
        return this.select.selectedOption === this;
    }
    get select() {
        return this._select;
    }
    set select(value) {
        this._select = value;
    }
    getLabel() {
        return this.value;
    }
    setActiveStyles() {
        this.active = true;
    }
    setInactiveStyles() {
        this.active = false;
    }
    onClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.select.selectOption(this);
    }
}
OptionComponent.ɵfac = function OptionComponent_Factory(t) { return new (t || OptionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_select_service__WEBPACK_IMPORTED_MODULE_0__["SelectService"])); };
OptionComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: OptionComponent, selectors: [["swap-option"]], hostVars: 4, hostBindings: function OptionComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function OptionComponent_click_HostBindingHandler($event) { return ctx.onClick($event); });
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("selected", ctx.selected)("active", ctx.active);
    } }, inputs: { key: "key", value: "value" }, decls: 1, vars: 1, template: function OptionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.value);
    } }, encapsulation: 2 });


/***/ }),

/***/ "KPs+":
/*!*****************************************************!*\
  !*** ./apps/app/src/app/containers/slider/index.ts ***!
  \*****************************************************/
/*! exports provided: SliderContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slider_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider.container */ "35IU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SliderContainer", function() { return _slider_container__WEBPACK_IMPORTED_MODULE_0__["SliderContainer"]; });




/***/ }),

/***/ "LckF":
/*!***************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/textfield/index.ts ***!
  \***************************************************************/
/*! exports provided: TextfieldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _textfield_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./textfield.component */ "y0bg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextfieldComponent", function() { return _textfield_component__WEBPACK_IMPORTED_MODULE_0__["TextfieldComponent"]; });




/***/ }),

/***/ "LtM4":
/*!************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/select/index.ts ***!
  \************************************************************/
/*! exports provided: OptionComponent, SelectPanelComponent, SelectComponent, SelectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _option_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./option.component */ "JtHq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OptionComponent", function() { return _option_component__WEBPACK_IMPORTED_MODULE_0__["OptionComponent"]; });

/* harmony import */ var _select_panel_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select-panel.component */ "PfTP");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectPanelComponent", function() { return _select_panel_component__WEBPACK_IMPORTED_MODULE_1__["SelectPanelComponent"]; });

/* harmony import */ var _select_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./select.component */ "S49P");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectComponent", function() { return _select_component__WEBPACK_IMPORTED_MODULE_2__["SelectComponent"]; });

/* harmony import */ var _select_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./select.service */ "TqVX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectService", function() { return _select_service__WEBPACK_IMPORTED_MODULE_3__["SelectService"]; });







/***/ }),

/***/ "MBEl":
/*!********************************************************!*\
  !*** ./libs/swap/layout/src/lib/swap-layout.module.ts ***!
  \********************************************************/
/*! exports provided: SwapLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwapLayoutModule", function() { return SwapLayoutModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "5MdJ");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directives */ "FL4A");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "8Y7J");





class SwapLayoutModule {
}
SwapLayoutModule.ɵfac = function SwapLayoutModule_Factory(t) { return new (t || SwapLayoutModule)(); };
SwapLayoutModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: SwapLayoutModule });
SwapLayoutModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](SwapLayoutModule, { declarations: [_components__WEBPACK_IMPORTED_MODULE_2__["TabsContainer"], _components__WEBPACK_IMPORTED_MODULE_2__["TabComponent"], _directives__WEBPACK_IMPORTED_MODULE_3__["NavFocusDirective"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_components__WEBPACK_IMPORTED_MODULE_2__["TabsContainer"], _components__WEBPACK_IMPORTED_MODULE_2__["TabComponent"], _directives__WEBPACK_IMPORTED_MODULE_3__["NavFocusDirective"]] }); })();


/***/ }),

/***/ "MFBt":
/*!**********************************************!*\
  !*** ./apps/app/src/app/components/index.ts ***!
  \**********************************************/
/*! exports provided: FormFooterComponent, HeaderNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_footer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-footer */ "oado");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormFooterComponent", function() { return _form_footer__WEBPACK_IMPORTED_MODULE_0__["FormFooterComponent"]; });

/* harmony import */ var _header_nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header-nav */ "fGqh");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderNavComponent", function() { return _header_nav__WEBPACK_IMPORTED_MODULE_1__["HeaderNavComponent"]; });





/***/ }),

/***/ "PGz9":
/*!**********************************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/select/interfaces/option.interface.ts ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "PfTP":
/*!*****************************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/select/select-panel.component.ts ***!
  \*****************************************************************************/
/*! exports provided: SelectPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectPanelComponent", function() { return SelectPanelComponent; });
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/overlay */ "1O3W");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/portal */ "1z/I");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "8Y7J");





function SelectPanelComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](0);
} }
const _c0 = ["*"];
class SelectPanelComponent {
    constructor(overlay) {
        this.overlay = overlay;
        this._showing = false;
    }
    get showing() {
        return this._showing;
    }
    set showing(value) {
        this._showing = value;
    }
    show() {
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        this.overlayRef.attach(this.contentTemplate);
        this.syncWidth();
        this.overlayRef.backdropClick().subscribe(() => this.hide());
        this.showing = true;
    }
    hide() {
        this.overlayRef.detach();
        this.showing = false;
    }
    onWinResize() {
        this.syncWidth();
    }
    getOverlayConfig() {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.reference)
            .withPush(false)
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ]);
        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        return new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["OverlayConfig"]({
            positionStrategy: positionStrategy,
            scrollStrategy: scrollStrategy,
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }
    syncWidth() {
        var _a;
        if (!this.overlayRef) {
            return;
        }
        const refRect = (_a = this.reference) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        this.overlayRef.updateSize({ width: refRect.width });
    }
}
SelectPanelComponent.ɵfac = function SelectPanelComponent_Factory(t) { return new (t || SelectPanelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["Overlay"])); };
SelectPanelComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SelectPanelComponent, selectors: [["swap-select-panel"]], viewQuery: function SelectPanelComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__["CdkPortal"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.contentTemplate = _t.first);
    } }, hostBindings: function SelectPanelComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("resize", function SelectPanelComponent_resize_HostBindingHandler() { return ctx.onWinResize(); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresolveWindow"]);
    } }, inputs: { reference: "reference" }, ngContentSelectors: _c0, decls: 1, vars: 0, consts: [["cdk-portal", ""]], template: function SelectPanelComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, SelectPanelComponent_ng_template_0_Template, 1, 0, "ng-template", 0);
    } }, directives: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__["TemplatePortalDirective"]], encapsulation: 2 });


/***/ }),

/***/ "QFPg":
/*!********************************************************!*\
  !*** ./apps/app/src/app/containers/textfield/index.ts ***!
  \********************************************************/
/*! exports provided: TextfieldContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _textfield_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./textfield.container */ "hyyp");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextfieldContainer", function() { return _textfield_container__WEBPACK_IMPORTED_MODULE_0__["TextfieldContainer"]; });




/***/ }),

/***/ "S49P":
/*!***********************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/select/select.component.ts ***!
  \***********************************************************************/
/*! exports provided: SelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectComponent", function() { return SelectComponent; });
/* harmony import */ var _select_panel_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select-panel.component */ "PfTP");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/a11y */ "YEUz");
/* harmony import */ var _option_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./option.component */ "JtHq");
/* harmony import */ var _select_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./select.service */ "TqVX");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "SVse");










const _c0 = ["input"];
function SelectComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "svg", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "path", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "path", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} }
function SelectComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "svg", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "path", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "path", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
const _c1 = [[["swap-option"]]];
const _c2 = ["swap-option"];
const SelectProvider = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_5__["forwardRef"])(() => SelectComponent),
    multi: true,
};
class SelectComponent extends _angular_forms__WEBPACK_IMPORTED_MODULE_4__["SelectControlValueAccessor"] {
    constructor(panelService, _changeDetectorRef, renderer, element) {
        super(renderer, element);
        this.panelService = panelService;
        this._changeDetectorRef = _changeDetectorRef;
        this.renderer = renderer;
        this.element = element;
        this.label = '';
        this.placeholder = '';
        this.selected = '';
        this.required = false;
        this.disabled = false;
        this._displayText = '';
        this.onChangeFn = (_) => { };
        this.onTouchedFn = () => { };
        this.panelService.register(this);
        this.keyManager = this.getKeyManager();
    }
    get displayText() {
        return this._displayText;
    }
    set displayText(value) {
        this._displayText = value;
    }
    get keyManager() {
        return this._keyManager;
    }
    set keyManager(value) {
        this._keyManager = value;
    }
    ngAfterContentInit() {
        this.selectedOption = this.options
            .toArray()
            .find((option) => option.key === this.selected);
        this.displayText = this.selectedOption ? this.selectedOption.value : '';
        this.keyManager = this.getKeyManager();
    }
    getKeyManager() {
        return new _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["ActiveDescendantKeyManager"](this.options)
            .withHorizontalOrientation('ltr')
            .withVerticalOrientation()
            .withWrap();
    }
    showPanel() {
        this.panel.show();
        if (!this.options.length) {
            return;
        }
        this.selected
            ? this.keyManager.setActiveItem(this.selectedOption)
            : this.keyManager.setFirstItemActive();
    }
    hidePanel() {
        this.panel.hide();
    }
    onPanelMenuIconClick(event) {
        this.input.nativeElement.focus();
        this.input.nativeElement.click();
        this._changeDetectorRef.detectChanges();
    }
    onKeyDown(event) {
        let KEYS = ['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'];
        if (KEYS.indexOf(event.key) > -1) {
            if (!this.panel.showing) {
                return this.showPanel();
            }
            if (!this.options.length) {
                return event.preventDefault();
            }
        }
        KEYS = [
            'Up',
            'ArrowUp',
            'Down',
            'ArrowDown',
            'ArrowRight',
            'Right',
            'ArrowLeft',
            'Left',
        ];
        if (event.key === 'Enter' || event.key === ' ') {
            this.selectedOption = this.keyManager.activeItem;
            this.selected = this.selectedOption.key;
            this.displayText = this.selectedOption ? this.selectedOption.value : '';
            this.hidePanel();
            // this.onChange()
            event.preventDefault();
        }
        else if (event.key === 'Escape' || event.key === 'Esc') {
            if (this.panel.showing) {
                this.hidePanel();
            }
        }
        else if (KEYS.indexOf(event.key) > -1) {
            this.keyManager.onKeydown(event);
        }
        else if (event.key === 'PageUp' ||
            event.key === 'PageDown' ||
            event.key === 'Tab') {
            this.panel.showing && event.preventDefault();
        }
    }
    selectOption(option) {
        this.keyManager.setActiveItem(option);
        this.selected = option.key;
        this.selectedOption = option;
        this.displayText = this.selectedOption ? this.selectedOption.value : '';
        this.hidePanel();
        this.input.nativeElement.focus();
        // this.onChange()
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedFn = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(obj) {
        this.selected = obj;
    }
}
SelectComponent.ɵfac = function SelectComponent_Factory(t) { return new (t || SelectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_select_service__WEBPACK_IMPORTED_MODULE_3__["SelectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ElementRef"])); };
SelectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: SelectComponent, selectors: [["swap-select"]], contentQueries: function SelectComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵcontentQuery"](dirIndex, _option_component__WEBPACK_IMPORTED_MODULE_2__["OptionComponent"], 0);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.options = _t);
    } }, viewQuery: function SelectComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_select_panel_component__WEBPACK_IMPORTED_MODULE_0__["SelectPanelComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.panel = _t.first);
    } }, inputs: { label: "label", placeholder: "placeholder", selected: "selected", required: "required", disabled: "disabled" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([_select_service__WEBPACK_IMPORTED_MODULE_3__["SelectService"], SelectProvider]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], ngContentSelectors: _c2, decls: 14, vars: 9, consts: [[1, "input"], ["panelRef", ""], [1, "label-text"], ["readonly", "", "autocomplete", "off", 3, "placeholder", "disabled", "value", "click", "keydown", "blur"], ["input", ""], [1, "panel-arrow", 3, "click"], [4, "ngIf", "ngIfElse"], ["arrowDown", ""], [3, "reference"], ["panelComp", ""], [1, "swap-options-container"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24"], ["d", "M0 0h24v24H0V0z", "fill", "none"], ["d", "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"], ["d", "M0 0h24v24H0z", "fill", "none"], ["d", "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"]], template: function SelectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "input", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SelectComponent_Template_input_click_4_listener() { return ctx.showPanel(); })("keydown", function SelectComponent_Template_input_keydown_4_listener($event) { return ctx.onKeyDown($event); })("blur", function SelectComponent_Template_input_blur_4_listener() { return ctx.onTouched(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SelectComponent_Template_span_click_6_listener($event) { return ctx.onPanelMenuIconClick($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, SelectComponent_ng_container_7_Template, 4, 0, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, SelectComponent_ng_template_8_Template, 3, 0, "ng-template", null, 7, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "swap-select-panel", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵprojection"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](1);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("required", ctx.required);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.label);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("placeholder", ctx.placeholder)("disabled", ctx.disabled)("value", ctx.displayText);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !(ctx.panel == null ? null : ctx.panel.showing))("ngIfElse", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("reference", _r0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _select_panel_component__WEBPACK_IMPORTED_MODULE_0__["SelectPanelComponent"]], encapsulation: 2 });


/***/ }),

/***/ "TU54":
/*!****************************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/selection/checkbox.component.ts ***!
  \****************************************************************************/
/*! exports provided: CheckboxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxComponent", function() { return CheckboxComponent; });
/* harmony import */ var _input_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../input-base */ "ubDZ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");



const _c0 = ["swap-checkbox", ""];
function CheckboxComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
const _c1 = [[["", "swap-control", ""], ["", "swap-control", ""]], [["span"]], [["output"]]];
const _c2 = ["[swap-control],[swap-control]", "span", "output"];
class CheckboxComponent extends _input_base__WEBPACK_IMPORTED_MODULE_0__["InputBase"] {
}
CheckboxComponent.ɵfac = function CheckboxComponent_Factory(t) { return ɵCheckboxComponent_BaseFactory(t || CheckboxComponent); };
CheckboxComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CheckboxComponent, selectors: [["label", "swap-checkbox", ""]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], attrs: _c0, ngContentSelectors: _c2, decls: 3, vars: 1, consts: [[4, "ngIf"]], template: function CheckboxComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CheckboxComponent_ng_container_2_Template, 2, 0, "ng-container", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showError);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], encapsulation: 2, changeDetection: 0 });
const ɵCheckboxComponent_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](CheckboxComponent);


/***/ }),

/***/ "TqVX":
/*!*********************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/select/select.service.ts ***!
  \*********************************************************************/
/*! exports provided: SelectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectService", function() { return SelectService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");

class SelectService {
    register(select) {
        this.select = select;
    }
    getSelect() {
        return this.select;
    }
}
SelectService.ɵfac = function SelectService_Factory(t) { return new (t || SelectService)(); };
SelectService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SelectService, factory: SelectService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "VTa+":
/*!***********************************************************!*\
  !*** ./libs/swap/layout/src/lib/components/tabs/index.ts ***!
  \***********************************************************/
/*! exports provided: TabComponent, TabsContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab.component */ "eAVL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabComponent", function() { return _tab_component__WEBPACK_IMPORTED_MODULE_0__["TabComponent"]; });

/* harmony import */ var _tabs_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabs.container */ "A78c");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabsContainer", function() { return _tabs_container__WEBPACK_IMPORTED_MODULE_1__["TabsContainer"]; });





/***/ }),

/***/ "WEUy":
/*!**************************************************!*\
  !*** ./apps/app/src/environments/environment.ts ***!
  \**************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "WqJR":
/*!***************************************!*\
  !*** ./libs/swap/layout/src/index.ts ***!
  \***************************************/
/*! exports provided: SwapLayoutModule, TabComponent, TabsContainer, NavFocusDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_swap_layout_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/swap-layout.module */ "MBEl");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SwapLayoutModule", function() { return _lib_swap_layout_module__WEBPACK_IMPORTED_MODULE_0__["SwapLayoutModule"]; });

/* harmony import */ var _lib_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/components */ "5MdJ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabComponent", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["TabComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabsContainer", function() { return _lib_components__WEBPACK_IMPORTED_MODULE_1__["TabsContainer"]; });

/* harmony import */ var _lib_directives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/directives */ "FL4A");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavFocusDirective", function() { return _lib_directives__WEBPACK_IMPORTED_MODULE_2__["NavFocusDirective"]; });






/***/ }),

/***/ "YoXv":
/*!****************************************!*\
  !*** ./apps/app/src/app/app.module.ts ***!
  \****************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "IheW");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "iInd");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _swap_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swap/layout */ "WqJR");
/* harmony import */ var _swap_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swap/forms */ "7J5F");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "qkiN");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components */ "MFBt");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared */ "2CvL");
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./containers */ "H+Ab");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "8Y7J");












const routes = [
    { path: '', redirectTo: 'textfield', pathMatch: 'full' },
    { path: 'textfield', component: _containers__WEBPACK_IMPORTED_MODULE_9__["TextfieldContainer"] },
    { path: 'checkbox', component: _containers__WEBPACK_IMPORTED_MODULE_9__["CheckboxContainer"] },
    { path: 'radio', component: _containers__WEBPACK_IMPORTED_MODULE_9__["RadioContainer"] },
    { path: 'slider', component: _containers__WEBPACK_IMPORTED_MODULE_9__["SliderContainer"] },
    { path: 'select', component: _containers__WEBPACK_IMPORTED_MODULE_9__["SelectContainer"] },
    {
        path: 'auth',
        loadChildren: () => __webpack_require__.e(/*! import() | modules-auth-auth-module */ "modules-auth-auth-module").then(__webpack_require__.bind(null, /*! ./modules/auth/auth.module */ "DDLO")).then((m) => m.AuthModule),
    },
];
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ providers: [_shared__WEBPACK_IMPORTED_MODULE_8__["NavigationService"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _swap_forms__WEBPACK_IMPORTED_MODULE_5__["SwapFormsModule"],
            _swap_layout__WEBPACK_IMPORTED_MODULE_4__["SwapLayoutModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes),
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
        _components__WEBPACK_IMPORTED_MODULE_7__["FormFooterComponent"],
        _containers__WEBPACK_IMPORTED_MODULE_9__["TextfieldContainer"],
        _containers__WEBPACK_IMPORTED_MODULE_9__["CheckboxContainer"],
        _containers__WEBPACK_IMPORTED_MODULE_9__["RadioContainer"],
        _containers__WEBPACK_IMPORTED_MODULE_9__["SliderContainer"],
        _components__WEBPACK_IMPORTED_MODULE_7__["HeaderNavComponent"],
        _containers__WEBPACK_IMPORTED_MODULE_9__["SelectContainer"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _swap_forms__WEBPACK_IMPORTED_MODULE_5__["SwapFormsModule"],
        _swap_layout__WEBPACK_IMPORTED_MODULE_4__["SwapLayoutModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]] }); })();


/***/ }),

/***/ "YseE":
/*!*************************************************************************!*\
  !*** ./libs/swap/forms/src/lib/directives/utilities/mask-validation.ts ***!
  \*************************************************************************/
/*! exports provided: maskFormatValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maskFormatValidator", function() { return maskFormatValidator; });
function maskFormatValidator(masks) {
    return (control) => {
        if (!control.value) {
            return null;
        }
        if (Array.isArray(masks)) {
            if (!masks.find((mask) => mask.length === control.value.length)) {
                return { invalidLength: true };
            }
        }
        else {
            if (control.value.length !== masks.length) {
                return { invalidLength: true };
            }
        }
        return null;
    };
}


/***/ }),

/***/ "as/h":
/*!**********************************************************!*\
  !*** ./apps/app/src/app/shared/navigation/navigation.ts ***!
  \**********************************************************/
/*! exports provided: Navigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Navigation", function() { return Navigation; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");

class Navigation {
    constructor(id, items = []) {
        this.id = id;
        this.items = items;
        this._items = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]([]);
        this.items$ = this._items.asObservable();
    }
    addItem(item) {
        const items = this._items.getValue();
        this._items.next([...items, item]);
    }
    setItems(items) {
        this._items.next(items);
    }
}


/***/ }),

/***/ "b9dF":
/*!**************************************************************************!*\
  !*** ./apps/app/src/app/components/form-footer/form-footer.component.ts ***!
  \**************************************************************************/
/*! exports provided: FormFooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormFooterComponent", function() { return FormFooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _libs_swap_forms_src_lib_components_button_button_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/components/button/button.component */ "stxj");


const _c0 = ["swap-form", ""];
class FormFooterComponent {
    constructor() {
        this.swapForm = '';
    }
}
FormFooterComponent.ɵfac = function FormFooterComponent_Factory(t) { return new (t || FormFooterComponent)(); };
FormFooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FormFooterComponent, selectors: [["footer", "swap-form", ""]], inputs: { swapForm: ["swap-form", "swapForm"] }, attrs: _c0, decls: 4, vars: 2, consts: [["swap-button", "", "mode", "secondary", "type", "reset"], ["swap-button", "", "mode", "primary"]], template: function FormFooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Limpar\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Enviar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("form", ctx.swapForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("form", ctx.swapForm);
    } }, directives: [_libs_swap_forms_src_lib_components_button_button_component__WEBPACK_IMPORTED_MODULE_1__["ButtonComponent"]], styles: ["[_nghost-%COMP%] {\n  gap: 10px;\n  padding: 20px;\n  display: flex;\n  justify-content: space-around;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2Zvcm0tZm9vdGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsU0FBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsNkJBQUE7QUFDRiIsImZpbGUiOiJmb3JtLWZvb3Rlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZ2FwOiAxMHB4O1xuICBwYWRkaW5nOiAyMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbn1cbiJdfQ== */"], changeDetection: 0 });


/***/ }),

/***/ "dQfj":
/*!******************************************************************!*\
  !*** ./apps/app/src/app/shared/navigation/navigation.service.ts ***!
  \******************************************************************/
/*! exports provided: NavigationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationService", function() { return NavigationService; });
/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation */ "as/h");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");


let NEXT_ID = 0;
class NavigationService {
    constructor() {
        this.navigations = new Map();
    }
    register(nav) {
        if (nav instanceof _navigation__WEBPACK_IMPORTED_MODULE_0__["Navigation"]) {
            if (this.navigations.has(nav.id)) {
                throw new Error(`Navigation ${nav.id} in use`);
            }
            this.navigations.set(nav.id, nav);
        }
        else {
            const navigation = new _navigation__WEBPACK_IMPORTED_MODULE_0__["Navigation"](NEXT_ID++, nav);
            this.navigations.set(navigation.id, navigation);
        }
    }
    get(id) {
        return this.navigations.get(id);
    }
}
NavigationService.ɵfac = function NavigationService_Factory(t) { return new (t || NavigationService)(); };
NavigationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: NavigationService, factory: NavigationService.ɵfac });


/***/ }),

/***/ "eAVL":
/*!*******************************************************************!*\
  !*** ./libs/swap/layout/src/lib/components/tabs/tab.component.ts ***!
  \*******************************************************************/
/*! exports provided: TabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabComponent", function() { return TabComponent; });
/* harmony import */ var _tabs_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs.container */ "A78c");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");



const _c0 = ["*"];
class TabComponent {
    constructor(tabs) {
        this.active = false;
        this.tabTitle = '';
        tabs.addTab(this);
    }
    get hidden() {
        return !this.active;
    }
    getTabTitle() {
        return this.tabTitle;
    }
}
TabComponent.ɵfac = function TabComponent_Factory(t) { return new (t || TabComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_tabs_container__WEBPACK_IMPORTED_MODULE_0__["TabsContainer"])); };
TabComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: TabComponent, selectors: [["swap-tab"]], hostVars: 1, hostBindings: function TabComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-hidden", ctx.hidden);
    } }, inputs: { active: "active", tabTitle: "tabTitle" }, ngContentSelectors: _c0, decls: 2, vars: 0, consts: [[1, "tabs__panel"]], template: function TabComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: ["[_nghost-%COMP%] {\n  display: flex;\n  height: 100%;\n}\n\n[aria-hidden=true][_nghost-%COMP%] {\n  display: none;\n}\n\n.tabs__panel[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.24);\n  width: 100%;\n  box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.25);\n  border-radius: 6px;\n  padding: 30px 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3RhYi5jb21wb25lbnQuc2NzcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3N0eWxlcy9fdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxhQUFBO0VBQ0EsWUFBQTtBQURGOztBQUlBO0VBQ0UsYUFBQTtBQURGOztBQUdBO0VBQ0UscUNDVDRCO0VEVTVCLFdBQUE7RUFDQSxxREFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7QUFBRiIsImZpbGUiOiJ0YWIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi8uLi8uLi8uLi9zcmMvc3R5bGVzL3ZhcmlhYmxlcyc7XG5cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG46aG9zdChbYXJpYS1oaWRkZW49J3RydWUnXSkge1xuICBkaXNwbGF5OiBub25lO1xufVxuLnRhYnNfX3BhbmVsIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHNlZWstcHJpbWFyeS1kZWZhdWx0LWJvcmRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMHB4IDFweCAkc2Vlay1wcmltYXJ5LXByZXNzZWQtZHJvcC1zaGFkb3ctY29sb3I7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgcGFkZGluZzogMzBweCAxNXB4O1xufVxuIiwiJHNlZWstcHJpbWFyeS1kZWZhdWx0LWJhY2tncm91bmQ6IHJnYmEoMzMsIDg5LCAyNDMsIDEpO1xuJHNlZWstcHJpbWFyeS1kZWZhdWx0LWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDEpO1xuJHNlZWstcHJpbWFyeS1kZWZhdWx0LWJvcmRlcjogcmdiYSgwLCAwLCAwLCAwLjI0KTtcbiRzZWVrLXByaW1hcnktcHJlc3NlZC1kcm9wLXNoYWRvdy1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjI1KTtcbiJdfQ== */"], changeDetection: 0 });


/***/ }),

/***/ "eoJu":
/*!******************************************************!*\
  !*** ./libs/swap/forms/src/lib/swap-forms.module.ts ***!
  \******************************************************/
/*! exports provided: SwapFormsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwapFormsModule", function() { return SwapFormsModule; });
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/overlay */ "1O3W");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/portal */ "1z/I");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components */ "yhS3");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives */ "AyPR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "8Y7J");






class SwapFormsModule {
}
SwapFormsModule.ɵfac = function SwapFormsModule_Factory(t) { return new (t || SwapFormsModule)(); };
SwapFormsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: SwapFormsModule });
SwapFormsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["OverlayModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__["PortalModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](SwapFormsModule, { declarations: [_components__WEBPACK_IMPORTED_MODULE_3__["TextfieldComponent"],
        _directives__WEBPACK_IMPORTED_MODULE_4__["ControlDirective"],
        _directives__WEBPACK_IMPORTED_MODULE_4__["MaskDirective"],
        _directives__WEBPACK_IMPORTED_MODULE_4__["CurrencyMaskDirective"],
        _components__WEBPACK_IMPORTED_MODULE_3__["CheckboxComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["RadioComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["SliderComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["ButtonComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["SelectComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["SelectPanelComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["OptionComponent"],
        _directives__WEBPACK_IMPORTED_MODULE_4__["CheckboxGroupDirective"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["OverlayModule"], _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_1__["PortalModule"]], exports: [_components__WEBPACK_IMPORTED_MODULE_3__["TextfieldComponent"],
        _directives__WEBPACK_IMPORTED_MODULE_4__["ControlDirective"],
        _directives__WEBPACK_IMPORTED_MODULE_4__["MaskDirective"],
        _directives__WEBPACK_IMPORTED_MODULE_4__["CurrencyMaskDirective"],
        _components__WEBPACK_IMPORTED_MODULE_3__["CheckboxComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["RadioComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["SliderComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["ButtonComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["SelectComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["SelectPanelComponent"],
        _components__WEBPACK_IMPORTED_MODULE_3__["OptionComponent"],
        _directives__WEBPACK_IMPORTED_MODULE_4__["CheckboxGroupDirective"]] }); })();


/***/ }),

/***/ "fGqh":
/*!*********************************************************!*\
  !*** ./apps/app/src/app/components/header-nav/index.ts ***!
  \*********************************************************/
/*! exports provided: HeaderNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_nav_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header-nav.component */ "xIRM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderNavComponent", function() { return _header_nav_component__WEBPACK_IMPORTED_MODULE_0__["HeaderNavComponent"]; });




/***/ }),

/***/ "gSzf":
/*!*****************************************************!*\
  !*** ./apps/app/src/app/containers/select/index.ts ***!
  \*****************************************************/
/*! exports provided: SelectContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _select_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select.container */ "lTIi");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectContainer", function() { return _select_container__WEBPACK_IMPORTED_MODULE_0__["SelectContainer"]; });




/***/ }),

/***/ "hwII":
/*!********************************************************************!*\
  !*** ./apps/app/src/app/containers/checkbox/checkbox.container.ts ***!
  \********************************************************************/
/*! exports provided: CheckboxContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxContainer", function() { return CheckboxContainer; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _libs_swap_forms_src_lib_directives_checkbox_group_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/directives/checkbox-group.directive */ "p29b");
/* harmony import */ var _libs_swap_forms_src_lib_components_selection_checkbox_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/components/selection/checkbox.component */ "TU54");
/* harmony import */ var _libs_swap_forms_src_lib_directives_control_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/directives/control.directive */ "ARs9");
/* harmony import */ var _components_form_footer_form_footer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/form-footer/form-footer.component */ "b9dF");







class CheckboxContainer {
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({
            one: [true, [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].requiredTrue]],
            two: [false, [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].requiredTrue]],
            group: this.fb.group({
                c1: [true],
                c2: [false],
                c3: [true],
                c4: [false],
                c5: [true],
                c6: [false],
            }),
        });
    }
    getState(group) {
        const values = Object.values(group.controls);
        const some = values.some((control) => control.value);
        const all = values.every((control) => control.value);
        return all ? all : some ? null : !!some;
    }
    toggleGroup(checked, group) {
        Object.values(group.controls).map((c) => c.setValue(checked));
    }
}
CheckboxContainer.ɵfac = function CheckboxContainer_Factory(t) { return new (t || CheckboxContainer)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"])); };
CheckboxContainer.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CheckboxContainer, selectors: [["ng-component"]], decls: 34, vars: 1, consts: [["id", "swap", 3, "formGroup"], ["formGroupName", "group"], [1, "swap-checkbox"], ["type", "checkbox", "aria-controls", "label1 label2 label3 label4 label5 label6", "swap-checkbox-group", ""], ["swap-checkbox", "", 1, "ml-12px"], ["type", "checkbox", "id", "label1", "swap-control", "", "formControlName", "c1"], ["type", "checkbox", "id", "label2", "swap-control", "", "formControlName", "c2"], ["type", "checkbox", "id", "label3", "swap-control", "", "formControlName", "c3"], ["type", "checkbox", "id", "label4", "swap-control", "", "formControlName", "c4"], ["type", "checkbox", "id", "label5", "swap-control", "", "formControlName", "c5"], ["type", "checkbox", "id", "label6", "swap-control", "", "formControlName", "c6"], ["swap-form", "swap"]], template: function CheckboxContainer_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "fieldset", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "legend");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Group");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Controlador");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Label 1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Label 2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Label 3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Label 4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Label 5");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](28, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "label", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Label 6");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](32, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](33, "footer", 11);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.form);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupName"], _libs_swap_forms_src_lib_directives_checkbox_group_directive__WEBPACK_IMPORTED_MODULE_2__["CheckboxGroupDirective"], _libs_swap_forms_src_lib_components_selection_checkbox_component__WEBPACK_IMPORTED_MODULE_3__["CheckboxComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["CheckboxControlValueAccessor"], _libs_swap_forms_src_lib_directives_control_directive__WEBPACK_IMPORTED_MODULE_4__["ControlDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _components_form_footer_form_footer_component__WEBPACK_IMPORTED_MODULE_5__["FormFooterComponent"]], encapsulation: 2 });


/***/ }),

/***/ "hyyp":
/*!**********************************************************************!*\
  !*** ./apps/app/src/app/containers/textfield/textfield.container.ts ***!
  \**********************************************************************/
/*! exports provided: TextfieldContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextfieldContainer", function() { return TextfieldContainer; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _libs_swap_layout_src_lib_components_tabs_tabs_container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../libs/swap/layout/src/lib/components/tabs/tabs.container */ "A78c");
/* harmony import */ var _libs_swap_layout_src_lib_components_tabs_tab_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../libs/swap/layout/src/lib/components/tabs/tab.component */ "eAVL");
/* harmony import */ var _libs_swap_forms_src_lib_components_textfield_textfield_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/components/textfield/textfield.component */ "y0bg");
/* harmony import */ var _libs_swap_forms_src_lib_directives_mask_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/directives/mask.directive */ "04Sp");
/* harmony import */ var _libs_swap_forms_src_lib_directives_control_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/directives/control.directive */ "ARs9");
/* harmony import */ var _libs_swap_forms_src_lib_directives_currency_mask_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/directives/currency-mask.directive */ "zEfI");
/* harmony import */ var _components_form_footer_form_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/form-footer/form-footer.component */ "b9dF");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "SVse");











class TextfieldContainer {
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({
            filled: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]],
            outlined: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]],
            standard: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]],
            cpf: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]],
            phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].minLength(15)]],
            price: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].min(0.01)]],
        });
    }
}
TextfieldContainer.ɵfac = function TextfieldContainer_Factory(t) { return new (t || TextfieldContainer)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"])); };
TextfieldContainer.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: TextfieldContainer, selectors: [["ng-component"]], decls: 28, vars: 5, consts: [["id", "swap", 3, "formGroup"], ["tabs", "swapTabs"], ["tabTitle", "Tab 1"], ["swap-textfield", "", "standard", ""], ["type", "text", "swap-control", "", "formControlName", "cpf", "swap-mask", "DDD.DDD.DDD-DD"], ["tabTitle", "Tab 2", 3, "active"], ["swap-textfield", "", "filled", ""], ["type", "text", "swap-control", "", "formControlName", "price", "swap-currency", ""], ["tabTitle", "Tab 3"], ["swap-textfield", "", "outlined", ""], ["type", "text", "swap-control", "", "formControlName", "phone", "swap-mask", "(DD) DDDDD-DDDD"], ["swap-form", "swap"]], template: function TextfieldContainer_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "swap-tabs", null, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "swap-tab", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "CPF");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "output");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Error");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "swap-tab", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Pre\u00E7o");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "output");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Error");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "swap-tab", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "Telefone");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "output");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Error");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "footer", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](27, "json");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("active", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](27, 3, ctx.form.value));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _libs_swap_layout_src_lib_components_tabs_tabs_container__WEBPACK_IMPORTED_MODULE_2__["TabsContainer"], _libs_swap_layout_src_lib_components_tabs_tab_component__WEBPACK_IMPORTED_MODULE_3__["TabComponent"], _libs_swap_forms_src_lib_components_textfield_textfield_component__WEBPACK_IMPORTED_MODULE_4__["TextfieldComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _libs_swap_forms_src_lib_directives_mask_directive__WEBPACK_IMPORTED_MODULE_5__["MaskDirective"], _libs_swap_forms_src_lib_directives_control_directive__WEBPACK_IMPORTED_MODULE_6__["ControlDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _libs_swap_forms_src_lib_directives_currency_mask_directive__WEBPACK_IMPORTED_MODULE_7__["CurrencyMaskDirective"], _components_form_footer_form_footer_component__WEBPACK_IMPORTED_MODULE_8__["FormFooterComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["JsonPipe"]], encapsulation: 2 });


/***/ }),

/***/ "iEOa":
/*!******************************!*\
  !*** ./apps/app/src/main.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "cUpR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "YoXv");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "WEUy");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch((err) => console.error(err));


/***/ }),

/***/ "lTIi":
/*!****************************************************************!*\
  !*** ./apps/app/src/app/containers/select/select.container.ts ***!
  \****************************************************************/
/*! exports provided: SelectContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectContainer", function() { return SelectContainer; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _libs_swap_forms_src_lib_components_select_select_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/components/select/select.component */ "S49P");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _components_form_footer_form_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/form-footer/form-footer.component */ "b9dF");
/* harmony import */ var _libs_swap_forms_src_lib_components_select_option_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../libs/swap/forms/src/lib/components/select/option.component */ "JtHq");







function SelectContainer_swap_option_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "swap-option", 4);
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("key", item_r1.value)("value", item_r1.label);
} }
class SelectContainer {
    constructor(fb) {
        this.fb = fb;
        this.options = [
            { value: 1, label: 'Paris' },
            { value: 2, label: 'Brasil' },
            { value: 3, label: 'Singapore' },
            { value: 4, label: 'Malaysia' },
            { value: 5, label: 'Goa' },
            { value: 6, label: 'Thailand' },
        ];
        this.form = this.fb.group({
            control: ['', []],
            populated: ['', []],
            required: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]],
        });
    }
    ngOnInit() {
        this.form.get('populated').patchValue({ value: 6, label: 'Thailand' });
    }
}
SelectContainer.ɵfac = function SelectContainer_Factory(t) { return new (t || SelectContainer)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormBuilder"])); };
SelectContainer.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SelectContainer, selectors: [["ng-component"]], decls: 4, vars: 2, consts: [["id", "form", 3, "formGroup"], ["formControlName", "required", "placeholder", "- Selecione -"], [3, "key", "value", 4, "ngFor", "ngForOf"], ["swap-form", ""], [3, "key", "value"]], template: function SelectContainer_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "swap-select", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, SelectContainer_swap_option_2_Template, 1, 2, "swap-option", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "footer", 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.options);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _libs_swap_forms_src_lib_components_select_select_component__WEBPACK_IMPORTED_MODULE_2__["SelectComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _components_form_footer_form_footer_component__WEBPACK_IMPORTED_MODULE_4__["FormFooterComponent"], _libs_swap_forms_src_lib_components_select_option_component__WEBPACK_IMPORTED_MODULE_5__["OptionComponent"]], encapsulation: 2 });


/***/ }),

/***/ "oado":
/*!**********************************************************!*\
  !*** ./apps/app/src/app/components/form-footer/index.ts ***!
  \**********************************************************/
/*! exports provided: FormFooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_footer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-footer.component */ "b9dF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormFooterComponent", function() { return _form_footer_component__WEBPACK_IMPORTED_MODULE_0__["FormFooterComponent"]; });




/***/ }),

/***/ "ozUW":
/*!***************************************************************!*\
  !*** ./apps/app/src/app/shared/navigation/navigation-item.ts ***!
  \***************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "p29b":
/*!************************************************************************!*\
  !*** ./libs/swap/forms/src/lib/directives/checkbox-group.directive.ts ***!
  \************************************************************************/
/*! exports provided: CheckboxGroupDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxGroupDirective", function() { return CheckboxGroupDirective; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");






class CheckboxGroupDirective {
    constructor(element, renderer, container) {
        this.element = element;
        this.renderer = renderer;
        this.container = container;
        /**
         * Usado para manter o observable ativo
         * enquanto temos ciclo de vida do componente
         *
         * @private
         */
        this.destroy = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Usado para manter o último estado misto
         * em memória para retorno posterior
         *
         * @private
         * @type {Record<string, boolean>}
         */
        this.lastState = null;
    }
    /**
     * Checkboxes controlados
     *
     * A partir de alterações individuais nos checkboxes
     * alteramos o estado do controlador para quando:
     *
     * - Todos marcados: marcado
     * - Todos desmarcados: desmarcado
     * - Partialmente marcados: indeterminado / Misto
     */
    ngOnInit() {
        var _a;
        if ((_a = this.container) === null || _a === void 0 ? void 0 : _a.control) {
            this.container.valueChanges
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.destroy))
                .subscribe((value) => {
                const checked = this.getState(value);
                this.updateProperty('checked', checked || false);
                this.updateProperty('indeterminate', checked === null);
            });
        }
    }
    /**
     * Checkbox controlador
     *
     * Escutando alterações do checkbox controlador
     * é possível manter em memória o estado inicial dos
     * checkboxes controlados para alternar entre os estados
     * marcados / desmarcados, então retornar ao estado inicial.
     */
    onChange({ checked }) {
        var _a;
        this.updateProperty('indeterminate', false);
        if ((_a = this.container) === null || _a === void 0 ? void 0 : _a.control) {
            if (!this.lastState && checked) {
                this.lastState = this.container.value;
                this.toggleGroup(this.container.control, checked);
            }
            else {
                if (this.lastState && !checked) {
                    this.toggleGroup(this.container.control, checked);
                }
                else {
                    this.container.control.patchValue(this.lastState);
                    this.lastState = null;
                }
            }
        }
    }
    /**
     * Percorre checkboxes alterando seus estados
     *
     * @param {FormGroup} group
     * @param {boolean} checked
     */
    toggleGroup(group, checked) {
        Object.values(group.controls).map((c) => c.setValue(checked));
    }
    /**
     * Analisa checkboxes para determinar se todos
     * estão marcados, desmarcados ou misto, retornando:
     *
     * - Todos marcados: true
     * - Todos desmarcados: false
     * - Misto: null
     *
     * @param {Record<string, boolean>} value
     */
    getState(value) {
        const values = Object.values(value);
        const some = values.some((value) => value);
        const all = values.every((value) => value);
        return all ? all : some ? null : !!some;
    }
    /**
     * Altera o atributo do elemento no dom
     *
     * @private
     * @param {('checked' | 'indeterminate')} property
     * @param {boolean} value
     */
    updateProperty(property, value) {
        this.renderer.setProperty(this.element.nativeElement, property, value);
    }
    /**
     * Completa o subject e finaliza o observable
     */
    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }
}
CheckboxGroupDirective.ɵfac = function CheckboxGroupDirective_Factory(t) { return new (t || CheckboxGroupDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupName"])); };
CheckboxGroupDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({ type: CheckboxGroupDirective, selectors: [["input", "swap-checkbox-group", ""]], hostBindings: function CheckboxGroupDirective_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function CheckboxGroupDirective_change_HostBindingHandler($event) { return ctx.onChange($event.target); });
    } } });


/***/ }),

/***/ "qkiN":
/*!*******************************************!*\
  !*** ./apps/app/src/app/app.component.ts ***!
  \*******************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared */ "2CvL");
/* harmony import */ var _components_header_nav_header_nav_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/header-nav/header-nav.component */ "xIRM");
/* harmony import */ var _libs_swap_layout_src_lib_directives_nav_focus_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../libs/swap/layout/src/lib/directives/nav-focus.directive */ "37kt");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "iInd");







const _c0 = ["main"];
class AppComponent {
    constructor(_navigation) {
        this._navigation = _navigation;
        this.title = 'app';
        const nav = new _shared__WEBPACK_IMPORTED_MODULE_1__["Navigation"]('nav', []);
        this._navigation.register(nav);
        this.nav = nav;
    }
    ngAfterViewInit() {
        console.log(this.main);
    }
    ngOnInit() {
        this.nav.setItems([
            { route: '/auth', label: 'Auth' },
            { route: '/textfield', label: 'Textfield' },
            { route: '/slider', label: 'Slider' },
            { route: '/select', label: 'Select' },
            {
                route: '/',
                label: 'Selection',
                children: [
                    { route: 'radio', label: 'Radio' },
                    { route: 'checkbox', label: 'Checkbox' },
                ],
            },
        ]);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared__WEBPACK_IMPORTED_MODULE_1__["NavigationService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["swap-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.main = _t.first);
    } }, decls: 7, vars: 2, consts: [["swap-header", ""], ["alt", "Nx logo", "width", "75", "src", "/assets/swap-elements.svg"], ["swap-nav-focus", "", 3, "main-header"], ["main", ""]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "main", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Welcome to ", ctx.title, "!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("main-header", _r0);
    } }, directives: [_components_header_nav_header_nav_component__WEBPACK_IMPORTED_MODULE_2__["HeaderNavComponent"], _libs_swap_layout_src_lib_directives_nav_focus_directive__WEBPACK_IMPORTED_MODULE_3__["NavFocusDirective"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterOutlet"]], styles: ["[_nghost-%COMP%] {\n  height: 100%;\n  min-width: 300px;\n  display: flex;\n  flex-direction: column;\n  font-family: sans-serif;\n}\n\nmain[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\np[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\nh1[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-left: 18px;\n  font-size: 24px;\n}\n\nh2[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 20px;\n  margin: 40px 0 10px 0;\n}\n\n.resources[_ngcontent-%COMP%] {\n  text-align: center;\n  list-style: none;\n  padding: 0;\n  display: grid;\n  grid-gap: 9px;\n  grid-template-columns: 1fr 1fr;\n}\n\n.resource[_ngcontent-%COMP%] {\n  color: #0094ba;\n  height: 36px;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-radius: 4px;\n  padding: 3px 9px;\n  text-decoration: none;\n}\n\n.resource[_ngcontent-%COMP%]:hover {\n  background-color: rgba(68, 138, 255, 0.04);\n}\n\npre[_ngcontent-%COMP%] {\n  padding: 9px;\n  border-radius: 4px;\n  background-color: black;\n  color: #eee;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2FwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLHFCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0Esa0NBQUE7RUFDQSxxQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQUNGOztBQUVBO0VBQ0UsMENBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtBQUNGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4td2lkdGg6IDMwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbn1cblxubWFpbiB7XG4gIGZsZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbnAge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbmgxIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogMThweDtcbiAgZm9udC1zaXplOiAyNHB4O1xufVxuXG5oMiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBtYXJnaW46IDQwcHggMCAxMHB4IDA7XG59XG5cbi5yZXNvdXJjZXMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtZ2FwOiA5cHg7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbn1cblxuLnJlc291cmNlIHtcbiAgY29sb3I6ICMwMDk0YmE7XG4gIGhlaWdodDogMzZweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEyKTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBwYWRkaW5nOiAzcHggOXB4O1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59XG5cbi5yZXNvdXJjZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjgsIDEzOCwgMjU1LCAwLjA0KTtcbn1cblxucHJlIHtcbiAgcGFkZGluZzogOXB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuICBjb2xvcjogI2VlZTtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ "stxj":
/*!***********************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/button/button.component.ts ***!
  \***********************************************************************/
/*! exports provided: ButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonComponent", function() { return ButtonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "8Y7J");

const _c0 = ["swap-button", ""];
const _c1 = ["*"];
class ButtonComponent {
    constructor() {
        this._mode = 'primary';
    }
    get mode() {
        return this._mode;
    }
    set mode(style) {
        this._mode = style;
    }
}
ButtonComponent.ɵfac = function ButtonComponent_Factory(t) { return new (t || ButtonComponent)(); };
ButtonComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ButtonComponent, selectors: [["button", "swap-button", ""]], hostVars: 1, hostBindings: function ButtonComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("mode", ctx.mode);
    } }, inputs: { mode: "mode" }, attrs: _c0, ngContentSelectors: _c1, decls: 1, vars: 0, template: function ButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    } }, encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "tZZ+":
/*!*****************************************************!*\
  !*** ./apps/app/src/app/shared/navigation/index.ts ***!
  \*****************************************************/
/*! exports provided: NavigationService, Navigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _navigation_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navigation-item */ "ozUW");
/* empty/unused harmony star reexport *//* harmony import */ var _navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigation.service */ "dQfj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavigationService", function() { return _navigation_service__WEBPACK_IMPORTED_MODULE_1__["NavigationService"]; });

/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navigation */ "as/h");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Navigation", function() { return _navigation__WEBPACK_IMPORTED_MODULE_2__["Navigation"]; });






/***/ }),

/***/ "tiYt":
/*!*************************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/selection/radio.component.ts ***!
  \*************************************************************************/
/*! exports provided: RadioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RadioComponent", function() { return RadioComponent; });
/* harmony import */ var _input_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../input-base */ "ubDZ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");



const _c0 = ["swap-radio", ""];
function RadioComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
const _c1 = [[["", "swap-control", ""], ["", "swap-control", ""]], [["span"]], [["output"]]];
const _c2 = ["[swap-control],[swap-control]", "span", "output"];
class RadioComponent extends _input_base__WEBPACK_IMPORTED_MODULE_0__["InputBase"] {
}
RadioComponent.ɵfac = function RadioComponent_Factory(t) { return ɵRadioComponent_BaseFactory(t || RadioComponent); };
RadioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RadioComponent, selectors: [["label", "swap-radio", ""]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], attrs: _c0, ngContentSelectors: _c2, decls: 3, vars: 1, consts: [[4, "ngIf"]], template: function RadioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, RadioComponent_ng_container_2_Template, 2, 0, "ng-container", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showError);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], encapsulation: 2, changeDetection: 0 });
const ɵRadioComponent_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](RadioComponent);


/***/ }),

/***/ "ubDZ":
/*!**********************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/input-base.ts ***!
  \**********************************************************/
/*! exports provided: InputBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputBase", function() { return InputBase; });
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../directives */ "AyPR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");


class InputBase {
    // prettier-ignore
    get showError() {
        return this.input.ngControl.invalid
            && this.input.ngControl.touched;
    }
}
InputBase.ɵfac = function InputBase_Factory(t) { return new (t || InputBase)(); };
InputBase.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: InputBase, contentQueries: function InputBase_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵcontentQuery"](dirIndex, _directives__WEBPACK_IMPORTED_MODULE_0__["ControlDirective"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.input = _t.first);
    } } });


/***/ }),

/***/ "xIRM":
/*!************************************************************************!*\
  !*** ./apps/app/src/app/components/header-nav/header-nav.component.ts ***!
  \************************************************************************/
/*! exports provided: HeaderNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderNavComponent", function() { return HeaderNavComponent; });
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../shared */ "2CvL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "iInd");





const _c0 = ["swap-header", ""];
function HeaderNavComponent_ng_container_4_li_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mouseover", function HeaderNavComponent_ng_container_4_li_1_ng_container_1_Template_button_mouseover_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10); const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r8.toggle(item_r3); })("mouseout", function HeaderNavComponent_ng_container_4_li_1_ng_container_1_Template_button_mouseout_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10); const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r11.toggle(item_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-expanded", item_r3.expanded)("aria-controls", item_r3.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", item_r3.label, " ");
} }
function HeaderNavComponent_ng_container_4_li_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", item_r3.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r3.label);
} }
function HeaderNavComponent_ng_container_4_li_1_li_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const child_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", child_r15.route);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](child_r15.label);
} }
const _c1 = function (a0) { return { dropdown: a0 }; };
function HeaderNavComponent_ng_container_4_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, HeaderNavComponent_ng_container_4_li_1_ng_container_1_Template, 3, 3, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, HeaderNavComponent_ng_container_4_li_1_ng_template_2_Template, 2, 2, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ul", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, HeaderNavComponent_ng_container_4_li_1_li_5_Template, 3, 2, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c1, item_r3.children == null ? null : item_r3.children.length));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r3.children == null ? null : item_r3.children.length)("ngIfElse", _r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("id", item_r3.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", item_r3.children);
} }
function HeaderNavComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, HeaderNavComponent_ng_container_4_li_1_Template, 6, 8, "li", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const list_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", list_r1);
} }
const _c2 = [[["img"]], [["h1"]]];
const _c3 = ["img", "h1"];
class HeaderNavComponent {
    constructor(navigation) {
        this.navigation = navigation;
        this.header = '';
        this.role = 'navigation';
        this.nav = this.navigation.get('nav');
    }
    toggle(item) {
        item.expanded = !item.expanded;
    }
}
HeaderNavComponent.ɵfac = function HeaderNavComponent_Factory(t) { return new (t || HeaderNavComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared__WEBPACK_IMPORTED_MODULE_0__["NavigationService"])); };
HeaderNavComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: HeaderNavComponent, selectors: [["nav", "swap-header", ""]], hostVars: 1, hostBindings: function HeaderNavComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("role", ctx.role);
    } }, inputs: { header: ["swap-header", "header"] }, attrs: _c0, ngContentSelectors: _c3, decls: 6, vars: 3, consts: [[4, "ngIf"], [3, "class", 4, "ngFor", "ngForOf"], [4, "ngIf", "ngIfElse"], ["link", ""], [1, "dropdown__menu", 3, "id"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "dropdown__title", 3, "mouseover", "mouseout"], [3, "routerLink"]], template: function HeaderNavComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "section");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, HeaderNavComponent_ng_container_4_Template, 2, 1, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](5, 1, ctx.nav.items$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"]], styles: ["[_nghost-%COMP%] {\n  border-color: #2159f3;\n  border-style: solid;\n  border-width: 0 0 2px 0;\n  padding: 1rem;\n  position: relative;\n  top: 0;\n  display: flex;\n  justify-content: space-between;\n  place-items: center;\n}\n[_nghost-%COMP%]   .dropdown__title[_ngcontent-%COMP%] {\n  background-color: transparent;\n  border: none;\n  font-family: inherit;\n}\n[_nghost-%COMP%]    > section[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n[_nghost-%COMP%]    > ul[_ngcontent-%COMP%] {\n  grid-auto-flow: column;\n}\n[_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%] {\n  margin: 0 0.5rem;\n}\n[_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], [_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]   .dropdown__title[_ngcontent-%COMP%] {\n  text-decoration: none;\n  text-align: center;\n  display: inline-flex;\n  color: rgba(255, 255, 255, 0.68);\n  font-size: 1.125rem;\n}\n[_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus, [_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]   .dropdown__title[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n[_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%], [_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]   .dropdown__title[_ngcontent-%COMP%] {\n  padding: 1rem 0.5rem;\n  border-top: 3px solid transparent;\n  transition: 280ms all 120ms ease-out;\n}\n[_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%]:hover, [_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%]:focus, [_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]   .dropdown__title[_ngcontent-%COMP%]:hover, [_nghost-%COMP%]    > ul[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]   .dropdown__title[_ngcontent-%COMP%]:focus {\n  border-top-color: white;\n  color: white;\n}\n[_nghost-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: grid;\n}\n[_nghost-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  z-index: 1000;\n  padding: 0;\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%] {\n  position: relative;\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]   .dropdown__title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]   .dropdown__title[_ngcontent-%COMP%]:after {\n  content: \"\";\n  border: 0.35rem solid transparent;\n  border-top-color: rgba(255, 255, 255, 0.45);\n  margin-left: 0.25em;\n  transform: translateY(0.15em);\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]   .dropdown__menu[_ngcontent-%COMP%] {\n  z-index: 1000;\n  position: absolute;\n  min-width: 15ch;\n  left: 50%;\n  top: calc(100% - 0.25rem);\n  transition: 280ms all 120ms ease-out;\n  transform: rotateX(-90deg) translateX(-50%);\n  transform-origin: top center;\n  visibility: hidden;\n  opacity: 0.3;\n  padding: 0.5em 0;\n  background-color: white;\n  border-radius: 4px;\n  box-shadow: 0 0.15em 0.25em rgba(0, 0, 0, 0.25);\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]   .dropdown__menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.82);\n  display: block;\n  padding: 0.5em;\n  opacity: 0;\n  transition: 280ms all 120ms ease-out;\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]   .dropdown__menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  background-color: rgba(33, 89, 243, 0.15);\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]   .dropdown__menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus {\n  outline: none;\n  background-color: rgba(33, 89, 243, 0.25);\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]:after {\n  content: \"\";\n  border: 0.5rem solid transparent;\n  border-bottom-color: white;\n  position: absolute;\n  top: calc(100% - 1.25rem);\n  left: 50%;\n  transform: translateX(-50%);\n  transition: 280ms all 120ms ease-out;\n  opacity: 0;\n  will-change: opacity;\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]:focus-within   .dropdown__title[_ngcontent-%COMP%] {\n  border-top-color: white;\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]:focus-within   .dropdown__menu[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: rotateX(0) translateX(-50%);\n  visibility: visible;\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]:focus-within   .dropdown__menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  opacity: 1;\n  z-index: 1000;\n}\n[_nghost-%COMP%]   .dropdown[_ngcontent-%COMP%]:focus-within:after {\n  opacity: 1;\n}\n@media (max-width: 768px) {\n  [_nghost-%COMP%] {\n    display: flex;\n    flex-direction: column;\n  }\n  [_nghost-%COMP%]    > ul[_ngcontent-%COMP%] {\n    display: flex;\n    flex-flow: row wrap;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2hlYWRlci1uYXYuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFZRSxxQkFYa0M7RUFZbEMsbUJBQUE7RUFDQSx1QkFBQTtFQUVBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtBQVhGO0FBSkU7RUFDRSw2QkFBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtBQU1KO0FBUUU7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7QUFOSjtBQVFFO0VBQ0Usc0JBQUE7QUFOSjtBQVFJO0VBQ0UsZ0JBQUE7QUFOTjtBQVFNOztFQUVFLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLGdDQUFBO0VBQ0EsbUJBQUE7QUFOUjtBQVFROztFQUNFLGFBQUE7QUFMVjtBQVNNOztFQUVFLG9CQUFBO0VBQ0EsaUNBQUE7RUFDQSxvQ0EvQ1k7QUF3Q3BCO0FBU1E7OztFQUVFLHVCQXBEcUI7RUFxRHJCLFlBckRxQjtBQStDL0I7QUFZRTtFQUNFLGdCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0FBVko7QUFZSTtFQUNFLGFBQUE7RUFDQSxVQUFBO0FBVk47QUFjRTtFQUNFLGtCQUFBO0FBWko7QUFjSTtFQUNFLG9CQUFBO0VBQ0EsbUJBQUE7QUFaTjtBQWNNO0VBQ0UsV0FBQTtFQUNBLGlDQUFBO0VBQ0EsMkNBQUE7RUFDQSxtQkFBQTtFQUNBLDZCQUFBO0FBWlI7QUFnQkk7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsU0FBQTtFQUNBLHlCQUFBO0VBQ0Esb0NBNUZjO0VBNkZkLDJDQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQW5HeUI7RUFvR3pCLGtCQUFBO0VBQ0EsK0NBQUE7QUFkTjtBQWdCTTtFQUNFLDBCQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxVQUFBO0VBQ0Esb0NBM0dZO0FBNkZwQjtBQWdCUTtFQUNFLHlDQUFBO0FBZFY7QUFpQlE7RUFDRSxhQUFBO0VBQ0EseUNBQUE7QUFmVjtBQW9CSTtFQUNFLFdBQUE7RUFDQSxnQ0FBQTtFQUNBLDBCQTVIeUI7RUE2SHpCLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxTQUFBO0VBQ0EsMkJBQUE7RUFDQSxvQ0FoSWM7RUFpSWQsVUFBQTtFQUNBLG9CQUFBO0FBbEJOO0FBc0JNO0VBQ0UsdUJBeEl1QjtBQW9IL0I7QUF1Qk07RUFDRSxVQUFBO0VBQ0Esc0NBQUE7RUFDQSxtQkFBQTtBQXJCUjtBQXVCUTtFQUNFLFVBQUE7RUFDQSxhQUFBO0FBckJWO0FBeUJNO0VBQ0UsVUFBQTtBQXZCUjtBQTRCQTtFQUNFO0lBQ0UsYUFBQTtJQUNBLHNCQUFBO0VBekJGO0VBMEJFO0lBQ0UsYUFBQTtJQUNBLG1CQUFBO0VBeEJKO0FBQ0YiLCJmaWxlIjoiaGVhZGVyLW5hdi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgJHNlZWstcHJpbWFyeS1kZWZhdWx0LWJhY2tncm91bmQ6IHJnYmEoMzMsIDg5LCAyNDMsIDEpO1xuICAkc2Vlay1wcmltYXJ5LWRlZmF1bHQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMSk7XG4gICRzZWVrLXRyYW5zaXRpb246IDI4MG1zIGFsbCAxMjBtcyBlYXNlLW91dDtcbiAgJHNlZWstcHJpbWFyeS1kZWZhdWx0LWJvcmRlcjogcmdiYSgwLCAwLCAwLCAwLjI0KTtcblxuICAuZHJvcGRvd25fX3RpdGxlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIH1cblxuICBib3JkZXItY29sb3I6ICRzZWVrLXByaW1hcnktZGVmYXVsdC1iYWNrZ3JvdW5kO1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItd2lkdGg6IDAgMCAycHggMDtcblxuICBwYWRkaW5nOiAxcmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogMDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuXG4gID4gc2VjdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIH1cbiAgPiB1bCB7XG4gICAgZ3JpZC1hdXRvLWZsb3c6IGNvbHVtbjtcblxuICAgID4gbGkge1xuICAgICAgbWFyZ2luOiAwIDAuNXJlbTtcblxuICAgICAgYSxcbiAgICAgIC5kcm9wZG93bl9fdGl0bGUge1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICAgIGNvbG9yOiByZ2JhKCRzZWVrLXByaW1hcnktZGVmYXVsdC1jb2xvciwgMC42OCk7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XG5cbiAgICAgICAgJjpmb2N1cyB7XG4gICAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICA+IGEsXG4gICAgICAuZHJvcGRvd25fX3RpdGxlIHtcbiAgICAgICAgcGFkZGluZzogMXJlbSAwLjVyZW07XG4gICAgICAgIGJvcmRlci10b3A6IDNweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgdHJhbnNpdGlvbjogJHNlZWstdHJhbnNpdGlvbjtcblxuICAgICAgICAmOmhvdmVyLFxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAkc2Vlay1wcmltYXJ5LWRlZmF1bHQtY29sb3I7XG4gICAgICAgICAgY29sb3I6ICRzZWVrLXByaW1hcnktZGVmYXVsdC1jb2xvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVsIHtcbiAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGRpc3BsYXk6IGdyaWQ7XG5cbiAgICBsaSB7XG4gICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgcGFkZGluZzogMDtcbiAgICB9XG4gIH1cblxuICAuZHJvcGRvd24ge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgIC5kcm9wZG93bl9fdGl0bGUge1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICAmOmFmdGVyIHtcbiAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIGJvcmRlcjogMC4zNXJlbSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogcmdiYSgkc2Vlay1wcmltYXJ5LWRlZmF1bHQtY29sb3IsIDAuNDUpO1xuICAgICAgICBtYXJnaW4tbGVmdDogMC4yNWVtO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMC4xNWVtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuZHJvcGRvd25fX21lbnUge1xuICAgICAgei1pbmRleDogMTAwMDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIG1pbi13aWR0aDogMTVjaDtcbiAgICAgIGxlZnQ6IDUwJTtcbiAgICAgIHRvcDogY2FsYygxMDAlIC0gMC4yNXJlbSk7XG4gICAgICB0cmFuc2l0aW9uOiAkc2Vlay10cmFuc2l0aW9uO1xuICAgICAgdHJhbnNmb3JtOiByb3RhdGVYKC05MGRlZykgdHJhbnNsYXRlWCgtNTAlKTtcbiAgICAgIHRyYW5zZm9ybS1vcmlnaW46IHRvcCBjZW50ZXI7XG4gICAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgICBvcGFjaXR5OiAwLjM7XG4gICAgICBwYWRkaW5nOiAwLjVlbSAwO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHNlZWstcHJpbWFyeS1kZWZhdWx0LWNvbG9yO1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgYm94LXNoYWRvdzogMCAwLjE1ZW0gMC4yNWVtIHJnYmEoYmxhY2ssIDAuMjUpO1xuXG4gICAgICBhIHtcbiAgICAgICAgY29sb3I6IHJnYmEoJHNlZWstcHJpbWFyeS1kZWZhdWx0LWJvcmRlciwgMC44Mik7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBwYWRkaW5nOiAwLjVlbTtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgdHJhbnNpdGlvbjogJHNlZWstdHJhbnNpdGlvbjtcblxuICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCRzZWVrLXByaW1hcnktZGVmYXVsdC1iYWNrZ3JvdW5kLCAwLjE1KTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgkc2Vlay1wcmltYXJ5LWRlZmF1bHQtYmFja2dyb3VuZCwgMC4yNSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAmOmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgYm9yZGVyOiAwLjVyZW0gc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItYm90dG9tLWNvbG9yOiAkc2Vlay1wcmltYXJ5LWRlZmF1bHQtY29sb3I7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IGNhbGMoMTAwJSAtIDEuMjVyZW0pO1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICAgICAgdHJhbnNpdGlvbjogJHNlZWstdHJhbnNpdGlvbjtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB3aWxsLWNoYW5nZTogb3BhY2l0eTtcbiAgICB9XG5cbiAgICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgICAuZHJvcGRvd25fX3RpdGxlIHtcbiAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogJHNlZWstcHJpbWFyeS1kZWZhdWx0LWNvbG9yO1xuICAgICAgfVxuXG4gICAgICAuZHJvcGRvd25fX21lbnUge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZVgoMCkgdHJhbnNsYXRlWCgtNTAlKTtcbiAgICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcblxuICAgICAgICBhIHtcbiAgICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICAgIHotaW5kZXg6IDEwMDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJjphZnRlciB7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgOmhvc3Qge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICA+IHVsIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xuICAgIH1cbiAgfVxufVxuIl19 */"], changeDetection: 0 });


/***/ }),

/***/ "xZuQ":
/*!************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/slider/index.ts ***!
  \************************************************************/
/*! exports provided: SliderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slider_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider.component */ "Hi7J");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SliderComponent", function() { return _slider_component__WEBPACK_IMPORTED_MODULE_0__["SliderComponent"]; });




/***/ }),

/***/ "y0bg":
/*!*****************************************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/textfield/textfield.component.ts ***!
  \*****************************************************************************/
/*! exports provided: TextfieldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextfieldComponent", function() { return TextfieldComponent; });
/* harmony import */ var _input_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../input-base */ "ubDZ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "SVse");



const _c0 = ["swap-textfield", ""];
function TextfieldComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1, 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
const _c1 = [[["", "swap-control", ""], ["", "swap-control", ""]], [["span"]], [["output"]]];
const _c2 = ["[swap-control],[swap-control]", "span", "output"];
class TextfieldComponent extends _input_base__WEBPACK_IMPORTED_MODULE_0__["InputBase"] {
}
TextfieldComponent.ɵfac = function TextfieldComponent_Factory(t) { return ɵTextfieldComponent_BaseFactory(t || TextfieldComponent); };
TextfieldComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: TextfieldComponent, selectors: [["label", "swap-textfield", ""]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], attrs: _c0, ngContentSelectors: _c2, decls: 3, vars: 1, consts: [[4, "ngIf"]], template: function TextfieldComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, TextfieldComponent_ng_container_2_Template, 2, 0, "ng-container", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showError);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]], encapsulation: 2 });
const ɵTextfieldComponent_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](TextfieldComponent);


/***/ }),

/***/ "yhS3":
/*!*****************************************************!*\
  !*** ./libs/swap/forms/src/lib/components/index.ts ***!
  \*****************************************************/
/*! exports provided: ButtonComponent, OptionComponent, SelectPanelComponent, SelectComponent, SelectService, CheckboxComponent, RadioComponent, SliderComponent, TextfieldComponent, InputBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "ILnU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonComponent", function() { return _button__WEBPACK_IMPORTED_MODULE_0__["ButtonComponent"]; });

/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select */ "LtM4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OptionComponent", function() { return _select__WEBPACK_IMPORTED_MODULE_1__["OptionComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectPanelComponent", function() { return _select__WEBPACK_IMPORTED_MODULE_1__["SelectPanelComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectComponent", function() { return _select__WEBPACK_IMPORTED_MODULE_1__["SelectComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectService", function() { return _select__WEBPACK_IMPORTED_MODULE_1__["SelectService"]; });

/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selection */ "AP1M");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CheckboxComponent", function() { return _selection__WEBPACK_IMPORTED_MODULE_2__["CheckboxComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioComponent", function() { return _selection__WEBPACK_IMPORTED_MODULE_2__["RadioComponent"]; });

/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slider */ "xZuQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SliderComponent", function() { return _slider__WEBPACK_IMPORTED_MODULE_3__["SliderComponent"]; });

/* harmony import */ var _textfield__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./textfield */ "LckF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextfieldComponent", function() { return _textfield__WEBPACK_IMPORTED_MODULE_4__["TextfieldComponent"]; });

/* harmony import */ var _input_base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./input-base */ "ubDZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputBase", function() { return _input_base__WEBPACK_IMPORTED_MODULE_5__["InputBase"]; });









/***/ }),

/***/ "zEfI":
/*!***********************************************************************!*\
  !*** ./libs/swap/forms/src/lib/directives/currency-mask.directive.ts ***!
  \***********************************************************************/
/*! exports provided: CurrencyMaskDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyMaskDirective", function() { return CurrencyMaskDirective; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "s7LF");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "8Y7J");
/* harmony import */ var _utilities_mask__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities/mask */ "6gzr");
/* harmony import */ var _utilities_cursor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilities/cursor */ "+tZ6");








class CurrencyMaskDirective {
    constructor(selfNgControl, elRef) {
        var _a, _b;
        this.selfNgControl = selfNgControl;
        this.elRef = elRef;
        this._destroy = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.prefix = 'R$';
        this.thousandsSeparator = '.';
        this.decimalSeparator = ',';
        this.digitsAfterSeparator = 2;
        this.maxIntegerDigits = 8;
        this.allowNegatives = false;
        /**
         * Para quando o formulário já tem um valor inicial
         * ou espera-se que inicialize como `zero * mascarado *`.
         */
        this.validateOnInit = true;
        this.valueHasChanged = false;
        if ((_a = this.selfNgControl) === null || _a === void 0 ? void 0 : _a.control) {
            this.ngControl = (_b = this.selfNgControl) === null || _b === void 0 ? void 0 : _b.control;
        }
    }
    ngAfterViewInit() {
        var _a, _b;
        this.control = (_b = (_a = this.selfNgControl) === null || _a === void 0 ? void 0 : _a.control) !== null && _b !== void 0 ? _b : this.ngControl;
        if (!this.control) {
            console.warn(`
        currencyMask: Um FormControl é necessário
        para que a diretiva seja iniciada.
      `);
            return;
        }
        const element = this.elRef.nativeElement;
        this.nativeEl = element.hasChildNodes()
            ? element.getElementsByTagName('input')[0]
            : element;
        if (!this.nativeEl) {
            console.warn(`
        currencyMask: um elRef do tipo input é
        necessário para que a diretiva seja iniciada.
      `);
            return;
        }
        const boot = this.validateOnInit
            ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["startWith"])(this.control.value)
            : Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(() => { });
        this.control.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["filter"])((value) => {
            const lastValueWasChanged = this.valueHasChanged;
            this.valueHasChanged = false;
            return (!this.previousValue ||
                Object(_utilities_mask__WEBPACK_IMPORTED_MODULE_4__["unmaskedNumericValueFor"])(value) !==
                    Object(_utilities_mask__WEBPACK_IMPORTED_MODULE_4__["unmaskedNumericValueFor"])(this.previousValue) ||
                Object(_utilities_mask__WEBPACK_IMPORTED_MODULE_4__["hasNonDecimalCharacters"])(value) ||
                !lastValueWasChanged);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])((value) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.toString()) !== null && _a !== void 0 ? _a : ''; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["takeUntil"])(this._destroy))
            .subscribe((value) => {
            var _a;
            this.adjustCursorIfSeparator(value);
            this.setValue(this.maskedValueFor(value), value.length < ((_a = this.previousValue) === null || _a === void 0 ? void 0 : _a.length));
        });
    }
    setValue(nextValue, removing = false) {
        let nextCursorPosition = Object(_utilities_cursor__WEBPACK_IMPORTED_MODULE_5__["cursorPositionFor"])(this.nativeEl);
        if (nextValue) {
            nextCursorPosition =
                nextCursorPosition <= this.prefix.length + 1
                    ? nextValue.length
                    : Object(_utilities_cursor__WEBPACK_IMPORTED_MODULE_5__["nextCursorPositionFor"])(this.nativeEl, this.previousValue, nextValue, true, true, removing);
        }
        const wasInitialValue = this.valueHasChanged;
        this.valueHasChanged = !!this.previousValue;
        this.previousValue = nextValue;
        this.control.setValue(nextValue, { emitEvent: false });
        this.control.setValue(Object(_utilities_mask__WEBPACK_IMPORTED_MODULE_4__["unmaskedNumericValueFor"])(nextValue), {
            emitEvent: true,
            emitModelToViewChange: false,
        });
        if (wasInitialValue) {
            nextCursorPosition = nextValue.length + 1;
        }
        Object(_utilities_cursor__WEBPACK_IMPORTED_MODULE_5__["setCursorPositionFor"])(this.nativeEl, nextCursorPosition);
    }
    maskedValueFor(value) {
        return Object(_utilities_mask__WEBPACK_IMPORTED_MODULE_4__["maskedNumericValueFor"])(value, this.thousandsSeparator, this.decimalSeparator, this.prefix, this.digitsAfterSeparator, this.maxIntegerDigits, this.allowNegatives);
    }
    adjustCursorIfSeparator(value) {
        const decimalSeparatorPressed = value.indexOf(this.decimalSeparator) !==
            value.lastIndexOf(this.decimalSeparator);
        if (decimalSeparatorPressed) {
            const curPos = Object(_utilities_cursor__WEBPACK_IMPORTED_MODULE_5__["cursorPositionFor"])(this.elRef);
            const nextPos = curPos - 1 <= value.indexOf(this.decimalSeparator)
                ? value.length
                : value.indexOf(this.decimalSeparator) + 1;
            Object(_utilities_cursor__WEBPACK_IMPORTED_MODULE_5__["setCursorPositionFor"])(this.elRef, nextPos);
        }
    }
    ngOnDestroy() {
        this._destroy.next();
        this._destroy.complete();
        this._destroy.unsubscribe();
    }
}
CurrencyMaskDirective.ɵfac = function CurrencyMaskDirective_Factory(t) { return new (t || CurrencyMaskDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"], 10), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"])); };
CurrencyMaskDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({ type: CurrencyMaskDirective, selectors: [["input", "swap-currency", ""]], inputs: { ngControl: "ngControl", prefix: "prefix", thousandsSeparator: "thousandsSeparator", decimalSeparator: "decimalSeparator", digitsAfterSeparator: "digitsAfterSeparator", maxIntegerDigits: "maxIntegerDigits", allowNegatives: "allowNegatives", validateOnInit: "validateOnInit" } });


/***/ }),

/***/ "zWPF":
/*!****************************************************!*\
  !*** ./apps/app/src/app/containers/radio/index.ts ***!
  \****************************************************/
/*! exports provided: RadioContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _radio_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./radio.container */ "6vcy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RadioContainer", function() { return _radio_container__WEBPACK_IMPORTED_MODULE_0__["RadioContainer"]; });




/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map