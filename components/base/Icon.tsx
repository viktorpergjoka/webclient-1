import React, {MouseEventHandler} from "react";
import iconPath from "./IconsList";
import {useTheme} from "@material-ui/core";

const defaultStyles = {display: "inline-block", verticalAlign: "middle"};


// type width = 24
// type height = 24
// type viewbox = "0 0 32 32"


type Props = {
    onClick?: MouseEventHandler,
    name: string,
    iconColor?: string,
    circleColor?: string,
    viewBox?: string,
    className?: string,
    style?: Object,
    width?: number,
    height?: number,
    circled?: boolean,
    outlineColor?: string,
    title?: string
}

const Icon = (props: Props) => {
    const {
        onClick,
        name,
        iconColor,
        circleColor,
        viewBox,
        className,
        style,
        width,
        height,
        circled,
        outlineColor,
        title
    } = props;
    const styles = {...defaultStyles, style};
    const theme = useTheme();

    const [color, setIconColor] = React.useState(iconColor)
    return (
        <svg
            className={className}
            style={styles}
            viewBox={`0 0 ${width || 24} ${height || 24}`}
            width={`${width || 24}px`}
            height={`${height || 24}px`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            onClick={onClick}
            onMouseEnter={() => setIconColor(theme.palette.common.white)}
            onMouseLeave={() => setIconColor(iconColor || theme.palette.grey[300])}
        >
            <title id={name}>{title}</title>
            <g fill={color}>
                {circled && <circle cx="16" cy="16" r="16" fill={circleColor || "#E84040"}/>}
                {iconPath(name, outlineColor)}
            </g>
        </svg>
    );
};

export default Icon