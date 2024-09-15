import { theme, ThemeConfig } from "antd";

import { THEME_MODES } from "src/store/slices/theme";

const config = {
    algorithm: {
        LIGHT: undefined,
        DARK: theme.darkAlgorithm
    },
    headerBg: {
        LIGHT: '',
        DARK: ''
    }
}

const antConfig = (mode: THEME_MODES): ThemeConfig => {
    return {
        algorithm: config.algorithm[mode],
        components: {
            Layout: {
                headerBg: config.headerBg[mode]
            }
        }
    }
}

export {
    antConfig
}