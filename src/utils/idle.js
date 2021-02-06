class Idle {
    static interval = 250;
    static _instance = null;
    constructor() {
        if (Idle._instance) {
            throw new Error("Idle is a singleton use Idle.instance");
        } else {
            this._timerHandler = null;
            this._listeners = {};
            this._lastInteractionSince = 0;
            this._startTimer();
            this._listenToInteractions();
        }
    }

    static get instance() {
        if (!Idle._instance) {
            Idle._instance = new Idle();
        }
        return Idle._instance;
    }

    subscribe = (timeout, onIdleStart, onIdleEnd = null, once = false) => {
        if (timeout < 1) {
            throw new Error("timeout should be greater that 1");
        }

        if (!(onIdleStart instanceof Function)) {
            throw new Error(
                "Idle onIdleStart should be of type Function but got ",
                typeof onIdleStart + " instead"
            );
        }

        const handlerName = this._getHandlerName();
        this._listeners[handlerName] = {
            timeout,
            onIdleStart,
            onIdleEnd,
            once,
        };
        return () => {
            this._unsubscribe(handlerName);
        };
    };

    destroy = () => {
        window.removeEventListener("mousemove", this._resetTimer);
        window.removeEventListener("keyup", this._resetTimer);
        this._stopTimer();
    };

    _getHandlerName = () => {
        const getRandom = () => "_" + Math.random().toString(36).substr(2, 9);

        let handlerName = getRandom(),
            counter = 0;
        while (this._listeners[handlerName]) {
            if (counter > 10) {
                handlerName = getRandom() + getRandom();
                continue;
            } else if (counter > 100) {
                handlerName = getRandom() + getRandom() + getRandom();
                continue;
            }
            handlerName = getRandom();
        }
        return handlerName;
    };

    _startTimer = () => {
        this._timerHandler = setInterval(() => {
            this._lastInteractionSince += Idle.interval;
            this._notify();
        }, Idle.interval);
    };

    _stopTimer = () => {
        clearTimeout(this._timerHandler);
        this._lastInteractionSince = 0;
    };

    _notify = () => {
        for (const handlerName in this._listeners) {
            const listener = this._listeners[handlerName];
            if (listener.invoked) return;
            if (listener.timeout <= this._lastInteractionSince) {
                if (listener.onIdleStart instanceof Function) {
                    listener.onIdleStart();
                    listener.invoked = true;
                    if (listener.once) {
                        this._unsubscribe(handlerName);
                    }
                }
            }
        }
    };

    _listenToInteractions = () => {
        window.addEventListener("mousemove", this._resetTimer);
        window.addEventListener("keyup", this._resetTimer);
    };

    _resetTimer = (ev) => {
        this._onIdleEnd();
        this._stopTimer();
        this._startTimer();
    };

    _onIdleEnd = () => {
        for (const handlerName in this._listeners) {
            const listener = this._listeners[handlerName];
            if (listener.invoked) {
                console.log(listener)
                listener.invoked = false;
                if (listener.onIdleEnd instanceof Function) {
                    listener.onIdleEnd();
                }
            }
        }
    };

    _unsubscribe = (handlerName) => {
        if (this._listeners[handlerName]) {
            delete this._listeners[handlerName];
        }
    };
}

export default Idle;
