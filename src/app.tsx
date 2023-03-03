import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Analysis from "@src/pages/analysis/Analysis";
import Portal from "@src/pages/portal/Portal";
import NotFound from '@src/pages/notFound/NotFound'
import Layout from '@src/pages/layout/Layout'

import { AppLayout, AppHeaderLayout, AppContentLayout } from '@src/components/basic/layout/app-layout/AppLayout';



import Header from "./components/business/header/Header";

import { ThemeContext } from '@src/contexts/theme'

export default () => {
    const { themeName } = useContext(ThemeContext);
    return (
        <AppLayout>
            <AppHeaderLayout>
                <Header />
            </AppHeaderLayout>
            <AppContentLayout>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Portal />} />
                        <Route path="/analysis" element={<Analysis />} />
                        <Route path="/test" element={<Layout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </AppContentLayout>
        </AppLayout>
    );
}