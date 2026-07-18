import { useTheme } from "./utils";

export default function useUIThemeMeta() {
    const theme = useTheme();

    return <meta name='theme-color' key='theme-color' content={theme.palette.surface?.[0]} />
}