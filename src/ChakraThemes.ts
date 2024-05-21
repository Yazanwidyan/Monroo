export const themes = {
    styles: {
        global: {
            label: {
                fontSize: '15px',
            },
        },
    },
    components: {
        FormLabel: {
            baseStyle: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'gray.700',
            },
            sizes: {
                sm: {
                    fontSize: '14px',
                },
                md: {
                    fontSize: '15px',
                },
            },
        },
        Button: {
            sizes: {
                sm: {
                    h: '42px',
                    fontSize: '17px',
                    px: '16px',
                },
                md: {
                    h: '42px',
                    fontSize: '17px',
                    px: '16px',
                },
                lg: {
                    h: '48px',
                    fontSize: '18px',
                    px: '20px',
                },
                xl: {
                    h: '56px',
                    fontSize: '20px',
                    px: '24px',
                },
            },
        },
        Input: {
            baseStyle: {
                field: {
                    borderRadius: '17',
                    h: '44px',
                    fontSize: '17px',
                    _placeholder: {
                        fontSize: '17px', // Customize placeholder font size here
                        color: 'gray.500', // Optional: Customize placeholder color
                    },
                },
            },
        },
        Select: {
            baseStyle: {
                field: {
                    borderRadius: '17',
                    h: '44px',
                    fontSize: '17px',
                    _placeholder: {
                        fontSize: '17px', // Customize Select placeholder font size here
                        color: 'gray.500', // Optional: Customize Select placeholder color
                    },
                },
            },
        },
    },
    colors: {
        primary: {
            50: '#F5E6E9',
            100: '#E0BFC9',
            200: '#C996A5',
            300: '#B46E81',
            400: '#9F4B64',
            500: '#8B283F', // This is your primary color: #4E2E43
            600: '#7D2239',
            700: '#6F1A30',
            800: '#611227',
            900: '#530A1E',
        },
        gray: {
            50: '#fafafa',
            100: '#f2f1ec',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
        },

        secondary: {},
    },
};
