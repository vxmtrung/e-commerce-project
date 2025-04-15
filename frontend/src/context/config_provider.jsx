import React from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useAppSelector } from '@/hooks/redux_hooks';
import { StylesContext } from '@/context/styles';

export const COLOR = {
    50: '#e0f1ff',
    100: '#b0d2ff',
    200: '#7fb0ff',
    300: '#4d8bff',
    400: '#1e79fe',
    500: '#076ee5',
    600: '#0062b3',
    700: '#004f81',
    800: '#003650',
    900: '#001620',
    borderColor: '#E7EAF3B2',
};

export default function AntdConfigProvider({ children }) {
    const theme = useAppSelector('systemState', 'theme')?.theme;

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: COLOR['500'],
                    borderRadius: 6,
                    fontFamily: 'Lato, sans-serif',
                },
                components: {
                    Breadcrumb: {
                        // linkColor: 'rgba(0,0,0,.8)',
                        // itemColor: 'rgba(0,0,0,.8)',
                    },
                    Button: {
                        colorLink: COLOR['500'],
                        colorLinkActive: COLOR['700'],
                        colorLinkHover: COLOR['300'],
                    },
                    Calendar: {
                        colorBgContainer: 'none',
                    },
                    Card: {
                        colorBorderSecondary: COLOR['borderColor'],
                    },
                    Carousel: {
                        colorBgContainer: COLOR['800'],
                        dotWidth: 8,
                    },
                    Rate: {
                        colorFillContent: COLOR['100'],
                        colorText: COLOR['600'],
                    },
                    Segmented: {
                        colorBgLayout: COLOR['100'],
                        borderRadius: 6,
                        colorTextLabel: '#000000',
                    },
                    Table: {
                        borderColor: COLOR['100'],
                        colorBgContainer: 'none',
                        headerBg: 'none',
                        rowHoverBg: COLOR['50'],
                    },
                    Tabs: {
                        colorBorderSecondary: COLOR['100'],
                    },
                    Timeline: {
                        dotBg: 'none',
                    },
                    Typography: {
                        colorLink: COLOR['500'],
                        colorLinkActive: COLOR['700'],
                        colorLinkHover: COLOR['300'],
                        linkHoverDecoration: 'underline',
                    },
                },
                algorithm:
                    theme === 'dark'
                        ? antdTheme.darkAlgorithm
                        : antdTheme.defaultAlgorithm,
            }}
        >
            <StylesContext.Provider
                value={{
                    rowProps: {
                        gutter: [
                            { xs: 8, sm: 16, md: 24, lg: 32 },
                            { xs: 8, sm: 16, md: 24, lg: 32 },
                        ],
                    },
                    carouselProps: {
                        autoplay: true,
                        dots: true,
                        dotPosition: 'bottom',
                        infinite: true,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                }}
            >  {children}</StylesContext.Provider>

        </ConfigProvider>
    );
}

export const tokenCustomer = {
    colorPrimary: '#ff69b4',
    colorBgBase: '#fff0f5',
    colorTextBase: '#ff69b4',
    colorLink: '#ff69b4',
    colorLinkHover: '#ff85c1',
    colorLinkActive: '#ff1493',
};

export const AntdConfigProviderCustomer = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#ff69b4',
                    colorBgBase: '#ffffff',
                    // colorTextBase: '#ff69b4',
                    // colorLink: '#ff69b4',
                    // colorLinkHover: '#ff85c1',
                    // colorLinkActive: '#ff1493',
                },
                components: {
                    Button: {
                        colorPrimary: '#ff69b4',
                        colorTextLightSolid: '#fff',
                    },
                    Input: {
                        activeBorderColor: '#ff69b4',
                        hoverBorderColor: '#ff85c1',
                    },
                    Menu: {
                        colorItemText: '#ff69b4',
                        colorItemTextHover: '#ff85c1',
                        colorItemBgActive: '#ffe4ec',
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};