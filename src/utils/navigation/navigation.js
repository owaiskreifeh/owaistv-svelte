import { SpatialNavigator } from "./spatial_navigator";
import { KeyNavigationAdapter } from "./key_navigation_adapter";

let spatialNavigator = null;

export const trackFocusables = () => {
    if (!spatialNavigator) {
        return console.warn("spatialNavigator is not initialized yet");
    }
    setTimeout(() => {
        let f = false;
        document.querySelectorAll(".focusable").forEach((e) => {
            spatialNavigator.add(e);
            if (!f) {
                spatialNavigator.focus(e);
                f = true;
            }
        });
    }, 500);
};

export const clearFocusalbes = () => {
    if (!spatialNavigator) {
        return console.warn("spatialNavigator is not initialized yet");
    }
    spatialNavigator.clear();
};

export function initSpatialNavigation({
    navigableClasses = [],
    navigableIds = [],
    onFocusElement,
    onUnfocusElement,
    onEnterElement = null,
}) {
    let _focusedElem, _spatialNavigator, _keyNavigatorAdapter;
    function init() {
        const collection = getNavigateElements();
        _spatialNavigator = new SpatialNavigator(collection);
        spatialNavigator = _spatialNavigator;
        _spatialNavigator.straightOnly = true;
        _keyNavigatorAdapter = new KeyNavigationAdapter();
        _keyNavigatorAdapter.init();
        _keyNavigatorAdapter.on("move", onMove);
        // All behaviors which no need to have multple events while holding the
        // key should use keyup.
        _keyNavigatorAdapter.on("enter-keyup", onEnterElement);
        _spatialNavigator.on("focus", handleFocus);
        _spatialNavigator.on("unfocus", handleUnfocus);
    }

    function getNavigateElements() {
        const elements = [];
        navigableIds.forEach(function (id) {
            const elem = document.getElementById(id);
            if (elem) {
                elements.push(elem);
            }
        });
        navigableClasses.forEach(function (className) {
            const elems = document.getElementsByClassName(className);
            if (elems.length) {
                // Change HTMLCollection to array before concatenating
                elements = elements.concat(Array.prototype.slice.call(elems));
            }
        });
        return elements;
    }

    function handleFocus(elem) {
        elem.focus();
        _focusedElem = elem;
        onFocusElement(elem);
    }

    function handleUnfocus(elem) {
        elem.blur();
        onUnfocusElement(elem);
    }

    function onMove(key) {
        if (!_focusedElem) {
            _focusedElem = _spatialNavigator.getFocuedElement();
        }
        if (
            !(
                _focusedElem.CLASS_NAME == "XScrollable" &&
                _focusedElem.move(key)
            )
        ) {
            _spatialNavigator.move(key);
        }
    }

    init();

    function destory() {
        clearFocusalbes();
        _keyNavigatorAdapter.off("move", onMove);
        _keyNavigatorAdapter.off("enter-keyup", onEnterElement);
        _spatialNavigator.off("focus", handleFocus);
        _spatialNavigator.off("unfocus", handleUnfocus);
        spatialNavigator = null;
    }

    return { instance: _spatialNavigator, destory };
}
