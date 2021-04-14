import React, { Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { fullPageLoadingIndicator } from '../LoadingIndicator';
import HomePage from '../HomePage';
import AboutUs from '../StaticPages/index';
import MagentoRoute from '../MagentoRoute';
import { useScrollTopOnChange } from '@magento/peregrine/lib/hooks/useScrollTopOnChange';

const Routes = () => {
    const { pathname } = useLocation();
    useScrollTopOnChange(pathname);
    console.log(pathname)
    return (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Switch>
                {/*
                 * Client-side routes are injected by BabelRouteInjectionPlugin here.
                 * Venia's are defined in packages/venia-ui/lib/targets/venia-ui-intercept.js
                 */}
                <Route>
                    {pathname !== '/about-us/' &&
                        <MagentoRoute/>
                    }
                    {/*
                     * The Route below is purposefully nested with the MagentoRoute above.
                     * MagentoRoute renders the CMS page, and HomePage adds a stylesheet.
                     * HomePage would be obsolete if the CMS could deliver a stylesheet.
                     */}
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/about-us">
                        <AboutUs />
                    </Route>
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
