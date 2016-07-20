import {EnzymeSelector, ShallowWrapper, ReactWrapper, CheerioWrapper} from 'enzyme';
import {Assertion} from '~chai/lib/Assertion';

// Augment chai assertions
declare module '~chai/lib/Assertion' {
    interface Match {
        (selector: EnzymeSelector): Assertion;
    }
    interface Assertion {
        /**
         * Assert that the given wrapper is checked:
         */
        checked(): Assertion;

        /**
         * Assert that the wrapper has a given class:
         * @param name
         */
        className(name: string): Assertion;

        /**
         * Assert that the wrapper contains a given node:
         * @param code
         */
        //contain(code: any): Assertion;

        /**
         * Assert that the wrapper contains a descendant matching the given selector:
         * @param selector
         */
        descendants(selector?: EnzymeSelector): Assertion;

        /**
         * Assert that the wrapper contains an exact amount of descendants matching the given selector:
         */
        exactly(count?: number): Assertion;

        /**
         * Assert that the given wrapper is disabled:
         */
        disabled(): Assertion;

        /**
         * Assert that the given wrapper is empty:
         */
        blank(): Assertion;

        /**
         * Assert that the given wrapper exists:
         */
        present(): Assertion;

        /**
         * Assert that the wrapper has given html:
         * @param str
         */
        html(str?: string): Assertion;

        /**
         * Assert that the wrapper has given ID attribute:
         * @param str
         */
        id(str: string): Assertion;

        /**
         * Assert that the wrapper matches given selector:
         * @param selector
         */
//        match(selector: EnzymeSelector): Assertion;

        /**
         * Assert that the wrapper has a given ref
         * @param key
         */
        ref(key: string): Assertion;

        /**
         * Assert that the given wrapper is selected:
         */
        selected(): Assertion;

        /**
         * Assert that the given wrapper has the tag name:
         * @param str
         */
        tagName(str: string): Assertion;

        /**
         * Assert that the given wrapper has the supplied text:
         * @param str
         */
        text(str?: string): Assertion;

        /**
         * Assert that the given wrapper has given value:
         * @param str
         */
        value(str: string): Assertion;

        /**
         * Assert that the wrapper has given attribute [with value]:
         * @param key
         * @param val
         */
        attr(key: string, val?: string): Assertion;

        /**
         * Assert that the wrapper has a given data attribute [with value]:
         * @param key
         * @param val
         */
        data(key: string, val?: string): Assertion;

        /**
         * Assert that the wrapper has given style:
         * @param key
         * @param val
         */
        style(key: string, val?: string): Assertion;

        /**
         * Assert that the wrapper has given state [with value]:
         * @param key
         * @param val
         */
        state(key: string, val?: any): Assertion;

        /**
         * Assert that the wrapper has given prop [with value]:
         * @param key
         * @param val
         */
        prop(key: string, val?: any): Assertion;
    }
}

type DebugWrapper = ShallowWrapper<any,any> | CheerioWrapper<any, any> | ReactWrapper<any, any>;
declare function chaiEnzyMe(wrapper?: (debugWrapper: DebugWrapper) => string): (chai: any) => void;
declare module chaiEnzyMe { }

export = chaiEnzyMe;
